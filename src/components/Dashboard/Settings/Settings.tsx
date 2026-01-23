import React, { useState } from 'react'; // Refreshing import
import LayoutComponent from '../../Overview/Layout/LayoutComponent';
import GeneralSettings from './GeneralSettings';
import LocationSettings from './LocationSettings';
import OperationsSettings from './OperationsSettings';
import NotificationSettings from './NotificationSettings';

const NewSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'General' | 'Locations' | 'Operations apps' | 'Notifications'>('General');

  const tabs = [
    { id: 'General', label: 'General' },
    { id: 'Locations', label: 'Locations' },
    { id: 'Operations apps', label: 'Operations apps' },
    { id: 'Notifications', label: 'Notifications' },
  ];

  return (
    <LayoutComponent
      title="Restaurant Settings"
      description="Manage your restaurant's information, settings, and integrations"
    >
      <div className="min-h-screen bg-transparent">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'General' && <GeneralSettings />}
          {activeTab === 'Locations' && <LocationSettings />}
          {activeTab === 'Operations apps' && <OperationsSettings />}
          {activeTab === 'Notifications' && <NotificationSettings />}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default NewSettings;
