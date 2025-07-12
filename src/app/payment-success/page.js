import React, { Suspense } from 'react';
import PaymentSuccess from "@/components/screens/PaymentSuccess";

const PaymentSuccessPage = () => {
 
  return (
     <Suspense fallback={<div>Loading...</div>}>
    
   <PaymentSuccess/>
      </Suspense>
  );
};

export default PaymentSuccessPage;