import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import chevron_right from "../../assets/chevron_right.svg";

const MenuLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const activeClass = (path: string) => {
    return isActive(path) ? "text-purple600 bg-purple100" : "";
  };

  return (
    <div className="mt-[24px]">
      <nav className="flex flex-col gap-[8px]">
        <a
          href="/coffee"
          className={`text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px] ${activeClass(
            "/coffee"
          )}`}
        >
          COFFEE <img src={chevron_right} alt="" />
        </a>
        <NavLink
          to="/home"
          className={`text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px] ${activeClass(
            "/home"
          )}`}
        >
          SOUPS <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          SPECIALS <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          DESSERT <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          HAPPY MEAL <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          DRINKS <img src={chevron_right} alt="" className=" " />
        </NavLink>
      </nav>
    </div>
  );
};

export default MenuLayout;
