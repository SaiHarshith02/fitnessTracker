import React, { useState } from 'react';
import { Apple, RefreshCw, Eye, Plus, Trash2, Loader } from 'lucide-react';
import { COLORS } from '../utils/constants';
import { motion } from 'framer-motion';

interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  benefits: string;
}

const sampleMeals: Meal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    category: 'lunch',
    ingredients: ['Chicken breast', 'Mixed greens', 'Tomato', 'Olive oil'],
    calories: 350,
    protein: 45,
    carbs: 15,
    fats: 8,
    benefits: 'High in protein for muscle building and recovery',
  },
  {
    id: '2',
    name: 'Greek Yogurt Parfait',
    category: 'breakfast',
    ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey'],
    calories: 280,
    protein: 20,
    carbs: 35,
    fats: 5,
    benefits: 'Rich in probiotics and calcium for digestive health',
  },
  {
    id: '3',
    name: 'Salmon with Sweet Potato',
    category: 'dinner',
    ingredients: ['Salmon fillet', 'Sweet potato', 'Asparagus', 'Lemon'],
    calories: 420,
    protein: 38,
    carbs: 45,
    fats: 12,
    benefits: 'Omega-3s for heart health and energy',
  },
  {
    id: '4',
    name: 'Protein Energy Balls',
    category: 'snack',
    ingredients: ['Almond butter', 'Oats', 'Dark chocolate', 'Honey'],
    calories: 180,
    protein: 8,
    carbs: 20,
    fats: 9,
    benefits: 'Quick energy boost with sustained fuel',
  },
  {
    id: '5',
    name: 'Quinoa Bowl',
    category: 'lunch',
    ingredients: ['Quinoa', 'Black beans', 'Avocado', 'Cilantro lime'],
    calories: 380,
    protein: 14,
    carbs: 52,
    fats: 11,
    benefits: 'Complete protein with all amino acids',
  },
];

