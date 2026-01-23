import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import { Close, Add, DeleteOutline } from "@mui/icons-material";

interface TableQRCodeProps {
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
  onOpenManageAreasModal: () => void;
  onOpenAddTableModal: () => void;
}

const TableQRCode: React.FC<TableQRCodeProps> = ({
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenManageAreasModal,
  onOpenAddTableModal,
}) => {
  return (
    <>
      {/* Table QR Code Content - Generated QR */}
      <Box display="flex" gap={4} mb={4}>
        {/* QR Code Box */}
        <div className="w-[150px] h-[150px] border border-[#EAECF0] rounded p-4 flex items-center justify-center">
          <img
            src="/qrcode.svg"
            alt="QR Code"
            width="100"
            height="100"
            style={{ color: '#1D2939' }}
          />
        </div>

        {/* Right Side */}
        <Box flex={1}>
          <Typography variant="h6" sx={{ color: '#101828', mb: 1 }}>
            Restaurant branch
          </Typography>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F2F4F7] text-[#475467]">
            4 tables
          </span>

          {/* Buttons below QR */}
          <Box display="flex" gap={2} mt={4}>
            <Button variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
              Print
            </Button>
            <Button onClick={onOpenEditModal} variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
              Edit
            </Button>
            <Button onClick={onOpenDeleteModal} variant="outlined" sx={{ borderColor: '#EAECF0', color: '#D92D20', textTransform: 'none' }}>
              Remove
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <hr className="border-[#EAECF0] mb-4" />

      {/* Dining Areas Configuration */}
      <Box display="flex" gap={3} mb={4}>
        <div className="w-12 h-12 border border-[#EAECF0] bg-[#EAECF0] rounded flex items-center justify-center">
          <img
            src="/hotels.svg"
            alt="Hotels"
            width="20"
            height="20"
          />
        </div>
        <Box flex={1}>
          <Typography variant="h6" sx={{ color: '#101828' }}>
            Dining Areas Configuration
          </Typography>
          <Typography variant="body2" sx={{ color: '#475467' }}>
            Manage dining areas and sections in your restaurant
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
              Main Dining
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
              Plato
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
              Bay Area
            </Button>
          </Box>
        </Box>
        <Box>
          <Button onClick={onOpenManageAreasModal} variant="outlined" sx={{ borderColor: '#EAECF0', color: '#101828', textTransform: 'none' }}>
            Configure Tables
          </Button>
        </Box>
      </Box>

      {/* Divider */}
      <hr className="border-[#EAECF0] mb-4" />

      {/* Assign Tables */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h6" sx={{ color: '#1D2939' }}>
            Assign Tables
          </Typography>
          <Typography variant="body2" sx={{ color: '#1D2939' }}>
            Manage tables that use this QR code
          </Typography>
        </Box>
        <Button onClick={onOpenAddTableModal} sx={{ bgcolor: '#101828', color: 'white', '&:hover': { bgcolor: '#101828' }, textTransform: 'none' }} startIcon={<Add />}>
          New Table
        </Button>
      </Box>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F9FAFB]">
            <th className="px-4 py-3 text-left text-sm font-medium text-[#667085]">Table Number</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#667085]">Area</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#667085]">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#667085]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-[#1D2939]">T01</td>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-[#1D2939]">Main Dining</td>
            <td className="px-4 py-3 border-b border-[#EAECF0]">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#039855]/10 text-[#039855]">
                Active
              </span>
            </td>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-right">
              <Button variant="text" sx={{ color: '#1D2939', minWidth: 'auto', p: 0, mr: 2 }}>
                Edit
              </Button>
              <Button variant="text" sx={{ color: '#D92D20', minWidth: 'auto', p: 0 }}>
                Delete
              </Button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-[#1D2939]">T02</td>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-[#1D2939]">Plato</td>
            <td className="px-4 py-3 border-b border-[#EAECF0]">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#039855]/10 text-[#039855]">
                Active
              </span>
            </td>
            <td className="px-4 py-3 border-b border-[#EAECF0] text-sm text-right">
              <Button variant="text" sx={{ color: '#1D2939', minWidth: 'auto', p: 0, mr: 2 }}>
                Edit
              </Button>
              <Button variant="text" sx={{ color: '#D92D20', minWidth: 'auto', p: 0 }}>
                Delete
              </Button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-[#1D2939]">T03</td>
            <td className="px-4 py-3 text-sm text-[#1D2939]">Bay Area</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#98A2B3]/10 text-[#98A2B3]">
                Inactive
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-right">
              <Button variant="text" sx={{ color: '#1D2939', minWidth: 'auto', p: 0, mr: 2 }}>
                Edit
              </Button>
              <Button variant="text" sx={{ color: '#D92D20', minWidth: 'auto', p: 0 }}>
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableQRCode;
