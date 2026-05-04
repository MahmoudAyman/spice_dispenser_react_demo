import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowBack, Save, Add, Delete, DragIndicator } from '@mui/icons-material';

export function RecipeEditorScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [recipeName, setRecipeName] = useState(isEditing ? 'Classic Curry' : '');
  const [spices, setSpices] = useState(
    isEditing
      ? [
          { id: 1, slot: 1, name: 'Smoked Paprika', quantity: 5 },
          { id: 2, slot: 2, name: 'Cumin', quantity: 8 },
          { id: 3, slot: 3, name: 'Turmeric', quantity: 3 },
        ]
      : []
  );

  const availableSlots = [
    { id: 1, name: 'Smoked Paprika' },
    { id: 2, name: 'Cumin' },
    { id: 3, name: 'Turmeric' },
    { id: 4, name: 'Black Pepper' },
    { id: 5, name: 'Coriander' },
    { id: 6, name: 'Garlic Powder' },
  ];

  const addSpice = () => {
    if (spices.length < 20) {
      const usedSlots = spices.map(s => s.slot);
      const availableSlot = availableSlots.find(slot => !usedSlots.includes(slot.id));
      if (availableSlot) {
        setSpices([
          ...spices,
          {
            id: Date.now(),
            slot: availableSlot.id,
            name: availableSlot.name,
            quantity: 0,
          },
        ]);
      }
    }
  };

  const removeSpice = (spiceId: number) => {
    setSpices(spices.filter(s => s.id !== spiceId));
  };

  const updateSpiceQuantity = (spiceId: number, quantity: number) => {
    setSpices(spices.map(s => (s.id === spiceId ? { ...s, quantity: Math.max(0, quantity) } : s)));
  };

  const updateSpiceSlot = (spiceId: number, slotId: number) => {
    const slot = availableSlots.find(s => s.id === slotId);
    if (slot) {
      setSpices(spices.map(s => (s.id === spiceId ? { ...s, slot: slotId, name: slot.name } : s)));
    }
  };

  const handleSave = () => {
    if (!recipeName.trim()) {
      alert('Please enter a recipe name');
      return;
    }
    if (spices.length === 0) {
      alert('Please add at least one spice');
      return;
    }
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/recipes')}
            className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          >
            <ArrowBack />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{isEditing ? 'Edit Recipe' : 'New Recipe'}</h1>
            <p className="text-blue-100 text-sm">{spices.length} / 20 spices</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Save />
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Recipe Name */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Recipe Name</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter recipe name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Spices List */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Spices</h2>
            <button
              onClick={addSpice}
              disabled={spices.length >= 20}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Add />
              Add Spice
            </button>
          </div>

          <div className="space-y-3">
            {spices.map((spice, index) => (
              <div
                key={spice.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-3">
                    <DragIndicator className="text-gray-400 cursor-move" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Spice Slot
                      </label>
                      <select
                        value={spice.slot}
                        onChange={(e) => updateSpiceSlot(spice.id, parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {availableSlots.map((slot) => (
                          <option key={slot.id} value={slot.id}>
                            Slot {slot.id}: {slot.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Quantity (grams)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={spice.quantity}
                          onChange={(e) => updateSpiceQuantity(spice.id, parseFloat(e.target.value))}
                          min="0"
                          step="0.1"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="text-sm text-gray-500 font-medium">g</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeSpice(spice.id)}
                    className="mt-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {spices.length === 0 && (
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <Add className="text-6xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No spices added yet</p>
              <p className="text-sm text-gray-400 mt-1">Tap "Add Spice" to get started</p>
            </div>
          )}
        </div>

        {/* Total Summary */}
        {spices.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Total Weight</span>
              <span className="text-2xl font-bold text-blue-600">
                {spices.reduce((sum, s) => sum + s.quantity, 0).toFixed(1)} g
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
