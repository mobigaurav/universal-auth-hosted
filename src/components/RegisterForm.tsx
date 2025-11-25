import React, { useState } from 'react';
import { validateEmail, validatePassword } from '@universal-auth/core';
import { useAuth } from '@universal-auth/react';
import { authConfig } from '../config';

interface RegisterFormProps {
  onSuccess?: (email: string) => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    persona: 'buyer' as 'seller' | 'buyer'
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    
    if (!validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    const result = await register({
      email: formData.email,
      password: formData.password,
      username: formData.username || undefined,
      persona: authConfig.enablePersonaSelection ? formData.persona : undefined
    });
    
    if (result.success && onSuccess) {
      onSuccess(formData.email);
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

  const switchTextStyle = {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '14px',
    color: '#718096'
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

  const personaOptionStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '8px'
  };

  const personaSelectedStyle = {
    ...personaOptionStyle,
    borderColor: '#667eea',
    backgroundColor: '#f7fafc'
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        <div style={fieldStyle}>
          <label htmlFor="username" style={labelStyle}>Username (Optional)</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {authConfig.enablePersonaSelection && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Account Type</label>
            <div 
              style={formData.persona === 'buyer' ? personaSelectedStyle : personaOptionStyle}
              onClick={() => setFormData(prev => ({ ...prev, persona: 'buyer' }))}
            >
              <input
                type="radio"
                name="persona"
                value="buyer"
                checked={formData.persona === 'buyer'}
                onChange={() => setFormData(prev => ({ ...prev, persona: 'buyer' }))}
                style={{ marginRight: '12px' }}
              />
              <div>
                <div style={{ fontWeight: '600', color: '#2d3748' }}>🛒 Buyer</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>I want to purchase products</div>
              </div>
            </div>
            <div 
              style={formData.persona === 'seller' ? personaSelectedStyle : personaOptionStyle}
              onClick={() => setFormData(prev => ({ ...prev, persona: 'seller' }))}
            >
              <input
                type="radio"
                name="persona"
                value="seller"
                checked={formData.persona === 'seller'}
                onChange={() => setFormData(prev => ({ ...prev, persona: 'seller' }))}
                style={{ marginRight: '12px' }}
              />
              <div>
                <div style={{ fontWeight: '600', color: '#2d3748' }}>🏪 Seller</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>I want to sell products</div>
              </div>
            </div>
          </div>
        )}
        
        <div style={fieldStyle}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            required
          />
        </div>
        
        <div style={fieldStyle}>
          <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div style={switchTextStyle}>
        Already have an account?{' '}
        <button 
          onClick={onSwitchToLogin}
          style={linkButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};