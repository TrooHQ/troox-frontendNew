import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import LayoutComponent from "../Overview/Layout/LayoutComponent";

const AddNewRole: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [level1Access, setLevel1Access] = useState("");
  const [level2Access, setLevel2Access] = useState("");
  const [level3Access, setLevel3Access] = useState("");
  const [level1MenuManagement, setLevel1MenuManagement] = useState(false);
  const [level1BranchManagement, setLevel1BranchManagement] = useState(false);
  const [level1TicketManagement, setLevel1TicketManagement] = useState(false);
  const [level2MenuManagement, setLevel2MenuManagement] = useState(false);
  const [level2BranchManagement, setLevel2BranchManagement] = useState(false);
  const [level2TicketManagement, setLevel2TicketManagement] = useState(false);
  const [level3MenuManagement, setLevel3MenuManagement] = useState(false);
  const [level3BranchManagement, setLevel3BranchManagement] = useState(false);
  const [level3TicketManagement, setLevel3TicketManagement] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving new role:", {
      roleName,
      roleDescription,
      level1Access,
      level2Access,
      level3Access,
      level1MenuManagement,
      level1BranchManagement,
      level1TicketManagement,
      level2MenuManagement,
      level2BranchManagement,
      level2TicketManagement,
      level3MenuManagement,
      level3BranchManagement,
      level3TicketManagement,
    });
    navigate("/manage-customers");
  };

  const handleCancel = () => {
    navigate("/manage-customers");
  };

  return (
    <div className="">
      <LayoutComponent title=" Add New Role" description=" Define a new role with specific permissions and access levels.">
        <div className="mt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#101828] text-white rounded-md hover:bg-[#101828]/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-3 gap-8">
            {/* Role Information Title Column */}
            <div className="flex items-start">
              <h2 className="text-lg font-medium text-[#101828]">
                Role Information
              </h2>
            </div>

            {/* Form Fields - 2 Column Layout */}
            <div className="col-span-2 space-y-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Role name
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Description
                </label>
                <textarea
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent resize-none"
                  placeholder="Enter role description"
                />
              </div>

              {/* Permission Settings */}
              <div>
                <h3 className="text-lg font-medium text-[#101828] mb-2">Permission settings</h3>
                <p className="text-sm text-[#344054] mb-6">
                  Configure access levels and specific permissions for this role
                </p>

                {/* Level 1 Access */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Level 1 Access
                  </label>
                  <input
                    type="text"
                    value={level1Access}
                    onChange={(e) => setLevel1Access(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-4"
                    placeholder="Enter level 1 access description"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="level1MenuManagement"
                        type="checkbox"
                        checked={level1MenuManagement}
                        onChange={(e) => setLevel1MenuManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level1MenuManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Menu management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level1BranchManagement"
                        type="checkbox"
                        checked={level1BranchManagement}
                        onChange={(e) => setLevel1BranchManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level1BranchManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Branch management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level1TicketManagement"
                        type="checkbox"
                        checked={level1TicketManagement}
                        onChange={(e) => setLevel1TicketManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level1TicketManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Ticket management
                      </label>
                    </div>
                  </div>
                </div>

                {/* Level 2 Access */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Level 2 Access
                  </label>
                  <input
                    type="text"
                    value={level2Access}
                    onChange={(e) => setLevel2Access(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-4"
                    placeholder="Enter level 2 access description"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="level2MenuManagement"
                        type="checkbox"
                        checked={level2MenuManagement}
                        onChange={(e) => setLevel2MenuManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level2MenuManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Menu management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level2BranchManagement"
                        type="checkbox"
                        checked={level2BranchManagement}
                        onChange={(e) => setLevel2BranchManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level2BranchManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Branch management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level2TicketManagement"
                        type="checkbox"
                        checked={level2TicketManagement}
                        onChange={(e) => setLevel2TicketManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level2TicketManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Ticket management
                      </label>
                    </div>
                  </div>
                </div>

                {/* Level 3 Access */}
                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Level 3 Access
                  </label>
                  <input
                    type="text"
                    value={level3Access}
                    onChange={(e) => setLevel3Access(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-4"
                    placeholder="Enter level 3 access description"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="level3MenuManagement"
                        type="checkbox"
                        checked={level3MenuManagement}
                        onChange={(e) => setLevel3MenuManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level3MenuManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Menu management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level3BranchManagement"
                        type="checkbox"
                        checked={level3BranchManagement}
                        onChange={(e) => setLevel3BranchManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level3BranchManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Branch management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="level3TicketManagement"
                        type="checkbox"
                        checked={level3TicketManagement}
                        onChange={(e) => setLevel3TicketManagement(e.target.checked)}
                        className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                      />
                      <label htmlFor="level3TicketManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                        Ticket management
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutComponent>
    </div>
  );
};

export default AddNewRole;
