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

const data = [
  {
    id: 1,
    code: "MGC500",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Cashier",
    status: "Ordered",
    amount: "#3500",
  },
  {
    id: 2,
    code: "MGC501",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Cashier",
    status: "Served",
    amount: "#3500",
  },
  {
    id: 3,
    code: "MGC502",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Joe",
    channel: "Cashier",
    status: "Ready",
    amount: "#3500",
  },
  {
    id: 4,
    code: "MGC500",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Hand-held",
    status: "Ordered",
    amount: "#3500",
  },
  {
    id: 5,
    code: "MGC501",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Steven",
    channel: "Pay-at-table",
    status: "Served",
    amount: "#3500",
  },
  {
    id: 6,
    code: "MGC502",
    date: "09/04/23 - 10:20",
    customer: "Wande",
    waiter: "Joe",
    channel: "Cashier",
    status: "Ready",
    amount: "#3500",
  },
];
const token = sessionStorage.getItem("token");

const Tickets = () => {
  const [menuOpenMap, setMenuOpenMap] = useState<{ [key: number]: boolean }>(
    {}
  );
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

  const createEmployee = async () => {
    // setLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrder`,
        headers
      );
      console.log("Tickets Retrieved successfully:", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    createEmployee();
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
                  <p className=" font-[500] text-[16px] text-purple500">
                    Filter by:
                  </p>
                </div>
                <div className=" flex items-center gap-[8px]">
                  <div className="border border-purple500 bg-purple500  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                    <button className="text-[12px] ">Add</button>
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
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                  Open tables
                </p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-9 border-b">
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
                    className={`text-center py-[14px] px-[32px] grid grid-cols-9 items-center font-[500] text-[14px] text-[#414141] ${
                      index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                    }`}
                    key={index}
                  >
                    <p className="items-center">{item.id}</p>
                    <p>{item.code}</p>
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
                        <img
                          src={orange}
                          alt=""
                          className="w-[12px] h-[12px]"
                        />
                      )}
                      <p>{item.status}</p>
                    </div>
                    <p>{item.amount}</p>
                    <p className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <img
                        src={More}
                        alt=""
                        className="w-[5px] cursor-pointer"
                        onClick={() => toggleMenu(item.id)}
                      />
                      {menuOpenMap[item.id] && (
                        <div className="absolute top-0 -left-[100px] mt-2 ml-2 bg-white border border-[#E7E7E7] rounded shadow p-[16px] drop-shadow">
                          <div className=" grid gap-[16px] items-start text-left  text-[14px] font-[400] text-[#000000]">
                            <p className="">Register Payment</p>
                            <p>Void Order</p>
                            <p>Edit</p>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="py-[32px] border rounded-[10px] border-grey100 mt-[24px]">
                <p className=" px-[32px]  font-[400] text-[24px] text-[#121212]">
                  Closed tables
                </p>

                <div className=" text-center pb-[16px] mb-[16px] pt-[24px] px-[32px] grid grid-cols-9 border-b">
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
                    className={`text-center py-[14px] px-[32px] grid grid-cols-9 items-center font-[500] text-[14px] text-[#414141] ${
                      index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                    }`}
                    key={index}
                  >
                    <p className="items-center">{item.id}</p>
                    <p>{item.code}</p>
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
                        <img
                          src={orange}
                          alt=""
                          className="w-[12px] h-[12px]"
                        />
                      )}
                      <p>{item.status}</p>
                    </div>
                    <p>{item.amount}</p>
                    <p className="flex items-center justify-center py-[10px] px-[20px] rounded-full relative">
                      <img
                        src={More}
                        alt=""
                        className="w-[5px] cursor-pointer"
                        onClick={() => toggleMenu(item.id)}
                      />
                      {menuOpenMap[item.id] && (
                        <div className="absolute top-0 -left-[100px] mt-2 ml-2 bg-white border border-[#E7E7E7] rounded shadow p-[16px] drop-shadow">
                          <div className=" grid gap-[16px] items-start text-left  text-[14px] font-[400] text-[#000000]">
                            <p className="">Register Payment</p>
                            <p>Void Order</p>
                            <p>Edit</p>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Tickets;
