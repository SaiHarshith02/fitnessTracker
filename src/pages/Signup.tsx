import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  validateEmail,
  validatePassword,
  validateFullName,
  getAuthErrorMessage,
} from '../utils/validation';
import { AnimatedShapes } from '../components/AnimatedShapes';
import { Mail, Lock, User as UserIcon, AlertCircle, Loader, Check } from 'lucide-react';
import { COLORS } from '../utils/constants';

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  submit?: string;
}

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.fullName) {
      newErrors.fullName = 'Full name is required';
    } else {
      const nameValidation = validateFullName(form.fullName);
      if (!nameValidation.valid) {
        newErrors.fullName = nameValidation.message;
      }
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(form.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message;
      }
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await signup(form.email, form.password, form.fullName);
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code || 'auth/unknown';
      setErrors({ submit: getAuthErrorMessage(errorCode) });
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
            Get Started
          </h1>
          <p className="text-primary dark:text-secondary opacity-70">
            Create your fitness account today
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon
                  size={20}
                  className="absolute left-3 top-3 text-primary dark:text-secondary opacity-50"
                />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    errors.fullName
                      ? 'border-error focus:border-error'
                      : 'border-gray-300 focus:border-primary dark:border-gray-600'
                  } bg-white dark:bg-dark text-primary dark:text-secondary`}
                />
              </div>
              {errors.fullName && <p className="text-error text-sm mt-1">{errors.fullName}</p>}
            </div>

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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Check
                  size={20}
                  className="absolute left-3 top-3 text-primary dark:text-secondary opacity-50"
                />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                    errors.confirmPassword
                      ? 'border-error focus:border-error'
                      : 'border-gray-300 focus:border-primary dark:border-gray-600'
                  } bg-white dark:bg-dark text-primary dark:text-secondary`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-secondary transition-all flex items-center justify-center gap-2 mt-6"
              style={{
                backgroundColor: loading ? `${COLORS.primary}99` : COLORS.primary,
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-primary dark:text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: COLORS.primary }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
