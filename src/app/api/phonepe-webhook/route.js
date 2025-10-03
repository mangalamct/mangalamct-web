import { StandardCheckoutClient, Env } from 'pg-sdk-node';
import { NextResponse } from 'next/server';

import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../admin';

// --- Configuration Setup (using environment variables) ---

const clientId = process.env.PHONE_PAY_CLIENT_ID;
const clientSecret = process.env.PHONE_PAY_CLIENT_SECRET;
const clientVersion = parseInt(process.env.PHONE_PAY_CLIENT_VERSION || '1', 10);
const env = process.env.PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

// Webhook-specific credentials used for validation
const configuredUsername = process.env.PHONEPE_WEBHOOK_USERNAME;
const configuredPassword = process.env.PHONEPE_WEBHOOK_PASSWORD;

let phonePeClientInstance;

try {
  phonePeClientInstance = StandardCheckoutClient.getInstance(
    clientId,
    clientSecret,
    clientVersion,
    env
  );
} catch (error) {
  console.error("PhonePe Client Initialization Error:", error);
}

/**
 * Helper function to get user-friendly error messages
 */
function getErrorMessage(errorCode) {
  const errorMessages = {
    'INVALID_MPIN': 'Invalid UPI PIN entered',
    'INSUFFICIENT_FUNDS': 'Insufficient balance in account',
    'TRANSACTION_TIMEOUT': 'Transaction timed out',
    'USER_DECLINED': 'Transaction declined by user',
    'BANK_ERROR': 'Bank server error',
    'INVALID_VPA': 'Invalid UPI ID',
    'TRANSACTION_LIMIT_EXCEEDED': 'Transaction limit exceeded',
    'ZM': 'Payment declined by bank',
  };
  
  return errorMessages[errorCode] || 'Payment failed';
}

/**
 * Next.js API Route Handler for PhonePe Webhooks.
 * Endpoint: /api/phonepe-webhook
 */
