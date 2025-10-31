# 🔥 Get Your Firebase Web Config (Quick Guide)

## Current Problem
❌ **Error:** `auth/api-key-not-valid` - You're using placeholder values in `.env.local`

## Solution (5 minutes)

### Step 1: Open Firebase Console
Visit: https://console.firebase.google.com/project/fitnesstracker-b25ca/settings/general

### Step 2: Find Your Web App Config

1. **If you see a web app listed:**
   - Click the `</>` (Web) icon under "Your apps"
   - Scroll to "SDK setup and configuration"
   - Select "Config" radio button
   - Copy the values from the `firebaseConfig` object

2. **If you DON'T see a web app:**
   - Click **"Add app"** button
   - Choose **"Web"** (</> icon)
   - Enter nickname: `Fitness Tracker Web`
   - Click **"Register app"**
   - Copy the config values shown

### Step 3: Copy These Exact Values

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",              // ← Copy this
  authDomain: "fitnesstracker-b25ca.firebaseapp.com",
  projectId: "fitnesstracker-b25ca",
  storageBucket: "fitnesstracker-b25ca.appspot.com",
  messagingSenderId: "123456789",    // ← Copy this
  appId: "1:123456789:web:abc123"    // ← Copy this
};
```

### Step 4: Update `.env.local`

Open `d:\fitnessTracker\.env.local` and replace:

```bash
VITE_FIREBASE_API_KEY=AIzaSyC...YourRealKeyHere...
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 5: Restart Dev Server

```powershell
# Press Ctrl+C in the terminal running dev server, then:
npm run dev
```

### Step 6: Enable Authentication (if not done)

1. Go to: https://console.firebase.google.com/project/fitnesstracker-b25ca/authentication/providers
2. Click **"Email/Password"**
3. Toggle **"Enable"**
4. Click **"Save"**

### Step 7: Create Firestore Database (if not done)

1. Go to: https://console.firebase.google.com/project/fitnesstracker-b25ca/firestore
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your region
5. Click **"Enable"**

## ✅ Done!

Now visit http://localhost:3001 and try signing up - it should work!

## Still Having Issues?

- Make sure you copied the FULL API key (starts with `AIzaSy...` and is ~39 chars)
- Verify you restarted the dev server after editing `.env.local`
- Check browser console for any different error messages
- Confirm Email/Password is enabled in Firebase Auth settings
