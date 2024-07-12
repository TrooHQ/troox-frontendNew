import logo from "../assets/restaurant_menu.svg";
import Confirmation from "../assets/confirmation_numbe.svg";
import setting from "../assets/settings.svg";
import orderIcon from "../assets/order2.svg";
import restaurantIcon from "../assets/restaurant_FILL0_wght300_GRAD0_opsz24.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Menu from "../assets/menu.svg";
import CustomSelect3 from "../inputFields/CustomSelect3";

const Dashboard = () => {
  const options = [
    { value: "daily", label: "Daily", link: "demo/report/troo-portal" },
    { value: "weekly", label: "Weekly", link: "demo/report/troo-portal" },
    { value: "monthly", label: "Monthly", link: "demo/report/troo-portal" },
  ];
  const userDetails = useSelector((state: RootState) => state.user);
  console.log(userDetails?.userData);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className=" my-[10px] mx-[10px]">
        <div className=" flex items-center gap-[8px] py-[16px] border-b">
          <div className=" cursor-pointer" onClick={toggleSidebar}>
            <img src={Menu} alt="" />
          </div>
          <div className="  h-[24px] w-[24px] overflow-hidden rounded-full">
            <img
              src={userDetails?.userData?.business_logo || logo}
              alt=""
              className=" w-full object-fill"
            />
          </div>
          <p className=" text-20px font-[400] text-grey500">
            {userDetails?.userData?.business_name}
          </p>
        </div>

        <div className=" py-[16px] px-[24px] bg-[#DB7F3B] rounded-[5px] mt-[16px]">
          <div className=" flex items-center justify-between">
            <p className=" font-[400] text-[12px] text-white">Total sales</p>

            <CustomSelect3
              options={options}
              placeholder="Sort Orders"
              BG=" bg-none"
              text=" text-white"
            />
          </div>

          <p className=" text-[28px] font-[500] text-white leading-[36px]">
            N250,000.00
          </p>

          <div className=" grid gap-[5px] mt-[16px]">
            <p className=" text-[14px] font-[400] text-white leading-[21px]">
              30 Processed orders
            </p>
            <p className=" text-[14px] font-[400] text-white leading-[21px]">
              30 Processed orders
            </p>
          </div>
        </div>

        <div className=" mt-[16px] grid grid-cols-2 gap-[16px]">
          <Link to="/demo/ticket/troo-portal">
            <div className=" px-[28px] py-[47px] bg-[#AEE1D8] rounded-[5px]">
              <div className=" flex flex-col gap-[8px] items-center justify-center">
                <img src={Confirmation} alt="" />
                <p className=" text-[20px] font-[400] text-grey500 ">Tickets</p>
              </div>
            </div>
          </Link>

          <Link to="/demo/admin-menu/troo-portal">
            <div className=" px-[28px] py-[47px] bg-[#E5BFD0] rounded-[5px]">
              <div className=" flex flex-col gap-[8px] items-center justify-center">
                <img src={restaurantIcon} alt="" />
                <p className=" text-[20px] font-[400] text-grey500 ">Menu</p>
              </div>
            </div>
          </Link>

          <Link to="/demo/order/troo-portal">
            <div className=" px-[28px] py-[47px] bg-[#E8DEB4] rounded-[5px]">
              <div className=" flex flex-col gap-[8px] items-center justify-center">
                <img src={orderIcon} alt="" />
                <p className=" text-[20px] font-[400] text-grey500 ">Orders</p>
              </div>
            </div>
          </Link>

          <Link to="/demo/settings/troo-portal">
            <div className=" px-[28px] py-[47px] bg-[#F9D9CA] rounded-[5px]">
              <div className=" flex flex-col gap-[8px] items-center justify-center">
                <img src={setting} alt="" />
                <p className=" text-[20px] font-[400] text-grey500">Settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
