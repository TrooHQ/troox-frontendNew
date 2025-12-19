import React from 'react';
import { FaStore } from 'react-icons/fa6';

const LocationSettings: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Address information</h3>
          <p className="text-sm text-gray-500 mt-1">Manage all your restaurant branch locations</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#0A0A0A] rounded-lg hover:bg-black/90">
          Add location
        </button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
          <FaStore className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-900">No branch location added</h3>
      </div>
    </div>
  );
};

export default LocationSettings;
