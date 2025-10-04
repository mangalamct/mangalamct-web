import axios from 'axios';
import { NextResponse } from 'next/server'
import { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest } from 'pg-sdk-node';

import { getAccessToken, sendDonationEmail } from '../common/CommonFun';
import { admin, db, FieldValue } from '../admin';
import { PHONEPE_CONFIG } from '../common/constent';
import { contactData } from '../../../../public/data/Constent';
import { doc, updateDoc } from 'firebase/firestore';

const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
const failureUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
const  pendingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
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


// Retrieve configuration securely from environment variables
const clientId = process.env.PHONE_PAY_CLIENT_ID;
const clientSecret = process.env.PHONE_PAY_CLIENT_SECRET;
// Ensure clientVersion is parsed as a number if stored as a string
const clientVersion = parseInt(process.env.PHONE_PAY_CLIENT_VERSION || '1', 10);
const env = process.env.PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;
// Initialize the client once and reuse the instance (Singleton Pattern)
let phonePeClientInstance;

try {
    // StandardCheckoutClient.getInstance ensures only one client is initialized
    phonePeClientInstance = StandardCheckoutClient.getInstance(
        clientId,
        clientSecret,
        clientVersion,
        env
    );
} catch (error) {
    console.error("PhonePe Client Initialization Error:", error);
    // Note: In a real app, you might crash the process here if config is mandatory
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
 

  const merchantTransactionId = searchParams.get('id');
    if (!phonePeClientInstance) {
        return NextResponse.json(
            { success: false, message: 'Payment gateway configuration error.' },
            { status: 500 }
        );
    }
  if (!merchantTransactionId) {
    const errorData = {
      error: 'Missing transaction ID',
      errorCode: 'MISSING_ID',
      timestamp: new Date().toISOString(),
    };
    const redirectUrl = createRedirectUrl(failureUrl, errorData, false);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  console.log("Checking Payment Status for ID:", merchantTransactionId);

  try {

    // 2️⃣ Call PhonePe API
  const response= await phonePeClientInstance.getOrderStatus(merchantTransactionId)


    console.log("PhonePe status response lalit:", response);

    const result = response;
    const payment = result.paymentDetails?.[0] || {};

    // 3️⃣ Build update payload
    const updateData = {
      status: result.state,
      amount: result.amount/100,
      expireAt: result.expireAt || null,
      paymentMode: payment.paymentMode || null,
      transactionId: payment.transactionId || null,
      paymentTimestamp: payment.timestamp || null,
      paymentState: payment.state || null,
      paymentDetailsRaw: result.paymentDetails || [],
      responseCode: result.responseCode || null,
      responseCodeDescription: result.responseCodeDescription || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 4️⃣ Reference the document in Firestore
    const paymentDocRef = db.collection('paymentInitiate').doc(merchantTransactionId);

    // 5️⃣ Update Firestore and decide redirect
    if (result.state === "COMPLETED") {
      await paymentDocRef.update(updateData);

      const redirectUrl = createRedirectUrl(successUrl, {
        ...result,
        transactionId: merchantTransactionId || payment.transactionId,
      }, true);

      return NextResponse.redirect(redirectUrl, { status: 303 });

    } else if (result.state === "PENDING") {
      await paymentDocRef.update(updateData);

      const redirectUrl = createRedirectUrl(pendingUrl, {
        ...result,
        transactionId: merchantTransactionId || payment.transactionId,
      }, 'pending');

      return NextResponse.redirect(redirectUrl, { status: 303 });

    } else {
      // FAILED or other state
      const failureData = {
        ...updateData,
         transactionId: merchantTransactionId || payment.transactionId,
        errorCode: result.responseCode || 'PAYMENT_FAILED',
        errorMessage: result.responseCodeDescription || 'Payment could not be processed',
      };

      await paymentDocRef.update(failureData);
      const redirectUrl = createRedirectUrl(failureUrl, failureData, false);
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }

  } catch (error) {
    console.error('Status Check Error:', error?.response?.data || error.message);

    const errorData = {
      transactionId: merchantTransactionId,
      errorCode: error?.response?.data?.code || 'NETWORK_ERROR',
      errorMessage: error?.response?.data?.message || error.message || 'Network error occurred',
      timestamp: new Date().toISOString(),
    };

    try {
      // Optionally log error to Firestore
      await db.collection('paymentInitiate').doc(merchantTransactionId).update({
        status: 'ERROR',
        errorCode: errorData.errorCode,
        errorMessage: errorData.errorMessage,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (dbError) {
      console.error('Firestore update error:', dbError);
    }

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
    const doc = await db.collection("paymentInitiate").doc(transactionId).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const data = doc.data();

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}