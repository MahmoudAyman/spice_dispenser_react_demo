import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Home,
  LibraryBooks,
  Settings,
  StopCircle,
  PlayArrow,
  Warning
} from '@mui/icons-material';
import { BottomNavigation } from './BottomNavigation';
import { LinearProgress } from '@mui/material';
import { DispenseConfirmModal } from './DispenseConfirmModal';

export function DashboardScreen() {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{ id: number; name: string } | null>(null);

  const containers = [
    { id: 1, name: 'Smoked Paprika', level: 85, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
    { id: 2, name: 'Cumin', level: 45, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
    { id: 3, name: 'Turmeric', level: 92, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
    { id: 4, name: 'Black Pepper', level: 12, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
    { id: 5, name: 'Coriander', level: 67, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
    { id: 6, name: 'Garlic Powder', level: 38, unit: 'g', maxCapacity: 200, lowThreshold: 15 },
  ];

  const recentRecipes = [
    { id: 1, name: 'Classic Curry', lastUsed: '2 hours ago' },
    { id: 2, name: 'Mexican Blend', lastUsed: 'Yesterday' },
    { id: 3, name: 'Italian Herbs', lastUsed: '3 days ago' },
  ];

  const lowSpiceContainers = containers.filter(c => c.level <= c.lowThreshold);

  const getLevelColor = (level: number, threshold: number) => {
    if (level <= threshold) return 'bg-red-500';
    if (level <= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleDispense = (recipeId: number, recipeName: string) => {
    setSelectedRecipe({ id: recipeId, name: recipeName });
    setShowConfirmModal(true);
  };

  const handleStartDispensing = () => {
    setShowConfirmModal(false);
    if (selectedRecipe) {
      navigate('/dispensing', {
        state: {
          recipeName: selectedRecipe.name,
          spices: [
            { name: 'Smoked Paprika', quantity: 5 },
            { name: 'Cumin', quantity: 8 },
            { name: 'Turmeric', quantity: 3 },
          ],
        },
      });
    }
  };

  const handleAbortDispensing = () => {
    setShowConfirmModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors text-sm"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Connected</span>
          </button>
        </div>
        <p className="text-blue-100 text-sm">Spice Dispenser #1</p>
      </div>

      {/* Low Spice Alert */}
      {lowSpiceContainers.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Warning className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">Low Spice Alert</h3>
              <p className="text-sm text-red-700">
                {lowSpiceContainers.map(c => c.name).join(', ')} running low
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dispense Confirmation Modal */}
      <DispenseConfirmModal
        open={showConfirmModal}
        recipeName={selectedRecipe?.name || ''}
        onStart={handleStartDispensing}
        onAbort={handleAbortDispensing}
      />

      <div className="flex-1 overflow-auto">
        {/* Spice Containers Grid */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Spice Containers</h2>
          <div className="grid grid-cols-2 gap-4">
            {containers.map((container) => (
              <div
                key={container.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">Slot {container.id}</span>
                  {container.level <= container.lowThreshold && (
                    <Warning className="text-red-500 text-sm" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-sm leading-tight">
                  {container.name}
                </h3>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{container.level}%</span>
                    <span>{Math.round(container.maxCapacity * container.level / 100)}{container.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${getLevelColor(container.level, container.lowThreshold)} transition-all`}
                      style={{ width: `${container.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recipes */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Recipes</h2>
            <button
              onClick={() => navigate('/recipes')}
              className="text-sm text-blue-600 font-medium hover:text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                  <p className="text-sm text-gray-500">{recipe.lastUsed}</p>
                </div>
                <button
                  onClick={() => handleDispense(recipe.id, recipe.name)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlayArrow />
                  <span className="text-sm font-medium">Dispense</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation currentPath="/dashboard" />
    </div>
  );
}
