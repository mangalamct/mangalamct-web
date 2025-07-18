export const PHONEPE_CONFIG = {
  AUTH_TOKEN_URL: process.env.NEXT_PUBLIC_PHONE_PAY_AUTH_TOKEN_API,
  CREATE_ORDER_URL: process.env.NEXT_PUBLIC_PHONE_PAY_CREATE_ORDER_URL,
  STATUS_CHECK_URL: process.env.NEXT_PUBLIC_PHONE_PAY_STATUS_CHECK_URL,
  REFUND_URL: process.env.NEXT_PUBLIC_PHONE_PAY_REFUND_URL,
  REFUND_STATUS_URL: process.env.NEXT_PUBLIC_PHONE_PAY_REFUND_STATUS_URL,
  MERCHANT_ID:process.env.NEXT_PUBLIC_PHONE_PAY_MERCHANT_ID,
  MERCHANT_KEY: '',
  CLIENT_ID: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET,
  REDIRECT_URL:process.env.NEXT_PUBLIC_BASE_URL + '/api/status/',
  CLIENT_VERSION: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_VERSION || '1',
}