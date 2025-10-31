import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'; // Requires Blaze plan - commented out for now
import { getFunctions } from 'firebase/functions';

// Firebase configuration - will be loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate that required client-side config is present. This prevents
// making requests with placeholder values (which cause 400 errors) and
// gives a clear developer-friendly message in the console.
const missing = Object.entries(firebaseConfig).filter(([, v]) => !v || String(v).startsWith('your_'));
if (missing.length > 0) {
  const keys = missing.map(([k]) => k).join(', ');
  console.error(
    `Missing or placeholder Firebase client config for: ${keys}.\n` +
      `Please add real values to your .env.local (VITE_FIREBASE_...) from the Firebase console and restart the dev server.`
  );
  // Throwing prevents the app from initializing with invalid config and
  // avoids opaque 400 responses from the Identity Toolkit endpoint.
  throw new Error(`Invalid Firebase client configuration: ${keys}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Storage is optional - requires Blaze plan (pay-as-you-go)
// Commenting out for now - profile photos won't work but app will function
// export const storage = getStorage(app);
export const storage = null as any; // Placeholder to prevent errors

export const functions = getFunctions(app);

export default app;
