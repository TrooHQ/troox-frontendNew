import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import red from "../../assets/red.svg";
import orange from "../../assets/orange.svg";
import green from "../../assets/green.svg";
import More from "../../assets/more_vert.svg";
import ArrowLeft from "../../assets/arrowLeftSmall.svg";

import Refresh from "../../assets/refresh.svg";
import { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomSelect from "../inputFields/CustomSelect";
import Modal from "../Modal";
import Close from "../../assets/closeIcon.svg";
import CreditCard from "../../assets/creditCard.svg";
import { RestartAlt } from "@mui/icons-material";

interface Ticket {
  ordered_by: string;
  menu_items: MenuItem[];
  orders: string[];
  total_price: number;
  createdAt: string;
  status: string;
  name: string;
  id: number;
}
interface MenuItem {
  name: string;
  price: string;
  quantity: string;
}

const data = [
  {
    id: 1,
    code: "MGC500",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Cashier",
    status: "Ordered",
    amount: "3500",
    outlet: "Ajah",
    tip: "150",
    method: "VISA •2340",
  },
  {
    id: 2,
    code: "MGC501",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Cashier",
    status: "Served",
    amount: "3500",
    outlet: "Agege",
    tip: "500",
    method: "Mastercard •8340",
  },
  {
    id: 3,
    code: "MGC502",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Joe",
    channel: "Cashier",
    status: "Ready",
    amount: "3500",
    outlet: "Surulere",
    tip: "150",
    method: "VISA •4476",
  },
  {
    id: 4,
    code: "MGC500",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Hand-held",
    status: "Ordered",
    amount: "3500",
    outlet: "VI",
    tip: "150",
    method: "VISA •4476",
  },
  {
    id: 5,
    code: "MGC501",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Pay-at-table",
    status: "Served",
    amount: "3500",
    outlet: "Ikeja",
    tip: "150",
    method: "VISA •4476",
  },
  {
    id: 6,
    code: "MGC502",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Joe",
    channel: "Cashier",
    status: "Ready",
    amount: "3500",
    outlet: "Agege",
    tip: "150",
    method: "VISA •4476",
  },
];

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [menuOpenMap, setMenuOpenMap] = useState<{ [key: number]: boolean }>({});
  const [menuOpenMap2, setMenuOpenMap2] = useState<{ [key: number]: boolean }>({});
  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);
  const [refundMenu, setRefundMenu] = useState<boolean>(false);
  const [vacateTableMenu, setVacateTableMenu] = useState<boolean>(false);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal

  const userDetails = useSelector((state: RootState) => state.user);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");

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

  // const [loading, setLoading] = useState<boolean>(false);

  // const toggleMenu = (itemId: number) => {
  //   setMenuOpenMap((prevMenuOpenMap) => ({
  //     ...Object.fromEntries(
  //       Object.entries(prevMenuOpenMap).map(([key, value]) => [
  //         key,
  //         key === itemId ? !value : false,
  //       ])
  //     ),
  //     [itemId]: !prevMenuOpenMap[itemId],
  //   }));
  // };

  const toggleMenu = (itemId: number) => {
    setMenuOpenMap((prevMenuOpenMap) => {
      const updatedMap: Record<number, boolean> = {};

      Object.entries(prevMenuOpenMap).forEach(([key, value]) => {
        const numKey = parseInt(key, 10);
        updatedMap[numKey] = numKey === itemId ? !value : false;
      });

      updatedMap[itemId] = !prevMenuOpenMap[itemId];

      return updatedMap;
    });
  };

  const toggleMenu2 = (itemId: number) => {
    setMenuOpenMap2((prevMenuOpenMap) => {
      const updatedMap: Record<number, boolean> = {};

      Object.entries(prevMenuOpenMap).forEach(([key, value]) => {
        const numKey = parseInt(key, 10);
        updatedMap[numKey] = numKey === itemId ? !value : false;
      });

      updatedMap[itemId] = !prevMenuOpenMap[itemId];

      return updatedMap;
    });
  };

  const getTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/order/getOrder`, headers);
      console.log("Tickets Retrieved successfully:", response.data);
      setTickets(response.data);
    } catch (error) {
      console.error("Error retrieving tickets:", error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Tickets" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className=" flex items-center gap-[32px]">
                <div className="">
                  <p className=" font-[500] text-[16px] text-purple500">Filter by:</p>
                </div>
                <div className=" flex items-center gap-[8px]">
                  <div className="border border-purple500 bg-purple500  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                    <button className="text-[12px] ">Add</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Outlet</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Open table</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Close table</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Table number</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Waiter's name</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Time</button>
                  </div>
                </div>
              </div>
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[16px] flex items-center gap-[8px]">
                  <img src={Refresh} alt="" /> Refresh Tickets
                </button>
              </div>
            </div>

            <div className="">
              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">Open tables</p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-10 border-b">
                  <p className=" text-[14px] text-[#121212]">Outlet</p>
                  <p className=" text-[14px] text-[#121212]">Table No</p>
                  <p className=" text-[14px] text-[#121212]">Order No</p>
                  <p className=" text-[14px] text-[#121212]">Date - Time</p>
                  <p className=" text-[14px] text-[#121212]">Customer </p>
                  <p className=" text-[14px] text-[#121212]">Waiter </p>
                  <p className=" text-[14px] text-[#121212]">Channel </p>
                  <p className=" text-[14px] text-[#121212]">Status </p>
                  <p className=" text-[14px] text-[#121212]">Bill </p>
                  <p className=" text-[14px] text-[#121212]">Actions </p>
                </div>
                {data.map((item, index) => (
                  <div
                    className={`cursor-pointer text-center py-[14px] px-[32px] grid grid-cols-10 items-center font-[500] text-[14px] text-[#414141] ${
                      index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                    }`}
                    key={index}
                  >
                    <p onClick={handleTicketMenu} className="items-center">
                      {item.outlet}
                    </p>
                    <p>{item.id}</p>
                    <p>{item.code}</p>
                    {/* <p className=" ">
                      {item.createdAt.slice(0, 10)}-{item.createdAt.slice(11, 16)}
                    </p> */}
                    <p onClick={handleTicketMenu}>{item.date}</p>

                    <p onClick={handleTicketMenu}>{item.customer}</p>
                    <p>{item.waiter}</p>
                    <p>{item.channel}</p>
                    <div className="flex items-center justify-center gap-[10px]">
                      {item.status === "Ordered" && (
                        <img src={red} alt="" className="w-[12px] h-[12px]" />
                      )}
                      {item.status === "Served" && (
                        <img src={green} alt="" className="w-[12px] h-[12px]" />
                      )}
                      {item.status === "Ready" && (
                        <img src={orange} alt="" className="w-[12px] h-[12px]" />
                      )}
                      <p>{item.status}</p>
                    </div>
                    <p>&#x20A6;{item.amount}</p>
                    <div className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <img
                        src={More}
                        alt=""
                        className="w-[5px] cursor-pointer"
                        onClick={() => toggleMenu(item.id)}
                      />
                      {menuOpenMap[item.id] && (
                        <div className="absolute top-4 -left-[100px] mt-2 ml-5 bg-white border border-[#E7E7E7] rounded shadow p-[16px] drop-shadow">
                          <div className=" grid gap-[16px] items-start text-left  text-[14px] font-[400] text-[#000000]">
                            <p onClick={handleVoidOrderMenu} className="cursor-pointer">
                              Void Order
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Modal isOpen={voidOrderMenu} onClose={handleVoidOrderMenu}>
                <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px]">
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => setVoidOrderMenu(false)}
                  >
                    <img src={Close} alt="" className=" " />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-6">
                    <p className="text-[24px] font-[500] text-purple500">Void Order</p>

                    <div>
                      <p className="text-[16px] font-[400] text-grey500">
                        Are you sure you want to void this order?
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-5">
                        <div
                          className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                          onClick={() => setVoidOrderMenu(false)}
                        >
                          <p className="font-[500] text-[16px] text-purple500 cursor-pointer">No</p>
                        </div>

                        <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                          <button className=" text-[16px]">Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">Closed tables</p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-10 border-b">
                  <p className=" text-[14px] text-[#121212]">Outlet</p>
                  <p className=" text-[14px] text-[#121212]">Table No</p>
                  <p className=" text-[14px] text-[#121212]">Order No</p>
                  <p className=" text-[14px] text-[#121212]">Date - Time</p>
                  <p className=" text-[14px] text-[#121212]">Customer </p>
                  <p className=" text-[14px] text-[#121212]">Waiter </p>
                  <p className=" text-[14px] text-[#121212]">Channel </p>
                  <p className=" text-[14px] text-[#121212]">Status </p>
                  <p className=" text-[14px] text-[#121212]">Tip </p>
                  <p className=" text-[14px] text-[#121212]">Actions </p>
                </div>
                {data.map((item, index) => (
                  <div
                    className={`text-center py-[14px] px-[32px] grid grid-cols-10 items-center font-[500] text-[14px] text-[#414141] ${
                      index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                    }`}
                    key={index}
                  >
                    <p onClick={handleTicketMenu} className="items-center">
                      {item.outlet}
                    </p>
                    <p onClick={handleTicketMenu} className="items-center">
                      {item.id}
                    </p>
                    <p onClick={handleTicketMenu}>{item.code}</p>
                    <p>{item.date}</p>
                    <p>{item.customer}</p>
                    <p>{item.waiter}</p>
                    <p>{item.channel}</p>
                    <div className="flex items-center justify-center gap-[10px]">
                      {item.status === "Ordered" && (
                        <img src={red} alt="" className="w-[12px] h-[12px]" />
                      )}
                      {item.status === "Served" && (
                        <img src={green} alt="" className="w-[12px] h-[12px]" />
                      )}
                      {item.status === "Ready" && (
                        <img src={orange} alt="" className="w-[12px] h-[12px]" />
                      )}
                      <p>{item.status}</p>
                    </div>
                    <p>&#x20A6;{item.amount}</p>
                    <p className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <img
                        src={More}
                        alt=""
                        className="w-[5px] cursor-pointer"
                        onClick={() => toggleMenu2(item.id)}
                      />
                      {menuOpenMap2[item.id] && (
                        <div className="absolute top-0 -left-[100px] mt-2 ml-2 bg-white border border-[#E7E7E7] rounded shadow p-[16px] drop-shadow">
                          <div className=" grid gap-[16px] items-start text-left  text-[14px] font-[400] text-[#000000]">
                            <p onClick={handleRefundMenu} className="cursor-pointer">
                              Request Refund
                            </p>
                            <p onClick={handleVoidOrderMenu} className="cursor-pointer">
                              Void Order
                            </p>
                            <p onClick={handleVacateTableMenu} className="cursor-pointer">
                              Vacate Table
                            </p>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <Modal isOpen={refundMenu} onClose={handleRefundMenu}>
                <div
                  className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px] md:h-[600px] lg:h-screen overflow-y-scroll"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="">
                    <p className="text-[24px] pb-[24px] font-[500] leading-[36px] text-purple500">
                      Request Refund
                    </p>
                    <hr className="border border-[#E7E7E7] mb-[24px]" />

                    <div>
                      <div>
                        <CustomSelect
                          label=""
                          options={["Full Refund", "Partial Refund"]}
                          value={refundType}
                          onChange={(value) => {
                            setRefundType(value);
                            setOpenInput(true);
                          }}
                          disabledOption="Choose refund type"
                        />
                        {refundType === "Partial Refund" && openInput && (
                          <div className="mt-4">
                            <div className="relative w-full">
                              <input
                                type="text"
                                placeholder="Enter Amount"
                                className="w-full pr-20 border rounded h-10 pl-2 outline-none"
                                value={refundAmount}
                                onChange={(e) => setRefundAmount(e.target.value)}
                              />
                              <button
                                className="absolute top-0 right-0 h-full bg-[#5955b6] text-white px-4 rounded-r"
                                onClick={() => setOpenInput(false)}
                              >
                                Enter
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mt-4">
                          <label className="mb-2" htmlFor="reason">
                            Reason for refund
                          </label>
                          <textarea
                            name="reason"
                            id="reason"
                            className="w-full pr-20 border rounded pl-2 outline-none mt-2"
                            rows={4}
                          ></textarea>
                        </div>
                      </div>
                      <hr className="border border-[#E7E7E7] mb-[24px] mt-3" />

                      <div className="flex items-center justify-end gap-4 mt-5">
                        <div
                          className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                          onClick={() => {
                            setRefundMenu(false);
                            setOpenInput(false);
                            setRefundType("");
                          }}
                        >
                          <p className="font-[500] text-[16px] text-purple500 cursor-pointer">
                            Cancel
                          </p>
                        </div>

                        <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                          <button className=" text-[16px] font-normal">Make Refund</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal isOpen={vacateTableMenu} onClose={handleVacateTableMenu}>
                <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px]">
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => setVacateTableMenu(false)}
                  >
                    <img src={Close} alt="" className=" " />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-6">
                    <p className="text-[24px] font-[500] text-purple500">Vacate Table</p>

                    <div>
                      <p className="text-[16px] font-[400] text-grey500">
                        Table has been vacated successfully!
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-5">
                        <div
                          className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                          onClick={() => setVacateTableMenu(false)}
                        >
                          <button className=" text-[16px]">Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal isOpen={openTicket} onClose={handleTicketMenu}>
                <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[80vw] ">
                  <div
                    className="flex items-center justify-start gap-2 cursor-pointer"
                    onClick={() => setOpenTicket(false)}
                  >
                    <img src={ArrowLeft} alt="" className=" " />
                    <span className="text-base font-normal text-[#606060]">Back to ticket</span>
                  </div>
                  <div className="flex flex-col gap-8 mt-12">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-[#121212] text-[32px] font-medium">Table 2</h2>
                        <p className="text-[#606060] text-[16px] font-normal">
                          Ticket #234, 10:35, 10/09/2023
                        </p>
                      </div>
                      <div className="flex justify-end items-center gap-10">
                        <div>
                          <h2 className="text-[#dc3232] text-[32px] font-medium">#1,800</h2>
                          <p className="text-[#dc3232] text-[16px] font-normal">Left to pay</p>
                        </div>
                        <div>
                          <h2 className="text-[#5955B3] text-[32px] font-medium">#14,500</h2>
                          <p className="text-[#606060] text-[16px] font-normal">Total order</p>
                        </div>
                      </div>
                    </div>
                    {/* Tables */}
                    <div className="pb-[16px] pt-0 border rounded-[10px] border-grey100 mt-[24px]">
                      {" "}
                      <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-6 border-b">
                        <p className=" text-[14px] text-[#121212]">Time</p>
                        <p className=" text-[14px] text-[#121212]">Tip</p>
                        <p className="text-start text-[14px] text-[#121212]">Method</p>
                        <p className=" text-[14px] text-[#121212]">Status </p>
                        <p className=" text-[14px] text-[#121212]">Total </p>
                        <p className=" text-[14px] text-[#121212]"></p>
                      </div>
                      {data.slice(0, 3).map((item, index) => (
                        <div
                          className={`text-center py-[14px] px-[32px] grid grid-cols-6 items-center font-[500] text-[14px] text-[#414141] ${
                            index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                          }`}
                          key={index}
                          onClick={handleTicketMenu}
                        >
                          <p className="items-center">{item.date.split("-")[1]}</p>
                          <p>&#x20A6;{item.tip}</p>
                          <div className="flex items-center gap-2 justify-start">
                            <img src={CreditCard} alt="credit" className="w-[16px] h-[16px]" />
                            <span className="text-start">{item.method}</span>
                          </div>

                          <p></p>

                          <p>&#x20A6;{item.amount}</p>
                          <div className="flex items-center justify-end">
                            <button className="flex items-center justify-center py-[6px] px-[10px] bg-[#e27da2] text-[12px] font-[500] text-white rounded-[5px] w-[60%]">
                              <RestartAlt className="w-[20px] h-[20px]" />
                              Refund
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-[22px] font-medium text-[#121212]">Order details</h4>
                      <div className="pb-[16px] pt-0 border rounded-[10px] border-grey100 mt-[12px]">
                        {" "}
                        <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-3 border-b">
                          <p className="text-start text-[14px] text-[#121212]">Item</p>
                          <p className="text-end text-[14px] text-[#121212]">Pizza</p>
                          <p className=" text-[14px] text-[#121212]"></p>
                        </div>
                        {data.slice(0, 3).map((item, index) => (
                          <div
                            className={`text-center py-[14px] px-[32px] grid grid-cols-3 items-center font-[500] text-[14px] text-[#414141] ${
                              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                            }`}
                            key={index}
                          >
                            <p className="text-start">
                              {index % 3 === 0
                                ? "Pizza"
                                : index % 3 === 1
                                ? "Cappuccino"
                                : "Waffles"}
                            </p>
                            <p className="text-end">&#x20A6;{item.amount}</p>
                            <div className="flex items-center justify-end">
                              <button
                                onClick={handleTicketMenu}
                                className="flex items-center justify-center py-[6px] px-[10px] bg-[#e27da2] text-[12px] font-[500] text-white rounded-[5px] w-[32%]"
                              >
                                <RestartAlt className="w-[20px] h-[20px]" />
                                Refund
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;
