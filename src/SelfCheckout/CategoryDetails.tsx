import { useEffect, useState } from "react";
import Add from "../SelfCheckout/assets/incrementIcon.svg";
import Minus from "../SelfCheckout/assets/decrementIcon.svg";
import Counter from "../SelfCheckout/assets/counter.svg";
import { Link, useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../Api/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import MenuDetailsModal from "./MenuDetails";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import Header2 from "./Header2";
import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemQuantity,
} from "../slices/BasketSlice";

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
}

export const CategoryDetails = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
        },
      },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    AOS.init({
      duration: 1000,
      once: true,
    });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const openModal = (menuItemId: string) => {
    setSelectedMenuItemId(menuItemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const incrementCount = (menuItem: Details) => {
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

  const decrementCount = (menuItem: Details) => {
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

  const [menuGroup, setMenuGroup] = useState<Details[]>([]);
  const [menuItems, setMenuItems] = useState<Details[]>([]);

  const ids = useSelector((state: RootState) => state.basket.items);
  console.log(ids);

  const totalCount = useSelector((state: RootState) => state.basket);

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  const business_identifier = businessDetails?._id;
  console.log(business_identifier);

  useEffect(() => {
    const getGroups = async () => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.get<{ data: Details[] }>(
          `${SERVER_DOMAIN}/menu/getCustomerMenuGroup/?business_identifier=${business_identifier}`,
          headers
        );
        console.log(
          "Business groups retrieved successfully:",
          response.data.data
        );
        setMenuGroup(response.data.data);

        if (response.data.data && response.data.data.length > 0) {
          const firstMatch = response.data.data.find(
            (group) => group.menu_category_name === id
          );
          console.log("First match found:", firstMatch);

          if (firstMatch) {
            setSelectedGroup(firstMatch.name);
          } else {
            setSelectedGroup(response.data.data[0].name);
          }
        }
      } catch (error) {
        console.error("Error getting business details:", error);
      }
    };

    getGroups();
  }, [id]);

  const getItems = async () => {
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
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log("Selected Group:", selectedGroup);
  return (
    <div className=" relative ">
      <div className="  ">
        <div className="">
          <Header2>
            <div className="mt-[24px] mb-[8px] ">
              <div
                className="flex items-center gap-[8px] text-center overflow-x-auto whitespace-nowrap"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {menuGroup.map((menu) => (
                  <div key={menu._id} className="">
                    {menu.menu_category_name === id && (
                      <p
                        className={`px-[24px] py-[8px] ${
                          selectedGroup === menu?.name
                            ? "text-[#C5291E]  font-[600]"
                            : "text-[#606060] font-[400]"
                        } text-[32px] cursor-pointer`}
                        onClick={() => setSelectedGroup(menu?.name)}
                      >
                        {menu?.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedGroup && (
              <p className=" text-[56px] font-[600] text-[#FFFFFF] py-[10px] px-[16px] bg-[#FF0000]">
                {selectedGroup}
              </p>
            )}
          </Header2>
        </div>

        <div className=" ">
          <div className=" flex items-center justify-between py-[32px] px-[24px]">
            <p className=" text-[32px] font-[500]">Most Popular</p>
            <div className=" text-[50px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Slider {...settings}>
              {menuItems.map(
                (menu, index) =>
                  menu.menu_group_name === selectedGroup && (
                    <div
                      className="max-w-[406px] pb-[34px] pt-[18px] rounded-[10px] px-[7px] mb-[34px] border-2 drop-shadow border-[#E7E7E7] flex-shrink-0"
                      key={index}
                      onClick={() => openModal(menu._id)}
                    >
                      <div>
                        <div className="relative">
                          <img
                            src={menu?.menu_item_image}
                            alt=""
                            className="w-full object-cover h-[300px]"
                          />
                          <img
                            src={Counter}
                            alt=""
                            className="absolute bottom-2 right-2"
                          />
                        </div>
                        <p className="text-[32px] text-[#121212] font-[500] px-[24px] mt-[24px]">
                          {menu?.menu_item_name?.length > 18
                            ? `${menu?.menu_item_name.substring(0, 15)}...`
                            : menu?.menu_item_name}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </Slider>
          </div>
        </div>

        <div className="mx-[16px] ">
          <div className="grid grid-cols-2 items-center gap-4 mb-[100px]">
            {menuItems.map(
              (menu, index) =>
                menu.menu_group_name === selectedGroup && (
                  <div
                    className="pb-[34px] pt-[18px] rounded-[10px] px-[7px] my-[34px] border-2 drop-shadow border-[#E7E7E7] max-w-[500px]"
                    key={index}
                  >
                    <div>
                      <img
                        src={menu?.menu_item_image}
                        alt=""
                        className="w-full object-cover h-[217px]"
                        onClick={() => openModal(menu._id)}
                      />
                      <p className="text-[32px] text-[#121212] font-[500] px-[24px] mt-[24px]">
                        {menu?.menu_item_name?.length > 18
                          ? `${menu?.menu_item_name.substring(0, 18)}...`
                          : menu?.menu_item_name}
                      </p>
                    </div>
                    <div className="pt-[8px] flex items-center justify-between px-[24px]">
                      <p className="text-[36px] text-[#C5291E] font-[500]">
                        &#x20A6;{menu?.menu_item_price?.toLocaleString()}
                      </p>

                      <div>
                        {ids.find((item) => item.id === menu._id) ? (
                          <div className="flex items-center justify-between gap-[20px]">
                            <img
                              src={Minus}
                              alt=""
                              onClick={() => decrementCount(menu)}
                              className="cursor-pointer"
                            />
                            <p className="text-[16px] font-[500]">
                              {ids.find((item) => item.id === menu._id)
                                ?.quantity || 1}
                            </p>
                            <img
                              src={Add}
                              alt=""
                              onClick={() => incrementCount(menu)}
                              className="cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div>
                            <div
                              className="flex items-center justify-end"
                              onClick={() => openModal(menu._id)}
                            >
                              <img src={Add} alt="" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        {ids && (
          <div className="fixed bottom-[10px] left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-32px)] mx-auto my-[16px]">
            <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#C5291E] rounded-[3px] ">
              <div className="flex items-center gap-[16px] text-[44px] font-[500] text-white">
                <p>
                  Total &#x20A6;
                  {totalCount.totalPrice?.toLocaleString() || 0.0}
                </p>
              </div>
              <Link to="/demo/basket/selfcheckout">
                <p className=" text-white  text-[36px] font-[500] py-[14px] px-[38px] rounded-[5px] bg-[#F38D41]">
                  Checkout
                </p>
              </Link>
            </div>
          </div>
        )}

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#ffffff] text-[#000000] px-4 py-4 rounded-full shadow-lg hover:bg-[#000000] hover:text-white transition-all duration-300 animate-bounce hover:animate-none"
          >
            <RiArrowUpDoubleLine className="text-2xl" />
          </button>
        )}
      </div>

      <MenuDetailsModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        menuItemId={selectedMenuItemId}
      />
    </div>
  );
};
