import { Autocomplete, } from "@mui/material";
import { styled } from "@mui/system";
import BalanceComp from "../overview-comps/Balance";
import KPI from "../overview-comps/KPI";
import SalesActivities from "../overview-comps/SalesActivities";
import SalesRevenue from "../overview-comps/SalesRevenue";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { useEffect } from "react";
import { fetchBranches, } from "../../slices/branchSlice";
import { fetchBusinessPlan } from "../../slices/businessSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";


// export const storeData = {
//   id: 1,
//   name: "Chicken Republic",
//   outlet: "Ajah outlet",
//   address: "No 1, Kanta Street, Lagos",
//   phoneNo: "0817 8901 234",
//   availableBalance: "₦ 10,500,000",
//   noOfWarehouses: "450",
//   noOfProducts: "12,450",
//   noOfTransactions: "N2.25M",
//   noOfReturns: "24",
// };

export const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    padding: "0.375rem 1rem",
    borderRadius: "5px",
    color: "white",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#121212",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "#121212",
  },
  "& .MuiAutocomplete-endAdornment": {
    right: "8px",
  },
  "& .MuiAutocomplete-listbox": {
    padding: "0",
  },
  "& .MuiAutocomplete-option": {
    padding: "10px 16px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
});

const Overview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userData } = useSelector((state: RootState) => state.user);
  // const { businessPlan } = useSelector((state: RootState) => state.business);

  // const [selectedOutlet, setSelectedOutlet] = useState(
  //   selectedBranch
  //     ? selectedBranch
  //     : {
  //       label: "All outlets",
  //       id: "",
  //     }
  // );
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchBusinessPlan());
  }, [dispatch]);



  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Overview" />
        {/* First div */}
        <div className="flex items-end my-10">
          <h3 className="text-[#606060] text-[20px] font-normal mr-6">
            Hello,{" "}
            <span className="text-[#121212] text-[24px] font-medium">
              {userData?.first_name} {""}
            </span>
          </h3>
          {/* <Paper sx={{ boxShadow: 3 }}>
            <BranchDropDown />  
          </Paper> */}
        </div>
        {/* Second div */}
        <BalanceComp />
        {/* Third div */}
        <div className="mt-9">
          <SalesActivities />
        </div>
        {/* 4th div */}
        <div className="mt-9">
          <SalesRevenue />
        </div>
        {/* 5th div */}
        <div className="mt-9">
          <h3 className="text-[#012320] text-[20px] font-semibold mb-9">
            Sales Trend
          </h3>
          <KPI />
        </div>
        {/* 6th div */}
        {/* <div className="mt-9">
          <BBB />
        </div> */}
      </DashboardLayout>
    </div>
  );
};

export default Overview;
