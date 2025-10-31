import React, { useState, useMemo } from 'react';
import { Search, X, Zap } from 'lucide-react';
import { WORKOUTS, INTENSITY_COLORS, COLORS } from '../utils/constants';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', ...new Set(WORKOUTS.map((w) => w.category))];

interface Workout {
  id: string;
  name: string;
  category: string;
  intensity: 'Low' | 'Medium' | 'High';
  typicalDuration: number;
  calorieRangeLow: number;
  calorieRangeHigh: number;
  description: string;
}

export const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutForm, setWorkoutForm] = useState({
    duration: 30,
    heartRate: 120,
    bodyTemperature: 98.6,
    notes: '',
  });

  const filteredWorkouts = useMemo(() => {
    return WORKOUTS.filter((workout) => {
      const matchesSearch = workout.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || workout.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setWorkoutForm({
      duration: workout.typicalDuration,
      heartRate: 120,
      bodyTemperature: 98.6,
      notes: '',
    });
    setShowWorkoutModal(true);
  };

  const handleSaveWorkout = async () => {
    if (!selectedWorkout) return;

    try {
      // TODO: Call Cloud Function for calorie prediction
      // TODO: Save to Firestore
      setShowWorkoutModal(false);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-6">
          Workout Library
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-3 top-3 text-primary dark:text-secondary opacity-50"
          />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === category
                  ? 'text-secondary shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-primary dark:text-secondary hover:shadow-md'
              }`}
              style={{
                backgroundColor:
                  activeCategory === category ? COLORS.primary : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Workout Grid */}
      {filteredWorkouts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-primary dark:text-secondary opacity-70">
            {searchQuery
              ? 'No exercises found. Try a different search.'
              : 'No exercises in this category yet.'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWorkouts.map((workout, idx) => (
            <motion.div
              key={workout.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary dark:text-secondary mb-2">
                    {workout.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-primary dark:text-secondary">
                      {workout.category}
                    </span>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        backgroundColor: INTENSITY_COLORS[workout.intensity],
                      }}
                    >
                      {workout.intensity}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-primary dark:text-secondary opacity-70 mb-4">
                {workout.description}
              </p>

              <div className="space-y-2 mb-6 text-sm">
                <p className="text-primary dark:text-secondary">
                  ⏱️ {workout.typicalDuration} minutes
                </p>
                <p className="text-primary dark:text-secondary">
                  🔥 {workout.calorieRangeLow}-{workout.calorieRangeHigh} cal
                </p>
              </div>

              <button
                onClick={() => handleStartWorkout(workout)}
                className="w-full py-3 rounded-lg font-semibold text-secondary transition-all hover:shadow-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                Start Workout
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Workout Modal */}
      {showWorkoutModal && selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-cardDark rounded-xl max-w-md w-full p-8"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-6">
              Log Your Workout
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Exercise
                </label>
                <p className="text-primary dark:text-secondary font-semibold">
                  {selectedWorkout.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={workoutForm.duration}
                  onChange={(e) =>
                    setWorkoutForm((prev) => ({
                      ...prev,
                      duration: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  min="0"
                  value={workoutForm.heartRate}
                  onChange={(e) =>
                    setWorkoutForm((prev) => ({
                      ...prev,
                      heartRate: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Body Temperature (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={workoutForm.bodyTemperature}
                  onChange={(e) =>
                    setWorkoutForm((prev) => ({
                      ...prev,
                      bodyTemperature: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary dark:text-secondary mb-2">
                  Notes
                </label>
                <textarea
                  value={workoutForm.notes}
                  onChange={(e) =>
                    setWorkoutForm((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="How did it feel?"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-dark dark:text-secondary dark:border-gray-600"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowWorkoutModal(false)}
                className="flex-1 py-3 rounded-lg border-2 font-semibold transition-all"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWorkout}
                className="flex-1 py-3 rounded-lg font-semibold text-secondary flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Zap size={20} />
                Calculate & Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
