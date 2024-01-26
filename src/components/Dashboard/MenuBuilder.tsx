import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import MenuLayout from "./MenuLayout";
import Add from "../../assets/add.svg";
import Publish from "../../assets/publish.svg";
import { Link } from "react-router-dom";
const MenuBuilder = () => {
  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
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
          {/* <MenuLayout /> */}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MenuBuilder;
