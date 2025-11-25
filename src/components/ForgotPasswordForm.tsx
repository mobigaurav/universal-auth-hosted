import React, { useState } from 'react';
import { validateEmail } from '@universal-auth/core';
import { useAuth } from '@universal-auth/react';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess, onBackToLogin }) => {
  const { resetPassword, isLoading, error } = useAuth();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setValidationErrors(['Please enter a valid email address']);
      return;
    }
    
    setValidationErrors([]);
    // In a real implementation, you'd call a "forgot password" API here
    // For demo purposes, we'll just move to the next step
    setStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    if (!resetCode.trim()) {
      errors.push('Reset code is required');
    }
    if (newPassword.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (newPassword !== confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    const result = await resetPassword({
      email,
      newPassword,
      confirmationCode: resetCode
    });
    
    if (result.success && onSuccess) {
      onSuccess();
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
    outline: 'none'
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
    transform: isLoading ? 'scale(0.98)' : 'scale(1)'
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

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#667eea',
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

  if (step === 'email') {
    return (
      <div>
        <h3 style={titleStyle}>Reset Password</h3>
        <p style={descriptionStyle}>
          Enter your email address and we'll send you a reset code
        </p>
        
        <form onSubmit={handleSendCode}>
          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          
          {validationErrors.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {validationErrors.map((error, index) => (
                <div key={index} style={errorStyle}>{error}</div>
              ))}
            </div>
          )}
          
          {error && (
            <div style={{ ...errorStyle, marginBottom: '20px' }}>{error}</div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={buttonStyle}
            onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>
        
        <div style={switchTextStyle}>
          Remember your password?{' '}
          <button 
            onClick={onBackToLogin}
            style={linkButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 style={titleStyle}>Enter New Password</h3>
      <p style={descriptionStyle}>
        Enter the reset code sent to <strong>{email}</strong> and your new password
      </p>
      
      <form onSubmit={handleResetPassword}>
        <div style={fieldStyle}>
          <label htmlFor="resetCode" style={labelStyle}>Reset Code</label>
          <input
            id="resetCode"
            type="text"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            placeholder="Enter reset code"
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        <div style={fieldStyle}>
          <label htmlFor="newPassword" style={labelStyle}>New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        <div style={fieldStyle}>
          <label htmlFor="confirmPassword" style={labelStyle}>Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        {validationErrors.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {validationErrors.map((error, index) => (
              <div key={index} style={errorStyle}>{error}</div>
            ))}
          </div>
        )}
        
        {error && (
          <div style={{ ...errorStyle, marginBottom: '20px' }}>{error}</div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={buttonStyle}
          onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      
      <div style={switchTextStyle}>
        <button 
          onClick={onBackToLogin}
          style={linkButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};