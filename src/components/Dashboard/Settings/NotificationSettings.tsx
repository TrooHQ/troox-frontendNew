import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 'email', name: 'Email', enabled: true },
    { id: 'sms', name: 'SMS', enabled: false },
    { id: 'push', name: 'Push', enabled: false },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <p className="text-sm text-gray-500 mt-1">We may still send you important notifications about your account outside of your notification settings.</p>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-8 flex">
        <div className="w-1/3">
          <h4 className="text-sm font-medium text-gray-900">Order notifications</h4>
          <p className="text-xs text-gray-500 mt-1">Configure how you want to notified about orders</p>
        </div>
        <div className="flex-1 space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notif.enabled}
                  onChange={() => toggleNotification(notif.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
              <span className="text-sm text-gray-700 font-medium">{notif.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
