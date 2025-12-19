import React, { useState } from "react";
import LayoutComponent from "../Overview/Layout/LayoutComponent";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { Close, Add, DeleteOutline } from "@mui/icons-material";
import InRoomDining from "./InRoomDining";
import TableQRCode from "./TableQRCode";
import OnlineOrdering from "./OnlineOrdering";

const ManageAssest: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isManageAreasModalOpen, setIsManageAreasModalOpen] = useState(false);
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [businessLocation, setBusinessLocation] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [numberOfFloors, setNumberOfFloors] = useState('4');
  const [addRoomFloor, setAddRoomFloor] = useState('');
  const [addRoomNumber, setAddRoomNumber] = useState('');
  const [newArea, setNewArea] = useState('');
  const [currentAreas, setCurrentAreas] = useState(['Main Dining', 'Plato', 'Bay Area']);
  const [addTableArea, setAddTableArea] = useState('');
  const [addTableNumber, setAddTableNumber] = useState('');
  const [addSeatingCapacity, setAddSeatingCapacity] = useState('');

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleSubTabChange = (index: number) => {
    setActiveSubTab(index);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsGenerated(false); // Reset on close
  };
  const handleGenerate = () => {
    setIsGenerated(true);
    setIsModalOpen(false);
  };

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleSaveChanges = () => setIsEditModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    setIsGenerated(false); // Reset to empty state
  };

  const handleOpenConfigureModal = () => setIsConfigureModalOpen(true);
  const handleCloseConfigureModal = () => setIsConfigureModalOpen(false);
  const handleSaveConfiguration = () => setIsConfigureModalOpen(false);

  const handleOpenAddRoomModal = () => setIsAddRoomModalOpen(true);
  const handleCloseAddRoomModal = () => setIsAddRoomModalOpen(false);
  const handleAddRoom = () => setIsAddRoomModalOpen(false);

  const handleAddArea = () => {
    if (newArea.trim()) {
      setCurrentAreas([...currentAreas, newArea.trim()]);
      setNewArea('');
    }
  };

  const handleRemoveArea = (index: number) => {
    setCurrentAreas(currentAreas.filter((_, i) => i !== index));
  };

  const handleCloseManageAreasModal = () => setIsManageAreasModalOpen(false);

  const handleOpenAddTableModal = () => setIsAddTableModalOpen(true);
  const handleCloseAddTableModal = () => setIsAddTableModalOpen(false);
  const handleAddTable = () => setIsAddTableModalOpen(false);

  return (
    <div className="">
      <LayoutComponent title="Manage Assets" description="Configure QR codes, online ordering, and kiosk settings for your business.">
        <div className="mt-6">

          {/* Main Tabs */}
          <div className="flex items-center justify-between mb-6 border-b border-[#EAECF0]">
            <div className="flex items-center gap-8">
              {["QR Ordering", "Online Ordering", "Troo Kiosk"].map((tab, index) => (
                <button
                  key={index}
                  className={`pb-3 px-1 font-medium transition-colors ${index === activeTab
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

          {/* Conditional Content based on active main tab */}
          {activeTab === 0 ? (
            <>
              {/* QR Ordering Description */}
              <div className="mb-6">
                <p className="text-[#667085]">
                  Generate one unique code per service type and assign multiple rooms or tables to it.
                </p>
              </div>

              {/* Sub Tabs */}
              <div className="flex items-center justify-between mb-6 border-b border-[#EAECF0]">
                <div className="flex items-center gap-8">
                  {["In-Room Dining", "Table QR Code"].map((tab, index) => (
                    <button
                      key={index}
                      className={`pb-3 px-1 font-medium transition-colors ${index === activeSubTab
                        ? "text-[#1D2939] font-semibold border-b-2 border-[#1D2939]"
                        : "text-[#667085] font-medium"
                        }`}
                      onClick={() => handleSubTabChange(index)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Content based on active sub tab */}
              {activeSubTab === 0 ? (
                <InRoomDining
                  isGenerated={isGenerated}
                  onOpenModal={handleOpenModal}
                  onOpenEditModal={handleOpenEditModal}
                  onOpenDeleteModal={handleOpenDeleteModal}
                  onOpenConfigureModal={handleOpenConfigureModal}
                  onOpenAddRoomModal={handleOpenAddRoomModal}
                />
              ) : (
                <TableQRCode
                  onOpenEditModal={handleOpenEditModal}
                  onOpenDeleteModal={handleOpenDeleteModal}
                  onOpenManageAreasModal={() => setIsManageAreasModalOpen(true)}
                  onOpenAddTableModal={handleOpenAddTableModal}
                />
              )}
            </>
          ) : activeTab === 1 ? (
            <OnlineOrdering />
          ) : (
            <>
              {/* Troo Kiosk Content */}
              <div className="text-center py-12">
                <p className="text-[#667085]">Troo Kiosk content goes here</p>
              </div>
            </>
          )}
        </div>
      </LayoutComponent>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-qr-modal"
        aria-describedby="create-qr-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#101828' }}>
              Create QR code
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Box>

          {/* QR SVG */}
          <Box display="flex" justifyContent="flex-start" mb={3}>
            <img
              src="/qrcode.svg"
              alt="QR Code"
              width="80"
              height="80"
              style={{ color: '#1D2939' }}
            />
          </Box>

          {/* Business Location */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Business location
          </Typography>
          <select
            value={businessLocation}
            onChange={(e) => setBusinessLocation(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-white text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select location</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Sulere">Sulere</option>
            <option value="VI">VI</option>
          </select>

          {/* Room Number */}
          <Typography variant="body1" sx={{ mb: 1, color: '#475467' }}>
            Room number
          </Typography>
          <select
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select room</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </select>

          {/* Destination URL */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Destination URL
          </Typography>
          <input
            type="text"
            placeholder="www.example.com"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={4}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button onClick={handleGenerate} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }}>
              Generate Code
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-qr-modal"
        aria-describedby="edit-qr-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#101828' }}>
              Edit QR code
            </Typography>
            <IconButton onClick={handleCloseEditModal}>
              <Close />
            </IconButton>
          </Box>

          {/* QR SVG */}
          <Box display="flex" justifyContent="flex-start" mb={3}>
            <img
              src="/qrcode.svg"
              alt="QR Code"
              width="80"
              height="80"
              style={{ color: '#1D2939' }}
            />
          </Box>

          {/* Business Location */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Business location
          </Typography>
          <select
            value={businessLocation}
            onChange={(e) => setBusinessLocation(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-white text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select location</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Sulere">Sulere</option>
            <option value="VI">VI</option>
          </select>

          {/* Room Number */}
          <Typography variant="body1" sx={{ mb: 1, color: '#475467' }}>
            Room number
          </Typography>
          <select
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select room</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </select>

          {/* Destination URL */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Destination URL
          </Typography>
          <input
            type="text"
            placeholder="www.example.com"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={4}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}
              onClick={handleCloseEditModal}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }}>
              Save changes
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="remove-qr-modal"
        aria-describedby="remove-qr-confirmation"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="py-[20px] 2xl:py-[50px] px-[20px] 2xl:px-[50px] bg-white relative rounded-[20px] w-[520px]">
            <div>
              <h2 className="text-[24px] font-bold text-[#101828] mb-4">Remove QR Code</h2>
              <p className="text-[16px] text-[#667085] mb-8">
                Tables attached to this QR Code will be removed. Do you want to continue with this action?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseDeleteModal}
                  className="px-6 py-2 border border-[#EAECF0] text-[#101828] rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-[#D92D20] text-white rounded-md hover:bg-[#D92D20]/90 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={isConfigureModalOpen}
        onClose={handleCloseConfigureModal}
        aria-labelledby="configure-floors-modal"
        aria-describedby="configure-floors-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box mb={3}>
            <Typography variant="h6" sx={{ color: '#101828', fontWeight: 600, fontSize: '1.125rem' }}>
              Configure Hotel Floors
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body1" sx={{ color: '#475467', mb: 4 }}>
            Set the number of floors in your hotel. This will be used for room assignment.
          </Typography>

          {/* Number of Floors */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Number of Floors
          </Typography>
          <input
            type="number"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={4}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}
              onClick={handleCloseConfigureModal}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveConfiguration} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }}>
              Save Configuration
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isAddRoomModalOpen}
        onClose={handleCloseAddRoomModal}
        aria-labelledby="add-room-modal"
        aria-describedby="add-room-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box mb={3}>
            <Typography variant="h6" sx={{ color: '#101828', fontWeight: 'bold' }}>
              Add Room
            </Typography>
            <Typography variant="body2" sx={{ color: '#475467', mt: 1 }}>
              Add a new room to the In-Room Dining QR code
            </Typography>
          </Box>

          {/* Floor */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Floor
          </Typography>
          <select
            value={addRoomFloor}
            onChange={(e) => setAddRoomFloor(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-white text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select a floor</option>
            <option value="1st floor">1st floor</option>
            <option value="2nd floor">2nd floor</option>
            <option value="3rd floor">3rd floor</option>
            <option value="4th floor">4th floor</option>
          </select>

          {/* Room Number */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Room Number
          </Typography>
          <input
            type="text"
            placeholder="Enter room number"
            value={addRoomNumber}
            onChange={(e) => setAddRoomNumber(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-1"
          />
          <Typography variant="body2" sx={{ color: '#667085', fontSize: '0.875rem' }}>
            Without floor prefix
          </Typography>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={4}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}
              onClick={handleCloseAddRoomModal}
            >
              Cancel
            </Button>
            <Button onClick={handleAddRoom} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }}>
              Add Room
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isManageAreasModalOpen}
        onClose={handleCloseManageAreasModal}
        aria-labelledby="manage-areas-modal"
        aria-describedby="manage-areas-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h6" sx={{ color: '#101828', fontWeight: 'bold' }}>
                Manage Dining Areas
              </Typography>
              <Typography variant="body2" sx={{ color: '#475467', mt: 1 }}>
                Add or remove dining areas and sections for your restaurant
              </Typography>
            </Box>
            <IconButton onClick={handleCloseManageAreasModal}>
              <Close />
            </IconButton>
          </Box>

          {/* New Area */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            New Area
          </Typography>
          <Box display="flex" gap={2} mb={4}>
            <input
              type="text"
              placeholder="e.g RoofTop, South Side"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
            />
            <Button
              onClick={handleAddArea}
              variant="outlined"
              sx={{ borderColor: '#D0D5DD', color: '#101828', minWidth: 'auto', px: 2 }}
            >
              <Add />
            </Button>
          </Box>

          {/* Current Areas */}
          <Typography variant="h6" sx={{ color: '#101828', mb: 3 }}>
            Current Areas
          </Typography>
          {currentAreas.map((area, index) => (
            <Box key={index} display="flex" gap={2} mb={2}>
              <input
                type="text"
                value={area}
                onChange={(e) => {
                  const newAreas = [...currentAreas];
                  newAreas[index] = e.target.value;
                  setCurrentAreas(newAreas);
                }}
                placeholder="Enter table area"
                className="flex-1 px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent"
              />
              <Button
                onClick={() => handleRemoveArea(index)}
                variant="outlined"
                sx={{ borderColor: '#D0D5DD', color: '#D92D20', minWidth: 'auto', px: 2 }}
              >
                <img
                  src="/delete.svg"
                  alt="Delete"
                  width="16"
                  height="16"
                  style={{ filter: 'invert(15%) sepia(90%) saturate(7000%) hue-rotate(0deg) brightness(90%) contrast(110%)' }}
                />
              </Button>
            </Box>
          ))}

          {/* Done Button */}
          <Box display="flex" justifyContent="flex-end" marginTop={4}>
            <Button onClick={handleCloseManageAreasModal} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' } }}>
              Done
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isAddTableModalOpen}
        onClose={handleCloseAddTableModal}
        aria-labelledby="add-table-modal"
        aria-describedby="add-table-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box mb={3}>
            <Typography variant="h6" sx={{ color: '#101828', fontWeight: 'bold' }}>
              Add Tables
            </Typography>
            <Typography variant="body2" sx={{ color: '#475467', mt: 1 }}>
              Add a new table to the Table Ordering QR code
            </Typography>
          </Box>

          {/* Dining Area */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Dining Area
          </Typography>
          <select
            value={addTableArea}
            onChange={(e) => setAddTableArea(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-white text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          >
            <option value="">Select a dining area</option>
            <option value="Main Dining">Main Dining</option>
            <option value="Plato">Plato</option>
            <option value="Bay Area">Bay Area</option>
          </select>

          {/* Table Number */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Table Number
          </Typography>
          <input
            type="text"
            placeholder="e.g T04"
            value={addTableNumber}
            onChange={(e) => setAddTableNumber(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-3"
          />

          {/* Seating Capacity */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            Seating Capacity
          </Typography>
          <input
            type="number"
            placeholder="e.g. 4"
            value={addSeatingCapacity}
            onChange={(e) => setAddSeatingCapacity(e.target.value)}
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg bg-transparent text-gray-900 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#101828] focus:border-transparent mb-1"
          />
          <Typography variant="body2" sx={{ color: '#667085', fontSize: '0.875rem' }}>
            Number of guests this table can accommodate
          </Typography>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={4}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}
              onClick={handleCloseAddTableModal}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTable} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }}>
              Add Table
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageAssest;
