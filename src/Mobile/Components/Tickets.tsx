import Arrow from "../assets/BackArrow.svg";
import DashboardBackButton from "../buttons/DashboardBackButton";
import More from "../../assets/more_vert.svg";
import Modal from "./Modal";
import { useState } from "react";
import Close from "../../assets/closeIcon.svg";
import Red from "../assets/red.svg";
import Green from "../assets/green.svg";
import Orange from "../assets/orange.svg";

interface Ticket {
  name: string;
  number: string;
  orders: string[];
  price: number[];
  Time: string;
  status: string;
}

const Tickets = () => {
  const [ticketModal, setTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const handleTicketModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketModal(true);
  };

  const ticketData: Ticket[] = [
    {
      name: "James O.",
      number: "#124",
      orders: ["Jollof-Rice", "Titus", "Spaghetti"],
      price: [1000, 2000, 3000],
      Time: "9:30Am",
      status: "accepted",
    },
    {
      name: "James O. Jude",
      number: "#124",
      orders: ["Jollof-Rice", "Titus", "Spaghetti"],
      price: [1500, 2500, 3500],
      Time: "9:30Am",
      status: "ready",
    },
    {
      name: "John O. Jude",
      number: "#124",
      orders: ["Jollof-Rice", "Titus", "Spaghetti"],
      price: [1200, 2200, 3200],
      Time: "9:30Am",
      status: "served",
    },
  ];

  return (
    <div className="my-[16px] mx-[24px]">
      <DashboardBackButton text="Tickets" img={Arrow} />
      <div className="">
        <div className="my-[32px] text-[14px] font-[400] text-[#121212] flex justify-between border-b pb-[12px] px-[8px]">
          <p className="">Name</p>
          <p className="">Number</p>
          <p className="w-[90px]">Orders</p>
        </div>

        {ticketData.map((ticket, index) => (
          <div
            key={index}
            className="cursor-pointer my-[32px] text-[14px] font-[400] text-[#121212]  border-b pb-[12px] px-[8px] flex items-center justify-between"
            onClick={() => handleTicketModal(ticket)}
          >
            <p className="">{ticket.name}</p>
            <p className=" ">{ticket.number}</p>
            <p className="w-[90px] flex gap-[14px]">
              {ticket.orders.join(" ")}
              <img src={More} alt="" className={`cursor-pointer w-[5px]`} />
            </p>
          </div>
        ))}
      </div>

      <Modal isOpen={ticketModal}>
        <div className=" w-[328px] h-[500px]">
          <div className=" flex items-center justify-between">
            <div className=" py-[16px] border-b border-b-[#E7E7E7]">
              <p className=" text-[16px] font-[500] text-[#121212] ">Name</p>
              <p className=" text-[16px] font-[400] text-[#121212] flex items-center justify-between">
                <p>{selectedTicket?.name}</p>
              </p>
            </div>
            <img
              src={Close}
              alt=""
              onClick={() => setTicketModal(false)}
              className=" cursor-pointer"
            />
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7]">
            <p className=" text-[16px] font-[500] text-[#121212]  pb-[16px]">
              Orders
            </p>
            <p className="text-[16px] font-[500] text-[#121212]">
              {selectedTicket?.orders.map((order, index) => (
                <div key={index} className=" flex items-center justify-between">
                  <p>{order}</p>
                  <p>${selectedTicket?.price[index]}</p>
                </div>
              ))}
            </p>
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7] grid gap-[8px]">
            <p className="text-[16px] font-[500] text-[#121212] ">
              Order Number
            </p>
            <p className=" text-[16px] font-[400] text-[#121212]">
              {" "}
              {selectedTicket?.number}
            </p>
          </div>
          <div className="  py-[16px] border-b border-b-[#E7E7E7] grid gap-[8px]">
            <p className=" text-[16px] font-[500] text-[#121212]">Time</p>
            <p className=" text-[16px] font-[400] text-[#121212]">
              {" "}
              {selectedTicket?.Time}
            </p>
          </div>

          <p className=" flex items-center gap-[8px]">
            {selectedTicket?.status === "served" && <img src={Green} />}
            {selectedTicket?.status === "accepted" && <img src={Red} />}
            {selectedTicket?.status === "ready" && <img src={Orange} />}
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
