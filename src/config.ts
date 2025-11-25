// Configuration with multiple sources priority:
// 1. URL parameters (highest priority)
// 2. Environment variables 
// 3. Default values (lowest priority)

export const authConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  userPoolId: import.meta.env.VITE_USER_POOL_ID || '', 
  userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || '', 
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT || '', 
  requireEmailVerification: import.meta.env.VITE_REQUIRE_EMAIL_VERIFICATION !== 'false',
  enablePersonaSelection: import.meta.env.VITE_ENABLE_PERSONA_SELECTION !== 'false',
  theme: {
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#667eea',
    companyName: import.meta.env.VITE_COMPANY_NAME || 'Universal Auth'
  }
};