import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import red from "../../assets/red.svg";
import orange from "../../assets/orange.svg";
import green from "../../assets/green.svg";
import More from "../../assets/more_vert.svg";
import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
// import OpenTicketModal from "./ticketComponents/OpenTicketModal";
import VacateTableModal from "./ticketComponents/VacateTableModal";
import RefundMenu from "./ticketComponents/RefundMenu";
import VoidOrderMenu from "./ticketComponents/VoidOrderMenu";
import { useSelector } from "react-redux";
import { DropdownMenu } from "./DropdownMenuOpenTickets";
// import { DropdownMenuClosedTickets } from "./DropdownMenuClosedTickets";
// import ChangeBranchForTicket from "./ChangeBranchForTicket";
import { truncateText } from "../../utils/truncateText";
import { RootState } from "@/src/store/store";
import PaginationComponent from "./PaginationComponent";
import { Paper } from "@mui/material";
import BranchDropDown from "./AutoCompleteDropdown/AutoCompleteDropdown";
import RefundModal from "./ticketComponents/RefundModal";
import ViewTicketModal from "./ticketComponents/ViewTicketModal";

const Tickets = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);
  const [refundMenu, setRefundMenu] = useState<boolean>(false);
  const [vacateTableMenu, setVacateTableMenu] = useState<boolean>(false);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal
  const [data, setData] = useState<any[]>([]);
  // const [closedData, setClosedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userDetails = useSelector((state: any) => state.user);
  const { userData } = useSelector((state: RootState) => state.user);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  // const [searchValue, setSearchValue] = useState("");

  // order_number&customer_name


  const token = userDetails?.userData?.token;
  const [voidOrderItem, setVoidOrderItem] = useState<any>(null);

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
  // const [openTicketData, setopenTicketData] = useState<any>();
  // const handleTicketMenu2 = (item: any) => {
  //   setOpenTicket(!openTicket);
  //   setopenTicketData(item);
  // };

  const toggleMenu = (index: number) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ totalOrders: number; totalPages: number; currentPage: number; pageSize: number }>({
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });

  const getTickets = async (page?: number) => {
    setData([])

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // https://troox-backend.onrender.com/api/order/getOrderbyType/?branch_id=685009df72551c42703c5527&queryType=ticket

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderbyType/?branch_id=${selectedBranch.id}&queryType=ticket&page=${page ? page : 1}&limit=10`,
        headers
      );

      setData(response.data.data);
      setPagination(response.data.pagination);
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  const getClosedTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getClosedTickets/?branch_id=${selectedBranch.id}`,
        headers
      );
      console.log(response.data);
      // setClosedData(response.data.data);
      // toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTickets(page);
    getClosedTickets();
  }, [selectedBranch, page]);


  const handleRefresh = () => {
    getTickets(page);
    // setSearchValue("");
    getClosedTickets();
  };


  // view operations 

  const [viewTicketModal, setViewTicketModal] = useState(false);
  const [viewTicket, setViewTicket] = useState({});
  const handleViewTicket = (id: any) => {
    const ticket = data.find((item: any) => item.id === id);
    setViewTicket(ticket);
    setViewTicketModal(true);
  };


  console.log("viewTicket", viewTicket);

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Tickets" />
        <div className="">
          <div className="mt-[40px]">
            <div className="my-8 w-fit">
              <Paper sx={{ boxShadow: 3 }}>
                <BranchDropDown />
              </Paper>
            </div>
            {/* <ChangeBranchForTicket handleRefresh={handleRefresh} /> */}
            <div className="flex items-center justify-between">

              <div className="border border-purple500 bg-white w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-purple500">
                <button
                  onClick={handleRefresh}
                  className="text-[16px] flex items-center gap-[8px]"
                >
                  <img src={Refresh} alt="" />
                  {isLoading ? "Fetching..." : "Refresh Tickets"}
                </button>
              </div>

            </div>

            <div className="">
              {userData?.onboarding_type !== "gogrub" && (
                <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                  <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                    Open tickets
                  </p>

                  <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-9 border-b">
                    <p className=" text-[14px] text-[#121212]">Date/Time</p>
                    <p className=" text-[14px] text-[#121212]">Table No</p>
                    <p className=" text-[14px] text-[#121212]">Order No</p>
                    <p className=" text-[14px] text-[#121212]">Customer </p>
                    <p className=" text-[14px] text-[#121212]">Payment Method</p>
                    {/* <p className=" text-[14px] text-[#121212]">Waiter </p> */}
                    <p className=" text-[14px] text-[#121212]">Channel </p>
                    <p className=" text-[14px] text-[#121212]">Status </p>
                    <p className=" text-[14px] text-[#121212]">Bill </p>
                    <p className=" text-[14px] text-[#121212]">Actions </p>
                  </div>
                  {isLoading ? (
                    <p className="px-8">Loading...</p>
                  ) : data.length === 0 ? (
                    <p className="px-8">No order available</p>
                  ) : (
                    data.map((item, index) => (
                      <div
                        className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-9 items-center  font-base text-[14px] text-[#414141] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                        key={index}
                      >
                        <p className="" onClick={handleTicketMenu}>
                          <span>{item.createdAt.slice(0, 10)}</span> <br />
                          <span>{item.createdAt.slice(11, 16)}</span>
                        </p>

                        <p onClick={handleTicketMenu}>
                          {item.customer_asset_number || "-"}
                        </p>

                        <p onClick={handleTicketMenu}>
                          {item.order_number || "-"}
                        </p>

                        {/* <p onClick={handleTicketMenu}>{item.date}</p> */}

                        <p onClick={handleTicketMenu}>
                          {item.customer_name
                            ? truncateText(
                              item.customer_name.charAt(0).toUpperCase() +
                              item.customer_name.slice(1),
                              10
                            )
                            : ""}
                        </p>
                        <p className="capitalize" onClick={handleTicketMenu}>
                          {item?.paymentMethod ?? ""}
                        </p>
                        {/* <p>{item.waiter_name || "-"}</p> */}
                        <p>{item.channel || ""}</p>
                        <div className="flex items-center justify-center gap-[10px]">
                          {item.status?.toLowerCase() === "cancelled" && (
                            <img
                              src={red}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Ordered" && (
                            <img
                              src={red}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Served" && (
                            <img
                              src={green}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Ready" && (
                            <img
                              src={orange}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          {item.status === "Pending" && (
                            <img
                              src={orange}
                              alt=""
                              className="w-[12px] h-[12px]"
                            />
                          )}
                          <p className="capitalize">{item.status}</p>
                        </div>
                        <p>&#x20A6;{item.total_amount_with_tips.toLocaleString()}</p>
                        <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                          <div
                            className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                            onClick={() => toggleMenu(index)}
                          >
                            <img
                              src={More}
                              alt="More Options"
                              className="w-[5px]"
                            />
                          </div>
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
              )}

              <ViewTicketModal
                ticketInfo={viewTicket}
                closeModal={() => setViewTicketModal(false)}
                viewTicketModal={viewTicketModal}
              />

              {activeMenuIndex !== null ? (
                <RefundModal
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  // handleVoidOrder={handleVoidOrder}
                  voidOrderItem={voidOrderItem}
                />
              ) : (
                <VoidOrderMenu
                  voidOrderMenu={voidOrderMenu}
                  handleVoidOrderMenu={handleVoidOrderMenu}
                  setVoidOrderMenu={setVoidOrderMenu}
                  handleVoidOrder={() => { }}
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



            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;
