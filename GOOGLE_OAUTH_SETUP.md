# 🔐 Google OAuth Integration Setup Guide

## ✅ What's Been Implemented

Your EkaAI frontend now has proper Google OAuth integration that sends credentials to your backend's `POST /auth/google` endpoint!

### 🔧 New Implementation Details

1. **Google Sign-In JavaScript SDK** - Added to `index.html`
2. **Custom Google OAuth Hook** - `src/hooks/useGoogleOAuth.ts`
3. **Updated LoginScreen** - Now uses real Google OAuth flow
4. **AuthAPI Integration** - Properly sends credentials to your backend

### 📁 Files Modified

- ✅ `index.html` - Added Google Sign-In SDK
- ✅ `src/hooks/useGoogleOAuth.ts` - New Google OAuth hook
- ✅ `src/components/LoginScreen.tsx` - Updated to use Google SDK
- ✅ `.env.example` - Added Google Client ID placeholder
- ✅ `.env.local` - Added Google Client ID configuration

## 🚀 Setup Instructions

### Step 1: Get Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing project
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized origins:
     - `http://localhost:5173` (development)
     - `http://localhost:3000` (if using different port)
     - Your production domain (when deployed)

5. **Copy the Client ID** (looks like: `123456789-abcdef.apps.googleusercontent.com`)

### Step 2: Configure Environment Variables

Update your `.env.local` file:

```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE.googleusercontent.com
```

**Important**: Replace `YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE` with your real Google Client ID!

### Step 3: Test the Integration

1. **Start your backend** (make sure it's running on `localhost:8000`)
2. **Start your frontend**:
   ```bash
   npm run dev
   ```
3. **Navigate to login**: http://localhost:5173/login
4. **Click the Google Sign-In button**
5. **Complete Google OAuth flow**
6. **Check console logs** for authentication success

## 🔄 How It Works

### Frontend Flow
1. User clicks Google Sign-In button
2. Google SDK opens OAuth popup
3. User signs in with Google
4. Google returns JWT credential
5. Frontend sends credential to `POST /auth/google`
6. Backend validates and returns user data + JWT token
7. Frontend stores token and redirects to dashboard

### API Call Example
```typescript
// Your frontend now makes this call:
POST http://localhost:8000/auth/google
Content-Type: application/json

{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}

// Expected backend response:
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "picture": "https://..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here"
  }
}
```

## 🧪 Testing

### Test Google OAuth Flow
1. Open browser dev tools
2. Go to `/login` page
3. Check console for initialization logs
4. Click Google Sign-In button
5. Monitor network tab for API calls

### Expected Console Logs
```
🔐 GoogleOAuth: Initializing with client ID: your-client-id
🔐 GoogleOAuth: Received credential response
🔐 GoogleOAuth: Attempting sign-in with credential
✅ GoogleOAuth: Sign-in successful user@example.com
```

### Test Backend Integration
```bash
# Test with curl (replace with actual credential)
curl -X POST http://localhost:8000/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential":"YOUR_GOOGLE_JWT_TOKEN"}'
```

## 🛠 Troubleshooting

### Common Issues

#### 1. "Google Client ID not configured"
- **Fix**: Set `VITE_GOOGLE_CLIENT_ID` in `.env.local`
- **Check**: Environment variable is loaded correctly

#### 2. "Google Sign-In SDK not loaded"
- **Fix**: Check internet connection
- **Check**: Google SDK script in `index.html`

#### 3. "Invalid Google token" from backend
- **Fix**: Ensure backend validates Google JWT properly
- **Check**: Google Client ID matches between frontend/backend

#### 4. OAuth popup blocked
- **Fix**: Allow popups in browser settings
- **Check**: HTTPS in production (required for OAuth)

### Debug Mode
Add this to your `.env.local` for detailed logging:
```bash
VITE_DEBUG_AUTH=true
```

## 🔄 Next Steps

### 1. Backend Validation
Ensure your backend properly validates Google JWT tokens:
- Verify token signature with Google's public keys
- Extract user information from token payload
- Create/update user in your database

### 2. Error Handling
The frontend now shows Google OAuth errors to users:
- Invalid credentials
- Network errors
- Backend validation failures

### 3. Production Setup
For production deployment:
- Use HTTPS (required for Google OAuth)
- Add production domain to Google OAuth settings
- Update `VITE_API_BASE_URL` for production backend

## ✅ Success Indicators

You'll know it's working when:
- ✅ Google Sign-In button appears on login page
- ✅ Clicking button opens Google OAuth popup
- ✅ After sign-in, credential is sent to your backend
- ✅ Backend responds with user data and JWT token
- ✅ User is redirected to dashboard
- ✅ Token is stored in localStorage

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify Google Client ID configuration
3. Test backend endpoint with curl
4. Ensure backend is running and accessible

Your Google OAuth integration is now complete and ready to use! 🎉
