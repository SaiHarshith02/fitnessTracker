# Fitness Tracker - Your AI-Powered Fitness Companion

A modern web application for tracking fitness activities with AI-powered diet recommendations and machine learning-based calorie burn predictions.

## 🚀 Features

- **User Authentication**: Secure email/password authentication with Firebase
- **Dashboard**: Real-time fitness overview with stats, recent workouts, and quick actions
- **Workout Library**: Browse and log exercises with automatic calorie burn prediction
- **AI Diet Recommendations**: Personalized meal plans powered by Google Gemini API
- **Profile Management**: Edit user information, set fitness goals, and track progress
- **Settings**: Customizable theme, language, and notification preferences
- **Animated UI**: Beautiful geometric shape animations throughout the app
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for client-side navigation
- **Lucide React** for icons

### Backend & Services
- **Firebase Authentication** for user management
- **Firebase Firestore** for real-time data storage
- **Firebase Cloud Functions** for backend logic
- **Firebase Hosting** for deployment
- **Firebase Storage** for file uploads

### AI & ML
- **Google Gemini API** for diet recommendations
- **Scikit-learn** for calorie burn prediction model
- **RandomForestRegressor** ML algorithm

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- Python 3.9+ (for Cloud Functions development)

### Local Development

1. **Clone and navigate to the project**
```bash
cd fitnessTracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

4. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Firebase Project Setup

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Create a Storage bucket

2. **Add Firebase credentials to `.env`**
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Deploy Firestore Security Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Deploy Storage Security Rules**
   ```bash
   firebase deploy --only storage
   ```

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not done already)
firebase init

# Deploy
firebase deploy --only hosting
```

### Deploy Cloud Functions

```bash
# Deploy calorie prediction function
firebase deploy --only functions:predictCalories
```

## 🔧 Configuration

### Firestore Security Rules
Located at `firebase/firestore.rules` - Users can only access their own data

### Storage Rules
Located at `firebase/storage.rules` - Users can only upload to their own folder

### Cloud Functions
Located at `firebase/functions/predictCalories/` - Python function for calorie burn prediction

## 📱 Pages Overview

- **Dashboard (/)**: Home page with stats and quick actions
- **Profile (/profile)**: Edit user info, track fitness goals
- **Menu (/menu)**: Browse workout library and log workouts
- **Diet (/diet)**: View AI-generated meal recommendations
- **Settings (/settings)**: Customize app preferences

## 🎨 Design System

- **Primary Color**: `#777e93` (grey-blue)
- **Secondary Color**: `#f6f6f6` (light grey)
- **Dark Mode**: Fully supported with dark variants

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (optional) |

## 🧪 Testing

### Run Development Server
```bash
npm run dev
```

### Type Check
```bash
npm run build
```

## 📄 Database Schema

### Users Collection
```
users/{uid}/
├── uid: string
├── email: string
├── fullName: string
├── profilePhoto: string (URL)
├── bio: string
├── age: number
├── weight: number
├── height: number
├── gender: string
├── goals: array
└── workouts/ (subcollection)
    └── {workoutId}/
        ├── workoutName: string
        ├── duration: number
        ├── caloriesBurned: number
        └── date: timestamp
```

## 🔐 Security

- All user data is encrypted in transit
- Firebase security rules enforce user-level access control
- Sensitive operations require re-authentication
- Password stored securely with Firebase Auth

## 📞 Support

For issues, questions, or contributions, please create an issue on the GitHub repository.

## 📄 License

ISC License - See LICENSE file for details

---

**Version**: 1.0.0
**Last Updated**: October 2024
