'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { CreditCardOutlined, LoadingOutlined, ExclamationCircleOutlined, SafetyOutlined } from '@ant-design/icons';
import { Card, Typography, Spin, Button, Alert, Space } from 'antd';
import { contactData } from '../../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const decryptData = (encryptedData) => {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get('data');
  const decodedData = encodedData ? decryptData(encodedData) : null;
  
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  
  const apiCallMade = useRef(false);
  const countdownInterval = useRef(null);

  const getPayUrlFromBe = async () => {
    if (apiCallMade.current) return;
    apiCallMade.current = true;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/member-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decodedData),
      });
      
      const result = await response.json();
      
      // Check if response has url field
      if (result.success && result.url) {
        setPaymentUrl(result.url);
        setLoading(false);
        startCountdown(result.url);
      } else if (result.url) {
        // Even without success field, if url exists
        setPaymentUrl(result.url);
        setLoading(false);
        startCountdown(result.url);
      } else {
        throw new Error('No payment URL received');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to initialize payment');
      setLoading(false);
      apiCallMade.current = false;
    }
  };

  const startCountdown = (url) => {
    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval.current);
          window.location.href = url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRedirectNow = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
    }
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  useEffect(() => {
    if (!decodedData) {
      setError('Invalid payment data');
      setLoading(false);
      return;
    }

    getPayUrlFromBe();

    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <Card style={{ 
          textAlign: 'center', 
          minWidth: 320,
          borderRadius: 16,
          padding: 24
        }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#ff4d4f' }} spin />} />
          <Title level={4} style={{ marginTop: 24 }}>
            Initializing Payment
          </Title>
          <Paragraph style={{ color: '#666' }}>
            Please wait...
          </Paragraph>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card style={{ maxWidth: 500, textAlign: 'center', borderRadius: 16 }}>
          <ExclamationCircleOutlined style={{ fontSize: 64, color: '#ff4d4f', marginBottom: 24 }} />
          <Title level={3}>Payment Error</Title>
          <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
            {error}
          </Paragraph>
          <Space size="middle">
            <Button type="primary" size="large" onClick={() => {
              apiCallMade.current = false;
              setError(null);
              setLoading(true);
              getPayUrlFromBe();
            }}>
              Try Again
            </Button>
            <Button size="large" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </Space>
          <Paragraph style={{ color: '#666', marginTop: 24 }}>
            Need help? <strong>{contactData.email[0].email}</strong>
          </Paragraph>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        {/* Redirect Status */}
        <Card style={{
          borderRadius: 16,
          marginBottom: 24,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ff4d4f 0%, #16a085 100%)',
          color: 'white',
          padding: '40px 24px'
        }}>
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 56, color: 'white' }} spin />} 
            style={{ marginBottom: 24 }}
          />
          <Title level={2} style={{ color: 'white', marginBottom: 16 }}>
            Redirecting to Payment
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18 }}>
            Redirecting in <strong>{countdown}</strong> {countdown === 1 ? 'second' : 'seconds'}
          </Paragraph>
        </Card>

        {/* Info Card */}
        <Card style={{ borderRadius: 16, marginBottom: 24 }}>
          <Alert
            message="Secure Payment"
            description="You will be redirected to our secure payment gateway"
            type="info"
            showIcon
            icon={<SafetyOutlined />}
            style={{ marginBottom: 24 }}
          />
          
          <div style={{ textAlign: 'center' }}>
            <Button 
              type="primary" 
              size="large"
              onClick={handleRedirectNow}
              icon={<CreditCardOutlined />}
              style={{ 
                padding: '12px 48px',
                height: 'auto',
                fontSize: 16,
                borderRadius: 8
              }}
            >
              Proceed Now
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <Space size="middle">
            <Button type="link" onClick={() => window.history.back()}>
              ← Go Back
            </Button>
            <Paragraph style={{ marginBottom: 0 }}>
              Help: <strong>{contactData.email[0].email}</strong>
            </Paragraph>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;