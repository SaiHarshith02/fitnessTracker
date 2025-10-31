# Setup Instructions

## Quick Start

### 1. Get Firebase Web Client Configuration

The service account JSON you have is for **server-side** use only. You need the **web client config** for the frontend.

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fitnesstracker-b25ca`
3. Click **Project Settings** (gear icon)
4. Scroll to **Your apps** section
5. If you don't have a web app yet:
   - Click **Add app** → **Web** (</> icon)
   - Register the app with a nickname (e.g., "Fitness Tracker Web")
6. In the **SDK setup and configuration**, choose **Config**
7. Copy the values from the `firebaseConfig` object

### 2. Update `.env.local`

Open `.env.local` and replace the placeholder values with your real Firebase web config:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...yourActualKey...
VITE_FIREBASE_AUTH_DOMAIN=fitnesstracker-b25ca.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fitnesstracker-b25ca
VITE_FIREBASE_STORAGE_BUCKET=fitnesstracker-b25ca.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started** (if not already enabled)
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Save

### 4. Set Up Firestore

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location close to you
5. Click **Enable**

### 5. Install Dependencies & Run

```powershell
npm install
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

## Troubleshooting

### White Screen
- Check browser console (F12) for errors
- Verify `.env.local` has real values (not placeholders)
- Restart dev server after changing `.env.local`

### 400 Error on Signup/Login
- Means API key is invalid or placeholder
- Update `.env.local` with real values from Firebase Console
- Restart dev server

### "Operation not allowed" Error
- Enable Email/Password in Firebase Console → Authentication → Sign-in method

### Firestore Permission Denied
- Check Firestore rules allow authenticated writes
- Test mode rules (for development):
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.time < timestamp.date(2025, 12, 31);
      }
    }
  }
  ```

## Security Notes

- ✅ `.env.local` is in `.gitignore` - don't commit it
- ✅ `firebase/serviceAccountKey.json` is in `.gitignore` - don't commit it
- ⚠️ If you accidentally committed secrets, rotate them immediately in Firebase Console
- ⚠️ Never use service account keys in frontend code (only use VITE_FIREBASE_* env vars)

## Next Steps

1. Get your web client config from Firebase Console
2. Update `.env.local` with real values
3. Enable Email/Password authentication
4. Set up Firestore database
5. Run `npm install && npm run dev`
6. Sign up and test the app!
