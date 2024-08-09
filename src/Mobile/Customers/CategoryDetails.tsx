import { useEffect, useState } from "react";
import Minus from "../assets/Minus.svg";
import Add from "../assets/add.svg";
import TopMenuNav from "./TopMenuNav";
import { Link, useParams } from "react-router-dom";
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
import Counter from "../../Mobile/assets/counter.png";

import { MdKeyboardArrowRight } from "react-icons/md";

interface MenuItem {
  _id: string;
  menu_item_name: string;
  menu_item_price: number;
}

interface Details extends MenuItem {
  name: string;
  _id: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;

  // name: string;
  // business_name: string;
  // menu_category_name: string;
  // menu_group_name: string;
  // menu_item_image: string;
}
// interface Group {
//   menu_category_name: string;
//   name: string;
// }
export const CategoryDetails = () => {
  const [menuGroup, setMenuGroup] = useState<Details[]>([]);
  const [menuItems, setMenuItems] = useState<Details[]>([]);
  const [loading, setLoading] = useState(false);

  const ids = useSelector((state: RootState) => state.basket.items);
  const totalCount = useSelector((state: RootState) => state.basket);
  console.log(totalCount);

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  const business_identifier = businessDetails?._id;
  const getGroups = async () => {
    setLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuGroup/?business_identifier=${business_identifier}`,
        headers
      );
      console.log(
        "Business groups Retrieved successfully:",
        response.data.data
      );
      setMenuGroup(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        const firstMatch = response.data.data.find(
          (group: any) => group.menu_category_name === id
        );
        console.log("First match found:", firstMatch);

        if (firstMatch) {
          setSelectedGroup(firstMatch.name);
        } else {
          setSelectedGroup(response.data.data[0].name);
        }
      }
    } catch (error) {
      console.error("Error getting Business Details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getItems = async () => {
    setLoading(true);
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuItem/?business_identifier=${business_identifier}`,
        headers
      );
      console.log("Business items Retrieved successfully:", response.data.data);
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
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
  const { id } = useParams();

  const [selectedGroup, setSelectedGroup] = useState("");

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
        <TopMenuNav>
          <div className=" bg-white  pt-[24px] mb-[8px] flex items-center gap-[8px] text-center overflow-x-auto whitespace-nowrap">
            {menuGroup.map((menu) => (
              <div key={menu._id}>
                {menu.menu_category_name === id && (
                  <div className="flex items-center">
                    <p
                      className={`px-[12px] py-[8px] inline-block ${
                        selectedGroup === menu.name
                          ? "bg-[#FF0000] text-white font-[600]"
                          : "border text-[#606060] font-[400]"
                      } text-[14px] cursor-pointer`}
                      onClick={() => setSelectedGroup(menu.name)}
                    >
                      {menu.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TopMenuNav>
        <div className="  mb-[100px]">
          <p className="mx-[24px] text-[18px] font-[500] uppercase py-[9px] border-b text-[#FF0000] ">
            {selectedGroup}
          </p>

          <div className=" bg-[#E7E7E7]">
            <div className=" flex items-center justify-between py-[14px] px-[24px]">
              <p className=" text-[16px] font-[500]">Most Popular</p>
              <div className=" text-[16px]">
                <MdKeyboardArrowRight />
              </div>
            </div>
            <div className="overflow-x-auto mx-[12px]">
              <Slider {...settings}>
                {menuItems.map(
                  (menu, index) =>
                    menu.menu_group_name === selectedGroup && (
                      <div
                        className="max-w-[170px] mx-auto pb-[34px] pt-[2px] rounded-[10px] px-[2px] mb-[14px] border-2 drop-shadow bg-[#FFFFFF] border-[#E7E7E7] flex-shrink-0"
                        key={index}
                        // onClick={() => openModal(menu._id)}
                      >
                        <Link to={`/demo/menu-details/${menu._id}/orderandpay`}>
                          <div>
                            <div className="relative">
                              <img
                                src={menu?.menu_item_image}
                                alt=""
                                className="w-full object-cover h-auto"
                              />
                              <img
                                src={Counter}
                                alt=""
                                className="absolute -bottom-4 right-0"
                              />
                            </div>
                            <p className="text-[14px] text-[#121212] font-[500] px-[16px] mt-[8px]">
                              {menu?.menu_item_name?.length > 18
                                ? `${menu?.menu_item_name.substring(0, 15)}...`
                                : menu?.menu_item_name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                )}
              </Slider>
            </div>
          </div>

          {menuItems.map((menu) => (
            <div key={menu._id} className={` mx-[24px]`}>
              {menu.menu_group_name === selectedGroup && (
                <>
                  <div className="">
                    <div
                      className=" py-[11px] border-b border-[#E7E7E7] "
                      key={menu._id}
                    >
                      <div className="flex items-center justify-between">
                        <div className=" w-[180px]">
                          <p className=" text-[16px] text-[#121212] font-[500]">
                            {menu.menu_item_name}
                          </p>
                          <p className=" text-[12px] text-[#121212]">
                            Delicious Delicacy
                          </p>
                        </div>

                        <div className="">
                          <Link
                            to={`/demo/menu-details/${menu._id}/orderandpay`}
                          >
                            <img
                              src={menu.menu_item_image}
                              alt=""
                              className=" h-[80px] w-[80px] object-cover rounded-[8px]"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="pt-[8px] flex items-center justify-between">
                        <p className=" text-[16px] text-[#121212] font-[500] ">
                          From &#x20A6;{menu.menu_item_price}
                        </p>

                        <div className="w-[100px]">
                          {ids.find((item) => item.id === menu._id) ? (
                            <div
                              key={menu._id}
                              className="flex items-center justify-between"
                            >
                              <img
                                src={Minus}
                                alt="decrement"
                                onClick={() => decrement(menu)}
                                className="cursor-pointer"
                              />
                              <p className="text-[16px] font-[500]">
                                {ids.find((item) => item.id === menu._id)
                                  ?.quantity || 1}
                              </p>
                              <img
                                src={Add}
                                alt="increment"
                                onClick={() => increment(menu)}
                                className="cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="">
                              <Link
                                to={`/demo/menu-details/${menu._id}/orderandpay`}
                              >
                                <div className="flex items-center justify-end">
                                  <img src={Add} alt="add" />
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
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
              <Link to="/demo/basket/orderandpay">
                <p className="text-[16px] font-[500]">View Basket</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
