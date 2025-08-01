import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Header.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import confirmation_number from "../../assets/confirmation_number.svg";
import restaurant_menu from "../../assets/restaurant_menu.svg";
import DaysTab2 from "./DaysTab2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchOpenAndClosedTickets,
  fetchTotalSales,
  fetchAverageOrderValue,
  fetchSalesRevenueGraph,
  fetchTopMenuItems,
  fetchCustomerTransaction,
} from "../../slices/overviewSlice";

const BalanceComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showBalance, setShowBalance] = useState(true);
  const { openAndClosedTickets, loading, totalSales } = useSelector(
    (state: RootState) => state.overview
  );
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [dateFilter, setDateFilter] = useState<string>("today");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [numberOfDays, setNumberOfDays] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchOpenAndClosedTickets({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays }));
    dispatch(fetchTotalSales({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays }));
    dispatch(fetchAverageOrderValue({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays }));
    dispatch(fetchSalesRevenueGraph({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays }));
    dispatch(fetchTopMenuItems({ branch_id: selectedBranch?.id, date_filter: dateFilter, number_of_days: numberOfDays }));
    dispatch(fetchCustomerTransaction({ date_filter: dateFilter, branch_id: selectedBranch?.id, number_of_days: numberOfDays }));
  }, [dispatch, selectedBranch?.id, dateFilter, startDate, endDate, numberOfDays]);

  const changeVisibility = () => {
    setShowBalance(!showBalance);
  };

  // const handleDateFilterChange = (
  //   date_filter: string,
  //   startDate?: string,
  //   endDate?: string,
  //   number_of_days?: number
  // ) => {
  // dispatch(
  //   fetchOpenAndClosedTickets({
  //     date_filter,
  //     startDate,
  //     endDate,
  //     number_of_days,
  //     branch_id: selectedBranch?.id
  //   })
  // );
  // dispatch(
  //   fetchTotalSales({ date_filter, startDate, endDate, number_of_days, branch_id: selectedBranch?.id })
  // );
  // dispatch(
  //   fetchAverageOrderValue({
  //     date_filter,
  //     startDate,
  //     endDate,
  //     number_of_days,
  //     branch_id: selectedBranch?.id
  //   })
  // );
  // dispatch(
  //   fetchSalesRevenueGraph({
  //     date_filter,
  //     startDate,
  //     endDate,
  //     number_of_days,
  //     branch_id: selectedBranch?.id
  //   })
  // );
  // dispatch(
  //   fetchCustomerTransaction({
  //     date_filter,
  //     startDate,
  //     endDate,
  //     number_of_days,
  //     branch_id: selectedBranch?.id
  //   })
  // );
  // dispatch(
  //   fetchTopMenuItems({
  //     branch_id: selectedBranch.id,
  //     date_filter,
  //     startDate,
  //     endDate,
  //     number_of_days,
  //   })
  // );
  // };

  const closedTickets = openAndClosedTickets?.data?.closed_tickets || 0;
  const processedOrders = openAndClosedTickets?.data?.open_tickets || 0;

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
            // onDateFilterChange={handleDateFilterChange}
            setDateFilter={setDateFilter}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setNumberOfDays={setNumberOfDays}
          />
        </div>
        <div className="flex justify-start gap-10 items-center w-full mb-[55px]">
          <h2 className={clsx(styles.figure)}>
            {loading
              ? "..."
              : showBalance && totalSales?.data !== undefined
                ? `₦ ${totalSales?.data?.toLocaleString("en-US")}`
                : showBalance && totalSales?.data === undefined
                  ? "Loading..."
                  : "****"}
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
            <h6 className={clsx(styles.manage)}>
              {" "}
              {loading ? "Loading..." : `${processedOrders} Open Orders`}
            </h6>
          </div>
          <div className="flex items-center justify-start gap-1">
            <img src={confirmation_number} alt="confirmation_number" />
            <h6 className={clsx(styles.manage)}>
              {" "}
              {loading ? "Loading..." : `${closedTickets} Closed Tickets`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComp;
