import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bluetooth, BluetoothSearching, BluetoothConnected, Refresh } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

export function ConnectionScreen() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([
    { id: '1', name: 'Spice Dispenser #1', rssi: -45, paired: true },
    { id: '2', name: 'Spice Dispenser #2', rssi: -68, paired: false },
  ]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const handleConnect = (deviceId: string, isPaired: boolean) => {
    if (isPaired) {
      navigate('/dashboard');
    } else {
      navigate('/setup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 shadow-md">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Bluetooth className="text-4xl" />
          <h1 className="text-2xl font-semibold">Spice Dispenser</h1>
        </div>
        <p className="text-center text-blue-100 text-sm">Connect to your device</p>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {scanning ? (
              <>
                <BluetoothSearching className="text-blue-600 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Scanning...</span>
              </>
            ) : (
              <>
                <Bluetooth className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Ready to scan</span>
              </>
            )}
          </div>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {scanning ? <CircularProgress size={16} className="text-white" /> : <Refresh className="text-lg" />}
            <span className="text-sm font-medium">Scan</span>
          </button>
        </div>
      </div>

      {/* Device List */}
      <div className="flex-1 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Devices</h2>
        <div className="space-y-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleConnect(device.id, device.paired)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${device.paired ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {device.paired ? (
                      <BluetoothConnected className="text-green-600 text-2xl" />
                    ) : (
                      <Bluetooth className="text-gray-600 text-2xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{device.name}</h3>
                    <p className="text-sm text-gray-500">Signal: {device.rssi} dBm</p>
                  </div>
                </div>
                <div>
                  {device.paired && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Paired
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {devices.length === 0 && !scanning && (
          <div className="text-center py-12">
            <Bluetooth className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No devices found</p>
            <p className="text-sm text-gray-400 mt-2">Tap scan to search for devices</p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50 border-t border-blue-100 p-4">
        <p className="text-xs text-center text-gray-600">
          Make sure your Spice Dispenser is powered on and within range
        </p>
      </div>
    </div>
  );
}
