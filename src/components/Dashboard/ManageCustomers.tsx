import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Modal from "../Modal";

const ManageCustomers: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRoleActionsModalOpen, setIsRoleActionsModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleActionsPosition, setRoleActionsPosition] = useState<{ x: number; y: number } | null>(null);

  // Edit modal form state
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissionsInput, setPermissionsInput] = useState("");
  const [menuManagement, setMenuManagement] = useState(false);
  const [branchManagement, setBranchManagement] = useState(false);
  const [ticketManagement, setTicketManagement] = useState(false);

  // Edit role form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userRole, setUserRole] = useState("");
  const [branch, setBranch] = useState("");

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleInviteClick = () => {
    navigate("/invite-customer");
  };

  const handleNewRoleClick = () => {
    navigate("/add-new-role");
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setMobileNumber(user.mobileNumber || "");
    setUserRole(user.role || "");
    setBranch(user.branch || "");
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditSave = () => {
    // Handle save logic here
    console.log("Saving role:", {
      roleName,
      roleDescription,
      permissionsInput,
      menuManagement,
      branchManagement,
      ticketManagement,
    });
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    console.log("Deleting user:", selectedUser);
    setIsDeleteModalOpen(false);
  };

  const handleRoleActionsClick = (event: React.MouseEvent<HTMLButtonElement>, role: any) => {
    event.stopPropagation(); // Prevent card click
    const rect = event.currentTarget.getBoundingClientRect();
    setRoleActionsPosition({ x: rect.left, y: rect.bottom });
    setSelectedRole(role);
    setIsRoleActionsModalOpen(!isRoleActionsModalOpen); // Toggle instead of always open
  };

  const handleEditRoleClick = () => {
    setIsRoleActionsModalOpen(false);
    setIsEditRoleModalOpen(true);
    // Pre-populate form with role data if available
    setFirstName(selectedRole?.firstName || "");
    setLastName(selectedRole?.lastName || "");
    setEmail(selectedRole?.email || "");
    setMobileNumber(selectedRole?.mobileNumber || "");
    setUserRole(selectedRole?.role || "");
    setBranch(selectedRole?.branch || "");
  };

  const handleDeleteRoleClick = () => {
    setIsRoleActionsModalOpen(false);
    setIsDeleteRoleModalOpen(true);
  };

  const handleDeleteRoleConfirm = () => {
    // Handle delete role logic here
    console.log("Deleting role:", selectedRole);
    setIsDeleteRoleModalOpen(false);
  };

  const handleEditRoleSave = () => {
    // Handle save logic here
    console.log("Saving edited role:", {
      firstName,
      lastName,
      email,
      mobileNumber,
      userRole,
      branch,
    });
    setIsEditRoleModalOpen(false);
  };

  return (
    <div className="">
      <DashboardLayout>
      
        <div className="mt-6">
          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#101828] mb-2">
              Manage Users
            </h1>
            <p className="text-base text-[#344054]">
              Manage your team members and their account permissions here.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-6 border-b border-[#EAECF0]">
            <div className="flex items-center gap-8">
              {["All Users", "Roles"].map((tab, index) => (
                <button
                  key={index}
                  className={`pb-3 px-1 font-medium transition-colors ${
                    index === activeTab
                      ? "text-[#1D2939] font-semibold border-b-2 border-[#1D2939]"
                      : "text-[#667085] font-medium"
                  }`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Content based on active tab */}
          {activeTab === 0 ? (
            <>
              {/* Search and Invite Button */}
              <div className="flex items-center justify-between mb-8">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#98A2B3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, email or employee ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#D0D5DD] rounded-md bg-transparent text-[#98A2B3] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleInviteClick}
                  className="flex items-center gap-2 bg-[#101828] text-white px-4 py-2 rounded-md hover:bg-[#101828]/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Invite Users
                </button>
              </div>

              {/* Users Table */}
              <div className="border border-[#EAECF0] rounded-lg overflow-hidden">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        User Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        Employee ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        Last login
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#667085] ">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {/* Sample Data Rows */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#1D2939]">Gabar Usman</span>
                          <span className="text-sm text-[#667085]">Gabe@gmail.com</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">Admin</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">EMP-2025-001</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">2 hours ago</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#F2F4F7] bg-[#039855]/10 text-[#039855]">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick({ name: "Gabar Usman", email: "Gabe@gmail.com", role: "Admin" })}
                            className="text-sm font-medium text-[#1D2939] hover:text-[#1D2939]/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick({ name: "Gabar Usman", email: "Gabe@gmail.com", role: "Admin" })}
                            className="text-sm font-medium text-[#D92D20] hover:text-[#D92D20]/80"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#1D2939]">Sarah Johnson</span>
                          <span className="text-sm text-[#667085]">sarah.johnson@company.com</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">Operator</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">EMP-2025-002</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">5 minutes ago</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#F2F4F7] bg-[#039855]/10 text-[#039855]">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick({ name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Operator" })}
                            className="text-sm font-medium text-[#1D2939] hover:text-[#1D2939]/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick({ name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Operator" })}
                            className="text-sm font-medium text-[#D92D20] hover:text-[#D92D20]/80"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#1D2939]">Michael Chen</span>
                          <span className="text-sm text-[#667085]">michael.chen@company.com</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">General User</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">EMP-2025-003</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">1 day ago</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#F2F4F7] bg-[#98A2B3]/10 text-[#98A2B3]">
                          Inactive
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick({ name: "Michael Chen", email: "michael.chen@company.com", role: "General User" })}
                            className="text-sm font-medium text-[#1D2939] hover:text-[#1D2939]/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick({ name: "Michael Chen", email: "michael.chen@company.com", role: "General User" })}
                            className="text-sm font-medium text-[#D92D20] hover:text-[#D92D20]/80"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#1D2939]">Emma Davis</span>
                          <span className="text-sm text-[#667085]">emma.davis@company.com</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">Operator</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">EMP-2025-004</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="text-sm text-[#1D2939]">3 hours ago</span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#F2F4F7] bg-[#039855]/10 text-[#039855]">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-[#EAECF0]">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick({ name: "Emma Davis", email: "emma.davis@company.com", role: "Operator" })}
                            className="text-sm font-medium text-[#1D2939] hover:text-[#1D2939]/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick({ name: "Emma Davis", email: "emma.davis@company.com", role: "Operator" })}
                            className="text-sm font-medium text-[#D92D20] hover:text-[#D92D20]/80"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#1D2939]">David Wilson</span>
                          <span className="text-sm text-[#667085]">david.wilson@company.com</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1D2939]">Admin</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1D2939]">EMP-2025-005</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1D2939]">30 minutes ago</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#F2F4F7] bg-[#039855]/10 text-[#039855]">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick({ name: "David Wilson", email: "david.wilson@company.com", role: "Admin" })}
                            className="text-sm font-medium text-[#1D2939] hover:text-[#1D2939]/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick({ name: "David Wilson", email: "david.wilson@company.com", role: "Admin" })}
                            className="text-sm font-medium text-[#D92D20] hover:text-[#D92D20]/80"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* New Role Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={handleNewRoleClick}
                  className="flex items-center gap-2 bg-[#101828] text-white px-4 py-2 rounded-md hover:bg-[#101828]/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  New Role
                </button>
              </div>

              {/* Roles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Head Office Admin Card */}
                <div className="border border-[#EAECF0] rounded-lg p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-[#1D2939]">Head Office Admin</h3>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => handleRoleActionsClick(e, { name: "Head Office Admin", level: 1 })}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#A6F4C5] text-[#027A48]">
                      Level 1
                    </span>
                  </div>

                  <p className="text-sm text-[#344054] mb-4">
                    Full system access with ability to manage all aspects of the platform
                  </p>

                  <div className="flex items-center mb-6">
                    <svg className="w-5 h-5 text-[#667085] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-sm text-[#DC6803]">5 users</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#344054] mb-3">Permissions</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-normal border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Menu management
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-normal border border-[#F2F4F7] text-[#344054] bg-transparent">
                          User management
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-normal border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Branch management
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-normal border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Analytics
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch Manager Card */}
                <div className="border border-[#EAECF0] rounded-lg p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-[#1D2939]">Branch Manager</h3>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => handleRoleActionsClick(e, { name: "Branch Manager", level: 2 })}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B2DDFF] text-[#175CD3]">
                      Level 2
                    </span>
                  </div>

                  <p className="text-sm text-[#344054] mb-4">
                    Regional oversight with branch-specific management capabilities
                  </p>

                  <div className="flex items-center mb-6">
                    <svg className="w-5 h-5 text-[#667085] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-sm text-[#DC6803]">3 users</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#344054] mb-3">Permissions</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Menu management
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Branch management
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Staff scheduling
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Reports
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operator Card */}
                <div className="border border-[#EAECF0] rounded-lg p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-[#1D2939]">Operator</h3>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => handleRoleActionsClick(e, { name: "Operator", level: 3 })}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FECDD6] text-[#C01048]">
                      Level 3
                    </span>
                  </div>

                  <p className="text-sm text-[#344054] mb-4">
                    Front-line operations with order processing and customer service access
                  </p>

                  <div className="flex items-center mb-6">
                    <svg className="w-5 h-5 text-[#667085] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-sm text-[#DC6803]">8 users</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#344054] mb-3">Permissions</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Order processing
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Customer service
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Table management
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-[#F2F4F7] text-[#344054] bg-transparent">
                          Basic reports
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DashboardLayout>

      {/* Edit Role Modal (for role cards) */}
      <Modal isOpen={isEditRoleModalOpen} onClose={() => setIsEditRoleModalOpen(false)}>
        <div className="py-[20px] 2xl:py-[48px] px-[20px] 2xl:px-[48px] bg-white relative rounded-[10px] w-[500px] max-h-[95vh] overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-[500] text-black">Edit Role</h2>
            <button
              onClick={() => setIsEditRoleModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-[#475467] mb-2">
                Role name
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
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
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent resize-none"
                placeholder="Enter role description"
              />
            </div>

            {/* Permission Settings */}
            <div>
              <h3 className="text-lg font-medium text-[#101828] mb-2">Permission settings</h3>
              <p className="text-sm text-[#475467] mb-4 font-normal">
                Configure access levels and specific permissions for this role
              </p>

              <input
                type="text"
                value={permissionsInput}
                onChange={(e) => setPermissionsInput(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-4"
                placeholder="Enter permission settings"
              />

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="menuManagement"
                    type="checkbox"
                    checked={menuManagement}
                    onChange={(e) => setMenuManagement(e.target.checked)}
                    className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                  />
                  <label htmlFor="menuManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                    Menu management
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="branchManagement"
                    type="checkbox"
                    checked={branchManagement}
                    onChange={(e) => setBranchManagement(e.target.checked)}
                    className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                  />
                  <label htmlFor="branchManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                    Branch management
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="ticketManagement"
                    type="checkbox"
                    checked={ticketManagement}
                    onChange={(e) => setTicketManagement(e.target.checked)}
                    className="w-4 h-4 text-[#101828] border-[#D0D5DD] rounded focus:ring-[#101828] focus:ring-2"
                  />
                  <label htmlFor="ticketManagement" className="ml-3 text-sm font-medium text-[#1D2939]">
                    Ticket management
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center pt-6 gap-4">
            <button
              onClick={() => setIsEditRoleModalOpen(false)}
              className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditRoleSave}
              className="px-6 py-2 bg-[#101828] text-white rounded-md hover:bg-[#101828]/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
      {/* Delete User Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="py-[20px] 2xl:py-[50px] px-[20px] 2xl:px-[50px] bg-white relative rounded-[20px] w-[520px]">
          <div>
            <h2 className="text-[24px] font-bold text-[#101828] mb-4">Delete user</h2>
            <p className="text-[16px] text-[#667085] mb-8 whitespace-nowrap">
              You are about to delete this user. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-[#D92D20] text-white rounded-md hover:bg-[#D92D20]/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Role Modal */}
      <Modal isOpen={isDeleteRoleModalOpen} onClose={() => setIsDeleteRoleModalOpen(false)}>
        <div className="py-[20px] 2xl:py-[50px] px-[20px] 2xl:px-[50px] bg-white relative rounded-[20px] w-[520px]">
          <div>
            <h2 className="text-[24px] font-bold text-[#101828] mb-4">Delete role</h2>
            <p className="text-[16px] text-[#667085] mb-8 whitespace-nowrap">
              You are about to delete this role. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteRoleModalOpen(false)}
                className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRoleConfirm}
                className="px-6 py-2 bg-[#D92D20] text-white rounded-md hover:bg-[#D92D20]/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Role Actions Dropdown */}
      {isRoleActionsModalOpen && roleActionsPosition && (
        <div
          className="fixed z-50 bg-white border border-[#EAECF0] rounded-md shadow-lg py-2 w-48"
          style={{
            left: roleActionsPosition.x,
            top: roleActionsPosition.y,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEditRoleClick}
            className="w-full px-4 py-2 text-left text-sm text-[#1D2939] hover:bg-gray-50 transition-colors"
          >
            Edit Role
          </button>
          <button
            onClick={handleDeleteRoleClick}
            className="w-full px-4 py-2 text-left text-sm text-[#D92D20] hover:bg-gray-50 transition-colors"
          >
            Delete Role
          </button>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isRoleActionsModalOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsRoleActionsModalOpen(false)}
        />
      )}

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="py-[20px] 2xl:py-[48px] px-[20px] 2xl:px-[48px] bg-white relative rounded-[10px] w-[600px] max-h-[95vh] overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-[500] text-black">Edit User</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Left Column: First Name and Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Right Column: Last Name and Mobile Phone Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Mobile phone number
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Bottom Row: Role and Branch */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Operator">Operator</option>
                  <option value="General User">General User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475467] mb-2">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
                >
                  <option value="">Select branch</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Branch A">Branch A</option>
                  <option value="Branch B">Branch B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center pt-6 gap-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              className="px-6 py-2 bg-[#101828] text-white rounded-md hover:bg-[#101828]/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ManageCustomers;
