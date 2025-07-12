'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CheckCircleOutlined, LoadingOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Button, Typography, Space, Descriptions, Spin, Alert, Result } from 'antd';
import { contactData } from '../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  // const [user] = useAuthState(auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
  

    const fetchPaymentData = async () => {
      try {
        // Get encrypted data from URL params
        const encryptedData = searchParams.get('data');
        const transactionId = searchParams.get('id');
        
        if (!encryptedData && !transactionId) {
          throw new Error('Payment data not found');
        }

        let decodedData;
        
        if (encryptedData) {
          // Decode base64 encrypted data
          try {
            const decoded = atob(encryptedData);
            decodedData = JSON.parse(decoded);
          } catch (decodeError) {
            console.error('Error decoding payment data:', decodeError);
            throw new Error('Invalid payment data format');
          }
        } else if (transactionId) {
          // Fetch from your API endpoint
          const response = await fetch(`/api/payment/status?id=${transactionId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch payment status');
          }
          decodedData = await response.json();
        }

        setPaymentData(decodedData);
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [searchParams]);

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      transactionId: paymentData?.transactionId,
      amount: paymentData?.amount,
      timestamp: new Date().toISOString(),
      status: paymentData?.status
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `payment_receipt_${paymentData?.transactionId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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

  // if (!user) {
  //   return (
  //     <div style={{ 
  //       display: 'flex', 
  //       justifyContent: 'center', 
  //       alignItems: 'center', 
  //       minHeight: '100vh',
  //       backgroundColor: '#f0f2f5'
  //     }}>
  //       <Result
  //         status="warning"
  //         title="Authentication Required"
  //         subTitle="Please login to view your payment status"
  //         extra={
  //           <Button type="primary" onClick={() => router.push('/login')}>
  //             Login
  //           </Button>
  //         }
  //       />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <Result
          status="error"
          title="Payment Status Error"
          subTitle={error}
          extra={
            <Space>
              <Button type="primary" onClick={() => router.push('/')}>
                Go Home
              </Button>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </Space>
          }
        />
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

        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: 24
          }}
        >
          <Title level={4} style={{ marginBottom: 20 }}>
            Transaction Details
          </Title>
          
          <Descriptions 
            bordered 
            column={{ xs: 1, sm: 1 }}
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions.Item label="Transaction ID">
              <code style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '4px 8px', 
                borderRadius: 4,
                fontSize: 12
              }}>
                {paymentData?.transactionId || 'N/A'}
              </code>
            </Descriptions.Item>
            
            <Descriptions.Item label="Amount">
              <span style={{ fontSize: 16, fontWeight: 'bold', color: '#52c41a' }}>
                ₹{paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : 'N/A'}
              </span>
            </Descriptions.Item>
            
            <Descriptions.Item label="Payment Method">
              {paymentData?.paymentInstrument?.type || 
               paymentData?.paymentMode || 
               'N/A'}
            </Descriptions.Item>
            
            <Descriptions.Item label="Status">
              <span style={{ 
                color: paymentData?.status === 'COMPLETED' ? '#52c41a' : '#1890ff',
                fontWeight: 'bold'
              }}>
                {paymentData?.status || paymentData?.state || 'COMPLETED'}
              </span>
            </Descriptions.Item>
            
            <Descriptions.Item label="Order ID">
              {paymentData?.orderId || 'N/A'}
            </Descriptions.Item>
            
            <Descriptions.Item label="Payment Date">
              {paymentData?.paymentTimestamp ? 
                new Date(paymentData.paymentTimestamp).toLocaleString() : 
                new Date().toLocaleString()
              }
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}
        >
          <Title level={4} style={{ marginBottom: 20 }}>
            What's Next?
          </Title>
          
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph style={{ color: '#666', marginBottom: 20 }}>
              Your payment has been confirmed. You will receive a confirmation email shortly.
            </Paragraph>
            
            <Space size="middle" wrap>
              <Button 
                type="primary" 
                size="large"
                icon={<HomeOutlined />}
                onClick={handleContinueShopping}
                style={{
                  borderRadius: 8,
                  height: 48,
                  paddingLeft: 24,
                  paddingRight: 24
                }}
              >
                Go to Home
              </Button>
              
           
            </Space>
          </Space>
        </Card>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Paragraph style={{ color: '#666' }}>
            Need help? Contact our support team at {contactData.email[0].email}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;