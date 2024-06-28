import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from "../../assets/troo-logo.png";
import LogoMini from "../../assets/logo-mini-icon.svg";
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

interface MenuItem {
  subTitle?: string;
  title?: string;
  gap?: boolean;
  Subgap?: boolean;
  icon?: string;
  subMenu?: MenuItem[];
  link?: string;
}

interface SideBarProps {
  userType: "user" | "admin";
}

const SideBar: React.FC<SideBarProps> = ({ userType }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  useEffect(() => {
    // Open the submenu if the current location is within its links
    selectedMenu.forEach((menu, index) => {
      if (
        menu.subMenu &&
        menu.subMenu.some(
          (subMenuItem) => subMenuItem.link === location.pathname
        )
      ) {
        setOpenSubmenuIndex(index);
      }
    });
  }, [location.pathname]);

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
      link: "/menu-home",
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
      subTitle: "SETTINGS",
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
        open ? "w-[203px]" : "w-20"
      }  h-screen relative overflow-y-auto left-0 top-0 duration-300 bg-[#ebebeb]`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="grid gap-10 items-center">
        <div className="flex gap-x-4 mt-4 items-center justify-start">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 w-[200px] ${
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

        <div
          className={`cursor-pointer duration-500 ${
            !open ? "hidden" : "block"
          } `}
        >
          <hr className="h-[1px] text-[#929292] mb-2" />
          <div className="ml-[5px]">
            <h4 className="text-base font-medium mb-2">Chicken Republic</h4>
            <p className="text-[#606060] text-xs font-normal">Restaurant</p>
          </div>
          <hr className="h-[1px] bg-[#929292] mt-2" />
        </div>
      </div>
      <ul className="pt-6 pl-[15px] grid gap-[10px]">
        {selectedMenu.map((menu, index) => (
          <div key={index}>
            <li>
              <div
                className={`flex relative ${
                  menu.title && " px-[14px] cursor-pointer py-[8px]  "
                }  ${
                  menu.subTitle && "text-[12px] font-normal text-[#121212]"
                } text-purple200  items-center gap-x-2
            ${menu.gap ? " mt-28" : ""} ${menu.Subgap && "my-5"} ${
                  isMenuItemActive(menu.link || "", menu.subMenu)
                    ? "  bg-[#d3d3d3] font-[600] text-[16px] text-[#414141] "
                    : !isMenuItemActive(menu.link || "", menu.subMenu) &&
                      !menu.subTitle
                    ? " "
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
                <NavLink to={menu.link || "#"} className="flex-grow">
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 text-[#000]`}
                  >
                    {menu.title}
                    {menu.subTitle}
                  </span>
                </NavLink>
                {menu.subMenu && (
                  <img
                    src={ArrowToggle}
                    alt=""
                    className={`text-[#414141] absolute right-[10px]  transition-transform ${
                      openSubmenuIndex === index ? "rotate-180" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuToggle(index);
                    }}
                  />
                )}
              </div>
              <div className="">
                {menu.subMenu && openSubmenuIndex === index && (
                  <ul className="pl-8">
                    {" "}
                    {menu.subMenu.map((subMenuItem, subIndex) => (
                      <NavLink to={subMenuItem.link || "#"} key={subIndex}>
                        <li
                          className={`flex  p-2 cursor-pointer py-2  text-purple200 text-sm items-center gap-x-4 ${
                            isMenuItemActive(subMenuItem.link || "")
                              ? "text-[#000] font-semibold"
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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
