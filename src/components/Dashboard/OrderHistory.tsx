import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { SetStateAction, useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { CalendarMonth, SearchRounded } from "@mui/icons-material";
import * as XLSX from "xlsx"; // For Excel export
import { saveAs } from "file-saver"; // To save files locally
import Papa from "papaparse"; // For CSV export
import { truncateText } from "../../utils/truncateText";
import { DatePicker, Space } from "antd";
import PaginationComponent from "./PaginationComponent";

import More from "../../assets/more_vert.svg";
import RefundModal from "./ticketComponents/RefundModal";
import { DropdownMenu } from "./DropdownMenuOpenTickets";
import ViewTicketModal from "./ticketComponents/ViewTicketModal";

const { RangePicker } = DatePicker;

const OrderHistory = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);


  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | number>(
    "today"
  );
  const [selectedFilter2, setSelectedFilter2] = useState<string | number>(
    "today"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [searchValue, setSearchValue] = useState("");
  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);


  const userDetails = useSelector((state: any) => state.user);

  const token = userDetails?.userData?.token;

  const handleTicketMenu = () => {
    setShowCustomerDetail(true);
  };

  const handleCustomerShow = (item: SetStateAction<undefined>) => {
    setSelectedCustomer(item);
    setShowCustomerDetail(true);
  };

  const handleCustomerMenu = () => {
    setShowCustomerDetail(true);
  };

  const handleFilterChange = (
    filter: string,
    number_of_days?: number,
    startDate?: string,
    endDate?: string,
  ) => {
    setSelectedFilter(number_of_days as any);
    setSelectedFilter2(filter);
    setDateFilter(filter);
    setStartDate(startDate);
    setEndDate(endDate);
    setNumberOfDays(number_of_days);
    getTickets({ date_filter: filter, number_of_days, startDate, endDate, page, searchValue });
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      handleFilterChange(
        "date_range",
        undefined,
        dateStrings[0],
        dateStrings[1]
      );
    }
    setShowDatePicker(false);
  };

  const [_dateFilter, setDateFilter] = useState<string | undefined>("today");
  const [_startDate, setStartDate] = useState<string | undefined>("");
  const [_endDate, setEndDate] = useState<string | undefined>("");
  const [_numberOfDays, setNumberOfDays] = useState<number | undefined>(0);



  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ totalOrders: number; totalPages: number; currentPage: number; pageSize: number }>({
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
  });


  const getTickets = async ({
    date_filter,
    startDate,
    endDate,
    number_of_days,
    page,
    searchValue
  }: {
    date_filter?: string;
    startDate?: string;
    endDate?: string;
    number_of_days?: number;
    page?: number;
    searchValue?: string;
  }) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const params: any = { date_filter };

    if (date_filter === "date_range") {
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (date_filter !== "today") {
      params.number_of_days = number_of_days;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderbyType/`,
        {
          ...headers,
          params: { branch_id: selectedBranch.id, ...params, queryType: "history", page, limit: "10", order_number: searchValue },
          paramsSerializer: (params) => new URLSearchParams(params).toString(),
        }
      );
      setData(response.data?.data);
      setPagination(response.data?.pagination)
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // getTickets({ date_filter: "today", page, });
    getTickets({ date_filter: _dateFilter, startDate: _startDate, endDate: _endDate, number_of_days: _numberOfDays, page, searchValue });
  }, [selectedBranch, page]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    getTickets({ date_filter: "today", page });
    setSearchValue("");
    setDateFilter
    setStartDate("");
    setEndDate("");
    setNumberOfDays(0);
  };

  // Function to export data as Excel
  // Function to export selected data as Excel
  const exportToExcel = () => {
    // Create an array with only the desired fields
    const selectedData = data.map((item) => ({
      order_number: item.order_number,
      date: item.createdAt.slice(0, 10),
      time: item.createdAt.slice(11, 16),
      customer_name: item.customer_name,
      channel: item.channel,
      total_price: item.total_price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "order_history.xlsx");
  };

  // Function to export selected data as CSV
  const exportToCSV = () => {
    // Create an array with only the desired fields
    const selectedData = data.map((item) => ({
      order_number: item.order_number,
      date: item.createdAt.slice(0, 10),
      time: item.createdAt.slice(11, 16),
      customer_name: item.customer_name,
      channel: item.channel,
      total_price: item.total_price,
    }));

    const csv = Papa.unparse(selectedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "order_history.csv");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDownloadCSV = () => {
    setDropdownVisible(false);
    exportToCSV();
  };

  const handleDownloadExcel = () => {
    setDropdownVisible(false);
    exportToExcel();
  };

  const handleBack = () => {
    setShowCustomerDetail(false);
  };
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleVoidOrderMenu = () => {
    setVoidOrderMenu(!voidOrderMenu);
  };

  const [voidOrderItem, setVoidOrderItem] = useState<any>(null);

  const [viewTicketModal, setViewTicketModal] = useState(false);
  const [viewTicket, setViewTicket] = useState({});
  const handleViewTicket = (id: any) => {
    const ticket = data.find((item: any) => item.id === id);
    setViewTicket(ticket);
    setViewTicketModal(true);
  };
  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Order History" />
        {showCustomerDetail ? (
          <div className="mt-8">
            <button
              className="border border-purple500 rounded px-[24px] py-[10px] font-[600] text-purple500"
              onClick={handleBack}
            >
              Back
            </button>
            <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
              <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                Customer Details
              </p>

              <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-4 border-b">
                <p className="text-center text-[14px] text-[#121212]">
                  Customer Name
                </p>
                <p className=" text-[14px] text-[#121212]">Email</p>
                <p className=" text-[14px] text-[#121212]">Phone Number</p>
                <p className=" text-[14px] text-[#121212]">Address</p>
              </div>
              {isLoading ? (
                <div className="px-8">Loading...</div>
              ) : data.length === 0 ? (
                <div className="px-8">No data during this period</div>
              ) : selectedCustomer ? (
                <div
                  className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-4 items-center  font-base text-[14px] text-[#414141] bg-white`}
                >
                  <p className="items-start">
                    {selectedCustomer.customer_name
                      ? truncateText(
                        selectedCustomer.customer_name
                          .charAt(0)
                          .toUpperCase() +
                        selectedCustomer.customer_name.slice(1),
                        12
                      )
                      : ""}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.email || "-"}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.phoneNumber || "-"}
                  </p>
                  <p className="" onClick={handleCustomerMenu}>
                    {selectedCustomer.customerData.address || "-"}
                  </p>
                </div>
              ) : (
                <div className="px-8">No data during this period</div>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="mt-[40px]">
              <div className="flex items-center justify-between mb-[24px]">
                <ChangeBranchForTicket handleRefresh={handleRefresh} />

                {/* Export buttons */}
                <div className="flex items-center gap-[12px]">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]"
                    >
                      Download
                    </button>
                    {dropdownVisible && (
                      <div className="absolute mt-2 right-0 w-[150px] bg-white border border-[#B6B6B6] rounded-[5px] shadow-lg">
                        <button
                          onClick={handleDownloadCSV}
                          className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                        >
                          Download CSV
                        </button>
                        <button
                          onClick={handleDownloadExcel}
                          className="block w-full text-left px-[16px] py-[8px] hover:bg-gray-200"
                        >
                          Download Excel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[32px] flex-wrap">
                  {/*  */}
                  <div className="flex items-center gap-[8px]">
                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter2 === "today"
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("today")}
                    >
                      Today
                    </button>
                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter === 7
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("days", 7)}
                    >
                      7 Days
                    </button>
                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter === 30
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("days", 30)}
                    >
                      1 Month
                    </button>
                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter === 90
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("days", 90)}
                    >
                      3 Months
                    </button>

                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter === 180
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("days", 180)}
                    >
                      6 Months
                    </button>

                    <button
                      className={`border rounded-[5px] px-[16px] py-[8px] font-[400] text-[12px] ${selectedFilter === 365
                        ? "bg-purple500 text-white"
                        : "border-gray-400 text-black"
                        }`}
                      onClick={() => handleFilterChange("days", 365)}
                    >
                      1 Year
                    </button>

                    {/* Custom Date Picker */}
                    <div
                      className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212] cursor-pointer"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                      <span className="text-[12px] flex items-center gap-1">
                        <CalendarMonth className="w-4 h-4" />
                        <span>Custom</span>
                      </span>
                    </div>

                    {showDatePicker && (
                      <Space direction="vertical">
                        <RangePicker onChange={handleDateChange} />
                      </Space>
                    )}
                  </div>

                  {/* search  */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search by order number"
                      className="border border-grey300 rounded-[5px] px-[16px] py-[10px] w-[300px]"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="p-2 bg-black border border-black rounded" onClick={() => getTickets({ date_filter: _dateFilter, startDate: _startDate, endDate: _endDate, number_of_days: _numberOfDays, page, searchValue })}>
                      <SearchRounded className="text-white" />
                    </button>
                  </div>
                </div>

              </div>

              <div className="">
                <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                  <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                    Orders
                  </p>

                  <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-8 border-b">
                    <p className="text-start text-[14px] text-[#121212]">
                      Order No
                    </p>
                    <p className=" text-[14px] text-[#121212]">Date/Time</p>
                    <p className=" text-[14px] text-[#121212]">Customer </p>
                    <p className=" text-[14px] text-[#121212]">Channel </p>
                    <p className=" text-[14px] text-[#121212]">Payment Method</p>
                    <p className=" text-[14px] text-[#121212]">Status </p>
                    <p className=" text-[14px] text-[#121212]">Bill </p>
                    <p className=" text-[14px] text-[#121212]">Action </p>
                  </div>
                  {isLoading ? (
                    <div className="px-8">Loading...</div>
                  ) : data.length === 0 ? (
                    <div className="px-8">No data during this period</div>
                  ) : (
                    data.map((item, index) => (
                      <div
                        className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-8  items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                        key={index}
                      >
                        <p className="text-start" onClick={handleCustomerMenu}>
                          {item.order_number || "-"}
                        </p>
                        <p className="" onClick={handleTicketMenu}>
                          <span>{item.createdAt.split("T")[0]}</span> <br />
                          <span>{item.createdAt.split("T")[1].slice(0, 5)}</span>

                        </p>
                        <p onClick={() => handleCustomerShow(item)}>
                          {item.customer_name
                            ? truncateText(
                              item.customer_name.charAt(0).toUpperCase() +
                              item.customer_name.slice(1),
                              12
                            )
                            : ""}
                        </p>

                        <p>{item.channel}</p>
                        <p className="capitalize" onClick={handleTicketMenu}>
                          {item?.paymentMethod ?? ""}
                        </p>

                        <p className={`${item.status.toLowerCase() === "served"
                          ? "text-green-50 bg-green-500 "
                          : item.status.toLowerCase() === "pending"
                            ? "text-orange-50 bg-orange-500"
                            : "text-red-50 bg-red-500"
                          } w-fit py-2 px-4 rounded-full  mx-auto`}>{item.status}</p>
                        <p>&#x20A6;{item.total_amount_with_tips.toLocaleString()}</p>

                        <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                          {<div
                            className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                            onClick={() => toggleMenu(index)}>
                            <img
                              src={More}
                              alt="More Options"
                              className="w-[5px]"
                            />
                          </div>}
                          {activeMenuIndex === index && (
                            <DropdownMenu
                              handleVoidOrderMenu={() => { handleVoidOrderMenu(); setVoidOrderItem(item); }}
                              handleViewTicket={() => handleViewTicket(item.id)}
                            />
                          )}
                        </div>

                      </div>
                    ))
                  )}
                  <div className="flex items-center justify-center w-full my-4">
                    <PaginationComponent setPage={setPage} pagination={pagination} />
                  </div>
                </div>
                <ViewTicketModal
                  ticketInfo={viewTicket}
                  closeModal={() => setViewTicketModal(false)}
                  viewTicketModal={viewTicketModal}
                />
                <RefundModal
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  // handleVoidOrder={handleVoidOrder}
                  voidOrderItem={voidOrderItem}
                />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default OrderHistory;
