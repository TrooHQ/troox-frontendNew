import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import Publish from "../../assets/publish.svg";
import MenuLayout from "./MenuLayout";
import CoffeeLayout from "./CoffeeLayout";

const Coffee = () => {
  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <Link to="/">
                  <button className="text-[16px] flex items-center gap-[8px]">
                    <img src={Add} alt="" /> Add new menu
                  </button>
                </Link>
              </div>
              <div className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
                <Link to="/">
                  <button className="text-[14px] flex items-center gap-[8px]">
                    <img src={Publish} alt="" /> Publish changes
                  </button>
                </Link>
              </div>
            </div>
            <div className=" flex ">
              <MenuLayout />
              <div className="mt-[24px] w-full border p-[16px]">
                <p className=" font-[400] text-[12px] text-[#606060]">
                  Menu Group
                </p>
                <CoffeeLayout />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Coffee;
