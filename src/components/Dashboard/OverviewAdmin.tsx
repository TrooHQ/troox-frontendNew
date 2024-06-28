import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import BBB from "../overview-comps/BBB";
import BalanceComp from "../overview-comps/Balance";
import KPI from "../overview-comps/KPI";
import SalesActivities from "../overview-comps/SalesActivities";
import SalesRevenue from "../overview-comps/SalesRevenue";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { Autocomplete, TextField } from "@mui/material";

export const storeData = {
  id: 1,
  name: "Chicken Republic",
  address: "No 1, Kanta Street, Lagos",
  phoneNo: "0817 8901 234",
  availableBalance: "₦ 35,688,000.85",
  noOfWarehouses: "450",
  noOfProducts: "12,450",
  noOfTransactions: "N2.25M",
  noOfReturns: "24",
};

const OverviewAdmin: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Overview" />

        {/* First div */}
        <div className="flex items-center my-10">
          <h3 className="text-[#606060] text-[20px] font-normal">
            Hello,{" "}
            <span className="text-[#121212] text-[24px] font-medium">
              {storeData.name}
            </span>
          </h3>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allOutlets}
            value={allOutlets[0]}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                bgcolor: "#5955B3", // Background color similar to bg-[#5955B3]
                py: "0.375rem", // Padding Y similar to py-1.5
                px: "1rem", // Padding X similar to px-4
                borderRadius: "5px", // Rounded similar to rounded-[5px]
                ml: "0.5rem", // Margin left similar to ml-2
                color: "white", // Text color similar to text-white
                "& fieldset": {
                  borderColor: "transparent", // Remove border
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Remove border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Remove border on focus
                },
                "& .MuiInputBase-input": {
                  color: "white", // Ensure input text is white
                },
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="" sx={{ color: "white" }} />
            )}
          />
        </div>

        {/* Second div */}
        <BalanceComp storeData={storeData} />

        {/* Third div */}
        <div className="mt-9">
          <SalesActivities />
        </div>

        {/* 4th div */}
        <div className="mt-9">
          <SalesRevenue />
        </div>
        {/* 6th div */}
        <div className="mt-9">
          <BBB />
        </div>
        {/* 5th div */}
        <div className="mt-9">
          <h3 className="text-[#012320] text-[20px] font-semibold mb-9">
            Sales Trend
          </h3>
          <KPI />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default OverviewAdmin;

const allOutlets = [
  { label: "All outlets" },
  { label: "Abuja outlets" },
  { label: "Agege outlets" },
  { label: "Ajah outlets" },
  { label: "Ikeja outlets" },
  { label: "Lekki outlets" },
];
