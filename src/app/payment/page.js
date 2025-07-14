import PaymentPage from '@/components/screens/member-payment/PaymentPage'
import React, { Suspense } from 'react'

const page = ({params}) => {

  return (
  <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage/>
        </Suspense>
  )
}

export default page