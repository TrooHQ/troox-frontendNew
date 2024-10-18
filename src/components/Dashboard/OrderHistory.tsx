import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import More from "../../assets/more_vert.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import OpenTicketModal from "./ticketComponents/OpenTicketModal";
import VacateTableModal from "./ticketComponents/VacateTableModal";
import RefundMenu from "./ticketComponents/RefundMenu";
import VoidOrderMenu from "./ticketComponents/VoidOrderMenu";
import { useSelector } from "react-redux";
import { DropdownMenu } from "./DropdownMenuOpenTickets";
import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { CalendarMonth } from "@mui/icons-material";

const OrderHistory = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(selectedBranch);
  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);
  const [refundMenu, setRefundMenu] = useState<boolean>(false);
  const [vacateTableMenu, setVacateTableMenu] = useState<boolean>(false);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal
  const [data, setData] = useState<any[]>([]);
  const [closedData, setClosedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userDetails = useSelector((state: any) => state.user);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [activeMenuIndex2, setActiveMenuIndex2] = useState<number | null>(null);

  const token = userDetails?.userData?.token;

  const handleVoidOrderMenu = () => {
    setVoidOrderMenu(!voidOrderMenu);
  };
  const handleRefundMenu = () => {
    setRefundMenu(!refundMenu);
  };
  const handleVacateTableMenu = () => {
    setVacateTableMenu(!vacateTableMenu);
  };
  const handleTicketMenu = () => {
    setOpenTicket(!openTicket);
  };

  const toggleMenu = (index: number) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleMenu2 = (index: number) => {
    setActiveMenuIndex2((prevIndex) => (prevIndex === index ? null : index));
  };

  const getTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderByBranch/?branch_id=${selectedBranch.id}`,
        headers
      );
      console.log(response.data);
      setData(response.data);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, [selectedBranch]);

  const handleVoidOrder = async () => {
    if (activeMenuIndex === null) {
      toast.error("No active menu selected");
      return;
    }

    console.log(data[activeMenuIndex], "pppp");

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateBranchOrder/`,
        {
          branch_id: selectedBranch.id,
          order_id: data[activeMenuIndex]._id,
          status: "cancel",
        },
        headers
      );
      console.log(response.data);
      getTickets();
      setVoidOrderMenu(false);
      setActiveMenuIndex(null);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error voiding order");
    }
  };

  const handleVoidOrder2 = async () => {
    if (activeMenuIndex2 === null) {
      toast.error("No active menu selected");
      return;
    }

    console.log(data[activeMenuIndex2], "pppp");

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateBranchOrder/`,
        {
          branch_id: selectedBranch.id,
          order_id: data[activeMenuIndex2]._id,
          status: "cancel",
        },
        headers
      );
      console.log(response.data);
      getTickets();
      setVoidOrderMenu(false);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error voiding order");
    }
  };

  const handleRefresh = () => {
    getTickets();
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Tickets" />
        <div className="">
          <div className="mt-[40px]">
            <ChangeBranchForTicket handleRefresh={handleRefresh} />
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center justify-between">
                <div className="relative">
                  <input
                    type="text"
                    className="bg-[#F8F8F8] rounded p-2 pl-14 outline-none border border-[#5855B3]"
                    placeholder="Search"
                  />
                  <img
                    src={SearchIcon}
                    alt=""
                    className="absolute left-6 top-3 pointer-events-none"
                  />
                </div>
              </div> */}
              <div className="flex items-center gap-[32px]">
                <div className="">
                  <p className="font-[500] text-[16px] text-[#121212]">Filter by:</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="border border-purple500 bg-purple500 rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                    <button className="text-[12px]">Today</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[121212]">
                    <button className="text-[12px]">7 Days</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px]">1 Month</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px]">3 Months</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px]">6 Months</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px]">1 Year</button>
                  </div>
                  <div className="border border-[#B6B6B6] rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] flex items-center gap-1">
                      <CalendarMonth className="w-4 h-4" />
                      <span>Custom</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">Orders</p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-6 border-b">
                  <p className="text-start text-[14px] text-[#121212]">Order No</p>
                  <p className=" text-[14px] text-[#121212]">Date</p>
                  <p className=" text-[14px] text-[#121212]">Time</p>
                  <p className=" text-[14px] text-[#121212]">Customer </p>
                  <p className=" text-[14px] text-[#121212]">Bill </p>
                  <p className=" text-[14px] text-[#121212]">Actions </p>
                </div>
                {data.map((item, index) => (
                  <div
                    className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-6 items-center  font-base text-[14px] text-[#414141] ${
                      index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                    }`}
                    key={index}
                  >
                    <p className="text-start" onClick={handleTicketMenu}>
                      {item.orderID || "-"}
                    </p>
                    <p className=" " onClick={handleTicketMenu}>
                      {item.createdAt.slice(0, 10)}
                    </p>
                    <p className=" " onClick={handleTicketMenu}>
                      {item.createdAt.slice(11, 16)}
                    </p>

                    <p onClick={handleTicketMenu}>
                      {item.customer_name
                        ? item.customer_name.charAt(0).toUpperCase() + item.customer_name.slice(1)
                        : ""}
                    </p>
                    <p>&#x20A6;{item.total_price.toLocaleString()}</p>
                    <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <div
                        className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                        onClick={() => toggleMenu(index)}
                      >
                        <img src={More} alt="More Options" className="w-[5px]" />
                      </div>
                      {activeMenuIndex === index && (
                        <DropdownMenu handleVoidOrderMenu={() => handleVoidOrderMenu()} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {activeMenuIndex !== null ? (
                <VoidOrderMenu
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  handleVoidOrder={handleVoidOrder}
                />
              ) : (
                <VoidOrderMenu
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  handleVoidOrder={handleVoidOrder2}
                />
              )}

              <RefundMenu
                refundMenu={refundMenu}
                handleRefundMenu={handleRefundMenu}
                refundType={refundType}
                setRefundType={setRefundType}
                openInput={openInput}
                setOpenInput={setOpenInput}
                refundAmount={refundAmount}
                setRefundAmount={setRefundAmount}
                setRefundMenu={setRefundMenu}
              />

              <VacateTableModal
                vacateTableMenu={vacateTableMenu}
                handleVacateTableMenu={handleVacateTableMenu}
                setVacateTableMenu={setVacateTableMenu}
              />

              <OpenTicketModal
                openTicket={openTicket}
                handleTicketMenu={handleTicketMenu}
                setOpenTicket={setOpenTicket}
                data={data}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default OrderHistory;
