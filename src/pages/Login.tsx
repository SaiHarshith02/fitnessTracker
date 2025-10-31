import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, getAuthErrorMessage } from '../utils/validation';
import { AnimatedShapes } from '../components/AnimatedShapes';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { COLORS } from '../utils/constants';

interface FormState {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code || 'auth/unknown';
      setErrors({ submit: getAuthErrorMessage(errorCode) });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(resetEmail)) {
      setErrors({ submit: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      // Password reset logic would go here
      setResetEmail('');
      setShowResetModal(false);
      setErrors({ submit: 'Password reset email sent. Check your inbox' });
    } catch (error: any) {
      setErrors({ submit: 'Failed to send reset email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary dark:bg-dark px-4">
      <AnimatedShapes />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-2">
            Welcome Back
          </h1>
          <p className="text-primary dark:text-secondary opacity-70">
            Sign in to your fitness journey
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-cardDark rounded-2xl shadow-lg p-8">
          {errors.submit && (
            <div className="mb-6 p-4 bg-error bg-opacity-10 border border-error rounded-lg flex items-gap-3">
              <AlertCircle size={20} className="text-error flex-shrink-0" />
              <p className="text-error text-sm ml-2">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-3 text-primary dark:text-secondary opacity-50"
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-error focus:border-error'
                      : 'border-gray-300 focus:border-primary dark:border-gray-600'
                  } bg-white dark:bg-dark text-primary dark:text-secondary`}
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-3 text-primary dark:text-secondary opacity-50"
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    errors.password
                      ? 'border-error focus:border-error'
                      : 'border-gray-300 focus:border-primary dark:border-gray-600'
                  } bg-white dark:bg-dark text-primary dark:text-secondary`}
                />
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-sm text-primary hover:underline dark:text-secondary"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-secondary transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? `${COLORS.primary}99` : COLORS.primary,
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-primary dark:text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: COLORS.primary }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-cardDark rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
              Reset Password
            </h2>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 font-semibold text-primary dark:text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-lg font-semibold text-secondary"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {loading ? 'Sending...' : 'Send Reset Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
