import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import red from "../../assets/red.svg";
import orange from "../../assets/orange.svg";
import green from "../../assets/green.svg";
import More from "../../assets/more_vert.svg";
import { useEffect, useState } from "react";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import add from "../../assets/add.svg";
import { Delete, DeleteForeverOutlined } from "@mui/icons-material";
import BranchModal from "./components/BranchModal";

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
    branchName: "Agege branch",
    address: "123 Agege Motor Road, Agege",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "agege@chickenrepublic.com",
  },
  {
    id: 2,
    branchName: "Alimosho branch",
    address: "18 Alimosho Busstop, Alimosho",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "alimosho@chickenrepublic.com",
  },
  {
    id: 3,
    branchName: "Ajah branch",
    address: "23 Ajah Busstop, Ajah",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "ajah@chickenrepublic.com",
  },
  {
    id: 4,
    branchName: "Egbeda branch",
    address: "Egbeda Rounabout Busstop, Egdeda",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "egbeda@chickenrepublic.com",
  },
  {
    id: 5,
    branchName: "Ikeja branch",
    address: "123 Ikeja GRA, Ikeja",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "ikeja@chickenrepublic.com",
  },
  {
    id: 6,
    branchName: "Ikoyi branch",
    address: "12 Falomo Busstop, Ikoyi",
    manager: "Samuel Oni",
    city: "Lagos",
    email: "ikoyi@chickenrepublic.com",
  },
];

const ManageBranches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="my-[40px]">
            <div className="flex items-center justify-between">
              <div className=" flex items-center gap-[32px]">
                <div className="">
                  <p className=" font-[500] text-[16px] text-[#121212]">Filter by:</p>
                </div>
                <div className=" flex items-center gap-[8px]">
                  <div className="border border-purple500 bg-purple500  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                    <button className="text-[12px] ">Add</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[121212]">
                    <button className="text-[12px] ">Branch Name</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Address</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">Manager</button>
                  </div>
                  <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                    <button className="text-[12px] ">City</button>
                  </div>
                </div>
              </div>
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[14px] flex items-center gap-[8px]" onClick={handleAddMenu}>
                  <img src={add} alt="" /> Create New Branch
                </button>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-center text-base font-normal">
                    <th className="py-2 px-4 text-base font-normal">Branch Name</th>
                    <th className="py-2 px-4 text-base font-normal">Address</th>
                    <th className="py-2 px-4 text-base font-normal">Manager</th>
                    <th className="py-2 px-4 text-base font-normal">City</th>
                    <th className="py-2 px-4 text-base font-normal">Email</th>
                    <th className="py-2 px-4 text-base font-normal">Actions</th>
                  </tr>
                </thead>

                <hr className="mb-2 text-[##E7E7E7]" />

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"}`}
                    >
                      <td className="text-base font-medium py-2 px-4">{item.branchName}</td>
                      <td className="text-base font-medium py-2 px-4 break-words">
                        {item.address}
                      </td>
                      <td className="text-base font-medium py-2 px-4 break-words">
                        {item.manager}
                      </td>
                      <td className="text-base font-medium py-2 px-4 break-words">{item.city}</td>
                      <td className="text-base font-medium py-2 px-4 break-words text-center">
                        {item.email}
                      </td>
                      <td className=" text-center">
                        <DeleteForeverOutlined className="text-red-700" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BranchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ManageBranches;
