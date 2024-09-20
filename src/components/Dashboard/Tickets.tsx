import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import red from "../../assets/red.svg";
import orange from "../../assets/orange.svg";
import green from "../../assets/green.svg";
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

const DropdownMenu = ({ handleVoidOrderMenu }: { handleVoidOrderMenu: () => void }) => {
  const handleItemClick = (action: string) => {
    if (action === "Void Order") {
      handleVoidOrderMenu();
    } else {
      console.log("nothing");
    }
  };

  return (
    <ul className="w-[200px] shadow grid gap-[18px] dropdown-menu absolute bg-white p-[12px] text-black right-[25px] top-[40px] z-10">
      <li
        onClick={() => handleItemClick("Void Order")}
        className="font-[400] text-red-500 cursor-pointer"
      >
        Void Order
      </li>
    </ul>
  );
};

const Tickets = () => {
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(selectedBranch);
  const [menuOpenMap2, setMenuOpenMap2] = useState<{ [key: number]: boolean }>({});
  const [voidOrderMenu, setVoidOrderMenu] = useState<boolean>(false);
  const [refundMenu, setRefundMenu] = useState<boolean>(false);
  const [vacateTableMenu, setVacateTableMenu] = useState<boolean>(false);
  const [openTicket, setOpenTicket] = useState<boolean>(false); // to open ticket details modal
  const [data, setData] = useState<any[]>([]);

  const userDetails = useSelector((state: any) => state.user);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null); // To track the open dropdown

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
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the specific index
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
  console.log(menuOpenMap2, toggleMenu2);

  const getTickets = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderByBranch/?branch_id=${selectedBranch.id}`,
        headers
      );
      console.log(response.data);
      setData(response.data);
      toast.success(response.data.message || "Successful");
    } catch (error) {
      toast.error("Error retrieving tickets");
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
              {/* <div className=" flex items-center gap-[32px]">
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
              </div> */}

              <div className="flex items-center justify-between">
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
              </div>
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
                <button onClick={getTickets} className="text-[16px] flex items-center gap-[8px]">
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
                      {selectedBranch.label}
                    </p>
                    <p onClick={handleTicketMenu}>{item.menu_items[0].tableNumber || index}</p>
                    {item.menu_items[0].tableNumber || `Ord00${index + 1}`}
                    <p className=" ">
                      {item.updatedAt.slice(0, 10)}-{item.updatedAt.slice(11, 16)}
                    </p>
                    {/* <p onClick={handleTicketMenu}>{item.date}</p> */}

                    <p onClick={handleTicketMenu}>{item.customer || ""}</p>
                    <p>{item.waiter || ""}</p>
                    <p>{item.channel || ""}</p>
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
                      {item.status === "Pending" && (
                        <img src={orange} alt="" className="w-[12px] h-[12px]" />
                      )}
                      <p>{item.status}</p>
                    </div>
                    <p>&#x20A6;{item.menu_items[0].totalPrice}</p>
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

              <VoidOrderMenu
                voidOrderMenu={voidOrderMenu}
                handleVoidOrderMenu={handleVoidOrderMenu}
                setVoidOrderMenu={setVoidOrderMenu}
              />

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
                      {selectedBranch.label}
                    </p>
                    <p onClick={handleTicketMenu}>{item.menu_items[0].tableNumber || index}</p>
                    <p onClick={handleTicketMenu}>
                      {item.menu_items[0].tableNumber || `Ord00${index + 1}`}
                    </p>
                    <p className=" ">
                      {item.updatedAt.slice(0, 10)}-{item.updatedAt.slice(11, 16)}
                    </p>{" "}
                    <p onClick={handleTicketMenu}>{item.customer || ""}</p>
                    <p>{item.waiter || ""}</p>
                    <p>{item.channel || ""}</p>
                    <div className="flex items-center justify-center gap-[10px]">
                      <img src={green} alt="" className="w-[12px] h-[12px]" />
                      <p>Served</p>
                    </div>
                    <p>&#x20A6;{item.menu_items[0].totalPrice}</p>
                    <p className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <div
                        className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                        onClick={() => toggleMenu2(item.id)}
                      >
                        <img src={More} alt="" className="w-[5px]" />
                      </div>
                      {menuOpenMap2[item.id] && (
                        <div className="absolute top-0 -left-[100px] mt-2 ml-2 bg-white border border-[#E7E7E7] rounded shadow p-[16px] drop-shadow">
                          <div className=" grid gap-[16px] items-start text-left  text-[14px] font-[400] text-[#000000]">
                            <p
                              onClick={() => {
                                handleRefundMenu();
                                setMenuOpenMap2((prevMenuOpenMap) => ({
                                  ...prevMenuOpenMap,
                                  [item.id]: false,
                                }));
                              }}
                              className="cursor-pointer"
                            >
                              Request Refund
                            </p>
                            <p
                              onClick={() => {
                                handleVoidOrderMenu();
                                setMenuOpenMap2((prevMenuOpenMap) => ({
                                  ...prevMenuOpenMap,
                                  [item.id]: false,
                                }));
                              }}
                              className="cursor-pointer"
                            >
                              Void Order
                            </p>
                            <p
                              onClick={() => {
                                handleVacateTableMenu();
                                setMenuOpenMap2((prevMenuOpenMap) => ({
                                  ...prevMenuOpenMap,
                                  [item.id]: false,
                                }));
                              }}
                              className="cursor-pointer"
                            >
                              Vacate Table
                            </p>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                ))}
              </div>

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

export default Tickets;