export const Diet: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Meal[]>(sampleMeals);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(1500);
  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);
  const [mealForm, setMealForm] = useState({ name: '', calories: '', mealType: '' });

  const handleGenerateRecommendations = async () => {
    setLoading(true);
    try {
      // TODO: Call Gemini API via Cloud Function
      // For now, just simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setRecommendations(sampleMeals);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowRecipeModal(true);
  };

  const handleAddMeal = () => {
    if (mealForm.name && mealForm.calories && mealForm.mealType) {
      const calories = Number(mealForm.calories);
      setLoggedMeals((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: mealForm.name,
          calories,
          mealType: mealForm.mealType,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setDailyCalories((prev) => prev + calories);
      setMealForm({ name: '', calories: '', mealType: '' });
    }
  };

  const handleRemoveMeal = (id: number) => {
    const meal = loggedMeals.find((m) => m.id === id);
    if (meal) {
      setLoggedMeals((prev) => prev.filter((m) => m.id !== id));
      setDailyCalories((prev) => prev - meal.calories);
    }
  };

  const totalCalories = 2000;
  const caloriePercentage = (dailyCalories / totalCalories) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-2">
            Personalized Diet Plan
          </h1>
          <p className="text-primary dark:text-secondary opacity-70">
            Last updated: Today at 2:30 PM
          </p>
        </div>
        <button
          onClick={handleGenerateRecommendations}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-secondary transition-all hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: COLORS.primary }}
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw size={20} />
              Get New
            </>
          )}
        </button>
      </motion.div>

      {/* Recommendations Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-6">
          AI Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary dark:text-secondary mb-2">
                    {meal.name}
                  </h3>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-primary dark:text-secondary capitalize">
                    {meal.category}
                  </span>
                </div>
                <Apple size={24} className="text-primary" />
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-primary dark:text-secondary opacity-70">
                    Ingredients:
                  </p>
                  <ul className="text-sm text-primary dark:text-secondary mt-1 space-y-1">
                    {meal.ingredients.slice(0, 4).map((ing, i) => (
                      <li key={i}>• {ing}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-primary dark:text-secondary opacity-70">
                      Calories
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      {meal.calories}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary dark:text-secondary opacity-70">
                      Protein
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      {meal.protein}g
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary dark:text-secondary opacity-70">
                      Carbs
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      {meal.carbs}g
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary dark:text-secondary opacity-70">
                      Fats
                    </p>
                    <p className="font-semibold text-primary dark:text-secondary">
                      {meal.fats}g
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-primary dark:text-secondary opacity-70">
                    Benefits:
                  </p>
                  <p className="text-sm text-primary dark:text-secondary mt-1">
                    {meal.benefits}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleViewRecipe(meal)}
                className="w-full py-2 rounded-lg border-2 font-semibold text-primary dark:text-secondary transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{ borderColor: COLORS.primary }}
              >
                View Recipe
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Daily Meal Tracker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-cardDark rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-6">
          Daily Meal Tracker
        </h2>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-primary dark:text-secondary">
              {dailyCalories} / {totalCalories} calories
            </span>
            <span className="text-sm text-primary dark:text-secondary opacity-70">
              {Math.round(caloriePercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(caloriePercentage, 100)}%`,
                backgroundColor: COLORS.primary,
              }}
            />
          </div>
        </div>

        {/* Add Meal Form */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-dark rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              placeholder="Meal name"
              value={mealForm.name}
              onChange={(e) => setMealForm((prev) => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-cardDark dark:text-secondary dark:border-gray-600 text-sm"
            />
            <select
              value={mealForm.mealType}
              onChange={(e) =>
                setMealForm((prev) => ({ ...prev, mealType: e.target.value }))
              }
              className="px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-cardDark dark:text-secondary dark:border-gray-600 text-sm"
            >
              <option value="">Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <input
              type="number"
              placeholder="Calories"
              value={mealForm.calories}
              onChange={(e) => setMealForm((prev) => ({ ...prev, calories: e.target.value }))}
              className="px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none dark:bg-cardDark dark:text-secondary dark:border-gray-600 text-sm"
            />
            <button
              onClick={handleAddMeal}
              className="py-2 rounded-lg font-semibold text-secondary flex items-center justify-center gap-2 transition-all hover:shadow-lg"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

        {/* Logged Meals */}
        {loggedMeals.length === 0 ? (
          <p className="text-primary dark:text-secondary opacity-70 text-center py-4">
            No meals logged yet. Add your first meal!
          </p>
        ) : (
          <div className="space-y-2">
            {loggedMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark rounded-lg"
              >
                <div>
                  <p className="font-semibold text-primary dark:text-secondary">
                    {meal.name}
                  </p>
                  <p className="text-xs text-primary dark:text-secondary opacity-70">
                    {meal.time} • {meal.mealType}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-primary dark:text-secondary">
                    {meal.calories} cal
                  </span>
                  <button
                    onClick={() => handleRemoveMeal(meal.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
                  >
                    <Trash2 size={18} className="text-error" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recipe Modal */}
      {showRecipeModal && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-cardDark rounded-xl max-w-md w-full p-8 max-h-96 overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-6">
              {selectedMeal.name}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary dark:text-secondary mb-2">
                  Ingredients:
                </h3>
                <ul className="space-y-1">
                  {selectedMeal.ingredients.map((ing, i) => (
                    <li key={i} className="text-sm text-primary dark:text-secondary">
                      • {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary dark:text-secondary mb-2">
                  Nutrition:
                </h3>
                <p className="text-sm text-primary dark:text-secondary">
                  Calories: {selectedMeal.calories} | Protein: {selectedMeal.protein}g |
                  Carbs: {selectedMeal.carbs}g | Fats: {selectedMeal.fats}g
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary dark:text-secondary mb-2">
                  Instructions:
                </h3>
                <p className="text-sm text-primary dark:text-secondary">
                  1. Prepare ingredients
                  <br />
                  2. Follow recipe steps
                  <br />
                  3. Serve and enjoy!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowRecipeModal(false)}
              className="w-full mt-6 py-3 rounded-lg font-semibold text-secondary"
              style={{ backgroundColor: COLORS.primary }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
