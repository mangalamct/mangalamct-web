'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CreditCardOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Spin, Button, Alert } from 'antd';
import { contactData } from '../../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const encodedUrl = searchParams.get('url');
  const decodedUrl = encodedUrl ? decodeURIComponent(encodedUrl) : '';
  
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate URL
    if (!decodedUrl) {
      setError('No payment URL provided');
      setLoading(false);
      return;
    }

    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      startCountdown();
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, [decodedUrl]);

  const startCountdown = () => {
    setRedirecting(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 500);
  };

  const handleRedirect = () => {
    if (decodedUrl) {
      try {
        window.location.href = decodedUrl;
      } catch (err) {
        setError('Failed to redirect to payment gateway');
        setRedirecting(false);
      }
    }
  };

  const handleManualRedirect = () => {
    setRedirecting(true);
    setCountdown(0);
    handleRedirect();
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
            Preparing payment gateway...
          </Paragraph>
        </Card>
      </div>
    );
  }

  if (error) {
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
              background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
              color: 'white',
              marginBottom: 24
            }}
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <ExclamationCircleOutlined 
                style={{ 
                  fontSize: 72, 
                  color: '#fff',
                  marginBottom: 16
                }} 
              />
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                Payment Error
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
                {error}
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
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
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
            {redirecting ? (
              <Spin 
                indicator={<LoadingOutlined style={{ fontSize: 48, color: 'white' }} spin />} 
                style={{ marginBottom: 16 }}
              />
            ) : (
              <CreditCardOutlined 
                style={{ 
                  fontSize: 72, 
                  color: '#52c41a',
                  marginBottom: 16
                }} 
              />
            )}
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              {redirecting ? 'Redirecting to Payment Gateway' : 'Payment Gateway Ready'}
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
              {redirecting 
                ? `Redirecting in ${countdown} seconds...` 
                : 'Click the button below to proceed to payment'
              }
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
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Payment Information
            </Title>
            <Paragraph style={{ color: '#666', marginBottom: 8 }}>
              You will be redirected to our secure payment gateway
            </Paragraph>
            <Paragraph style={{ color: '#666', marginBottom: 24 }}>
              <strong>Payment URL:</strong> {decodedUrl.length > 50 ? `${decodedUrl.substring(0, 50)}...` : decodedUrl}
            </Paragraph>
            
            <Alert
              message="Secure Payment"
              description="Your payment information is processed securely through our trusted payment gateway"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            {!redirecting && (
              <Button 
                type="primary" 
                size="large"
                onClick={handleManualRedirect}
                style={{ 
                  padding: '12px 40px',
                  height: 'auto',
                  fontSize: 16,
                  borderRadius: 8
                }}
              >
                Proceed to Payment
              </Button>
            )}
          </div>
        </Card>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Paragraph style={{ color: '#666' }}>
            Need help? Contact our support team at {contactData.email[0].email}
          </Paragraph>
          <Button 
            type="default" 
            style={{ marginTop: 16 }} 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;