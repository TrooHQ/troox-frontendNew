import { useState } from "react";
import clsx from "clsx";
import styles from "./Header.module.css";
import {
  ArrowForwardIos,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import DaysTab from "./DaysTab";
import confirmation_number from "../../assets/confirmation_number.svg";
import restaurant_menu from "../../assets/restaurant_menu.svg";
import DaysTab2 from "./DaysTab2";
// import SalesActivities from "./home/SalesActivities";
// import SalesRevenue from "./home/SalesRevenue";
// import KPI from "./home/KPI";

interface HeaderProps {
  storeData?: any;
}
const BalanceComp: React.FC<HeaderProps> = ({ storeData }) => {
  const [showBalance, setShowBalance] = useState(true);

  const changeVisibility = () => {
    setShowBalance(!showBalance);
  };
  return (
    <div>
      <div className="rounded-[16px] bg-[#3e3e43] px-8 py-6">
        <div className="flex items-start justify-between">
          <h5 className="text-[#EEEEF7] text-lg font-light">Total Sales</h5>
          <DaysTab2
            backgroundColor="#606060"
            selectedBackgroundColor="#f38d41"
            selectedColor="white"
            nonSelectedColor="#C7C6CF"
            iconClassName={clsx("text-white")}
          />
        </div>
        <div className="flex justify-start gap-10 items-center w-full mb-[55px]">
          <h2 className={clsx(styles.figure)}>
            {showBalance ? storeData.availableBalance : "****"}
          </h2>
          {!showBalance ? (
            <Visibility
              className="cursor-pointer w-[32px] h-[32px] text-white"
              onClick={changeVisibility}
            />
          ) : (
            <VisibilityOff
              className="cursor-pointer w-[32px] h-[32px] text-white"
              onClick={changeVisibility}
            />
          )}
        </div>
        <div className="text-[#B2B1DC] flex items-center justify-start gap-5">
          <div className="flex items-center justify-start gap-1">
            <img src={restaurant_menu} alt="confirmation_number" />
            <h6 className={clsx(styles.manage)}>500 Processed Orders</h6>
          </div>
          <div className="flex items-center justify-start gap-1">
            <img src={confirmation_number} alt="confirmation_number" />
            <h6 className={clsx(styles.manage)}>485 Closed Tickets</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComp;
