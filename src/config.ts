// Default configuration - can be overridden via URL parameters
export const authConfig = {
  region: 'us-east-1',
  userPoolId: '', // Will be provided via URL config parameter
  userPoolClientId: '', // Will be provided via URL config parameter
  apiEndpoint: '', // Will be provided via URL config parameter
  requireEmailVerification: true,
  enablePersonaSelection: true,
  theme: {
    primaryColor: '#667eea',
    companyName: 'Universal Auth'
  }
};