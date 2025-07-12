import { PHONEPE_CONFIG } from "./constent";
import qs from 'qs'; 
import axios from 'axios';
import nodemailer from 'nodemailer';
import { contactData } from "../../../../public/data/Constent";

export async function getAccessToken() {
  try {
    const tokenData = qs.stringify({
      grant_type: 'client_credentials',
      client_id: PHONEPE_CONFIG.CLIENT_ID,
      client_secret: PHONEPE_CONFIG.CLIENT_SECRET,
      client_version: PHONEPE_CONFIG.CLIENT_VERSION || '1',
    });

    const tokenRes = await axios.post(PHONEPE_CONFIG.AUTH_TOKEN_URL, tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const access_token = tokenRes.data.access_token;
    if (!access_token) throw new Error('Access token not received');
    
    return access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    throw new Error('Failed to get access token');
  }
}





export async function sendDonationEmail({ 
  name, 
  mobileNumber, 
  amount, 
  transactionId, 
  status, 
  orderId,
  paymentMode,
  paymentTimestamp,
  toEmails 
}) {
    console.log("Sending donation email with details:", {
      name,})
  try {

    // 1. Configure SMTP with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
      },
    });

    // 2. Enhanced Email HTML template
    const html = createDonationEmailTemplate({
      name,
      mobileNumber,
      amount,
      transactionId,
      status,
      orderId,
      paymentMode,
      paymentTimestamp
    });

    // 3. Email configuration
    const mailOptions = {
      from: `"${contactData.name}" <${process.env.SMTP_EMAIL}>`,
      to: toEmails.join(', '), // Convert array to comma-separated string
      subject: `Donation ${status} - ₹${amount} | ${contactData.name}`,
      html,
      replyTo: contactData.email[0].email,
    };

    // 4. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Donation email sent successfully:", info.messageId);
    console.log("📧 Email sent to:", toEmails);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send donation email:", error);
    return { success: false, error: error.message };
  }
}

function createDonationEmailTemplate({ 
  name, 
  mobileNumber, 
  amount, 
  transactionId, 
  status, 
  orderId,
  paymentMode,
  paymentTimestamp
}) {
  const isSuccess = status === 'COMPLETED';
  const statusColor = isSuccess ? '#28a745' : '#dc3545';
  const statusIcon = isSuccess ? '✅' : '❌';
  const formattedDate = paymentTimestamp ? 
    new Date(paymentTimestamp).toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    }) : 
    new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation ${status}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🙏 ${contactData.name}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Donation ${status} Notification</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
                
                <!-- Status Badge -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; background-color: ${statusColor}; color: white; padding: 12px 24px; border-radius: 25px; font-size: 18px; font-weight: bold;">
                        ${statusIcon} ${status}
                    </div>
                </div>

                <!-- Donation Details -->
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                    <h2 style="color: #333; margin-top: 0; margin-bottom: 20px; font-size: 22px;">💰 Donation Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Donor Name:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Mobile Number:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${mobileNumber}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Amount:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 20px;">₹${amount}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Transaction ID:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${transactionId || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Order ID:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${orderId}</td>
                        </tr>
                        ${paymentMode ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Payment Mode:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${paymentMode}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: 500;">Date & Time:</td>
                            <td style="padding: 8px 0; color: #333; font-weight: bold;">${formattedDate}</td>
                        </tr>
                    </table>
                </div>

                ${isSuccess ? `
                <!-- Success Message -->
                <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <h3 style="color: #155724; margin-top: 0;">🎉 Thank You for Your Generous Donation!</h3>
                    <p style="color: #155724; margin: 10px 0 0 0; line-height: 1.5;">
                        Your contribution of ₹${amount} has been successfully processed and will make a meaningful impact in the lives of those we serve. We are truly grateful for your support.
                    </p>
                </div>

                <!-- Tax Information -->
                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <h3 style="color: #856404; margin-top: 0;">📄 Tax Deduction Information</h3>
                    <p style="color: #856404; margin: 5px 0; line-height: 1.5;">
                        <strong>80G Certificate:</strong> Your donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. 
                        A digital receipt will be sent to you within 3-5 business days.
                    </p>
                    <p style="color: #856404; margin: 5px 0; line-height: 1.5;">
                        <strong>PAN Number:</strong> ${contactData.panNo}<br>
                        <strong>Registration Number:</strong> ${contactData.regNo}
                    </p>
                </div>
                ` : `
                <!-- Failure Message -->
                <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <h3 style="color: #721c24; margin-top: 0;">❌ Payment Processing Failed</h3>
                    <p style="color: #721c24; margin: 10px 0 0 0; line-height: 1.5;">
                        Unfortunately, your payment could not be processed. Please try again or contact our support team for assistance.
                    </p>
                </div>
                `}

                <!-- Contact Information -->
                <div style="background-color: #e9ecef; border-radius: 8px; padding: 20px;">
                    <h3 style="color: #333; margin-top: 0;">📞 Contact Information</h3>
                    <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${contactData.email[0].email}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>Phone:</strong> ${contactData.phoneNo[0].phoneNo}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>Website:</strong> <a href="${contactData.website}" style="color: #667eea;">${contactData.website}</a></p>
                    <p style="color: #666; margin: 5px 0; font-size: 14px;"><strong>Address:</strong> ${contactData.address[0].address}</p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; opacity: 0.8;">
                    © ${new Date().getFullYear()} ${contactData.name} | Reg. No: ${contactData.regNo}
                </p>
                <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
                    This is an automated email. Please do not reply to this email.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}
