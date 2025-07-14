import axios from 'axios';
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import dayjs from 'dayjs';
import { db } from '../admin';
import { getAccessToken } from '../common/CommonFun';
import { PHONEPE_CONFIG } from '../common/constent';

// Function to update transaction data (converted from your existing code)
async function updateTransactionData(paymentData, activeID) {
  if (paymentData.status !== 'COMPLETED') {
    console.log('Payment not completed, skipping transaction update');
    return false;
  }

  // Check if transaction already processed to prevent duplicates
  if (paymentData.transactionProcessed) {
    console.log('Transaction already processed, skipping');
    return true;
  }
    
  try {
    const transactionIds = [];
    
    for (const marriage of paymentData?.PendingPaymentMerriages || []) {
      const datePart = Date.now().toString().slice(-4);
      const transactionId = `TXN-${datePart}M${paymentData.id}`;
      
      const transactionData = {
        marriageId: marriage?.merriageId,
        memberId: paymentData.memberId,
        memberName: paymentData?.memberName,
        memberPhone: paymentData?.phone || 'N/A',
        amount: parseFloat(paymentData.payAmount),
        transactionId: paymentData.id,
        registrationNumber: paymentData?.registrationNumber || 'N/A',
        note: '',
        createdAt: FieldValue.serverTimestamp(),
        paymentDate: dayjs(new Date()).format('YYYY-MM-DD'),
        method: 'online',
        paidBy: 'agent',
        programId: paymentData?.programId || 'defaultProgramId',
        marriageMemberName: marriage?.name || 'Marriage Member',
        marriageMemberRegNo: marriage?.registrationNumber || 'N/A'
      };

      const combinedData = {
        ...transactionData,
        ...paymentData
      };

      // Handle program-specific collections for activeID
      if (paymentData?.programId === activeID) {
        await processActiveProgramTransaction(transactionId, transactionData, combinedData, marriage, paymentData, activeID);
      } else {
        await processRegularTransaction(transactionId, transactionData, combinedData, marriage, paymentData);
      }
      
      transactionIds.push(transactionId);
    }
    
    // Mark payment as processed to prevent duplicate transactions
    await db.collection('paymentInitiate').doc(paymentData.id).update({
      transactionProcessed: true,
      transactionIds: transactionIds,
      processedAt: FieldValue.serverTimestamp()
    });
    
    console.log("Transaction data updated successfully");
    return true;
  } catch (error) {
    console.error('Error updating transaction data:', error);
    throw error;
  }
}

async function processActiveProgramTransaction(transactionId, transactionData, combinedData, marriage, paymentData, activeID) {
  // Add to program-specific transactions collection
  await db.collection('programs').doc(activeID).collection('transactions').doc(transactionId).set(combinedData);

  // Add to program-specific member's donations subcollection
  await db.collection('programs').doc(activeID).collection('members').doc(paymentData.memberId).collection('donations').doc(transactionId).set(combinedData);

  // Update program-specific marriage document
  const programMarriageRef = db.collection('programs').doc(activeID).collection('marriages').doc(marriage?.merriageId);
  const marriageDoc = await programMarriageRef.get();
  
  if (marriageDoc.exists) {
    const currentDonation = marriageDoc.data().donationAmount || 0;
    await programMarriageRef.set({
      ...marriageDoc.data(),
      donationAmount: currentDonation + parseFloat(paymentData.payAmount)
    }, { merge: true });

    // Add to program-specific marriage's donationDetails subcollection
    const donationDetailsRef = db.collection('programs').doc(activeID).collection('marriages').doc(marriage?.merriageId).collection('donationDetails').doc();
    await donationDetailsRef.set({
      memberId: paymentData.memberId,
      agentId: paymentData.agentId,
      amount: parseFloat(paymentData.payAmount),
      isCompleted: true,
      transactionId: transactionId,
      createdAt: FieldValue.serverTimestamp(),
      paymentDate: dayjs(new Date()).format('YYYY-MM-DD'),
      programId: activeID
    });
  }
}

