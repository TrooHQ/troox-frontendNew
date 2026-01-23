import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import DashboardLayout from "./DashboardLayout";
// import TopMenuNav from "./TopMenuNav";
// import CustomInput from "../inputFields/CustomInput";
// import CustomSelect5 from "../inputFields/CustomSelect5";
import LayoutComponent from "../Overview/Layout/LayoutComponent";

const InviteCustomer: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const handleCancel = () => {
    navigate("/manage-customers");
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving customer:", {
      firstName,
      lastName,
      email,
      mobileNumber,
      selectedRole,
      selectedBranch,
    });
    // Navigate back to manage customers
    navigate("/manage-customers");
  };

  // Mock options - replace with actual data
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Operator", value: "operator" },
    { label: "General Users", value: "general" },
  ];

  const branchOptions = [
    { label: "Main Branch", value: "main" },
    { label: "Downtown Branch", value: "downtown" },
    { label: "Airport Branch", value: "airport" },
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="">
      <LayoutComponent title=" Invite User" description=" Send an invitation to a new user to join the system.">

        <div className="mt-6">
          {/* Title and Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div></div>
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
          <div className="p-6 ">
            <div className="grid grid-cols-3 gap-8">
              {/* User Information Title Column */}
              <div className="flex items-start">
                <h2 className="text-lg font-medium text-[#101828]">
                  User Information
                </h2>
              </div>

              {/* Form Fields - 2 Column Layout */}
              <div className="grid grid-cols-2 col-span-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent appearance-none"
                    >
                      <option value="" disabled className="text-[#98A2B3]">Select role</option>
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value} className="text-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#98A2B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#475467] mb-2">
                    Branch
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBranch}
                      onChange={(e) => handleBranchSelect(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent appearance-none"
                    >
                      <option value="" disabled className="text-[#98A2B3]">Select branch</option>
                      {branchOptions.map((option) => (
                        <option key={option.value} value={option.value} className="text-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#98A2B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
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

export default InviteCustomer;
