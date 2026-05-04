import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { StopCircle, CheckCircle, Kitchen } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

export function DispensingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipeName, spices } = location.state || { recipeName: 'Recipe', spices: [] };

  const [progress, setProgress] = useState(0);
  const [currentSpice, setCurrentSpice] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalDuration = 10000; // 10 seconds simulation
    const interval = 50; // Update every 50ms
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    const spiceInterval = setInterval(() => {
      setCurrentSpice((prev) => {
        if (prev < spices.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(spiceInterval);
  }, [spices]);

  const handleEmergencyStop = () => {
    if (confirm('Are you sure you want to stop dispensing?')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {isComplete ? (
        // Success Screen
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="text-green-600" style={{ fontSize: '60px' }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Dispensing Complete!</h1>
            <p className="text-gray-600 mb-4">{recipeName}</p>
            <p className="text-sm text-gray-500">Returning to dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg">
            <div className="text-center">
              <Kitchen className="text-5xl mx-auto mb-3" />
              <h1 className="text-2xl font-bold mb-1">Dispensing</h1>
              <p className="text-blue-100">{recipeName}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
              {/* Progress Circle */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={192}
                  thickness={4}
                  className="text-blue-600"
                  style={{ color: '#2563eb' }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-gray-800">{Math.round(progress)}%</p>
                  <p className="text-sm text-gray-500 mt-1">Complete</p>
                </div>
              </div>

              {/* Current Spice */}
              {spices.length > 0 && currentSpice < spices.length && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 text-center mb-2">Currently dispensing</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="font-bold text-gray-800 text-lg">
                      {spices[currentSpice]?.name || 'Spice'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {spices[currentSpice]?.quantity || 0}g
                    </p>
                  </div>
                </div>
              )}

              {/* Spice List */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">Spices in this recipe</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {spices.map((spice: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between text-sm p-2 rounded ${
                        index === currentSpice
                          ? 'bg-blue-100 border border-blue-300'
                          : index < currentSpice
                          ? 'bg-green-50 text-gray-500'
                          : 'bg-white'
                      }`}
                    >
                      <span className="font-medium">
                        {index < currentSpice ? '✓ ' : ''}
                        {spice.name}
                      </span>
                      <span className="text-gray-600">{spice.quantity}g</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Stop */}
          <div className="p-6 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={handleEmergencyStop}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 active:bg-red-800 transition-colors shadow-lg"
            >
              <StopCircle className="text-3xl" />
              EMERGENCY STOP
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Tap to abort dispensing immediately
            </p>
          </div>
        </>
      )}
    </div>
  );
}