async function processRegularTransaction(transactionId, transactionData, combinedData, marriage, paymentData) {
  // Add to main transactions collection
  await db.collection('transactions').doc(transactionId).set(combinedData);

  // Add to main member's donations subcollection
  await db.collection('members').doc(paymentData.memberId).collection('donations').doc(transactionId).set(transactionData);

  // Update main marriage document
  const marriageRef = db.collection('marriages').doc(marriage?.merriageId);
  const marriageDoc = await marriageRef.get();
  
  if (marriageDoc.exists) {
    const currentDonation = marriageDoc.data().donationAmount || 0;
    await marriageRef.set({
      ...marriageDoc.data(),
      donationAmount: currentDonation + parseFloat(paymentData.payAmount)
    }, { merge: true });

    // Add to main marriage's donationDetails subcollection
    const donationDetailsRef = db.collection('marriages').doc(marriage?.merriageId).collection('donationDetails').doc();
    await donationDetailsRef.set({
      memberId: paymentData.memberId,
      agentId: paymentData.agentId,
      amount: parseFloat(paymentData.payAmount),
      isCompleted: true,
      transactionId: transactionId,
      createdAt: FieldValue.serverTimestamp(),
      paymentDate: dayjs(new Date()).format('YYYY-MM-DD')
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { merchantTransactionId, activeID } = body;

    // Validate required parameters
    if (!merchantTransactionId) {
      return NextResponse.json({ 
        error: 'Transaction ID is required' 
      }, { status: 400 });
    }

    console.log(`Processing payment status update for transaction: ${merchantTransactionId}`);

    // 1️⃣ Get PhonePe Access Token
    console.log('Getting PhonePe access token...');
    const access_token = await getAccessToken();
    if (!access_token) {
      throw new Error('Access token not received');
    }

    // 2️⃣ Call PhonePe API to check payment status
    console.log('Checking payment status with PhonePe...');
    const response = await axios.get(
      `${PHONEPE_CONFIG.STATUS_CHECK_URL}/${merchantTransactionId}/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `O-Bearer ${access_token}`,
        },
      }
    );

    console.log("PhonePe status response:", response.data);

    const result = response.data;
 

    const payment = result.paymentDetails?.[0] || {};

    // 3️⃣ Build update payload
    const updateData = {
      status: result.state,
      amount: result.amount / 100,
      expireAt: result.expireAt || null,
      paymentMode: payment.paymentMode || null,
      transactionId: payment.transactionId || null,
      paymentTimestamp: payment.timestamp || null,
      paymentState: payment.state || null,
      paymentDetailsRaw: result.paymentDetails || [],
      responseCode: result.responseCode || null,
      responseCodeDescription: result.responseCodeDescription || null,
      updatedAt: FieldValue.serverTimestamp(),
      lastStatusCheck: FieldValue.serverTimestamp()
    };

    // 4️⃣ Update the document in Firestore
    const paymentDocRef = db.collection('paymentInitiate').doc(merchantTransactionId);
    await paymentDocRef.update(updateData);

    console.log('Payment status updated in Firestore');

    // 5️⃣ Get updated payment data for transaction processing
    const updatedPaymentDoc = await paymentDocRef.get();
    if (!updatedPaymentDoc.exists) {
      return NextResponse.json({ 
        error: 'Payment document not found' 
      }, { status: 404 });
    }

    const updatedPaymentData = {
      id: merchantTransactionId,
      ...updatedPaymentDoc.data()
    };

    // 6️⃣ If payment is completed, update transaction data
    let transactionUpdated = false;
    if (result.state === 'COMPLETED') {
      console.log('Payment completed, updating transaction data...');
      transactionUpdated = await updateTransactionData(updatedPaymentData, activeID);
    }

    // 7️⃣ Return success response
    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully',
      data: {
        transactionId: merchantTransactionId,
        status: result.state,
        amount: result.amount / 100,
        paymentMode: payment.paymentMode,
        transactionCompleted: result.state === 'COMPLETED',
        transactionProcessed: transactionUpdated,
        responseCode: result.responseCode,
        responseCodeDescription: result.responseCodeDescription,
        lastUpdated: new Date().toISOString()
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error in payment status update:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      return NextResponse.json({ 
        error: 'Unauthorized - Invalid access token',
        details: error.response.data 
      }, { status: 401 });
    }
    
    if (error.response?.status === 404) {
      return NextResponse.json({ 
        error: 'Transaction not found in PhonePe system',
        details: error.response.data 
      }, { status: 404 });
    }

    if (error.response?.status === 429) {
      return NextResponse.json({ 
        error: 'Too many requests - Please try again later',
        details: 'Rate limit exceeded' 
      }, { status: 429 });
    }

    // Handle network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json({ 
        error: 'Network error - Unable to connect to PhonePe',
        details: error.message 
      }, { status: 503 });
    }

    // Handle Firebase errors
    if (error.code && error.code.startsWith('firestore/')) {
      return NextResponse.json({ 
        error: 'Database error',
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Optional: Add GET method for health check
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (transactionId) {
      // Return status of specific transaction
      const paymentDoc = await db.collection('paymentInitiate').doc(transactionId).get();
      
      if (!paymentDoc.exists) {
        return NextResponse.json({ 
          error: 'Transaction not found' 
        }, { status: 404 });
      }

      const paymentData = paymentDoc.data();
      
      return NextResponse.json({
        success: true,
        data: {
          transactionId: transactionId,
          status: paymentData.status,
          amount: paymentData.amount || paymentData.payAmount,
          paymentMode: paymentData.paymentMode,
          transactionProcessed: paymentData.transactionProcessed || false,
          lastUpdated: paymentData.updatedAt || paymentData.createdAt,
          createdAt: paymentData.createdAt
        }
      });
    }

    // Health check response
    return NextResponse.json({ 
      success: true,
      message: 'Payment status update API is running',
      endpoints: {
        POST: '/api/update-payment-status - Update payment status from PhonePe',
        GET: '/api/update-payment-status?transactionId=xxx - Get transaction status'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}