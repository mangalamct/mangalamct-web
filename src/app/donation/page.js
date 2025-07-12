import DonationPage from '@/components/screens/DonationPage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    
          <Suspense fallback={<div>Loading...</div>}>
    
        <DonationPage/>
    </Suspense>
  )
}

export default page