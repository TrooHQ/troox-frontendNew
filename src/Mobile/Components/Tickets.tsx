import More from "../assets/right-arroww.svg";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Close from "../../assets/closeIcon.svg";
import Red from "../assets/red.svg";
import Green from "../assets/green.svg";
import Orange from "../assets/orange.svg";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopMenuNav from "./TopMenuNav";
import Loader from "../../components/Loader";

interface Ticket {
  orderID: string;
  customer_name: string;
  menu_items: MenuItem[];
  orders: string[];
  total_price: number;
  createdAt: string;
  status: string;
  name: string;
}

interface MenuItem {
  name: string;
  price: string;
  quantity: string;
  totalPrice: number;
}

const Tickets = () => {
  const [ticketModal, setTicketModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const handleTicketModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketModal(true);
  };

  const userDetails = useSelector((state: RootState) => state.user);
  const token = userDetails?.userData?.token;

  const getTicket = async () => {
    setLoading(true);
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
      setTickets(response.data);
    } catch (error) {
      console.error("Error Retrieving Tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);
  return (
    <div className="my-[16px] mx-[24px] relative">
      {loading && <Loader />}
      <TopMenuNav title="Tickets" />

      <div className="">
        <div className="my-[32px] text-[14px] font-[400] text-grey500  flex justify-between border-b pb-[12px] px-[8px]">
          <p className=" w-[80px]">Name</p>
          <p className="w-[54px]">Number</p>
          <p className=" w-[132px]">Orders</p>
        </div>

        {tickets.map((ticket, index) => (
          <div
            key={index}
            className=" my-[32px] text-[14px] font-[400] text-grey500  border-b pb-[12px] px-[8px] flex items-center justify-between"
          >
            <p className="capitalize w-[80px]">
              {(ticket?.customer_name || "")
                .split(" ")
                .map((name, index) =>
                  index === 0
                    ? name
                    : index === 1
                    ? ` ${name.charAt(0).toUpperCase()}.`
                    : ""
                )}
            </p>

            <p className=" w-[54px] ">#{ticket?.orderID || "20"}</p>
            <div
              className="w-[132px] flex justify-between items-center cursor-pointer"
              onClick={() => handleTicketModal(ticket)}
            >
              <div className="">
                {ticket?.menu_items.map((item, index) => (
                  <div key={index}>
                    <p className=" text-[16px] font-[400] text-[#121212]">
                      {item?.quantity || 1}x{" "}
                      <span className=" p-[5px]">{item?.name}</span>
                    </p>
                  </div>
                ))}
              </div>
              <img src={More} alt="" className={` `} />
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={ticketModal}>
        <div className=" w-[328px] h-[500px]">
          <div className=" flex items-center justify-between">
            <div className=" py-[16px] border-b border-b-[#E7E7E7] w-full">
              <p className=" text-[16px] font-[500] text-grey500 ">Name</p>
              <div className=" text-[16px] font-[400] text-grey500 flex items-center justify-between capitalize">
                <p>
                  {selectedTicket?.customer_name
                    .split(" ")
                    .map((name, index) =>
                      index === 0
                        ? name
                        : index === 1
                        ? ` ${name.charAt(0).toUpperCase()}.`
                        : ""
                    )}
                </p>
              </div>
            </div>
            <img
              src={Close}
              alt=""
              onClick={() => setTicketModal(false)}
              className=" cursor-pointer"
            />
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7]">
            <p className=" text-[16px] font-[500] text-grey500  pb-[16px]">
              Orders
            </p>
            <div className="text-[16px] font-[400] text-grey500">
              {selectedTicket?.menu_items.map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className=" text-[16px] font-[400] text-[#121212]">
                    {order.quantity || 2}x{" "}
                    <span className=" p-[5px]">{order.name}</span>
                  </p>
                  <p> &#x20A6;{order.totalPrice || 1}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7] grid gap-[8px]">
            <p className="text-[16px] font-[500] text-grey500 ">Order Number</p>
            <p className=" text-[16px] font-[400] text-grey500">
              {"#"}
              {selectedTicket?.orderID || "20"}
              {/* {selectedTicket?.number} */}
            </p>
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7] grid gap-[8px]">
            <p className=" text-[16px] font-[500] text-grey500">Time</p>
            <p className=" text-[16px] font-[400] text-grey500">
              {" "}
              {dayjs(selectedTicket?.createdAt).format("h:mm a")}
            </p>
          </div>

          <p className=" flex items-center gap-[8px] py-[16px]">
            {selectedTicket?.status === "served" && <img src={Green} />}
            {selectedTicket?.status === "Accepted" && <img src={Red} />}
            {selectedTicket?.status === "Pending" && <img src={Orange} />}
            <span className=" font-[500] text-[16px] text-[#414141] capitalize">
              {" "}
              {selectedTicket?.status}
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Tickets;
