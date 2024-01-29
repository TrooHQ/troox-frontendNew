import React from "react";
import { Link, useLocation } from "react-router-dom";
import chevron_right from "../../assets/chevron_right.svg";
import Add from "../../assets/addWhite.svg";

const CoffeeLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const activeClass = (path: string) => {
    return isActive(path) ? "text-purple600  font-[500]" : "";
  };

  return (
    <div className="mt-[4px]">
      <nav className="flex flex-col gap-[8px]">
        <a
          href="/coffee-items"
          className={`text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px] ${activeClass(
            "/coffee-items"
          )}`}
        >
          Coffee <img src={chevron_right} alt="" />
        </a>
        {/* <NavLink
          to="/blackCoffee"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          black coffee <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          latte <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          expresso <img src={chevron_right} alt="" className=" " />
        </NavLink> */}

        <div className="">
          <div className=" w-[196px]  px-[10px] py-[6px] font-[500] text-purple500">
            <Link to="/">
              <button className="text-[16px] flex items-center gap-[8px]">
                <img src={Add} alt="" /> Add Menu Group
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CoffeeLayout;
