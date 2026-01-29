import { RiHome4Fill } from "react-icons/ri";
import { LuNotepadText, LuUtensils } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";
import { RxCaretSort } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineQrcode } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { PiStackLight, PiUsersLight } from "react-icons/pi";
import { LiaConciergeBellSolid } from "react-icons/lia";
import { CiShoppingTag } from "react-icons/ci";
import { clearUserData } from "../../../slices/UserSlice";
import { clearSelectedBranch } from "../../../slices/branchSlice";
export default function SideBar() {
  const { userData } = useSelector((state: RootState) => state.user);


  const commonMenu = [
    {
      title: "Overview",
      icon: <RiHome4Fill />,
      link: "/overview",
    },
    {
      title: "Menu Categories",
      icon: <LuUtensils />,
      link: "/menu-categories",
    },
    {
      title: "Menu items",
      icon: <LiaConciergeBellSolid />,
      link: "/menu-list",
    },
    
    {
      title: "Modifiers",
      icon: <PiStackLight />,
      link: "/menu-modifiers",
    },
    {
      title: "Variations",
      icon: <PiStackLight />,
      link: "/menu-variation",
    },
    {
      title: "Ticketing",
      icon: <LuNotepadText />,
      link: "/tickets",
    },
    {
      title: "Promos",
      icon: <CiShoppingTag />,
      link: "/",
    },
  ];

  const popupMenu = [
    {
      title: "Account Settings",
      icon: <MdOutlineManageAccounts />,
      link: "/settings",
    },
    {
      title: "Manage Users",
      icon: <PiUsersLight />,
      link: "/manage-users",
    },
    {
      title: "Manage Assets",
      icon: <AiOutlineQrcode />,
      link: "/qr-ordering",
    },
    {
      title: "Help Center",
      icon: <IoIosHelpCircleOutline />,
      link: "/",
    },
  ];

  const url = window.location.pathname;

  // Access more features to boost your business
  // Upgrade now

  const [settingPopup, setSettingPopup] = useState(false);

  // handle logout

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(clearUserData());
      dispatch(clearSelectedBranch());
  
      navigate("/");
    };

  return (
    <div className="flex flex-col justify-between w-full h-[90vh] ">
      <div>
        {commonMenu.map((menu, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-3 cursor-pointer group "
          >
            <div
              className={`flex items-center justify-between p-4  ${menu.link === url ? "bg-slate-100 border-l-4 border-l-slate-700" : "hover:bg-slate-100 group-hover:border-l-4 group-hover:border-l-slate-600"} `}
            >
              <NavLink to={menu.link} className="flex items-center gap-3 ">
                <p
                  className={`text-xl group-hover:text-slate-600 ${menu.title === url ? "text-slate-700" : "group-hover:text-slate-600"}`}
                >
                  {menu.icon}
                </p>
                <p
                  className={`${menu.title === url ? "text-slate-700 font-semibold" : "group-hover:text-slate-600 group-hover:font-semibold"}`}
                >
                  {menu.title}
                </p>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 px-4 mb-5">
        <NavLink
          to={"/subscription-plan"}
          className="flex flex-col gap-2 p-3 border rounded-md bg-slate-100 border-slate-200"
        >
          <p className="text-sm text-slate-500">
            Access more features to boost your business{" "}
          </p>
          <p className="font-semibold text-xs flex items-center gap-2">
            Upgrade Plan <GoArrowUpRight />
          </p>
        </NavLink>

        <div className="flex flex-row gap-2 p-3 bg-white border rounded-md border-slate-200 relative">
          <div
            style={{ backgroundImage: `url(${userData?.business_logo})` }}
            className="w-10 h-10 bg-center bg-no-repeat bg-cover border rounded-full border-slate-300"
          />

          <div className="relative">
            <h3 className="font-semibold text-slate-700 text-sm">
              {userData?.first_name + " " + userData?.last_name}
            </h3>
            <p className="text-slate-500 text-sm ">
              {userData?.business_email}
            </p>
          </div>
          <RxCaretSort
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setSettingPopup(!settingPopup)}
          />
          {settingPopup && (
            <div className="w-full absolute bottom-0 left-[100%] z-30 border border-solid-black bg-gray-300 rounded-md overflow-hidden">
              <div className="rounded-md bg-white overflow-hidden">
                {popupMenu.map((item) => (
                  <NavLink
                    to={item?.link}
                    className={`flex items-center gap-3 p-3 hover:bg-slate-100 ${item.link === url ? "bg-slate-50 border-l-4 border-l-slate-700" : item.title.toLocaleLowerCase() === "logout" ? "hover:border-l-red-400 hover:border-l-4" : "hover:bg-slate-50 hover:border-l-4 hover:border-l-slate-600"}`}
                  >
                    {/* <div className="w-full flex items-center gap-4"> */}
                    <span className="text-xl">{item.icon}</span>
                    <p className="text-sm">{item.title}</p>
                    {/* </div> */}
                  </NavLink>
                ))}
              </div>
              <div>
                <div
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:border-l-red-400 hover:border-l-4`}
                  onClick={handleLogout}
                >
                  {/* <div className="w-full flex items-center gap-4"> */}
                  <IoLogOutOutline className="text-red-500 text-xl" />
                  <p className="text-sm">Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
