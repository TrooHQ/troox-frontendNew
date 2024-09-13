import { useEffect, useState } from "react";
import TopMenuNav from "./InRoomTopMenuNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemQuantity,
} from "../../slices/BasketSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdKeyboardArrowRight } from "react-icons/md";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

interface MenuItem {
  _id: string;
  menu_item_name: string;
  menu_group_name: string;
  menu_item_image: string;
  menu_item_price: number;
  name: string;
  business_name: string;
  menu_category_name: string;
}

interface Details extends MenuItem {
  name: string;
  _id: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;
}

interface GroupedMenuItems {
  [groupName: string]: MenuItem[];
}

export const InRoomCategoryDetails = () => {
  const [menuItems, setMenuItems] = useState<Details[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState("All");

  const handleGroupClick = (groupName: string) => {
    setSelectedGroup(groupName);
  };

  const filteredMenuItems =
    selectedGroup === "All"
      ? menuItems
      : menuItems.filter((menu) => menu.menu_group_name === selectedGroup);

  const groupedMenuItems: GroupedMenuItems = filteredMenuItems.reduce(
    (acc: GroupedMenuItems, item: MenuItem) => {
      const { menu_group_name } = item;
      if (!acc[menu_group_name]) {
        acc[menu_group_name] = [];
      }
      acc[menu_group_name].push(item);
      return acc;
    },
    {}
  );

  const ids = useSelector((state: RootState) => state.basket.items);
  const totalCount = useSelector((state: RootState) => state.basket);
  console.log(totalCount);

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  const business_identifier = businessDetails?._id;
  const branchId = useSelector((state: RootState) => state.business?.branchID);

  const getItems = async () => {
    setLoading(true);
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuItem/?business_identifier=${business_identifier}&branch=${branchId}`,
        headers
      );
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error getting Menu Items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
        },
      },
    ],
  };

  const dispatch = useDispatch();

  const increment = (menuItem: Details) => {
    const itemInBasket = ids.find((item) => item.id === menuItem._id);
    if (itemInBasket) {
      dispatch(
        updateItemQuantity({
          id: menuItem._id,
          quantity: itemInBasket.quantity + 1,
        })
      );
    } else {
      dispatch(
        addItemToBasket({
          id: menuItem._id,
          quantity: 1,
          selectedOptions: [],
          totalPrice: menuItem.menu_item_price,
          name: menuItem.menu_item_name,
          tableNumber: 1,
        })
      );
    }
  };

  const decrement = (menuItem: Details) => {
    const itemInBasket = ids.find((item) => item.id === menuItem._id);
    if (itemInBasket) {
      if (itemInBasket.quantity > 1) {
        dispatch(
          updateItemQuantity({
            id: menuItem._id,
            quantity: itemInBasket.quantity - 1,
          })
        );
      } else {
        dispatch(removeItemFromBasket({ id: menuItem._id }));
      }
    }
  };
  return (
    <div className=" relative ">
      {loading && <Loader />}
      <div className="  ">
        <TopMenuNav />
        <div className="  mb-[100px]">
          <div className=" py-[20px] flex gap-[8px] items-center px-[24px] overflow-x-auto whitespace-nowrap text-[14px]">
            <p
              className={`cursor-pointer px-[12px] py-[8px] rounded-[4px] ${
                selectedGroup === "All"
                  ? `font-[600] text-[#FFFFFF] border border-[#929292]`
                  : "text-[#606060] font-[400] border border-[#B6B6B6]"
              }`}
              style={{
                backgroundColor:
                  selectedGroup === "All" ? "#929292" : "transparent",
              }}
              onClick={() => handleGroupClick("All")}
            >
              All
            </p>

            <div className="flex gap-[8px] items-center">
              {Array.from(
                new Set(menuItems.map((menu) => menu.menu_group_name))
              )
                .filter((groupName) => groupName !== undefined)
                .map((groupName, index) => (
                  <div key={index}>
                    <p
                      className={`cursor-pointer px-[12px] py-[8px] rounded-[4px] border border-[#929292]`}
                      style={{
                        backgroundColor:
                          selectedGroup === groupName
                            ? "#929292"
                            : "transparent",
                        borderColor:
                          selectedGroup === groupName ? "#929292" : "#B6B6B6",
                        color:
                          selectedGroup === groupName ? "#FFFFFF" : "#606060",
                        fontWeight:
                          selectedGroup === groupName ? "bold" : "400",
                        borderStyle: "solid",
                      }}
                      onClick={() => handleGroupClick(groupName)}
                    >
                      {groupName}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className=" bg-[#E7E7E7]">
            <div className=" flex items-center justify-between py-[14px] px-[24px]">
              <p className=" text-[16px] font-[500]">Most Popular</p>
              <div className=" text-[16px]">
                <MdKeyboardArrowRight />
              </div>
            </div>
            <div className="overflow-x-auto mx-[12px]">
              <Slider {...settings}>
                {menuItems.map((menu, index) => (
                  <div
                    className="max-w-[170px] h-[167px] mx-auto pb-[34px]  p-[5px] rounded-[10px]   border-2 drop-shadow bg-[#FFFFFF] border-[#E7E7E7] flex-shrink-0"
                    key={index}
                  >
                    <Link to={`/demo/menu-details/${menu._id}/online_ordering`}>
                      <div>
                        <div className=" w-full h-[112px] relative">
                          <img
                            src={menu?.menu_item_image}
                            alt=""
                            className="w-full object-cover h-full"
                          />

                          <div
                            className="absolute -bottom-4 text-white right-0 rounded-full"
                            style={{
                              backgroundColor: "#414141",
                            }}
                          >
                            <HiPlusSm className="text-[37px]" />
                          </div>
                        </div>
                        <p className="text-[14px] text-[#121212] font-[500] px-[16px] mt-[8px] text-center">
                          {menu?.menu_item_name?.length > 10
                            ? `${menu?.menu_item_name.substring(0, 10)}...`
                            : menu?.menu_item_name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className=" py-[20px]">
            {Object.keys(groupedMenuItems).map((groupName) => (
              <div key={groupName} className="mb-[24px]">
                <p className="text-[20px] font-bold text-[#121212] mb-[12px] px-[24px]">
                  {groupName === "undefined" ? "" : groupName}
                </p>

                {groupedMenuItems[groupName].map((menu) => (
                  <div key={menu._id} className="mx-[24px]">
                    <div className="py-[11px] border-b border-[#E7E7E7]">
                      <div className="flex items-center justify-between">
                        <div className="w-[180px]">
                          <p className="text-[16px] text-[#121212] font-[500]">
                            {menu.menu_item_name}
                          </p>
                          <p className="text-[12px] font-[400] text-[#121212]">
                            Delicious Delicacy
                          </p>
                        </div>

                        <div>
                          <Link
                            to={`/demo/menu-details/${menu._id}/online_ordering`}
                          >
                            <img
                              src={menu?.menu_item_image}
                              alt={menu?.menu_item_name}
                              className="h-[80px] w-[80px] object-cover rounded-[8px]"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="pt-[8px] flex items-center justify-between">
                        <p className="text-[16px] text-[#121212] font-[500]">
                          From &#x20A6;{menu.menu_item_price.toLocaleString()}
                        </p>

                        <div className="w-[100px]">
                          {ids.find((item) => item.id === menu._id) ? (
                            <div className="flex items-center justify-end gap-[12px]">
                              <div
                                className="cursor-pointer text-white rounded-full"
                                onClick={() => decrement(menu)}
                                style={{
                                  backgroundColor: "#414141",
                                }}
                              >
                                <HiMinusSm className="text-[27px]" />
                              </div>

                              <p className="text-[16px] font-[500]">
                                {ids.find((item) => item.id === menu._id)
                                  ?.quantity || 1}
                              </p>

                              <div
                                className="cursor-pointer text-white rounded-full"
                                onClick={() => increment(menu)}
                                style={{
                                  backgroundColor: "#414141",
                                }}
                              >
                                <HiPlusSm className="text-[27px]" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Link
                                to={`/demo/menu-details/${menu._id}/online_ordering`}
                              >
                                <div className="flex items-center justify-end">
                                  <div
                                    className="inline-flex cursor-pointer text-white rounded-full"
                                    onClick={() => increment(menu)}
                                    style={{
                                      backgroundColor: "#414141",
                                    }}
                                  >
                                    <HiPlusSm className="text-[27px]" />
                                  </div>
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {ids && (
          <div className=" fixed bottom-[10px] left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-32px)] mx-auto">
            <div className="flex justify-between items-center py-[13px] px-[24px] text-white bg-[#FF0000] rounded-[3px] cursor-pointer">
              <div className="flex items-center gap-[16px]">
                <p className="bg-white rounded-[5px] text-[#FF0000] py-[12px] px-[10px] text-[16px] font-[500]">
                  {totalCount.totalQuantity || 0}
                </p>

                <p>&#x20A6;{totalCount.totalPrice || 0.0}</p>
              </div>
              <Link to="/demo/basket/in_room_dining">
                <p className="text-[16px] font-[500]">View Basket</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
