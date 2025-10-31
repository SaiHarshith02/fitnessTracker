import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Settings as SettingsIcon, Moon, Sun, Monitor } from 'lucide-react';
import { LANGUAGES, COLORS } from '../utils/constants';
import { motion } from 'framer-motion';

type SettingsTab =
  | 'general'
  | 'about'
  | 'theme'
  | 'data'
  | 'language'
  | 'account';

interface GeneralSettings {
  notifications: boolean;
  emailReminders: boolean;
  reminderFrequency: 'daily' | '3x/week' | 'weekly';
  weeklyGoal: number;
  dailyCalorieGoal: number;
}

export const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [language, setLanguage] = useState('en');
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    notifications: true,
    emailReminders: true,
    reminderFrequency: 'daily',
    weeklyGoal: 5,
    dailyCalorieGoal: 2000,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const tabs = [
    { id: 'general' as SettingsTab, label: 'General' },
    { id: 'about' as SettingsTab, label: 'About' },
    { id: 'theme' as SettingsTab, label: 'Theme' },
    { id: 'data' as SettingsTab, label: 'Data' },
    { id: 'language' as SettingsTab, label: 'Language' },
    { id: 'account' as SettingsTab, label: 'Account' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <SettingsIcon size={32} className="text-primary dark:text-secondary" />
        <h1 className="text-4xl font-bold text-primary dark:text-secondary">Settings</h1>
      </motion.div>

      {/* Settings Container */}
      <div className="bg-white dark:bg-cardDark rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar/Tabs */}
          <div className="md:w-48 md:border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="flex md:flex-col gap-2 md:space-y-2 overflow-x-auto md:overflow-x-visible">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap md:whitespace-normal transition-all text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'text-secondary'
                      : 'text-primary dark:text-secondary hover:bg-gray-100 dark:hover:bg-dark'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? COLORS.primary : undefined,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                    General Settings
                  </h2>

                  {/* Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-primary dark:text-secondary font-semibold">
                        Enable Notifications
                      </label>
                      <input
                        type="checkbox"
                        checked={generalSettings.notifications}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            notifications: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-primary dark:text-secondary font-semibold">
                        Email Reminders
                      </label>
                      <input
                        type="checkbox"
                        checked={generalSettings.emailReminders}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            emailReminders: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-primary dark:text-secondary font-semibold mb-2">
                        Reminder Frequency
                      </label>
                      <select
                        value={generalSettings.reminderFrequency}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            reminderFrequency: e.target.value as any,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                      >
                        <option value="daily">Daily</option>
                        <option value="3x/week">3x per week</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <hr className="my-6 border-gray-200 dark:border-gray-700" />

                    <div>
                      <label className="block text-primary dark:text-secondary font-semibold mb-2">
                        Weekly Goal (workouts)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={generalSettings.weeklyGoal}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            weeklyGoal: Number(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-primary dark:text-secondary font-semibold mb-2">
                        Daily Calorie Goal
                      </label>
                      <input
                        type="number"
                        value={generalSettings.dailyCalorieGoal}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({
                            ...prev,
                            dailyCalorieGoal: Number(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                  About
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      App Name
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      Fitness Tracker
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      Version
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">1.0.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      Created by
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      Your Development Team
                    </p>
                  </div>
                  <hr className="my-4 border-gray-200 dark:border-gray-700" />
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="block text-primary hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="block text-primary hover:underline font-semibold"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="block text-primary hover:underline font-semibold"
                    >
                      Help & Support
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Theme */}
            {activeTab === 'theme' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                  Theme
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-primary transition-all">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Sun size={20} className="text-primary dark:text-secondary" />
                    <div>
                      <p className="font-semibold text-primary dark:text-secondary">
                        Light Mode
                      </p>
                      <p className="text-sm text-primary dark:text-secondary opacity-70">
                        White background with dark text
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-primary transition-all">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Moon size={20} className="text-primary dark:text-secondary" />
                    <div>
                      <p className="font-semibold text-primary dark:text-secondary">
                        Dark Mode
                      </p>
                      <p className="text-sm text-primary dark:text-secondary opacity-70">
                        Dark background with light text
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-primary transition-all">
                    <input
                      type="radio"
                      name="theme"
                      value="auto"
                      checked={theme === 'auto'}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Monitor size={20} className="text-primary dark:text-secondary" />
                    <div>
                      <p className="font-semibold text-primary dark:text-secondary">
                        Auto (System)
                      </p>
                      <p className="text-sm text-primary dark:text-secondary opacity-70">
                        Follow your system settings
                      </p>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Data Collected */}
            {activeTab === 'data' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                  Data Collected
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-dark rounded-lg">
                    <p className="font-semibold text-primary dark:text-secondary mb-2">
                      Profile Information
                    </p>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      Name, email, age, weight, height, gender
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-dark rounded-lg">
                    <p className="font-semibold text-primary dark:text-secondary mb-2">
                      Workout Data
                    </p>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      Exercise history, duration, calories, heart rate, body temperature
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-dark rounded-lg">
                    <p className="font-semibold text-primary dark:text-secondary mb-2">
                      Diet Data
                    </p>
                    <p className="text-sm text-primary dark:text-secondary opacity-70">
                      Meal logs, recommendations, preferences
                    </p>
                  </div>

                  <hr className="my-6 border-gray-200 dark:border-gray-700" />

                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-secondary transition-all">
                      Export My Data
                    </button>
                    <button className="w-full py-2 px-4 rounded-lg border-2 border-error text-error font-semibold hover:bg-error hover:text-white transition-all">
                      Request Data Deletion
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Language */}
            {activeTab === 'language' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                  Language
                </h2>
                <div>
                  <label className="block text-primary dark:text-secondary font-semibold mb-2">
                    Select Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-primary dark:text-secondary opacity-70 mt-2">
                    Changes will apply immediately to the entire app
                  </p>
                </div>
              </motion.div>
            )}

            {/* Account */}
            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
                  Account
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-primary dark:text-secondary opacity-70">
                      Email Address
                    </label>
                    <p className="font-semibold text-primary dark:text-secondary">
                      {currentUser?.email}
                    </p>
                  </div>

                  <hr className="my-4 border-gray-200 dark:border-gray-700" />

                  <button className="w-full py-2 px-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-secondary transition-all">
                    Change Email
                  </button>

                  <button className="w-full py-2 px-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-secondary transition-all">
                    Change Password
                  </button>

                  <hr className="my-4 border-gray-200 dark:border-gray-700" />

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-2 px-4 rounded-lg border-2 border-error text-error font-semibold hover:bg-error hover:text-white transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-cardDark rounded-xl max-w-md w-full p-8"
          >
            <h2 className="text-2xl font-bold text-error mb-4">Delete Account</h2>
            <p className="text-primary dark:text-secondary mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-sm text-primary dark:text-secondary">
                  I understand this is permanent
                </span>
              </label>
              <input
                type="email"
                placeholder="Type your email to confirm"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-error focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 rounded-lg border-2 border-gray-300 font-semibold text-primary dark:text-secondary"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 rounded-lg font-semibold text-white bg-error hover:bg-red-700 transition-all">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
