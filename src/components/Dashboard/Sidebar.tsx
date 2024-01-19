import React, { useState } from "react";
import Logo from "../../assets/troo-logo-white.png";
import HomeIcon from "../../assets/troo-logo-white.png";
import Arrow from "../../assets/arrow.png";

interface MenuItem {
  title: string;
  src: string;
  gap?: boolean;
  icon?: string;
  subMenu?: MenuItem[];
}

interface SIdeBarProps {
  userType: "user" | "admin";
}

const SideBar: React.FC<SIdeBarProps> = ({ userType }) => {
  const [open, setOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const commonMenu: MenuItem[] = [
    { title: "Home", src: "Home", gap: false, icon: HomeIcon },
    {
      title: "Play Mode",
      src: "Play",
      gap: false,
      //  icon: PlayIcon
    },

    {
      title: "Advanced Settings",
      src: "Advanced_Settings",
      //   icon: SettingsIcon,
      subMenu: [
        {
          title: "Submenu 1",
          src: "Submenu1",
          //   icon: ""
        },
        {
          title: "Submenu 2",
          src: "Submenu2",
          //   icon: ""
        },
      ],
    },
    {
      title: "Help",
      src: "Help",
      gap: false,
      // icon: HelpIcon
    },
    {
      title: "Logout",
      src: "Logout",
      gap: false,
      // icon: LogoutIcon
    },
  ];

  const adminMenu: MenuItem[] = [
    { title: "AdminHome", src: "AdminHome", gap: false, icon: HomeIcon },
  ];

  const userMenu = [...commonMenu];

  const selectedMenu = userType === "admin" ? adminMenu : userMenu;

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div>
      <div
        className={` ${
          open ? "w-full" : "w-20 "
        }  h-screen p-5  pt-8 relative duration-300 border-r`}
      >
        <img
          src="./src/assets/Arrow2.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 
       ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center justify-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
          {selectedMenu.map((menu, index) => (
            <li>
              <p
                key={index}
                className={`flex   rounded-md p-2 cursor-pointer py-5 hover:bg-[#8580F0]  text-gray-300 text-sm items-center gap-x-4 
        ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-[#8580F0]"} `}
                onClick={() => menu.subMenu && handleSubmenuToggle(index)}
              >
                <img
                  src={menu.icon}
                  alt={menu.title}
                  style={{ width: "20px", marginRight: "8px" }}
                />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
                {menu.subMenu && <img src={Arrow} alt="" />}
              </p>
              <div className="">
                {menu.subMenu && openSubmenuIndex === index && (
                  <ul className="pl-4">
                    {menu.subMenu.map((subMenuItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex   rounded-md p-2 cursor-pointer py-5 hover:bg-[#8580F0]  text-gray-300 text-sm items-center gap-x-4 "
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
