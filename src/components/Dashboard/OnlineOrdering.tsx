import React, { useState } from "react";
import { Typography } from "@mui/material";
import PickupLocation from "./PickupLocation";

const OnlineOrdering: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  return (
    <div>
      {/* Online ordering title */}
      <Typography variant="h6" sx={{ color: '#101828', mb: 2, fontWeight: 'bold' }}>
        Online ordering
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" sx={{ color: '#475467', mb: 4 }}>
        Configure pickup locations, delivery settings, and customize your online ordering experience
      </Typography>

      {/* Divider */}
      <hr className="border-[#EAECF0] mb-6" />

      {/* Sub Tabs */}
      <div className="flex items-center justify-between mb-6 border-b border-[#EAECF0]">
        <div className="flex items-center gap-8">
          {["Pickup", "Pickup Location"].map((tab, index) => (
            <button
              key={index}
              className={`pb-3 px-1 font-medium transition-colors ${index === activeSubTab
                ? "text-[#1D2939] font-semibold border-b-2 border-[#1D2939]"
                : "text-[#667085] font-medium"
                }`}
              onClick={() => setActiveSubTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Content based on active sub tab */}
      {activeSubTab === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#667085]">Pickup content goes here</p>
        </div>
      ) : (
        <PickupLocation />
      )}
    </div>
  );
};

export default OnlineOrdering;
