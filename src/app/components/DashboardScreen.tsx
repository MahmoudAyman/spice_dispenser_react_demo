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

export function DashboardScreen() {
  const navigate = useNavigate();
  const [dispensing, setDispensing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<string | null>(null);

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

  const handleDispense = (recipeId: number) => {
    setDispensing(true);
    setCurrentRecipe(`Recipe ${recipeId}`);
  };

  const handleEmergencyStop = () => {
    setDispensing(false);
    setCurrentRecipe(null);
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

      {/* Emergency Stop - Only visible when dispensing */}
      {dispensing && (
        <div className="sticky top-0 z-50 bg-red-600 p-4 shadow-lg">
          <button
            onClick={handleEmergencyStop}
            className="w-full bg-white text-red-600 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            <StopCircle className="text-3xl" />
            EMERGENCY STOP
          </button>
          <p className="text-center text-white text-sm mt-2">
            Dispensing: {currentRecipe}
          </p>
        </div>
      )}

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
                  onClick={() => handleDispense(recipe.id)}
                  disabled={dispensing}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
