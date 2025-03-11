import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowNeutral from "../../assets/activeArrow.svg";
import clsx from "clsx";
import styles from "./Header.module.css";
import { fetchSalesGrowthRate } from "../../slices/overviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";

const SalesActivities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const {
    salesGrowthRate,
    totalSales,
    averageOrderValue,
    totalCustomerTransaction,
  } = useSelector((state: RootState) => state.overview);

  useEffect(() => {
    dispatch(fetchSalesGrowthRate());
  }, [dispatch]);

  // Assuming salesGrowthRate.data is available
  const salesGrowthRateData = salesGrowthRate?.data || {
    salesGrowthRate: "0.00",
    getTotalSalesToday: 0,
    prevDayTotalSales: 0,
  };

  const { getTotalSalesToday, prevDayTotalSales } = salesGrowthRateData;

  let status = "No change from yesterday";
  let statusIcon = ArrowNeutral;
  let percentageChange = 0;

  if (prevDayTotalSales !== 0) {
    percentageChange =
      ((getTotalSalesToday - prevDayTotalSales) / prevDayTotalSales) * 100;
    if (percentageChange > 0) {
      status = `${percentageChange.toFixed(2)}% up from yesterday`;
      statusIcon = ArrowUp;
    } else if (percentageChange < 0) {
      status = `${Math.abs(percentageChange).toFixed(2)}% down from yesterday`;
      statusIcon = ArrowDown;
    }
  }

  const state = {
    salesActivities: [
      {
        icon: ArrowDown,
        title: "Total Sales Revenue",
        time: "12:45 PM",
        amount: `₦ ${Number(totalSales?.data || 0).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}`,
        statusIcon: ArrowDown,
        status: "-25% from yesterday",
      },
      {
        icon: statusIcon,
        title: "Sales Growth Rate",
        time: "12:45 PM",
        amount: `${
          salesGrowthRate?.data?.salesGrowthRate?.toLocaleString("en-US") || 0
        }%`,
        statusIcon: statusIcon,
        status: status,
      },
      {
        icon: ArrowUp,
        title: "Average Order Value",
        time: "12:45 PM",
        amount: `₦ ${Number(
          averageOrderValue?.data?.averageOrderValue || 0
        ).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        statusIcon: ArrowUp,
        status: "10% from yesterday",
      },
      {
        icon: ArrowDown,
        title: "Customer Transaction Count",
        time: "12:45 PM",
        amount:
          totalCustomerTransaction?.totalOrders?.toLocaleString("en-US") || 0,
        statusIcon: ArrowDown,
        status: "10% from yesterday",
      },
    ],
  };

  const handleOptionClick = () => {
    navigate("/customer-data");
  };

  return (
    <div className="border border-[#C7C6CF] p-6 rounded-2xl mb-12">
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesActivitiesH4)}>Sales Activities</h5>
      </div>{" "}
      <div className="grid grid-cols-4 gap-6">
        {state.salesActivities.map((activity, index) => (
          <div
            key={index}
            className={clsx(
              styles.activityDiv,
              "flex flex-col items-start justify-center border border-[#C7C6CF] rounded-[10px] overflow-auto py-4 px-3 gap-3 relative"
            )}
          >
            {activity.title === "Customer Transaction Count" && (
              <div className="absolute top-2 right-2">
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event)}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleOptionClick}>View Details</MenuItem>
                </Menu>
              </div>
            )}
            <h5 className="text-base font-medium">{activity.title}</h5>
            <span>{activity.amount}</span>
            <div className="flex items-center justify-start gap-2">
              <img src={activity.icon} alt="icon" />
              <p>{activity.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesActivities;
