import React, { useEffect, useState } from 'react'
import LayoutComponent from './Layout/LayoutComponent'
import { Tabs, Tab } from '@mui/material'
import OverviewCard from './OverviewCard';
import OverviewChart from './OverviewChart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../src/store/store';
import { fetchAverageOrderValue, fetchCustomerTransaction, fetchOpenAndClosedTickets, fetchSalesGrowthRate, fetchSalesRevenueGraph, fetchTopMenuItems, fetchTotalSales } from '../../slices/overviewSlice';
import DaysTab3 from '../overview-comps/DaysTab3';
import { Loader2 } from 'lucide-react';
import PieChartComp from './PieChart';
import TopSellingItems from './TopSellingItems';
import LocationPriceBarChart from './LocationPriceBarChart';

export default function NewOverview() {

  const dispatch = useDispatch<AppDispatch>()
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const {
    salesGrowthRate,
    totalSales,
    averageOrderValue,
    totalCustomerTransaction,
    topMenuItems,
    loading,
  } = useSelector((state: RootState) => state.overview);


  const [dateFilter, setDateFilter] = useState<string>("today");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [numberOfDays, setNumberOfDays] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("");
  // const [activeTab, setProduct] = useState("");


  useEffect(() => {
    dispatch(fetchOpenAndClosedTickets({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchTotalSales({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchAverageOrderValue({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchSalesRevenueGraph({ date_filter: dateFilter, branch_id: selectedBranch?.id, startDate, endDate, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchTopMenuItems({ branch_id: selectedBranch?.id, date_filter: dateFilter, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchCustomerTransaction({ date_filter: dateFilter, branch_id: selectedBranch?.id, number_of_days: numberOfDays, product_type: activeTab }));
    dispatch(fetchSalesGrowthRate({ date_filter: dateFilter, branch_id: selectedBranch?.id, number_of_days: numberOfDays, product_type: activeTab }));
  }, [dispatch, selectedBranch?.id, dateFilter, startDate, endDate, numberOfDays, activeTab]);




  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setActiveTab(newValue);
  };

  const ORANGE_COLORS = ["#F86C17", "#FCB675", "#FA8D3E", "#FED4AA",];
  const BLUE_COLORS = ["#1570EF", "#D1E9FF", "#2E90FA", "#84CAFF",];

  const tabList = [
    {
      value: "",
      label: "OVerall"
    },
    {
      value: "KIOSK",
      label: "Kiosk"
    },
    {
      value: "pos",
      label: "Hand-held POS"
    },
    {
      value: "ONLINE_ORDERING",
      label: "Online Ordering"
    },
    {
      value: "QR_PAY_TABLE",
      label: "QR-code Payment"
    },
    {
      value: "kds",
      label: "KDS"
    },


  ]

  return (
    <LayoutComponent title="Overview" description="Track your sales and performance for your business. ">
      {loading && <div className='fixed top-0 left-0 flex items-center justify-center w-full min-h-screen bg-gray-100/75'>
        <Loader2 className='w-20 h-20 text-[#DC6803] animate-spin' />
      </div>}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        TabIndicatorProps={{
          style: { backgroundColor: "#DC6803", height: "3px", borderRadius: "3px" },
        }}
        className="border-b border-gray-200"
      >
        {
          tabList.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} className={`${activeTab === tab.value ? "!text-[#DC6803]" : "text-gray-500"
              } font-medium transition-colors duration-300 capitalize`}
            />
          ))
        }
      </Tabs>

      <div className='pb-4 mt-4 mb-10 border-b border-b-200'>
        <DaysTab3
          setDateFilter={setDateFilter}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setNumberOfDays={setNumberOfDays}
        />


      </div>

      {/* overview card sections */}
      <div className='grid grid-cols-1 gap-4 my-10 md:grid-cols-2 lg:grid-cols-4'>
        <OverviewCard bgColor="#EAECF0" title="Total Revenue" data={`₦ ${Number(totalSales?.data || 0).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}`} />
        <OverviewCard bgColor="#B8DEFF" title="Total Orders" data={totalCustomerTransaction?.totalOrders?.toLocaleString("en-US") || 0} />
        <OverviewCard bgColor="#FFE1CC" title="Avg. Order Value" data={`₦ ${Number(
          averageOrderValue?.data?.averageOrderValue || 0
        ).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`} />
        <OverviewCard bgColor="#CDE2FF" title="Sales Growth Rate" data={`${salesGrowthRate?.data?.salesGrowthRate?.toLocaleString("en-US") || 0
          }%`} />
      </div>


      <OverviewChart
        setDateFilter={setDateFilter}
        setStartDate={setDateFilter}
        setEndDate={setDateFilter}
        setNumberOfDays={setDateFilter}
      />

      <div className='grid grid-cols-1 gap-8 my-10 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          <PieChartComp data={topMenuItems?.data} colorCode={ORANGE_COLORS} title="Revenue By Channel" />
          <LocationPriceBarChart />

        </div>
        <div>
          <PieChartComp data={topMenuItems?.data} colorCode={BLUE_COLORS} title="Top Selling Products" />
          <TopSellingItems />
        </div>
      </div>


    </LayoutComponent>
  )
}
