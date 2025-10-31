# Deployment Checklist - Fitness Tracker

This document provides a step-by-step guide for deploying the Fitness Tracker application to production.

## 📋 Pre-Deployment Checklist

### 1. Local Testing
- [ ] Run `npm run dev` and verify all pages load correctly
- [ ] Test authentication (signup, login, logout)
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Test all navigation links and page transitions
- [ ] Test form submissions and error handling
- [ ] Verify animated shapes display correctly

### 2. Environment Variables
- [ ] Create `.env` file with all Firebase credentials
- [ ] Verify Firebase API keys are correct
- [ ] Set VITE_GEMINI_API_KEY if using AI recommendations
- [ ] Double-check no credentials are committed to git

### 3. Firebase Project Setup
- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Enable Authentication (Email/Password)
- [ ] Create Firestore database in production mode
- [ ] Create Storage bucket
- [ ] Copy Firebase credentials to `.env` file
- [ ] Create `.firebaserc` with project ID

### 4. Code Quality
- [ ] Run `npm run build` and verify no TypeScript errors
- [ ] Check for console warnings and fix them
- [ ] Verify no hardcoded API keys or credentials
- [ ] Review code for security issues

## 🔐 Firebase Configuration

### Create `.firebaserc` file:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### Update Firebase Project Settings

1. **Enable Authentication Methods**
   - Go to Authentication > Sign-in methods
   - Enable Email/Password

2. **Configure Firestore**
   - Create database in production mode
   - Deploy security rules:
     ```bash
     firebase deploy --only firestore:rules
     ```

3. **Configure Storage**
   - Create storage bucket
   - Deploy storage rules:
     ```bash
     firebase deploy --only storage
     ```

4. **Configure Hosting**
   - Go to Hosting settings
   - Note the hosting URL

## 🚀 Deployment Steps

### Step 1: Build the Application
```bash
npm run build
```
- Verify `dist/` folder is created
- Check build output for any errors

### Step 2: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase
```bash
firebase login
```
- Browser will open for authentication
- Approve access to Firebase

### Step 4: Initialize Firebase (if needed)
```bash
firebase init
```
- Select: Hosting, Firestore, Storage, Functions
- Use existing project
- Set public directory to `dist`
- Agree to rewrite all URLs to index.html
- Skip automatic GitHub deployment

### Step 5: Deploy Firestore and Storage Rules
```bash
firebase deploy --only firestore:rules,storage
```
- Verify rules are deployed

### Step 6: Deploy Cloud Functions
```bash
firebase deploy --only functions
```
- Ensure `firebase/functions/predictCalories` is properly configured
- Monitor deployment progress

### Step 7: Deploy Hosting
```bash
firebase deploy --only hosting
```
- Wait for deployment to complete
- Note the hosting URL

### Step 8: Deploy Everything At Once
```bash
firebase deploy
```
- Or deploy each component separately as shown above

## ✅ Post-Deployment Verification

### 1. Test Live Application
- [ ] Open the hosting URL in browser
- [ ] Test signup flow
- [ ] Test login/logout
- [ ] Navigate through all pages
- [ ] Verify animations work
- [ ] Test responsive design on mobile

### 2. Verify Functionality
- [ ] User authentication works
- [ ] Profile can be created and edited
- [ ] Workouts can be logged
- [ ] Calorie prediction works (check Cloud Function)
- [ ] AI recommendations generate (if Gemini API configured)
- [ ] Settings save correctly

### 3. Monitor Firebase
- [ ] Check Firestore for user documents
- [ ] Monitor Cloud Function invocations
- [ ] Check Storage for uploaded files
- [ ] Review Firebase Analytics

### 4. Security Review
- [ ] Verify no data is exposed publicly
- [ ] Confirm security rules are restrictive
- [ ] Check that API keys are not logged
- [ ] Verify HTTPS is enforced

## 🔧 Troubleshooting

### Build Errors
- Clear `dist/` and `node_modules/`
- Run `npm install` again
- Verify Node.js version is 16+

### Firebase Deploy Fails
- Check Firebase CLI is up to date: `firebase --version`
- Verify `.firebaserc` exists with correct project ID
- Check if you're logged in: `firebase login`

### Functions Deployment Issues
- Ensure `requirements.txt` is correct
- Check Python version (3.9+) on local machine
- Verify `main.py` has valid Python syntax

### Hosting Issues
- Check that `dist/` folder exists and has content
- Verify `firebase.json` rewrites are correct
- Check browser console for errors

## 📊 Monitoring and Maintenance

### Regular Checks
- Monitor Firebase usage and costs
- Review error logs in Firebase Console
- Check Cloud Function performance
- Monitor Firestore database size

### Updates
- Keep dependencies updated: `npm update`
- Monitor Firebase SDK updates
- Review security advisories

### Backups
- Export Firestore data regularly
- Backup important user data
- Keep version history in git

## 🆘 Emergency Procedures

### Rollback Deployment
```bash
# Firebase keeps previous versions automatically
firebase hosting:channel:deploy [channel-name]
```

### Disable Functions
```bash
firebase functions:delete predictCalories
```

### Database Recovery
- Firestore has automatic backups
- Contact Firebase support for recovery

## 📞 Support Resources

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com
- Firebase CLI Reference: https://firebase.google.com/docs/cli
- React Documentation: https://react.dev
- Vite Documentation: https://vitejs.dev

---

**Last Updated**: October 2024
**Status**: Ready for Deployment
