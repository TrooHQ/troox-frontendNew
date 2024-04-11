import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";

interface TabItem {
  id: number;
  label: string;
  content: () => JSX.Element;
}

interface Ticket {
  ordered_by: string;
  menu_items: string[];
  orders: string[];
  total_price: number[];
  createdAt: string;
  status: string;
  _id: number;
}
const OrderTab: React.FC = () => {
  const tabItems: TabItem[] = [
    { id: 1, label: "Taken", content: renderMenuCategory },
    { id: 2, label: "Ready", content: renderMenuCategoryReady },
  ];
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  const getTicket = async (status: string) => {
    setLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/order/getOrderbyStatus/?status=${status}`,
        headers
      );
      console.log(
        `Tickets with status "${status}" retrieved successfully:`,
        response.data
      );
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving tickets by status:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    setLoader(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const requestData = { order_id: id, status };

    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/order/updateOrder/`,
        requestData,
        headers
      );
      console.log("Ticket status updated successfully:", response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      getTicket("Pending");
    } else if (activeTab === 2) {
      getTicket("Accepted");
    }
  }, [activeTab]);

  function renderMenuCategory() {
    return (
      <>
        {tickets.length !== 0 ? (
          loading ? (
            <p>Loading...</p>
          ) : (
            <div className=" grid gap-[16px]">
              {tickets.map((ticket, index) => (
                <div
                  className="rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border"
                  key={index}
                >
                  <div className="rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
                    <p className="capitalize">{ticket.ordered_by}</p>
                    <p>#{ticket.total_price}</p>
                  </div>
                  <div className="font-[400] text-[16px] mt-[8px] capitalize">
                    <div className="">
                      {Object.values(ticket.menu_items).map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="text-white text-center font-[500] text-[14px] bg-[#ED5048] py-[8px] flex items-center justify-center w-full rounded-[5px] mt-[16px] "
                    disabled={loader}
                    onClick={() => updateStatus(ticket._id, "accept")}
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <p>No Order Available</p>
        )}
      </>
    );
  }

  function renderMenuCategoryReady() {
    return (
      <>
        <>
          {tickets.length !== 0 ? (
            loading ? (
              <p>Loading...</p>
            ) : (
              <div className=" grid gap-[16px]">
                {tickets.map((ticket, index) => (
                  <div
                    className="rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border"
                    key={index}
                  >
                    <div className="rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
                      <p className="capitalize">{ticket.ordered_by}</p>
                      <p>#{ticket.total_price}</p>
                    </div>
                    <div className="font-[400] text-[16px] mt-[8px] capitalize">
                      <div className="">
                        {Object.values(ticket.menu_items).map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </div>
                    </div>

                    <button
                      className="text-white text-center font-[500] text-[14px] bg-[#11AE16] py-[8px] flex items-center justify-center w-full rounded-[5px] mt-[16px] "
                      disabled={loader}
                      onClick={() => updateStatus(ticket._id, "accept")}
                    >
                      Serve
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p>No Order Available</p>
          )}
        </>
      </>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2  mb-4 border-b">
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`cursor-pointer text-[16px] leading-[24px] py-4 px-4`}
            onClick={() => handleTabChange(tab.id)}
          >
            <p
              className={` inline text-[16px] leading-[24px] py-4 px-4 ${
                activeTab === tab.id
                  ? "font-[600] text-grey500 border-b-4 border-[#E16B07] "
                  : "text-[#929292] font-[400]"
              }`}
            >
              {tab.label}
            </p>
          </div>
        ))}
      </div>
      <div>
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab !== tab.id ? "hidden" : ""}`}
          >
            {tab.content()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTab;
