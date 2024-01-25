import React from "react";
import { NavLink } from "react-router-dom";
import chevron_right from "../../assets/chevron_right.svg";

interface CustomNavLinkProps {
  activeClassName: string;
}
const MenuLayout: React.FC = () => {
  const customNavLinkProps: CustomNavLinkProps = {
    activeClassName: "text-purple600 bg-purple100",
  };
  return (
    <div className="mt-[24px]">
      <nav className="flex flex-col gap-[8px]">
        <NavLink
          to="/coffee"
          {...customNavLinkProps}
          className="text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]"
        >
          COFFEE <img src={chevron_right} alt="" />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          SOUPS <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          SPECIALS <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          DESSERT <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          HAPPY MEAL <img src={chevron_right} alt="" className=" " />
        </NavLink>
        <NavLink
          to="/home"
          {...customNavLinkProps}
          className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
        >
          DRINKS <img src={chevron_right} alt="" className=" " />
        </NavLink>
      </nav>
    </div>
  );
};

export default MenuLayout;
