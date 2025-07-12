import React, { Suspense } from 'react';
import PaymentPending from "@/components/screens/PaymentPending";

const PaymentPendingPage = () => {
 
  return (
     <Suspense fallback={<div>Loading...</div>}>
    
    <PaymentPending/>

    </Suspense>
  );
};

export default PaymentPendingPage;