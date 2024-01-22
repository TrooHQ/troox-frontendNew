import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/troo-logo-white.png";
import RestaurantLogo from "../../assets/restaurant_name.png";
import OverviewIcon from "../../assets/OverviewIcon.svg";
import TicketIcon from "../../assets/Tickets.svg";
import MenuIcon from "../../assets/menuIcon.svg";
import PaymentIcon from "../../assets/paymentIcon.svg";
import AccountingIcon from "../../assets/AccountingIcon.svg";
import RestaurantDetailsIcon from "../../assets/restaurantDetails.svg";
import ManageTablesIcon from "../../assets/manageTableIcon.svg";
import PointOfSalesIcon from "../../assets/posIcon.svg";
import HomeIcon from "../../assets/troo-logo-white.png";
import ManageUsersIcon from "../../assets/manageUsers.svg";
import LogoutIcon from "../../assets/logout.svg";
import Arrow from "../../assets/arrow.png";
import { NavLink } from "react-router-dom";

interface MenuItem {
  subTitle?: string;
  title?: string;
  gap?: boolean;
  Subgap?: boolean;
  icon?: string;
  subMenu?: MenuItem[];
  link?: string;
}

interface SIdeBarProps {
  userType: "user" | "admin";
}

const SideBar: React.FC<SIdeBarProps> = ({ userType }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const commonMenu: MenuItem[] = [
    {
      subTitle: "MY RESTAURANT",
      Subgap: true,
    },
    {
      title: "Overview",
      gap: false,
      icon: OverviewIcon,
      link: "/overview",
    },
    {
      title: "Tickets",
      gap: false,
      icon: TicketIcon,
      link: "/tickets",
    },

    {
      title: "Menu",
      icon: MenuIcon,
      subMenu: [
        {
          title: "Submenu 1",
        },
        {
          title: "Submenu 2",
        },
      ],
    },
    {
      title: "Payment",
      gap: false,
      icon: PaymentIcon,
      link: "/payment",
    },
    {
      title: "Accounting",
      gap: false,
      icon: AccountingIcon,
      link: "/account",
    },
    {
      subTitle: "CONFIGURATIONS",
      Subgap: true,
    },
    {
      title: "Restaurant Details",
      gap: false,
      icon: RestaurantDetailsIcon,
      link: "/restaurant-details",
    },
    {
      title: "Manage Tables",
      gap: false,
      icon: ManageTablesIcon,
      link: "/manage-tables",
    },
    {
      title: "Manage Users",
      gap: false,
      icon: ManageUsersIcon,
      link: "/manage-users",
    },
    {
      title: "Point of Sales",
      gap: false,
      icon: PointOfSalesIcon,
      link: "/pos",
    },
    {
      title: "Logout",
      gap: true,
      icon: LogoutIcon,
      link: "/logout",
    },
  ];

  const adminMenu: MenuItem[] = [
    { title: "AdminHome", gap: false, icon: HomeIcon },
  ];

  const userMenu = [...commonMenu];

  const selectedMenu = userType === "admin" ? adminMenu : userMenu;

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const isMenuItemActive = (menuLink: string) => {
    return location.pathname === menuLink;
  };

  return (
    <div>
      <div
        className={` ${
          open ? "w-full" : "w-20 "
        } p-5  pt-8 relative duration-300 border-r `}
      >
        <img
          src="./src/assets/Arrow2.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 
       ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className=" grid gap-10 items-center">
          <div className="flex gap-x-4 items-center justify-center">
            <img
              src={Logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
          <div className="flex gap-x-4 items-center justify-center">
            <img
              src={RestaurantLogo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
        </div>
        <ul className="pt-6">
          {selectedMenu.map((menu, index) => (
            <NavLink to={menu.link}>
              {" "}
              <li key={index}>
                <p
                  className={`flex   ${
                    menu.title &&
                    "rounded-md p-2 cursor-pointer py-5 hover:bg-[#8580F0]"
                  }  text-gray-300 text-sm items-center gap-x-4 
     ${menu.gap ? " mt-28" : ""} ${menu.Subgap && "my-5"} ${
                    isMenuItemActive(menu.link || "")
                      ? "bg-[#8580F0] font-[600] text-[16px] text-white "
                      : " "
                  }`}
                  onClick={() => menu.subMenu && handleSubmenuToggle(index)}
                >
                  {menu.title && (
                    <img
                      src={menu.icon}
                      alt={menu.title}
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                  )}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200 `}
                  >
                    {menu.title}
                    {menu.subTitle}
                  </span>
                  {menu.subMenu && <img src={Arrow} alt="" />}
                </p>
                <div className="">
                  {menu.subMenu && openSubmenuIndex === index && (
                    <ul className="pl-4">
                      {menu.subMenu.map((subMenuItem, subIndex) => (
                        <li
                          key={subIndex}
                          className={`flex   rounded-md p-2 cursor-pointer py-5 hover:bg-[#8580F0]  text-gray-300 text-sm items-center gap-x-4 ${
                            isMenuItemActive(subMenuItem.link || "")
                              ? "text-white"
                              : ""
                          }`}
                        >
                          <img
                            src={subMenuItem.icon}
                            alt={subMenuItem.title}
                            style={{ width: "16px", marginRight: "4px" }}
                          />
                          {subMenuItem.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
