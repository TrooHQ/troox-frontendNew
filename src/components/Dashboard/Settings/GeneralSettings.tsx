import React from 'react';
import { FaRegImage } from "react-icons/fa6";


const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Configure basic information and preferences for your tenant</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Discard
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black">
            Save changes
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Business Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Business information</h4>
        </div>
        <div className="md:col-span-2 space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Konki Restaurant"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business type <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white">
                <option>Dine-in</option>
                <option>Takeaway</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business email
              </label>
              <input
                type="email"
                defaultValue="koti@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Business Logo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Business logo</h4>
          <p className="text-xs text-gray-500 mt-1">Upload your restaurant logo</p>
        </div>
        <div className="md:col-span-2 space-y-4 max-w-2xl">
          {/* Logo Upload */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <FaRegImage className="text-gray-400 w-5 h-5" />
            </div>
            <div className="flex-1 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>+</span> Upload logo
              </div>
              <p className="text-xs text-gray-500 mt-1">(JPG, PNG, SVG. Max file size: 2MB)</p>
            </div>
          </div>

          {/* Banner Upload */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <FaRegImage className="text-gray-400 w-5 h-5" />
            </div>
            <div className="flex-1 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>+</span> Upload banner
              </div>
              <p className="text-xs text-gray-500 mt-1">(JPG, PNG, SVG. Max file size: 2MB)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Bank Account */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Bank Account Information</h4>
          <p className="text-xs text-gray-500 mt-1">Primary account for receiving payments and settlements</p>
        </div>
        <div className="md:col-span-2">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700">
            <span>+</span> New account
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Operational Hours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Operational hours</h4>
          <p className="text-xs text-gray-500 mt-1">Set default operating hours for your locations</p>
        </div>
        <div className="md:col-span-2 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
            <span className="text-sm font-medium text-gray-700">Select all days</span>
          </div>

          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day} className="flex items-center gap-8">
              <div className="flex items-center gap-3 w-32">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input type="text" defaultValue="9:00 AM" className="w-28 pl-8 pr-2 py-2 border border-gray-300 rounded text-sm text-gray-500" />
                  <span className="absolute left-2.5 top-2.5 text-gray-400">🕒</span>
                </div>
                <span className="text-sm text-gray-500">to</span>
                <div className="relative">
                  <input type="text" defaultValue="9:00 PM" className="w-28 pl-8 pr-2 py-2 border border-gray-300 rounded text-sm text-gray-500" />
                  <span className="absolute left-2.5 top-2.5 text-gray-400">🕒</span>
                </div>
              </div>
            </div>
          ))}

          {['Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center gap-8">
              <div className="flex items-center gap-3 w-32">
                <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </div>
              <span className="text-sm text-gray-400 italic">Closed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
