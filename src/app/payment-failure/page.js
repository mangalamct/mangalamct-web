import PaymentFailure from '@/components/screens/PaymentFailure';
import React, { Suspense } from 'react';
const PaymentFailurePage = () => {
 
  return (
      <Suspense fallback={<div>Loading...</div>}>

        <PaymentFailure/>
      </Suspense>
  );
};

export default PaymentFailurePage;