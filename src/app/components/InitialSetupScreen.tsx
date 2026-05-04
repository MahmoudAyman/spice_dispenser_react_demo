import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Kitchen, ArrowForward, ArrowBack } from '@mui/icons-material';

export function InitialSetupScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [containers, setContainers] = useState([
    { id: 1, name: '', expiryDate: '', maxCapacity: 200 },
    { id: 2, name: '', expiryDate: '', maxCapacity: 200 },
    { id: 3, name: '', expiryDate: '', maxCapacity: 200 },
    { id: 4, name: '', expiryDate: '', maxCapacity: 200 },
    { id: 5, name: '', expiryDate: '', maxCapacity: 200 },
    { id: 6, name: '', expiryDate: '', maxCapacity: 200 },
  ]);

  const steps = [
    { title: 'Welcome', description: 'Set up your spice dispenser' },
    { title: 'Configure Slots', description: 'Name your spice containers' },
    { title: 'Complete', description: 'Ready to use' },
  ];

  const updateContainer = (id: number, field: string, value: string) => {
    setContainers(
      containers.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return containers.every((c) => c.name.trim() !== '' && c.expiryDate !== '');
    }
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Kitchen className="text-4xl" />
          <h1 className="text-2xl font-bold">Initial Setup</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    index <= currentStep
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-400 text-blue-200'
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="text-lg" /> : index + 1}
                </div>
                <p className="text-xs mt-1 text-center">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 -mt-6 ${
                    index < currentStep ? 'bg-white' : 'bg-blue-400'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Step 0: Welcome */}
        {currentStep === 0 && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <Kitchen className="text-blue-600 mx-auto mb-4" style={{ fontSize: '80px' }} />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome!</h2>
              <p className="text-gray-600 mb-6">
                Let's set up your Spice Dispenser. This will only take a minute.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Configure Spice Slots</h3>
                    <p className="text-sm text-gray-600">
                      Name each slot and set expiry dates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Create Recipes</h3>
                    <p className="text-sm text-gray-600">
                      Mix and match spices for perfect blends
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Start Dispensing</h3>
                    <p className="text-sm text-gray-600">
                      Precise measurements every time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Configure Slots */}
        {currentStep === 1 && (
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Configure Spice Slots</h2>
              <p className="text-sm text-gray-600">
                Set up each slot with the spice name and expiry date
              </p>
            </div>

            <div className="space-y-3">
              {containers.map((container) => (
                <div
                  key={container.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {container.id}
                    </div>
                    <h3 className="font-semibold text-gray-700">Slot {container.id}</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Spice Name *
                      </label>
                      <input
                        type="text"
                        value={container.name}
                        onChange={(e) => updateContainer(container.id, 'name', e.target.value)}
                        placeholder="e.g., Smoked Paprika"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={container.expiryDate}
                        onChange={(e) =>
                          updateContainer(container.id, 'expiryDate', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Complete */}
        {currentStep === 2 && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" style={{ fontSize: '50px' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">All Set!</h2>
              <p className="text-gray-600 mb-6">
                Your Spice Dispenser is ready to use. You can now create recipes and start
                dispensing.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Quick Tip:</strong> You can always update spice slots and calibration
                  from the Settings screen.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 mb-1">6</p>
                  <p className="text-xs text-gray-600">Spice Slots</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 mb-1">0</p>
                  <p className="text-xs text-gray-600">Recipes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <ArrowBack />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
