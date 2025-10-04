'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card, Typography,  Spin, Button } from 'antd';
import { contactData } from '../../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const Success = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  // const [user] = useAuthState(auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {

    setTimeout(() => {
        window.location.href = `mangalamct:///screens/members/PaymentStatusScreen?status=success&id=${searchParams.get('id')}`;
      }, 5000);
    // fetchPaymentData();
  }, [searchParams]);

  const handleContinueShopping = () => {
    router.push('/');
  };
const handleGoBack = () => {
  const transactionId = searchParams.get('id');
  window.location.href = `mangalamct:///screens/members/PaymentStatusScreen/?status=success&id=${transactionId}`;
};

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <Card style={{ textAlign: 'center', minWidth: 300 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <Paragraph style={{ marginTop: 16 }}>
            Verifying payment status...
          </Paragraph>
        </Card>
      </div>
    );
  }

 

  return (
    <div style={{ 
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: 1000, 
        margin: '0 auto',
        paddingTop: '40px'
      }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            color: 'white',
            marginBottom: 24
          }}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircleOutlined 
              style={{ 
                fontSize: 72, 
                color: '#52c41a',
                marginBottom: 16
              }} 
            />
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              Payment Successful!
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
              Your payment has been processed successfully
            </Paragraph>
          </div>
        </Card>

     
   <div style={{ textAlign: 'center', marginTop: 24 }}>
  <Paragraph style={{ color: '#666' }}>
    Need help? Contact our support team at {contactData.email[0].email}
  </Paragraph>
  <Button 
    type="primary" 
    style={{ marginTop: 16 }} 
    onClick={handleGoBack}
  >
    Go Back to App
  </Button>
</div>
      </div>
    </div>
  );
};

export default Success