'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Button, Typography, Space, Descriptions, Alert, Progress } from 'antd';
import { LoadingOutlined, HomeOutlined, ReloadOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PHONEPE_CONFIG } from '../api/common/constent';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const PaymentPendingPage = () => {
  const [pendingData, setPendingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        const encryptedData = searchParams.get('data');
        const transactionId = searchParams.get('id');

        let decodedData = null;

        if (encryptedData) {
          try {
            const decoded = atob(encryptedData);
            decodedData = JSON.parse(decoded);
          } catch (decodeError) {
            console.error('Error decoding pending data:', decodeError);
          }
        }

        setPendingData({
          transactionId,
          ...decodedData
        });

        // Calculate time left if expireAt is available
        if (decodedData?.expireAt) {
          const expireTime = new Date(decodedData.expireAt);
          const now = new Date();
          const timeDiff = expireTime.getTime() - now.getTime();
          
          if (timeDiff > 0) {
            setTimeLeft(Math.floor(timeDiff / 1000)); // Convert to seconds
          }
        }
      } catch (error) {
        console.error('Error processing pending data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingData();
  }, [searchParams]);

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      checkPaymentStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Countdown timer
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setAutoRefresh(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const checkPaymentStatus = async () => {
  if (!pendingData?.transactionId) return;

  console.log(pendingData, 'pendingData');

  try {
    const response = await axios.get(`${PHONEPE_CONFIG.REDIRECT_URL}?id=${pendingData.transactionId}`);
    
    console.log(response, 'response');
    console.log(response.data, 'statusData');

    if (response.status === 200) {
      // Open the URL if it's returned from the server (if applicable)
      if (response.request?.responseURL) {
        // window.open(response.request.responseURL, '_blank');
      }
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
  }
};

  const handleRefresh = () => {
    checkPaymentStatus();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleStopWaiting = () => {
    setAutoRefresh(false);
    router.push('/');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
          <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />
          <Paragraph style={{ marginTop: 16 }}>
            Loading payment details...
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
        maxWidth: 800, 
        margin: '0 auto',
        paddingTop: '40px'
      }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffa940 0%, #fa8c16 100%)',
            color: 'white',
            marginBottom: 24
          }}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <LoadingOutlined 
              style={{ 
                fontSize: 72, 
                color: '#faad14',
                marginBottom: 16
              }} 
              spin
            />
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              Payment Processing
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
              Please wait while we process your payment
            </Paragraph>
            
            {timeLeft > 0 && (
              <div style={{ marginTop: 16 }}>
                <Progress 
                  percent={Math.max(0, ((timeLeft / 900) * 100))} // Assuming 15 minutes max
                  showInfo={false}
                  strokeColor="#faad14"
                  trailColor="rgba(255,255,255,0.3)"
                />
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                  Time remaining: {formatTime(timeLeft)}
                </Paragraph>
              </div>
            )}
          </div>
        </Card>

        <Alert
          message="Payment in Progress"
          description={
            <div>
              <p>Your payment is currently being processed. This may take a few minutes.</p>
              {pendingData?.paymentMode === 'UPI_COLLECT' && (
                <p><strong>UPI Collect:</strong> Please check your UPI app and approve the payment request.</p>
              )}
              <p>We'll automatically check the status every 30 seconds.</p>
            </div>
          }
          type="warning"
          showIcon
          style={{ marginBottom: 24, borderRadius: 8 }}
        />

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
            column={{ xs: 1, sm: 1, md: 2 }}
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions.Item label="Transaction ID">
              <code style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '4px 8px', 
                borderRadius: 4,
                fontSize: 12
              }}>
                {pendingData?.transactionId || 'N/A'}
              </code>
            </Descriptions.Item>
            
            <Descriptions.Item label="Amount">
              <span style={{ fontSize: 16, fontWeight: 'bold', color: '#faad14' }}>
                ₹{pendingData?.amount ? (pendingData.amount / 100).toFixed(2) : 'N/A'}
              </span>
            </Descriptions.Item>
            
            <Descriptions.Item label="Payment Method">
              {pendingData?.paymentMode || 'N/A'}
            </Descriptions.Item>
            
            <Descriptions.Item label="Status">
              <span style={{ color: '#faad14', fontWeight: 'bold' }}>
                PENDING
              </span>
            </Descriptions.Item>
            
            <Descriptions.Item label="Order ID">
              {pendingData?.orderId || 'N/A'}
            </Descriptions.Item>
            
            <Descriptions.Item label="Initiated At">
              {pendingData?.paymentTimestamp ? 
                new Date(pendingData.paymentTimestamp).toLocaleString() : 
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
            What's Happening?
          </Title>
          
          <div style={{ marginBottom: 24 }}>
            <Space direction="vertical" size="middle">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ClockCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
                <span>Processing your payment request...</span>
              </div>
              
              {autoRefresh && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LoadingOutlined style={{ color: '#1890ff', marginRight: 8 }} spin />
                  <span>Auto-refreshing status every 30 seconds</span>
                </div>
              )}
            </Space>
          </div>
          
          <Space size="middle" wrap>
            <Button 
              type="primary" 
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              style={{
                borderRadius: 8,
                height: 48,
                paddingLeft: 24,
                paddingRight: 24
              }}
            >
              Check Status Now
            </Button>
            
            <Button 
              size="large"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              style={{
                borderRadius: 8,
                height: 48,
                paddingLeft: 24,
                paddingRight: 24
              }}
            >
              Go to Home
            </Button>
            
            <Button 
              type="dashed"
              size="large"
              onClick={handleStopWaiting}
              style={{
                borderRadius: 8,
                height: 48,
                paddingLeft: 24,
                paddingRight: 24
              }}
            >
              Stop Waiting
            </Button>
          </Space>
        </Card>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Paragraph style={{ color: '#666' }}>
            Payment taking too long? Contact support at <strong>support@example.com</strong>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PaymentPendingPage;