import React, { useState } from 'react';
import { useAuth } from '@universal-auth/react';

interface StyledEmailVerificationFormProps {
  email: string;
  onSuccess?: () => void;
  onResendSuccess?: () => void;
}

export const StyledEmailVerificationForm: React.FC<StyledEmailVerificationFormProps> = ({ 
  email, 
  onSuccess, 
  onResendSuccess
}) => {
  const { verifyEmail, resendVerification, isLoading, error } = useAuth();
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) return;
    
    const result = await verifyEmail({ email, verificationCode });
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const handleResend = async () => {
    const result = await resendVerification({ email });
    
    if (result.success && onResendSuccess) {
      onResendSuccess();
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
    outline: 'none',
    textAlign: 'center' as const,
    letterSpacing: '2px',
    fontWeight: '600'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568'
  };

  const fieldStyle = {
    marginBottom: '20px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isLoading ? 0.7 : 1,
    transform: isLoading ? 'scale(0.98)' : 'scale(1)',
    marginBottom: '12px'
  };

  const secondaryButtonStyle = {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease'
  };

  const errorStyle = {
    color: '#e53e3e',
    fontSize: '14px',
    marginTop: '4px',
    padding: '8px 12px',
    backgroundColor: '#fed7d7',
    borderRadius: '6px',
    border: '1px solid #feb2b2'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '8px',
    textAlign: 'center' as const
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#718096',
    textAlign: 'center' as const,
    marginBottom: '24px',
    lineHeight: '1.5'
  };

  return (
    <div>
      <h3 style={titleStyle}>Verify Your Email</h3>
      <p style={descriptionStyle}>
        We've sent a 6-digit verification code to<br />
        <strong style={{ color: '#4a5568' }}>{email}</strong>
      </p>
      
      <form onSubmit={handleVerify}>
        <div style={fieldStyle}>
          <label htmlFor="verificationCode" style={labelStyle}>Verification Code</label>
          <input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        {error && (
          <div style={{ ...errorStyle, marginBottom: '20px' }}>{error}</div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading || !verificationCode.trim()}
          style={buttonStyle}
          onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
      
      <button 
        type="button" 
        onClick={handleResend} 
        disabled={isLoading}
        style={secondaryButtonStyle}
        onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#f7fafc')}
        onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        Resend Verification Code
      </button>
    </div>
  );
};