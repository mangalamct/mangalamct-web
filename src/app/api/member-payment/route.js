import { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { admin, db, FieldValue } from '../admin';
// --- Configuration Setup (using environment variables) ---

// Retrieve configuration securely from environment variables
const clientId = process.env.PHONE_PAY_CLIENT_ID;
const clientSecret = process.env.PHONE_PAY_CLIENT_SECRET;
// Ensure clientVersion is parsed as a number if stored as a string
const clientVersion = parseInt(process.env.PHONE_PAY_CLIENT_VERSION || '1', 10);
const env = process.env.PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;
const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-status`;
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


/**
 * Next.js API Route POST handler for initiating a PhonePe payment.
 * Endpoint: /api/phonepe/initiate
 * @param {Request} req - The Next.js request object
 * @returns {NextResponse} - JSON response containing the PhonePe checkout URL or an error.
 */
export async function POST(req) {
    if (!phonePeClientInstance) {
        return NextResponse.json(
            { success: false, message: 'Payment gateway configuration error.' },
            { status: 500 }
        );
    }
    
    try {
        // 1. Parse the request body (e.g., get amount or product info from the frontend)
        const { amount,memberData,payFrom,userId,transactionId,programId } = await req.json();

        if (!amount || amount <= 0) {
             return NextResponse.json(
                { success: false, message: 'Invalid amount specified.' },
                { status: 400 }
            );
        }
        
        // Convert the amount to the smallest denomination (Paise)
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        // 2. Generate a unique Merchant Order ID
        const merchantOrderId =transactionId
        
        // The final redirect URL where the user lands after payment
        // We append the order ID to fetch status securely later
        // const redirectUrl = `${redirectBaseUrl}?orderId=${merchantOrderId}`;

        // 3. Optional Metadata (as in your original snippet)
        const metaInfo = MetaInfo.builder()
            .udf1(userId)
            .udf2(payFrom).udf3(programId)
            .build();

        // 4. Build the Payment Request
        const request = StandardCheckoutPayRequest.builder()
            .merchantOrderId(merchantOrderId)
            .amount(amountInPaise) // Amount in paise
            .redirectUrl(redirectUrl+`?id=${merchantOrderId}&programId=${programId}`)
            .metaInfo(metaInfo)
            .build();

        // 5. Call the PhonePe Pay API
        console.log(`Initiating payment for Order: ${merchantOrderId}`);
        const response = await phonePeClientInstance.pay(request);

        // 6. Return the redirect URL to the frontend
        if (response && response.redirectUrl) {
            // In a real application, save the order details (including merchantOrderId) to your database here
            // await saveOrderToDB({ merchantOrderId, amountInPaise, status: 'PENDING' });
             if(payFrom==='agent'){
    await db.collection("paymentInitiate").doc(merchantOrderId).set({
...memberData,
registrationNumber:memberData?.memberRegNo || 'N/A',
 amount:amount,
 payFrom:'agent',
  orderId,
  transactionProcessed:false,
  status: 'initiated',
  createdAt: FieldValue.serverTimestamp(),
});
    }else{
   
await db
  .collection("programs")
  .doc(programId)
  .collection("paymentInitiate")
  .doc(merchantOrderId)
  .set({
    userId: userId,
    memberData: memberData,
    programId: programId,
    amount: amount,
    payFrom: 'member',
    transactionProcessed: false,
    orderId: merchantOrderId,
    status: 'initiated',
    createdAt: FieldValue.serverTimestamp(),
  });
    }
            return NextResponse.json({
                success: true,
                msg: "OK", 
                url: response.redirectUrl,
                merchantOrderId: merchantOrderId,
            });
        } else {
             // Handle case where pay() succeeds but doesn't return a redirect URL (shouldn't happen with Standard Checkout)
             return NextResponse.json(
                { success: false, message: 'Failed to retrieve checkout URL.' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('PhonePe Payment Initiation Failed:', error);
        
        // Handle specific PhonePe SDK exceptions if necessary, otherwise return a generic error
        return NextResponse.json(
            { success: false, message: 'Payment initiation failed due to a server error.' },
            { status: 500 }
        );
    }
}
