import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/troo-logo-white.png";
import LogoMini from "../../assets/logo-mini-icon.svg";
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
import ArrowToggle from "../../assets/arrowToggle.svg";
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
      link: "",
      subMenu: [
        {
          title: "Menu Builder",
          link: "/menu-builder",
        },
        {
          title: "Price List",
          link: "/price-list",
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
  const isMenuItemActive = (
    menuLink: string,
    subMenu?: MenuItem[]
  ): boolean => {
    if (location.pathname === menuLink) {
      return true;
    }
    if (subMenu) {
      return subMenu.some((subMenuItem) =>
        isMenuItemActive(subMenuItem.link || "", subMenuItem.subMenu)
      );
    }
    return false;
  };

  return (
    <div
      className={`p-2 ${
        open ? "w-[253px]" : "w-20"
      }  h-screen relative overflow-y-auto left-0 top-0 duration-300 bg-[#5855B3]`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* <img
        src="./src/assets/Arrow2.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 
       ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      /> */}

      <div className=" grid gap-10 items-center">
        <div className="flex gap-x-4  items-center justify-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              !open ? "hidden" : "block"
            } `}
            onClick={() => setOpen(!open)}
          />
          <img
            src={LogoMini}
            className={`cursor-pointer duration-500 ${
              !open ? "block" : "hidden"
            } `}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex gap-x-4 items-center justify-center">
          <img
            src={RestaurantLogo}
            className={`cursor-pointer duration-500 ${
              !open ? "hidden" : "block"
            }`}
          />
        </div>
      </div>
      <ul className="pt-6 pl-[15px] grid gap-[10px]">
        {selectedMenu.map((menu, index) => (
          <div key={index}>
            <NavLink to={menu.link || "#"}>
              <li>
                <p
                  className={`flex relative ${
                    menu.title && " px-[14px] cursor-pointer py-[8px]  "
                  }  ${
                    menu.subTitle && "text-[12px]"
                  } text-purple200  items-center gap-x-2
            ${menu.gap ? " mt-28" : ""} ${menu.Subgap && "my-5"} ${
                    isMenuItemActive(menu.link || "", menu.subMenu)
                      ? "  bg-selectedState font-[600] text-[16px] text-white "
                      : !isMenuItemActive(menu.link || "", menu.subMenu) &&
                        !menu.subTitle
                      ? " hover:bg-[#504EA3] "
                      : ""
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
                  {menu.subMenu && (
                    <img
                      src={ArrowToggle}
                      alt=""
                      className={`text-white absolute right-[10px]  transition-transform ${
                        openSubmenuIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </p>

                <div className="">
                  {menu.subMenu && openSubmenuIndex === index && (
                    <ul className="pl-8">
                      {" "}
                      {menu.subMenu.map((subMenuItem, subIndex) => (
                        <NavLink to={subMenuItem.link || "#"}>
                          <li
                            key={subIndex}
                            className={`flex  p-2 cursor-pointer py-2 hover:bg-purple700  text-purple200 text-sm items-center gap-x-4 ${
                              isMenuItemActive(subMenuItem.link || "")
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {subMenuItem.title}
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </NavLink>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
