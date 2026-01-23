import React, { useState } from 'react';

const OperationsSettings: React.FC = () => {
  const [apps, setApps] = useState([
    { id: 'kds', name: 'Kitchen Display System', description: 'Real-time order display to manage orders efficiently', enabled: true },
    { id: 'handheld', name: 'Hand-held devices', description: '', enabled: false },
    { id: 'kiosk1', name: 'Troo Kiosk', description: '', enabled: false },
    { id: 'kiosk2', name: 'Troo Kiosk', description: '', enabled: false },
    { id: 'kiosk3', name: 'Troo Kiosk', description: '', enabled: false },
  ]);

  const toggleApp = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, enabled: !app.enabled } : app));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Operational applications</h3>
        <p className="text-sm text-gray-500 mt-1">Configure apps and tools for your staff and back-office operations</p>
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{app.name}</h4>
              {app.description && <p className="text-xs text-gray-500 mt-0.5">{app.description}</p>}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={app.enabled}
                onChange={() => toggleApp(app.id)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsSettings;
