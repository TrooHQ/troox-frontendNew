import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutComponent from '../../../Overview/Layout/LayoutComponent';

// interface variation {
//   id: number;
//   name: string;
//   status: string;
// }

const AddMenuVariation: React.FC = () => {
  const [groupName, setGroupName] = useState('');
      const [varVisibility, setVarVisibility] = useState(false);


  return (
    <LayoutComponent
      title="Add Menu Variations"
      // description="Organize your menu with modifier groups and modifiers"
      HeaderAction={
        <div className="flex gap-3">
          <Link
            to="/menu-variation"
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800">
            Save changes
          </button>
        </div>
      }
    >
      <div className="min-h-screen">
        <div className="h-px w-full bg-gray-100 mb-8" />

        {/* Modifier Groups Form */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-3">
            <h3 className="text-base font-semibold text-gray-900">Variation groups</h3>
          </div>
          <div className="col-span-9 space-y-6">
            {/* Group Name */}
            <div className="max-w-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Group name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g Toppings"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

          
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 mb-8" />
          <div className="max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Show as active</p>
                  <p className="text-xs text-gray-500 mt-0.5">This variation group will be visible on the menu</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVarVisibility(!varVisibility)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${varVisibility ? 'bg-black' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${varVisibility ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            </div>
       
      </div>
    </LayoutComponent>
  );
};

export default AddMenuVariation;
