import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowBack, Edit, Refresh, Tune, CalendarToday, Warning } from '@mui/icons-material';

export function ContainerManagementScreen() {
  const navigate = useNavigate();
  const [selectedContainer, setSelectedContainer] = useState<number | null>(null);
  const [lowSpiceThreshold, setLowSpiceThreshold] = useState(15);

  const containers = [
    {
      id: 1,
      name: 'Smoked Paprika',
      level: 85,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-08-15',
      lastRefillDate: '2026-03-01',
      calibrationFactor: 1.02,
    },
    {
      id: 2,
      name: 'Cumin',
      level: 45,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-07-20',
      lastRefillDate: '2026-02-15',
      calibrationFactor: 0.98,
    },
    {
      id: 3,
      name: 'Turmeric',
      level: 92,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-09-10',
      lastRefillDate: '2026-04-01',
      calibrationFactor: 1.0,
    },
    {
      id: 4,
      name: 'Black Pepper',
      level: 12,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-06-30',
      lastRefillDate: '2026-01-10',
      calibrationFactor: 1.05,
    },
    {
      id: 5,
      name: 'Coriander',
      level: 67,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-10-05',
      lastRefillDate: '2026-03-15',
      calibrationFactor: 0.99,
    },
    {
      id: 6,
      name: 'Garlic Powder',
      level: 38,
      maxCapacity: 200,
      unit: 'g',
      expiryDate: '2026-08-25',
      lastRefillDate: '2026-02-28',
      calibrationFactor: 1.01,
    },
  ];

  const handleRefill = (containerId: number) => {
    if (confirm('Mark this container as refilled?')) {
      // Handle refill logic
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          >
            <ArrowBack />
          </button>
          <h1 className="text-xl font-bold">Container Management</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Device Management */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Connected Device</h3>
              <p className="text-sm text-gray-600">Spice Dispenser #1</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Change Device
            </button>
          </div>
        </div>

        {/* Global Settings */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Tune className="text-blue-600" />
            <h2 className="font-bold text-gray-800">Global Settings</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Low Spice Threshold
              </label>
              <p className="text-xs text-gray-500">Alert when level drops below</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={lowSpiceThreshold}
                onChange={(e) => setLowSpiceThreshold(parseInt(e.target.value))}
                min="0"
                max="100"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
              <span className="text-sm font-medium text-gray-600">%</span>
            </div>
          </div>
        </div>

        {/* Container List */}
        <div className="p-4 space-y-4">
          {containers.map((container) => (
            <div
              key={container.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Container Header */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">Slot {container.id}</span>
                      {container.level <= lowSpiceThreshold && (
                        <Warning className="text-red-500 text-sm" />
                      )}
                      {isExpiringSoon(container.expiryDate) && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                          Expires Soon
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{container.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedContainer(container.id === selectedContainer ? null : container.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="text-gray-600" />
                  </button>
                </div>

                {/* Level Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span className="font-semibold">{container.level}%</span>
                    <span>
                      {Math.round(container.maxCapacity * container.level / 100)} / {container.maxCapacity} {container.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        container.level <= lowSpiceThreshold
                          ? 'bg-red-500'
                          : container.level <= 30
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${container.level}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Container Details */}
              <div className="p-4 space-y-3">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CalendarToday className="text-gray-400 text-sm mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Expiry Date</p>
                      <p className={`text-sm ${isExpiringSoon(container.expiryDate) ? 'text-orange-600 font-semibold' : 'text-gray-800'}`}>
                        {new Date(container.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Refresh className="text-gray-400 text-sm mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Last Refill</p>
                      <p className="text-sm text-gray-800">
                        {new Date(container.lastRefillDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calibration */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Calibration Factor</p>
                      <p className="text-sm text-gray-500">Gram-to-unit conversion</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">{container.calibrationFactor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleRefill(container.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Refresh />
                    Mark Refilled
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    <Tune />
                    Calibrate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
