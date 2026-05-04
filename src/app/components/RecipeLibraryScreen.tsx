import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Add, Search, Edit, Delete, PlayArrow } from '@mui/icons-material';
import { BottomNavigation } from './BottomNavigation';
import { DispenseConfirmModal } from './DispenseConfirmModal';

export function RecipeLibraryScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<{ id: number; name: string } | null>(null);

  const recipes = [
    { id: 1, name: 'Classic Curry', spiceCount: 8, lastUsed: '2 hours ago', favorite: true },
    { id: 2, name: 'Mexican Blend', spiceCount: 6, lastUsed: 'Yesterday', favorite: true },
    { id: 3, name: 'Italian Herbs', spiceCount: 5, lastUsed: '3 days ago', favorite: false },
    { id: 4, name: 'Chinese Five Spice', spiceCount: 5, lastUsed: '1 week ago', favorite: false },
    { id: 5, name: 'BBQ Rub', spiceCount: 10, lastUsed: '2 weeks ago', favorite: true },
    { id: 6, name: 'Garam Masala', spiceCount: 12, lastUsed: '1 month ago', favorite: false },
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (recipeId: number, recipeName: string) => {
    if (confirm(`Delete recipe "${recipeName}"?`)) {
      // Handle delete
    }
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
        <h1 className="text-2xl font-bold mb-1">Recipe Library</h1>
        <p className="text-blue-100 text-sm">{recipes.length} / 30 recipes</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Dispense Confirmation Modal */}
      <DispenseConfirmModal
        open={showConfirmModal}
        recipeName={selectedRecipe?.name || ''}
        onStart={handleStartDispensing}
        onAbort={handleAbortDispensing}
      />

      {/* Recipe List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {recipe.spiceCount} spices • Last used {recipe.lastUsed}
                    </p>
                  </div>
                  {recipe.favorite && (
                    <span className="text-yellow-500 text-xl">★</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 border-t border-gray-200 divide-x divide-gray-200">
                <button
                  onClick={() => handleDispense(recipe.id, recipe.name)}
                  className="flex items-center justify-center gap-2 py-3 hover:bg-blue-50 transition-colors text-blue-600"
                >
                  <PlayArrow />
                  <span className="text-sm font-medium">Dispense</span>
                </button>
                <button
                  onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                  className="flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Edit />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(recipe.id, recipe.name)}
                  className="flex items-center justify-center gap-2 py-3 hover:bg-red-50 transition-colors text-red-600"
                >
                  <Delete />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <Search className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recipes found</p>
            <p className="text-sm text-gray-400 mt-2">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/recipes/new')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center z-40"
      >
        <Add className="text-3xl" />
      </button>

      <BottomNavigation currentPath="/recipes" />
    </div>
  );
}
