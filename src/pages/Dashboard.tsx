import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Activity, Calendar, Flame, Target, Trash2 } from 'lucide-react';
import { COLORS, MOTIVATIONAL_QUOTES } from '../utils/constants';
import { motion } from 'framer-motion';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<StatCard[]>([]);
  const [quote, setQuote] = useState('');
  const [recentWorkouts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize stats
    setStats([
      {
        icon: <Activity className="w-8 h-8" />,
        label: "Today's Activity",
        value: 0,
        unit: 'calories burned',
        color: COLORS.primary,
      },
      {
        icon: <Calendar className="w-8 h-8" />,
        label: 'Workouts This Week',
        value: 0,
        unit: 'workouts completed',
        color: COLORS.primary,
      },
      {
        icon: <Flame className="w-8 h-8" />,
        label: 'Current Streak',
        value: 0,
        unit: 'day streak',
        color: COLORS.primary,
      },
      {
        icon: <Target className="w-8 h-8" />,
        label: 'Weekly Goal Progress',
        value: 0,
        unit: 'of weekly goal',
        color: COLORS.primary,
      },
    ]);

    // Set random quote
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setQuote(randomQuote);

    // TODO: Load real data from Firestore
  }, []);

  const handleStartWorkout = () => {
    navigate('/menu');
  };

  const handleViewRecommendations = () => {
    navigate('/diet');
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-2">
          Welcome back, {currentUser?.displayName || 'Friend'}!
        </h1>
        <p className="text-primary dark:text-secondary opacity-70">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${COLORS.primary}20` }}>
                {stat.icon}
              </div>
            </div>
            <p className="text-primary dark:text-secondary opacity-70 text-sm mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-primary dark:text-secondary">
              {stat.value}
            </p>
            <p className="text-xs text-primary dark:text-secondary opacity-50 mt-1">
              {stat.unit}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Workouts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary dark:text-secondary">
            Recent Workouts
          </h2>
          <a href="#" className="text-primary hover:underline text-sm font-semibold">
            View All →
          </a>
        </div>

        {recentWorkouts.length === 0 ? (
          <p className="text-primary dark:text-secondary opacity-70">
            No workouts yet. Start your first workout from the Menu!
          </p>
        ) : (
          <div className="space-y-4">
            {recentWorkouts.map((workout: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border-l-4 hover:bg-gray-50 dark:hover:bg-dark rounded transition-colors"
                style={{ borderLeftColor: COLORS.primary }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-primary dark:text-secondary">
                    {workout.name}
                  </p>
                  <p className="text-sm text-primary dark:text-secondary opacity-70">
                    {workout.duration} min • {workout.calories} cal
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <Trash2 size={18} className="text-error" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg border-l-4"
        style={{ borderLeftColor: COLORS.primary }}
      >
        <p className="text-lg italic text-primary dark:text-secondary text-center">
          "{quote}"
        </p>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <button
          onClick={handleStartWorkout}
          className="py-4 rounded-lg font-semibold text-secondary transition-all hover:shadow-lg"
          style={{ backgroundColor: COLORS.primary }}
        >
          Start Quick Workout
        </button>
        <button
          onClick={handleViewRecommendations}
          className="py-4 rounded-lg font-semibold text-secondary transition-all hover:shadow-lg"
          style={{ backgroundColor: COLORS.primary }}
        >
          View AI Recommendations
        </button>
        <button
          onClick={handleUpdateProfile}
          className="py-4 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}
        >
          Update Profile
        </button>
      </motion.div>
    </div>
  );
};
