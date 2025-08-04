# Firebase Setup Guide

## Environment Variables Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual Firebase project values in the `.env` file:
   - `VITE_FIREBASE_API_KEY`: Your Firebase project API key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Your project domain (usually projectId.firebaseapp.com)
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your messaging sender ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID

## Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication and configure Google sign-in provider
4. Get your configuration values from Project Settings
5. Add your domain to authorized domains in Authentication settings

## Security Notes

- The `.env` file is gitignored and should never be committed
- Environment variables starting with `VITE_` are exposed to the client side
- Firebase API keys are safe to expose on the client side as they're public by design
- Actual security is handled by Firebase security rules and authentication

## Backend Integration

Make sure your backend API has an endpoint `/auth/google-login` that accepts:
```json
{
  "idToken": "firebase_id_token",
  "user": {
    "uid": "firebase_user_id",
    "email": "user@example.com",
    "name": "User Name",
    "photoURL": "profile_image_url",
    "emailVerified": true
  }
}
```

The backend should verify the Firebase ID token and create/login the user accordingly.