export async function POST(request) {
  if (!phonePeClientInstance) {
    console.error("Payment gateway client not initialized.");
    return new NextResponse('Internal Server Error: PG Client not initialized', { status: 500 });
  }

  // 1. Read Raw Body String
  const rawBodyString = await request.text();
console.log(rawBodyString,'rawBodyString')
  // 2. Get Authorization Header
  const receivedAuthHeader = request.headers.get('authorization');
console.log(receivedAuthHeader,"receivedAuthHeader")
  // Basic credential check
  if (!receivedAuthHeader || !configuredUsername || !configuredPassword) {
    console.error("Missing Auth Header or Server Credentials.");
    return new NextResponse('Unauthorized: Missing required configuration', { status: 401 });
  }

  let callbackResponse;
  try {
    // --- Step 3: Use SDK to Validate and Parse Callback ---
    callbackResponse = phonePeClientInstance.validateCallback(
      configuredUsername,
      configuredPassword,
      receivedAuthHeader,
      rawBodyString
    );

  } catch (error) {
    console.error('PhonePe Webhook Validation Failed:', error.message);
    return new NextResponse('Unauthorized: Invalid Callback Signature', { status: 401 });
  }
console.log(callbackResponse,"callbackResponse")
  // --- Step 4: Process Validated Payload and Update Database ---
  try {
    const event = callbackResponse.event || callbackResponse.type;
    const paymentData = callbackResponse.payload;

    // Key Data Points from SDK's validated payload
    const merchantOrderId = paymentData.merchantOrderId;
    const status = paymentData.state; // COMPLETED or FAILED
    const phonePeOrderId = paymentData.orderId;
    const amount = paymentData.amount; // Amount in paise
    const merchantId = paymentData.merchantId;
    const expireAt = paymentData.expireAt;
    
    // Error handling for failed payments
    const errorCode = paymentData.errorCode || null;
    const detailedErrorCode = paymentData.detailedErrorCode || null;
    
    // Extract payment details (PhonePe sends as array)
    const paymentDetails = paymentData.paymentDetails?.[0] || {};
    const transactionId = paymentDetails.transactionId;
    const paymentMode = paymentDetails.paymentMode;
    const timestamp = paymentDetails.timestamp;
    const payableAmount = paymentDetails.payableAmount;
    const feeAmount = paymentDetails.feeAmount;
    
    // For successful payments - rail info
    const utr = paymentDetails.rail?.utr || null;
    const vpa = paymentDetails.rail?.vpa || null;
    const umn = paymentDetails.rail?.umn || null;
    const paymentInstrument = paymentDetails.instrument || null;
    
    // For failed payments - error codes
    const paymentErrorCode = paymentDetails.errorCode || null;
    const paymentDetailedErrorCode = paymentDetails.detailedErrorCode || null;
    
    // Subscription-specific data (if present)
    const paymentFlow = paymentData.paymentFlow;
    const subscriptionId = paymentFlow?.subscriptionId || null;
    const merchantSubscriptionId = paymentFlow?.merchantSubscriptionId || null;

    if (!merchantOrderId) {
      console.error('Missing merchantOrderId in validated payload.');
      return new NextResponse('Missing merchantOrderId in payload.', { status: 400 });
    }

    console.log(`📥 Webhook received for Order: ${merchantOrderId}`);
    console.log(`Event Type: ${event}`);
    console.log(`Status: ${status}`);

    // Check if document exists in paymentInitiate collection
    const paymentDocRef = db.collection("paymentInitiate").doc(merchantOrderId);
    const paymentDoc = await paymentDocRef.get();

    if (!paymentDoc.exists) {
      console.error(`❌ Payment document not found for Order ID: ${merchantOrderId}`);
      return new NextResponse('Payment record not found.', { status: 404 });
    }

    // Prepare update data based on payment status
    const updateData = {
      status: status === 'COMPLETED' ? 'completed' : 'failed',
      phonePeOrderId: phonePeOrderId,
      merchantId: merchantId,
      transactionId: transactionId || null,
      paymentMode: paymentMode || null,
      timestamp: timestamp || null,
      payableAmount: payableAmount || null,
      feeAmount: feeAmount || null,
      webhookReceivedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      event: event,
      expireAt: expireAt || null,
    };

    // Add success-specific data
    if (status === 'COMPLETED') {
      updateData.utr = utr;
      updateData.vpa = vpa;
      updateData.umn = umn;
      updateData.paymentInstrument = paymentInstrument;
      updateData.paymentDetails = paymentDetails;
    }

    // Add failure-specific data
    if (status === 'FAILED') {
      updateData.errorCode = errorCode || paymentErrorCode;
      updateData.detailedErrorCode = detailedErrorCode || paymentDetailedErrorCode;
      updateData.errorMessage = getErrorMessage(errorCode || paymentErrorCode);
      updateData.failureReason = paymentDetails; // Store failed payment details
    }

    // Add subscription data if present
    if (subscriptionId) {
      updateData.subscriptionId = subscriptionId;
      updateData.merchantSubscriptionId = merchantSubscriptionId;
      updateData.paymentFlow = paymentFlow;
    }

    // Store complete raw webhook payload for debugging
    updateData.rawWebhookPayload = paymentData;

    // Update the payment document
    await paymentDocRef.update(updateData);

    // Get document data for post-processing
    const docData = paymentDoc.data();

    // Handle COMPLETED payments
    if (status === 'COMPLETED') {
      console.log(`✅ Payment COMPLETED for Order: ${merchantOrderId}`);
      console.log(`Transaction ID: ${transactionId}`);
      console.log(`PhonePe Order ID: ${phonePeOrderId}`);
      console.log(`Amount: ₹${amount / 100}`);
      console.log(`Payment Mode: ${paymentMode}`);
      if (utr) console.log(`UTR: ${utr}`);
      if (vpa) console.log(`VPA: ${vpa}`);
      
      // Add your success logic here
      if (docData.payFrom === 'agent') {
        console.log(`✅ Agent payment for Registration: ${docData.registrationNumber}`);
        // TODO: Create/update member record
        // TODO: Send confirmation to agent
        // TODO: Update agent's transaction history
      } else if (docData.payFrom === 'member') {
        console.log(`✅ Member payment for User ID: ${docData.userId}`);
        // TODO: Activate membership
        // TODO: Send confirmation email/SMS to member
        // TODO: Update member's payment history
      }
      
      // Handle subscription activation if applicable
      if (subscriptionId) {
        console.log(`📋 Subscription activated: ${subscriptionId}`);
        // TODO: Store subscription details
        // TODO: Schedule recurring payments if needed
      }
    }

    // Handle FAILED payments
    if (status === 'FAILED') {
      console.log(`❌ Payment FAILED for Order: ${merchantOrderId}`);
      console.log(`Error Code: ${errorCode || paymentErrorCode}`);
      console.log(`Detailed Error Code: ${detailedErrorCode || paymentDetailedErrorCode}`);
      console.log(`Error Message: ${getErrorMessage(errorCode || paymentErrorCode)}`);
      console.log(`Amount: ₹${amount / 100}`);
      console.log(`Payment Mode: ${paymentMode}`);
      
      // Add your failure logic here
      if (docData.payFrom === 'agent') {
        console.log(`❌ Agent payment failed for Registration: ${docData.registrationNumber}`);
        // TODO: Notify agent about failure
        // TODO: Suggest retry with correct details
      } else if (docData.payFrom === 'member') {
        console.log(`❌ Member payment failed for User ID: ${docData.userId}`);
        // TODO: Send failure notification to member
        // TODO: Provide retry option
      }
      
      // Log common failure reasons for analytics
      if (errorCode === 'INVALID_MPIN') {
        console.log(`ℹ️ User entered wrong UPI PIN`);
      } else if (errorCode === 'INSUFFICIENT_FUNDS') {
        console.log(`ℹ️ Insufficient balance in user's account`);
      }
    }

    // PhonePe expects a 200 OK response to acknowledge receipt
    return new NextResponse('Webhook Received and Processed Successfully', { status: 200 });

  } catch (error) {
    console.error("❌ Error processing validated webhook payload:", error);
    console.error(error.stack);
    
    // Return a 500 error, which might cause PhonePe to retry the webhook later
    return new NextResponse('Internal Server Error while processing webhook', { status: 500 });
  }
}