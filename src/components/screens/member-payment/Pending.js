'use client'
import { useSearchParams } from 'next/navigation';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Button } from 'antd';
import { contactData } from '../../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const Pending = () => {
  const searchParams = useSearchParams();

  const handleGoBack = () => {
    const transactionId = searchParams.get('id');
    window.location.href = `mangalamct:///screens/members/PaymentStatusScreen/?status=success&id=${transactionId}`;
  };

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
            background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
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
              Payment Pending
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
              Your payment is currently being reviewed. Please check back later.
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

export default Pending;
