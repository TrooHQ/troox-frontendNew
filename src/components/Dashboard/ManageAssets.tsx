import React, { useState } from "react";
import LayoutComponent from "../Overview/Layout/LayoutComponent";

const ManageAssets: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleSubTabChange = (index: number) => {
    setActiveSubTab(index);
  };

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
                <>
                  {/* In-Room Dining Content */}
                  <div className="flex flex-col items-center justify-center py-12">
                    {/* QR Code SVG */}
                    <div className="mb-6">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#1D2939]"
                      >
                        <path
                          d="M3 3h6v6H3V3zm0 9h6v6H3v-6zm9-9h6v6h-6V3zm0 9h6v6h-6v-6z"
                          fill="currentColor"
                        />
                        <path
                          d="M5 5h2v2H5V5zm0 9h2v2H5v-2zm9-9h2v2h-2V5zm0 9h2v2h-2v-2z"
                          fill="currentColor"
                          opacity="0.5"
                        />
                        <path
                          d="M7 7h2v2H7V7zm0 9h2v2H7v-2zm9-9h2v2h-2V7zm0 9h2v2h-2v-2z"
                          fill="currentColor"
                          opacity="0.3"
                        />
                      </svg>
                    </div>

                    {/* No generated QR code text */}
                    <p className="text-[#667085] text-lg mb-6">No generated QR code</p>

                    {/* Create QR Code Button */}
                    <button
                      className="bg-[#1D2939] text-white px-6 py-3 rounded-md hover:bg-[#1D2939]/90 transition-colors"
                    >
                      Create QR Code
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Table QR Code Content */}
                  <div className="text-center py-12">
                    <p className="text-[#667085]">Table QR Code content goes here</p>
                  </div>
                </>
              )}
            </>
          ) : activeTab === 1 ? (
            <>
              {/* Online Ordering Content */}
              <div className="text-center py-12">
                <p className="text-[#667085]">Online Ordering content goes here</p>
              </div>
            </>
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
    </div>
  );
};

export default ManageAssets;
