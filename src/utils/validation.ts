export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
};

export const validateFullName = (name: string): { valid: boolean; message: string } => {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Full name must be at least 2 characters' };
  }
  if (trimmed.length > 50) {
    return { valid: false, message: 'Full name must be less than 50 characters' };
  }
  return { valid: true, message: '' };
};

export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later';
    case 'auth/network-request-failed':
      return 'Connection error. Please try again';
    default:
      return 'An error occurred. Please try again';
  }
};
