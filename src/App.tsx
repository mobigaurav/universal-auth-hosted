import React, { useState, useEffect } from 'react';
import { AuthService } from '@universal-auth/core';
import { AuthProvider, LoginForm, EmailVerificationForm, useAuth } from '@universal-auth/react';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Dashboard } from './components/Dashboard';
import { authConfig as defaultAuthConfig } from './config';

// Parse URL parameters for hosted auth mode
const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode'); // 'mobile', 'popup', etc.
  const configParam = params.get('config');
  
  let config = defaultAuthConfig;
  if (configParam) {
    try {
      config = { ...defaultAuthConfig, ...JSON.parse(atob(configParam)) };
    } catch (e) {
      console.warn('Invalid config parameter');
    }
  }
  
  return { mode, config };
};

const { mode, config: authConfig } = getUrlParams();
const authService = new AuthService(authConfig);

type AuthView = 'login' | 'register' | 'verify-email' | 'forgot-password' | 'dashboard';

const AuthFlow: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState('');

  // Handle mobile auth completion
  useEffect(() => {
    if (mode === 'mobile' && isAuthenticated && user) {
      // Redirect back to mobile app with auth data
      const userData = encodeURIComponent(JSON.stringify(user));
      const token = authService.getToken();
      const callbackUrl = `myapp://auth-callback?token=${token}&user=${userData}`;
      window.location.href = callbackUrl;
    }
  }, [isAuthenticated, user]);

  if (isAuthenticated && mode !== 'mobile') {
    return <Dashboard />;
  }

  const handleRegistrationSuccess = (email: string) => {
    setPendingVerificationEmail(email);
    if (authConfig.requireEmailVerification) {
      setCurrentView('verify-email');
    } else {
      setCurrentView('login');
    }
  };

  const handleLoginSuccess = () => {
    if (mode === 'mobile') {
      // Will be handled by useEffect above
      return;
    }
    setCurrentView('dashboard');
  };

  const handleEmailVerificationSuccess = () => {
    setCurrentView('login');
  };

  const handleForgotPasswordSuccess = () => {
    setCurrentView('login');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: authConfig.theme?.primaryColor 
      ? `linear-gradient(135deg, ${authConfig.theme.primaryColor} 0%, #764ba2 100%)`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '8px',
    background: authConfig.theme?.primaryColor 
      ? `linear-gradient(135deg, ${authConfig.theme.primaryColor} 0%, #764ba2 100%)`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#718096',
    fontWeight: '400'
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: authConfig.theme?.primaryColor || '#667eea',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease'
  };

  const switchTextStyle = {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '14px',
    color: '#718096'
  };

  const mobileIndicatorStyle = {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    backgroundColor: '#48bb78',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {mode === 'mobile' && (
          <div style={mobileIndicatorStyle}>📱 Mobile Auth</div>
        )}
        
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {authConfig.theme?.companyName || 'Universal Auth'}
          </h1>
          <p style={subtitleStyle}>Secure authentication with AWS Cognito</p>
        </div>

        {currentView === 'login' && (
          <div>
            <LoginForm onSuccess={handleLoginSuccess} />
            <div style={switchTextStyle}>
              <button 
                onClick={() => setCurrentView('forgot-password')}
                style={linkButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Forgot password?
              </button>
            </div>
            <div style={switchTextStyle}>
              Don't have an account?{' '}
              <button 
                onClick={() => setCurrentView('register')}
                style={linkButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Sign up here
              </button>
            </div>
          </div>
        )}

        {currentView === 'register' && (
          <RegisterForm 
            onSuccess={(email) => handleRegistrationSuccess(email)}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}

        {currentView === 'verify-email' && (
          <EmailVerificationForm 
            email={pendingVerificationEmail}
            onSuccess={handleEmailVerificationSuccess}
            onResendSuccess={() => console.log('Verification code resent')}
          />
        )}

        {currentView === 'forgot-password' && (
          <ForgotPasswordForm 
            onSuccess={handleForgotPasswordSuccess}
            onBackToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider authService={authService}>
      <AuthFlow />
    </AuthProvider>
  );
};

export default App;