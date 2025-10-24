import { RiFileEditLine, RiHome4Fill } from 'react-icons/ri';
import { LuNotepadText, LuUtensils, LuUserRoundCog, LuUserRoundPlus } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { GoArrowUpRight } from 'react-icons/go';
import { RxCaretRight } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


export default function SideBar() {

  const { userData } = useSelector(
    (state: RootState) => state.user
  );

  console.log("userData", userData);

  const commonMenu = [

    {
      title: "Overview",
      icon: <RiHome4Fill />,
      link: "/overview",
      showMenu: true,
    },
    {
      title: "Tickets",
      icon: <LuNotepadText />,
      link: "/tickets",
      showMenu: true,
      subMenu: [
        {
          title: "Tickets",
          link: "/tickets",
          showMenu: true,
        },
        {
          title: "Order history",
          link: "/order-history",
          showMenu: true,
        },
        {
          title: "Customers",
          link: "/customer-data",
          showMenu: true,
        },
      ],
    },
    {
      title: "Menu",
      icon: <LuUtensils />,
      link: "/menu-list",
      showMenu: true,
      subMenu: [
        {
          title: "Menu List",
          link: "/menu-list",
          showMenu: true,
        },
        {
          title: "Menu Builder",
          link: "/menu-builder",
          showMenu: true,
        },
        {
          title: "Price List",
          link: "/price-list",
          showMenu: true,
        },
      ],
    },
    {
      title: "Restaurant Details",
      icon: <GrGroup />,
      link: "/business-information",
      showMenu: true,
      subMenu: [
        {
          title: "Business Information",
          link: "/business-information",
          showMenu: true,
        },
        {
          title: "Manage Branches",
          link: "/manage-branches",
          showMenu: true,
        },
      ],
    },
    {
      title: "Manage Users",
      icon: <LuUserRoundCog />,
      link: "/manage-users",
      showMenu: true,
      subMenu: [],
    },
    {
      title: "Tenant Settings",
      icon: <LuUserRoundPlus />,
      link: "/tenant-settings",
      showMenu: true,
      subMenu: [],
    },
    {
      title: "Manage Assets",
      icon: <RiFileEditLine />,
      link: "/qr-ordering",
      showMenu: true,
      subMenu: [
        {
          title: "QR Ordering",
          link: "/qr-ordering",
          showMenu: true,
        },
        {
          title: "Online Ordering",
          link: "/online-ordering",
          showMenu: true,
        },
        {
          title: "Troo Kiosk",
          link: "/troo-kiosk",
          showMenu: true,
        },
      ],
    },

  ];

  const url = window.location.pathname;




  // Access more features to boost your business
  // Upgrade now

  return (
    <div className='flex flex-col justify-between w-full h-full '>
      <div>
        {commonMenu.map((menu, index) => (
          <div key={index} className='flex flex-col justify-between gap-3 cursor-pointer group '  >
            <div className={`flex items-center justify-between p-4  ${menu.title === url || menu.subMenu && menu.subMenu.some(item => item.link === url) ? 'bg-gray-200 border-l-4 border-l-[#DC6803]' : 'hover:bg-gray-200 group-hover:border-l-4 group-hover:border-l-[#DC6803]'} `}>
              <NavLink to={menu.link} className='flex items-center gap-3 ' >
                <p className={`text-xl group-hover:text-[#DC6803] ${menu.title === url || menu.subMenu && menu.subMenu.some(item => item.link === url) ? 'text-[#DC6803]' : 'group-hover:text-[#DC6803]'}`}>{menu.icon}</p>
                <p className={`${menu.title === url || menu.subMenu && menu.subMenu.some(item => item.link === url) ? 'text-[#DC6803] font-semibold' : 'group-hover:text-[#DC6803] group-hover:font-semibold'}`}>{menu.title}</p>
              </NavLink>
              {menu.subMenu && menu.subMenu.length > 0 && <RxCaretRight className={`${menu.title === url || menu.subMenu && menu.subMenu.some(item => item.link === url) ? 'rotate-90 text-[#DC6803]' : 'group-hover:rotate-90 group-hover:text-[#DC6803]'}`} />}
            </div>

            {menu.subMenu && menu.subMenu.length > 0 && (
              <div className={` transition-all duration-500 delay-500  ${menu.title === url || menu.subMenu && menu.subMenu.some(item => item.link === url) ? 'block' : 'hidden group-hover:block group-hover:delay-500'}`}>
                {menu.subMenu.map((subItem, subIndex) => (
                  <NavLink to={subItem.link} key={subIndex} className={`flex items-center gap-3 p-4 pl-12 hover:bg-gray-200 ${subItem.link === url ? 'bg-gray-200 border-l-4 border-l-[#DC6803]' : 'hover:bg-gray-200 hover:border-l-4 hover:border-l-[#DC6803]'}`}>
                    <p className=''>{subItem.title}</p>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4 px-4 mb-5'>

        <NavLink to={'/subscription-plan'} className='flex flex-col gap-2 p-3 bg-gray-300 border border-gray-400 rounded-md'>
          <p className='text-sm text-gray-500'>Access more features to boost your business </p><p className='text-[#F86C17] flex items-center gap-2'>Upgrade Plan <GoArrowUpRight /></p>
        </NavLink >

        <div className='flex flex-row gap-2 p-3 bg-gray-100 border border-gray-400 rounded-md'>
          <div style={{ backgroundImage: `url(${userData?.business_logo})` }} className='w-12 h-12 bg-center bg-no-repeat bg-cover border border-gray-300 rounded-md' />
          <div><h3 className='font-semibold text-gray-700'>{userData?.first_name + " " + userData?.last_name}</h3>
            <p className='text-gray-500 '>{userData?.business_email}</p>
          </div>
        </div>
      </div>
    </div>

  )
}
