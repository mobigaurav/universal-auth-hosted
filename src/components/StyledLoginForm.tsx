import React, { useState } from 'react';
import { validateEmail } from '@universal-auth/core';
import { useAuth } from '@universal-auth/react';

interface StyledLoginFormProps {
  onSuccess?: () => void;
}

export const StyledLoginForm: React.FC<StyledLoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    if (!validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!formData.password) {
      errors.push('Password is required');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    const result = await login(formData);
    
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

  return (
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
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};