import React from 'react';
import { useAuth } from '@universal-auth/react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const getPersonaInfo = () => {
    if (!user?.persona) return null;
    
    const personaConfig = {
      seller: {
        icon: '🏪',
        title: 'Seller Account',
        description: 'You can list and sell products',
        color: '#48bb78',
        bgColor: '#f0fff4'
      },
      buyer: {
        icon: '🛒',
        title: 'Buyer Account', 
        description: 'You can browse and purchase products',
        color: '#4299e1',
        bgColor: '#ebf8ff'
      }
    };
    
    return personaConfig[user.persona];
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '30px 40px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    margin: 0
  };

  const logoutButtonStyle = {
    padding: '10px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)'
  };

  const contentStyle = {
    padding: '40px'
  };

  const welcomeCardStyle = {
    backgroundColor: '#f8fafc',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    border: '1px solid #e2e8f0'
  };

  const personaInfo = getPersonaInfo();
  const personaCardStyle = personaInfo ? {
    backgroundColor: personaInfo.bgColor,
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    border: `2px solid ${personaInfo.color}`,
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  } : {};

  const userInfoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const infoItemStyle = {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '4px'
  };

  const valueStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748'
  };

  const successCardStyle = {
    padding: '30px',
    border: '2px solid #48bb78',
    borderRadius: '12px',
    backgroundColor: '#f0fff4',
    position: 'relative' as const
  };

  const successTitleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#22543d',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const featureListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#22543d',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Dashboard</h1>
          <button 
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Sign Out
          </button>
        </div>
        
        <div style={contentStyle}>
          <div style={welcomeCardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', margin: '0 0 20px 0' }}>
              Welcome back! 👋
            </h3>
            
            <div style={userInfoStyle}>
              <div style={infoItemStyle}>
                <div style={labelStyle}>User ID</div>
                <div style={valueStyle}>{user?.id || 'N/A'}</div>
              </div>
              
              <div style={infoItemStyle}>
                <div style={labelStyle}>Email Address</div>
                <div style={valueStyle}>{user?.email || 'N/A'}</div>
              </div>
              
              <div style={infoItemStyle}>
                <div style={labelStyle}>Email Status</div>
                <div style={valueStyle}>
                  {user?.emailVerified ? (
                    <span style={{ color: '#48bb78' }}>✅ Verified</span>
                  ) : (
                    <span style={{ color: '#ed8936' }}>⚠️ Pending</span>
                  )}
                </div>
              </div>
              
              <div style={infoItemStyle}>
                <div style={labelStyle}>Member Since</div>
                <div style={valueStyle}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {personaInfo && (
            <div style={personaCardStyle}>
              <div style={{ fontSize: '48px' }}>{personaInfo.icon}</div>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: '600', color: personaInfo.color, margin: '0 0 4px 0' }}>
                  {personaInfo.title}
                </h4>
                <p style={{ fontSize: '14px', color: '#4a5568', margin: 0 }}>
                  {personaInfo.description}
                </p>
              </div>
            </div>
          )}
          
          <div style={successCardStyle}>
            <h4 style={successTitleStyle}>
              🎉 Authentication Complete!
            </h4>
            <p style={{ color: '#22543d', fontSize: '16px', marginBottom: '20px' }}>
              You have successfully authenticated using the Universal Auth Module with AWS Cognito.
            </p>
            
            <ul style={featureListStyle}>
              <li style={featureItemStyle}>
                <span>✅</span> User Registration
              </li>
              <li style={featureItemStyle}>
                <span>✅</span> Email Verification
              </li>
              <li style={featureItemStyle}>
                <span>✅</span> Secure Login
              </li>
              <li style={featureItemStyle}>
                <span>✅</span> JWT Token Management
              </li>
              <li style={featureItemStyle}>
                <span>✅</span> Session Handling
              </li>
              <li style={featureItemStyle}>
                <span>✅</span> Password Reset
              </li>
              {personaInfo && (
                <li style={featureItemStyle}>
                  <span>✅</span> User Personas
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};