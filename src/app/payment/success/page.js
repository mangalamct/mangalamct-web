import Success from '@/components/screens/member-payment/Success'
import React, { Suspense } from 'react'

const page = () => {
  return (
          <Suspense fallback={<div>Loading...</div>}>
       <Success/>
      </Suspense>
  )
}

export default page