import React from "react";
import { Box, Typography, Button, Switch } from "@mui/material";

const PickupLocation: React.FC = () => {
  return (
    <div>
      {/* Business branches title */}
      <Typography variant="h6" sx={{ color: '#101828', mb: 4 }}>
        Business branches
      </Typography>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Branch Card 1 */}
        <div className="w-[320px] border border-[#EAECF0] rounded-lg">
          <div className="p-4">
            <Typography variant="h6" sx={{ color: '#1D2939', fontSize: '14px', fontWeight: 600 }}>
              Island branch
            </Typography>
            <Typography variant="body2" sx={{ color: '#475467', fontSize: '14px', fontWeight: 400 }}>
              2, Adeniji Jones street, Victoria Island, Lagos
            </Typography>
          </div>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ bgcolor: '#F9FAFB', px: 1, py: 2 }}
          >
            <Button
              variant="text"
              sx={{ color: '#101828', textTransform: 'none', '&:hover': { bgcolor: 'transparent' } }}
            >
              Set as pickup location
            </Button>

            <Switch
              sx={{
                transform: 'scale(1.2)',
                '& .MuiSwitch-switchBase': {
                  '& .MuiSwitch-thumb': {
                    bgcolor: 'white',
                  },
                  '&.Mui-checked': {
                    color: '#039855',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#039855',
                    },
                    '& .MuiSwitch-thumb': {
                      bgcolor: 'white',
                    },
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#D0D5DD',
                },
              }}
            />
          </Box>
        </div>

        {/* Branch Card 2 */}
        <div className="w-[320px] border border-[#EAECF0] rounded-lg">
          <div className="p-4">
            <Typography variant="h6" sx={{ color: '#1D2939', fontSize: '14px', fontWeight: 600 }}>
              Ikeja branch
            </Typography>
            <Typography variant="body2" sx={{ color: '#475467', fontSize: '14px', fontWeight: 400 }}>
              15, Allen Avenue, Ikeja, Lagos
            </Typography>
          </div>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ bgcolor: '#F9FAFB', px: 1, py: 2 }}
          >
            <Button
              variant="text"
              sx={{ color: '#101828', textTransform: 'none', '&:hover': { bgcolor: 'transparent' } }}
            >
              Set as pickup location
            </Button>

            <Switch
              sx={{
                transform: 'scale(1.2)',
                '& .MuiSwitch-switchBase': {
                  '& .MuiSwitch-thumb': {
                    bgcolor: 'white',
                  },
                  '&.Mui-checked': {
                    color: '#039855',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#039855',
                    },
                    '& .MuiSwitch-thumb': {
                      bgcolor: 'white',
                    },
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#D0D5DD',
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PickupLocation;
