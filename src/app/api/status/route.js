import axios from 'axios';
import { NextResponse } from 'next/server'
import { getAccessToken, sendDonationEmail } from '../common/CommonFun';
import { admin, db, FieldValue } from '../admin';
import { PHONEPE_CONFIG } from '../common/constent';
import { contactData } from '../../../../public/data/Constent';

const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`
const failureUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failure`
const  pendingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-pending`
// Utility function to encrypt data
const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString); // Base64 encoding
  } catch (error) {
    console.error('Error encrypting data:', error);
    return null;
  }
};

// Utility function to create URL with encrypted data
const createRedirectUrl = (baseUrl, data, isSuccess = true) => {
  const encryptedData = encryptData(data);
  const url = new URL(baseUrl);
  
  if (encryptedData) {
    url.searchParams.append('data', encryptedData);
  }
  
  // Add additional parameters for easier debugging
  if (data.transactionId) {
    url.searchParams.append('id', data.transactionId);
  }
  
  if (!isSuccess && data.errorCode) {
    url.searchParams.append('error', data.errorCode);
  }
  
  return url.toString();
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const merchantTransactionId = searchParams.get('id');
  if (!merchantTransactionId) {
    const errorData = {
      error: 'Missing transaction ID',
      errorCode: 'MISSING_ID',
      timestamp: new Date().toISOString()
    };
    
    const redirectUrl = createRedirectUrl(failureUrl, errorData, false);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
  console.log("call this pending",'checkPaymentStatus')
  console.log("Merchant Transaction ID:", merchantTransactionId);
  try {
    // 1️⃣ Get access token
    const access_token = await getAccessToken();
    if (!access_token) {
      throw new Error('Access token not received');
    }

    // 2️⃣ Check payment status
    const response = await axios.get(`${PHONEPE_CONFIG.STATUS_CHECK_URL}/${merchantTransactionId}/status`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${access_token}`,
      },
    });

    console.log("PhonePe status response:", response.data);

    const result = response.data;
    const payment = result.paymentDetails?.[0] || {};

    // 3️⃣ Prepare Firestore update data
    const updateData = {
      status: result.state,
      amount: result.amount,
      expireAt: result.expireAt || null,
      paymentMode: payment.paymentMode || null,
      transactionId: payment.transactionId || null,
      paymentTimestamp: payment.timestamp || null,
      paymentState: payment.state || null,
      paymentDetailsRaw: result.paymentDetails || [],
      responseCode: result.responseCode || null,
      responseCodeDescription: result.responseCodeDescription || null,
      updatedAt: FieldValue.serverTimestamp(),
    };

    // 4️⃣ Save to Firestore
    await db.collection("public_donations").doc(merchantTransactionId).update(updateData);

    // 5️⃣ Get donor details from Firestore
    const donorDoc = await db.collection("public_donations").doc(merchantTransactionId).get();
    const donorData = donorDoc.data();

    // 6️⃣ Prepare data for frontend
    const frontendData = {
      transactionId:  merchantTransactionId || payment.transactionId ,
      amount: result.amount,
      status: result.state,
      orderId: result.orderId || merchantTransactionId,
      paymentMode: payment.paymentMode || 'N/A',
      paymentTimestamp: payment.timestamp || new Date().toISOString(),
      paymentInstrument: payment.paymentInstrument || null,
      donorName: donorData?.name || 'N/A',
      donorEmail: donorData?.email || null,
      donorMobile: donorData?.mobileNumber || null,
      responseCode: result.responseCode || null,
      responseCodeDescription: result.responseCodeDescription || null,
      processedAt: new Date().toISOString()
    };

    // 7️⃣ Send email notification for successful payments
    if (result.state === "COMPLETED") {
      try {
        await sendDonationEmail({
          name: donorData?.name || 'Donor Name',
          mobileNumber: donorData?.mobileNumber || 'N/A',
          amount: result.amount / 100, // Convert from paise to rupees
          transactionId: payment.transactionId || merchantTransactionId,
          status: result.state,
          orderId: result.orderId || merchantTransactionId,
          paymentMode: payment.paymentMode || 'N/A',
          paymentTimestamp: payment.timestamp,
          toEmails: [...contactData.email.map(e => e.email), donorData?.email].filter(Boolean)
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the entire process if email fails
      }
    }

    // 8️⃣ Redirect based on status with encrypted data
    if (result.state === "COMPLETED") {
      const redirectUrl = createRedirectUrl(successUrl, frontendData, true);
      return NextResponse.redirect(redirectUrl, { status: 303 });
    } else if (result.state === "PENDING") {
      const redirectUrl = createRedirectUrl(pendingUrl, frontendData, 'pending');
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }
    else {
      // Handle failed payments
      const failureData = {
        ...frontendData,
        errorCode: result.responseCode || 'PAYMENT_FAILED',
        errorMessage: result.responseCodeDescription || 'Payment could not be processed'
      };
      
      const redirectUrl = createRedirectUrl(failureUrl, failureData, false);
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }

  } catch (error) {
    console.error('Status Check Error:', error?.response?.data || error.message);

    // Prepare error data for frontend
    const errorData = {
      transactionId: merchantTransactionId,
      errorCode: error?.response?.data?.code || 'NETWORK_ERROR',
      errorMessage: error?.response?.data?.message || error.message || 'Network error occurred',
      timestamp: new Date().toISOString()
    };

    try {
      // Update Firestore with error details
      await db.collection("public_donations").doc(merchantTransactionId).update({
        status: "ERROR",
        errorCode: errorData.errorCode,
        errorMessage: errorData.errorMessage,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (dbError) {
      console.error('Firestore update error:', dbError);
    }

    // Redirect to failure page with error data
    const redirectUrl = createRedirectUrl(failureUrl, errorData, false);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
}

// Optional: Add a separate endpoint to fetch payment status (for AJAX calls)
export async function POST(request) {
  try {
    const { transactionId } = await request.json();
    
    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    // Fetch from Firestore
    const doc = await db.collection("public_donations").doc(transactionId).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const data = doc.data();
    
    // Return sanitized data (no sensitive information)
    const responseData = {
      transactionId: data.transactionId || transactionId,
      amount: data.amount,
      status: data.status,
      paymentMode: data.paymentMode,
      paymentTimestamp: data.paymentTimestamp,
      orderId: data.orderId,
      responseCodeDescription: data.responseCodeDescription
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}