# Universal Auth Hosted Service

🚀 **Live Demo:** https://universal-auth-hosted.vercel.app

A hosted authentication service that provides complete auth flows (login, register, email verification, password reset) for any React or React Native application using AWS Cognito.

## ✨ Features

- 🔐 **Complete Auth Flow** - Login, Register, Email Verification, Password Reset
- 👥 **User Personas** - Support for Buyer/Seller account types
- 🎨 **Customizable Theming** - Brand colors, company name, logo
- 📱 **Mobile Ready** - Deep linking support for React Native apps
- 🔧 **Easy Integration** - URL parameters for configuration
- ⚡ **Zero Setup** - No need to build auth pages ever again

## 🚀 Quick Start

### For React Applications

#### Option 1: Redirect Integration
```typescript
const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_XXXXXXXXX',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'https://your-api.execute-api.us-east-1.amazonaws.com/prod',
  theme: {
    primaryColor: '#667eea',
    companyName: 'Your App Name'
  }
};

const authUrl = `https://universal-auth-hosted.vercel.app?config=${btoa(JSON.stringify(config))}`;
window.location.href = authUrl;
```

#### Option 2: Popup Integration
```typescript
const authWindow = window.open(authUrl, 'auth', 'width=400,height=600');
// Listen for auth completion via postMessage
```

### For React Native Applications

```typescript
import * as WebBrowser from 'expo-web-browser';

const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_XXXXXXXXX',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'https://your-api.execute-api.us-east-1.amazonaws.com/prod',
  theme: {
    primaryColor: '#667eea',
    companyName: 'Your Mobile App'
  }
};

const authUrl = `https://universal-auth-hosted.vercel.app?mode=mobile&config=${btoa(JSON.stringify(config))}`;

const result = await WebBrowser.openAuthSessionAsync(
  authUrl,
  'yourapp://auth-callback'
);

if (result.type === 'success') {
  const url = new URL(result.url);
  const token = url.searchParams.get('token');
  const userData = JSON.parse(decodeURIComponent(url.searchParams.get('user')));
  // Handle successful authentication
}
```

## ⚙️ Configuration Options

```typescript
interface AuthConfig {
  // AWS Cognito Settings (Required)
  region: string;                    // e.g., 'us-east-1'
  userPoolId: string;               // e.g., 'us-east-1_XXXXXXXXX'
  userPoolClientId: string;         // Your Cognito app client ID
  apiEndpoint: string;              // Your API Gateway endpoint
  
  // Feature Flags (Optional)
  requireEmailVerification?: boolean;  // Default: true
  enablePersonaSelection?: boolean;    // Default: true (Buyer/Seller)
  
  // Theming (Optional)
  theme?: {
    primaryColor?: string;          // Default: '#667eea'
    companyName?: string;           // Default: 'Universal Auth'
    logo?: string;                  // Logo URL
  };
}
```

## 🔧 Integration Modes

### URL Parameters

- **`config`** - Base64 encoded JSON configuration object
- **`mode`** - Integration mode:
  - `redirect` (default) - Full page redirect
  - `popup` - Popup window integration  
  - `mobile` - Mobile app integration with deep linking

### Example URLs

```bash
# Basic redirect
https://universal-auth-hosted.vercel.app?config=eyJ...

# Mobile integration
https://universal-auth-hosted.vercel.app?mode=mobile&config=eyJ...

# Popup integration
https://universal-auth-hosted.vercel.app?mode=popup&config=eyJ...
```

## 📱 Mobile Deep Linking

For React Native apps, the service automatically redirects back to your app with authentication data:

```
yourapp://auth-callback?token=jwt_token&user=encoded_user_data
```

### Setup Deep Linking

1. **Configure your app scheme** in `app.json`:
```json
{
  "expo": {
    "scheme": "yourapp"
  }
}
```

2. **Handle the callback** in your app:
```typescript
import * as Linking from 'expo-linking';

Linking.addEventListener('url', (event) => {
  const { url } = event;
  if (url.includes('auth-callback')) {
    // Parse token and user data
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');
    const userData = JSON.parse(decodeURIComponent(urlObj.searchParams.get('user')));
  }
});
```

## 🎨 Theming Examples

### Custom Brand Colors
```typescript
const config = {
  // ... other config
  theme: {
    primaryColor: '#ff6b6b',  // Custom red
    companyName: 'My Startup'
  }
};
```

### Corporate Branding
```typescript
const config = {
  // ... other config
  theme: {
    primaryColor: '#1a365d',
    companyName: 'Enterprise Corp',
    logo: 'https://your-domain.com/logo.png'
  }
};
```

## 🏗️ Backend Setup

You'll need an AWS Cognito backend. Use our backend template:

1. **Deploy the backend:**
```bash
git clone https://github.com/mobigaurav/universal-auth.git
cd universal-auth/packages/aws-backend
sam build
sam deploy
```

2. **Get your configuration:**
```bash
sam list stack-outputs
```

## 📦 NPM Packages

If you prefer to build your own auth pages:

- [@universal-auth/core](https://www.npmjs.com/package/@universal-auth/core) - Core authentication logic
- [@universal-auth/react](https://www.npmjs.com/package/@universal-auth/react) - React components and hooks

```bash
npm install @universal-auth/core @universal-auth/react
```

## 🚀 Deploy Your Own

Want to host your own instance?

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mobigaurav/universal-auth-hosted)

Or manually:
```bash
git clone https://github.com/mobigaurav/universal-auth-hosted.git
cd universal-auth-hosted
npm install
npm run build
```

## 🔒 Security

- ✅ All authentication handled by AWS Cognito
- ✅ JWT tokens for secure session management
- ✅ HTTPS only communication
- ✅ No sensitive data stored in hosted service
- ✅ CORS configured for cross-origin requests

## 🤝 Contributing

Found a bug or want to contribute? Check out the main repository:
- **Main Repo:** https://github.com/mobigaurav/universal-auth
- **Issues:** https://github.com/mobigaurav/universal-auth/issues

## 📄 License

MIT License - see the main repository for details.

---

**Made with ❤️ by [Gaurav Kumar](https://github.com/mobigaurav)**