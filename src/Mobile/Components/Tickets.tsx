import Arrow from "../assets/BackArrow.svg";
import DashboardBackButton from "../Buttons/DashboardBackButton";
import More from "../../assets/more_vert.svg";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Close from "../../assets/closeIcon.svg";
import Red from "../assets/red.svg";
import Green from "../assets/green.svg";
import Orange from "../assets/orange.svg";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import dayjs from "dayjs";

interface Ticket {
  ordered_by: string;
  menu_items: string[];
  orders: string[];
  total_price: number[];
  createdAt: string;
  status: string;
}

const Tickets = () => {
  // const [loading, setLoading] = useState<boolean>(false);

  const [ticketModal, setTicketModal] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const handleTicketModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketModal(true);
  };

  const token = sessionStorage.getItem("token");

  // const ticketData: Ticket[] = [
  //   {
  //     name: "James O.",
  //     number: "#124",
  //     orders: ["Jollof-Rice", "Titus", "Spaghetti"],
  //     price: [1000, 2000, 3000],
  //     Time: "9:30Am",
  //     status: "accepted",
  //   },
  //   {
  //     name: "James O. Jude",
  //     number: "#124",
  //     orders: ["Jollof-Rice", "Titus", "Spaghetti"],
  //     price: [1500, 2500, 3500],
  //     Time: "9:30Am",
  //     status: "ready",
  //   },
  //   {
  //     name: "John O. Jude",
  //     number: "#124",
  //     orders: ["Jollof-Rice", "Titus", "Spaghetti"],
  //     price: [1200, 2200, 3200],
  //     Time: "9:30Am",
  //     status: "served",
  //   },
  // ];

  const getTicket = async () => {
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
      setTickets(response.data);
    } catch (error) {
      console.error("Error Retrieving Tickets:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);
  return (
    <div className="my-[16px] mx-[24px]">
      <DashboardBackButton text="Tickets" img={Arrow} />

      <div className="">
        <div className="my-[32px] text-[14px] font-[400] text-grey500 flex justify-between border-b pb-[12px] px-[8px]">
          <p className="">Name</p>
          <p className="">Number</p>
          <p className="w-[90px]">Orders</p>
        </div>

        {tickets.map((ticket, index) => (
          <div
            key={index}
            className=" my-[32px] text-[14px] font-[400] text-grey500  border-b pb-[12px] px-[8px] flex items-center justify-between"
          >
            <p className="">{ticket.ordered_by}</p>
            <p className="">#20</p>
            <div className="w-[90px] flex gap-[14px]">
              <div className="">
                {ticket.menu_items.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
              <img
                src={More}
                alt=""
                className={`cursor-pointer w-[5px]`}
                onClick={() => handleTicketModal(ticket)}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={ticketModal}>
        <div className=" w-[328px] h-[500px]">
          <div className=" flex items-center justify-between">
            <div className=" py-[16px] border-b border-b-[#E7E7E7] w-full">
              <p className=" text-[16px] font-[500] text-grey500 ">Name</p>
              <div className=" text-[16px] font-[400] text-grey500 flex items-center justify-between">
                <p>{selectedTicket?.ordered_by}</p>
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
            <p className="text-[16px] font-[500] text-grey500">
              {selectedTicket?.menu_items.map((order, index) => (
                <div key={index} className=" flex items-center justify-between">
                  <p>{order}</p>
                  <p>${selectedTicket?.total_price}</p>
                </div>
              ))}
            </p>
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7] grid gap-[8px]">
            <p className="text-[16px] font-[500] text-grey500 ">Order Number</p>
            <p className=" text-[16px] font-[400] text-grey500">
              {" "}
              #20
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
            {selectedTicket?.status === "accepted" && <img src={Red} />}
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
