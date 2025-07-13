import Pending from '@/components/screens/member-payment/Pending'
import React, { Suspense } from 'react'

const page = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
           <Pending/>
          </Suspense>
  )
}

export default page