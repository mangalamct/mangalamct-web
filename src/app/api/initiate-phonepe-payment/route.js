import { NextResponse } from 'next/server'
import axios from 'axios' 
import { PHONEPE_CONFIG } from '../common/constent';
import { getAccessToken } from '../common/CommonFun';
import { admin, db, FieldValue } from '../admin';


export async function POST(request) {
  try {
    const body = await request.json();
    const { name, mobileNumber,email, amount,address,city,state,pincode,panNo } = body;
    const orderId = 'T' + Date.now() + 'D' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const access_token =await getAccessToken()
    if (!access_token) throw new Error('No access token received');

    // Step 2: Prepare Payment Payload
    const collectPayload = {
      merchantOrderId: orderId,
      amount: amount * 100,
      expireAfter: 1200,
      metaInfo: {
       
      },
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment message used for collect requests",
        merchantUrls: {
         redirectUrl: `${PHONEPE_CONFIG.REDIRECT_URL}?id=${orderId}`,
        }
      }
    };

    // Step 3: Call Collect API
    const collectRes = await axios.post(
     PHONEPE_CONFIG.CREATE_ORDER_URL,
      collectPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `O-Bearer ${access_token}`
        }
      }

    );
    const redirectUrl = collectRes.data?.redirectUrl;
    if (!redirectUrl) throw new Error('Redirect URL missing in collect response');
   await db.collection("public_donations").doc(orderId).set({
  name,
  mobileNumber,
  amount,
  email,
  address,
  city,
  state,
  pincode,
  panNo,
  orderId,
  status: 'initiated',
  createdAt: FieldValue.serverTimestamp(),
});
    // Optional: Save transaction to Firebase here

    return NextResponse.json({ msg: "OK", url: redirectUrl }, { status: 200 });

  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json({ error: "Failed to initiate payment", details: error.message }, { status: 500 });
  }
}

