'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result, Button, Typography, Space, Card, Alert, Descriptions } from 'antd';
import { CloseCircleOutlined, HomeOutlined, ReloadOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { contactData } from '../../../public/data/Constent';
const { Title, Paragraph } = Typography;

const PaymentFailure = () => {
      const [failureData, setFailureData] = useState(null);
      const [loading, setLoading] = useState(true);
      const router = useRouter();
      const searchParams = useSearchParams();
    
      useEffect(() => {
        // Get failure data from URL params
        const fetchFailureData = async () => {
          try {
            const encryptedData = searchParams.get('data');
            const transactionId = searchParams.get('id');
            const errorCode = searchParams.get('error');
            const errorMessage = searchParams.get('message');
    
            let decodedData = null;
    
            if (encryptedData) {
              try {
                const decoded = atob(encryptedData);
                decodedData = JSON.parse(decoded);
              } catch (decodeError) {
                console.error('Error decoding failure data:', decodeError);
              }
            }
    
            setFailureData({
              transactionId,
              errorCode,
              errorMessage,
              ...decodedData
            });
          } catch (error) {
            console.error('Error processing failure data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFailureData();
      }, [searchParams]);
    
      const handleTryAgain = () => {
        router.push('/donation');
      };
    
      const handleGoHome = () => {
        router.push('/');
      };
    
      const handleContactSupport = () => {
        // Open support chat or redirect to support page
        window.open(`mailto:${contactData.email[0].email}`, '_blank');
      };
    
      const getErrorMessage = () => {
        if (failureData?.errorMessage) {
          return failureData.errorMessage;
        }
        
        if (failureData?.responseCodeDescription) {
          return failureData.responseCodeDescription;
        }
    
        // Common error messages based on error codes
        const errorMessages = {
          'INSUFFICIENT_FUNDS': 'Insufficient funds in your account',
          'CARD_DECLINED': 'Your card was declined by the bank',
          'NETWORK_ERROR': 'Network error occurred during payment',
          'TIMEOUT': 'Payment request timed out',
          'INVALID_CARD': 'Invalid card details provided',
          'BANK_ERROR': 'Bank processing error',
          'USER_CANCELLED': 'Payment was cancelled by user'
        };
    
        return errorMessages[failureData?.errorCode] || 'Payment could not be processed';
      };
    
      const getHelpfulTips = () => {
        const tips = [
          'Check your internet connection and try again',
          'Ensure you have sufficient funds in your account',
          'Verify your card details are correct',
          'Try using a different payment method',
          'Contact your bank if the issue persists'
        ];
        
        return tips;
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
              <Paragraph>Loading payment details...</Paragraph>
            </Card>
          </div>
        );
      }
  return (
   <div>
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
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                color: 'white',
                marginBottom: 24
              }}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CloseCircleOutlined 
                  style={{ 
                    fontSize: 72, 
                    color: '#fff',
                    marginBottom: 16
                  }} 
                />
                <Title level={2} style={{ color: 'white', margin: 0 }}>
                  Payment Failed
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
                  We encountered an issue processing your payment
                </Paragraph>
              </div>
            </Card>
    
            <Alert
              message="Payment Not Processed"
              description={getErrorMessage()}
              type="error"
              showIcon
              style={{ 
                marginBottom: 24,
                borderRadius: 8,
                fontSize: 14
              }}
            />
    
            {failureData && (
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
                  {failureData.transactionId && (
                    <Descriptions.Item label="Transaction ID">
                      <code style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '4px 8px', 
                        borderRadius: 4,
                        fontSize: 12
                      }}>
                        {failureData.transactionId}
                      </code>
                    </Descriptions.Item>
                  )}
                  
                  {failureData.amount && (
                    <Descriptions.Item label="Amount">
                      <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                        ₹{(failureData.amount / 100).toFixed(2)}
                      </span>
                    </Descriptions.Item>
                  )}
                  
                  {failureData.errorCode && (
                    <Descriptions.Item label="Error Code">
                      <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                        {failureData.errorCode}
                      </span>
                    </Descriptions.Item>
                  )}
                  
                  <Descriptions.Item label="Attempt Time">
                    {new Date().toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}
    
            <Card
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                marginBottom: 24
              }}
            >
              <Title level={4} style={{ marginBottom: 20 }}>
                What You Can Do
              </Title>
              
              <div style={{ marginBottom: 20 }}>
                <ul style={{ paddingLeft: 20 }}>
                  {getHelpfulTips().map((tip, index) => (
                    <li key={index} style={{ marginBottom: 8, color: '#666' }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
    
            <Card
              style={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <Title level={4} style={{ marginBottom: 20 }}>
                Next Steps
              </Title>
              
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Paragraph style={{ color: '#666', marginBottom: 20 }}>
                  Don't worry! No money has been deducted from your account. 
                  You can try again or contact our support team for assistance.
                </Paragraph>
                
                <Space size="middle" wrap>
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ReloadOutlined />}
                    onClick={handleTryAgain}
                    style={{
                      borderRadius: 8,
                      height: 48,
                      paddingLeft: 24,
                      paddingRight: 24,
                      backgroundColor: '#52c41a',
                      borderColor: '#52c41a'
                    }}
                  >
                    Try Again
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
                    icon={<CustomerServiceOutlined />}
                    onClick={handleContactSupport}
                    style={{
                      borderRadius: 8,
                      height: 48,
                      paddingLeft: 24,
                      paddingRight: 24
                    }}
                  >
                    Contact Support
                  </Button>
                </Space>
              </Space>
            </Card>
    
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Paragraph style={{ color: '#666' }}>
                Need immediate help? Call us at <strong>{contactData.phoneNo[0].phoneNo}</strong> or email <strong>{contactData.email[0].email}</strong>
              </Paragraph>
            </div>
          </div>
        </div>
   </div>
  )
}

export default PaymentFailure