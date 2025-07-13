'use client'
import { useSearchParams } from 'next/navigation';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Button } from 'antd';
import { contactData } from '../../../../public/data/Constent';

const { Title, Paragraph } = Typography;

const Failure = () => {
  const searchParams = useSearchParams();

  const handleGoBack = () => {
    const transactionId = searchParams.get('id');
    window.location.href = `mangalamct://(modals)/agent/PaymentStatusScreen/?status=failure&id=${transactionId}`;
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
            background: 'linear-gradient(135deg, #f5222d 0%, #fa8c16 100%)',
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
              Payment Failed!
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 8 }}>
              Unfortunately, your payment could not be processed.
            </Paragraph>
          </div>
        </Card>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Paragraph style={{ color: '#666' }}>
            Need help? Contact our support team at {contactData.email[0].email}
          </Paragraph>
          <Button 
            type="primary" 
            danger
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

export default Failure;
