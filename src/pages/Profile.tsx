import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User as UserIcon, Edit2, Save, X } from 'lucide-react';
import { FITNESS_GOALS, COLORS } from '../utils/constants';
import { motion } from 'framer-motion';

interface UserProfile {
  uid?: string;
  email?: string;
  fullName: string;
  bio: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  gender: string | null;
  goals: string[];
  profilePhoto?: string;
}

export const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: currentUser?.displayName || '',
    bio: '',
    age: null,
    weight: null,
    height: null,
    gender: null,
    goals: [],
    email: currentUser?.email || '',
    profilePhoto: currentUser?.photoURL || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleEditClick = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Save to Firestore
      setProfile(tempProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    setTempProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setTempProfile((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal].slice(0, 3),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold text-primary dark:text-secondary">Profile</h1>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-secondary transition-all hover:shadow-lg"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Edit2 size={20} />
            Edit Profile
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={64} className="text-primary dark:text-secondary opacity-50" />
              )}
            </div>
            {isEditing && (
              <button className="w-full mt-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-secondary transition-all">
                Change Photo
              </button>
            )}
            <div className="mt-6 text-left space-y-2">
              <p className="text-sm text-primary dark:text-secondary opacity-70">Email</p>
              <p className="font-semibold text-primary dark:text-secondary">{profile.email}</p>
              <p className="text-sm text-primary dark:text-secondary opacity-70 mt-4">
                Member Since
              </p>
              <p className="font-semibold text-primary dark:text-secondary">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6">
              Personal Information
            </h2>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                  />
                ) : (
                  <p className="text-primary dark:text-secondary">{profile.fullName}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Bio
                  <span className="text-gray-400 text-xs ml-2">
                    ({tempProfile.bio.length}/200)
                  </span>
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.bio}
                    onChange={(e) =>
                      handleProfileChange('bio', e.target.value.slice(0, 200))
                    }
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                  />
                ) : (
                  <p className="text-primary dark:text-secondary">
                    {profile.bio || 'No bio added yet'}
                  </p>
                )}
              </div>

              {/* Age, Weight, Height */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="13"
                      max="120"
                      value={tempProfile.age || ''}
                      onChange={(e) =>
                        handleProfileChange('age', e.target.value ? Number(e.target.value) : null)
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                    />
                  ) : (
                    <p className="text-primary dark:text-secondary">
                      {profile.age || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                    Weight (kg)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={tempProfile.weight || ''}
                      onChange={(e) =>
                        handleProfileChange(
                          'weight',
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                    />
                  ) : (
                    <p className="text-primary dark:text-secondary">
                      {profile.weight || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                    Height (cm)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={tempProfile.height || ''}
                      onChange={(e) =>
                        handleProfileChange(
                          'height',
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                    />
                  ) : (
                    <p className="text-primary dark:text-secondary">
                      {profile.height || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={tempProfile.gender || ''}
                    onChange={(e) => handleProfileChange('gender', e.target.value || null)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                  >
                    <option value="">Not specified</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="text-primary dark:text-secondary capitalize">
                    {profile.gender || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6">
              Fitness Goals
            </h2>

            <div className="space-y-3">
              {FITNESS_GOALS.map((goal) => (
                <label key={goal} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempProfile.goals.includes(goal)}
                    onChange={() => (isEditing ? handleGoalToggle(goal) : null)}
                    disabled={!isEditing}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className="text-primary dark:text-secondary">{goal}</span>
                </label>
              ))}
              {isEditing && (
                <p className="text-xs text-primary dark:text-secondary opacity-70 mt-4">
                  Max 3 goals selected
                </p>
              )}
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-3 rounded-lg font-semibold text-secondary flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-lg font-semibold border-2 flex items-center justify-center gap-2 transition-all"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Workout Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6">
          Workout Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary dark:text-secondary">0</p>
            <p className="text-sm text-primary dark:text-secondary opacity-70">
              Total Workouts
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary dark:text-secondary">0</p>
            <p className="text-sm text-primary dark:text-secondary opacity-70">
              Total Calories Burned
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary dark:text-secondary">0</p>
            <p className="text-sm text-primary dark:text-secondary opacity-70">
              Avg Duration (min)
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary dark:text-secondary">0</p>
            <p className="text-sm text-primary dark:text-secondary opacity-70">
              Current Streak
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
