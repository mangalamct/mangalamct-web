import Failure from '@/components/screens/member-payment/Failure'
import React, { Suspense } from 'react'

const page = () => {
  return (
     <Suspense fallback={<div>Loading...</div>}>
           <Failure/>
          </Suspense>
  )
}

export default page