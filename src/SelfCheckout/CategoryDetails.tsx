import { useEffect, useState } from "react";
import Add from "../SelfCheckout/assets/incrementIcon.svg";
import Minus from "../SelfCheckout/assets/decrementIcon.svg";
import Back from "../SelfCheckout/assets/Back.svg";
import MiniLogo from "../SelfCheckout/assets/restaurantHeart.svg";
import Scroll from "../SelfCheckout/assets/scroll.svg";
import Counter from "../SelfCheckout/assets/counter.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../Api/Api";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MenuDetailsModal from "./MenuDetails";

interface Details {
  name: string;
  _id: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;
  menu_item_price: string;
}

export const CategoryDetails = () => {
  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState("");
  const { id } = useParams();

  const [counts, setCounts] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");

  const openModal = (menuItemId: string) => {
    setSelectedMenuItemId(menuItemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const storedCount = sessionStorage.getItem("count");
  //   if (storedCount !== null) {
  //     setCounts(Number(storedCount));
  //   }
  // }, []);

  const incrementCount = () => {
    const updatedCount = counts + 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  const decrementCount = () => {
    const updatedCount = counts - 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  const [menuGroup, setMenuGroup] = useState<Details[]>([]);
  const [menuItems, setMenuItems] = useState<Details[]>([]);

  const ids = useSelector((state: RootState) => state.basket.items);
  console.log(ids);

  const totalCount = useSelector((state: RootState) => state.basket);
  console.log(totalCount);

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  const business_identifier = businessDetails?._id;
  console.log(business_identifier);

  const getGroups = async () => {
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
      // if (response.data.data && response.data.data.length > 0) {
      //   setSelectedGroup(response.data.data[0].name);
      // }
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

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
    getGroups();
    getItems();
  }, []);

  console.log("Selected Group:", selectedGroup);
  return (
    <div className=" relative mt-[83px]">
      <div className="  ">
        <div className=" px-[8px] flex items-center justify-between">
          <img
            src={Back}
            alt=""
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
          <img src={MiniLogo} alt="" />
          <div className="">
            <img src={MiniLogo} alt="" className=" hidden" />
          </div>
        </div>

        <div className="mt-[24px] mb-[8px] ">
          {menuGroup.map((menu) => (
            <div
              key={menu._id}
              className="flex items-center gap-[8px] text-center  "
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              {menu.menu_category_name === id && (
                <div className="">
                  <p
                    className={`px-[32px] py-[8px] ${
                      selectedGroup === menu?.name
                        ? "text-[#C5291E]  font-[600]"
                        : " text-[#606060] font-[400]"
                    }  text-[32px] cursor-pointer`}
                    onClick={() => setSelectedGroup(menu?.name)}
                  >
                    {menu?.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedGroup && (
          <p className=" text-[56px] font-[600] text-[#FFFFFF] py-[10px] px-[16px] bg-[#FF0000]">
            {selectedGroup}
          </p>
        )}

        <div className=" ">
          <div className=" flex items-center justify-between py-[32px] px-[24px]">
            <p className=" text-[32px] font-[500]">Most Popular</p>
            <div className="">
              <img src={Scroll} alt="" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4">
              {menuItems.map(
                (menu, index) =>
                  menu.menu_group_name === selectedGroup && (
                    <div
                      className="max-w-[406px] pb-[34px] pt-[18px] rounded-[10px] px-[7px] mb-[34px] border-2 drop-shadow border-[#E7E7E7] flex-shrink-0"
                      key={index}
                      onClick={() => openModal(menu._id)}
                    >
                      <div>
                        <div className=" relative">
                          <img
                            src={menu?.menu_item_image}
                            alt=""
                            className="w-full object-cover h-[300px]"
                          />
                          <img
                            src={Counter}
                            alt=""
                            className=" absolute bottom-2 right-2"
                          />
                        </div>
                        <p className="text-[32px] text-[#121212] font-[500] px-[24px] mt-[24px]">
                          {menu?.menu_item_name?.length > 18
                            ? `${menu?.menu_item_name.substring(0, 18)}...`
                            : menu?.menu_item_name}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="mx-[16px]">
          <div className="grid grid-cols-2 items-center gap-4">
            {menuItems.map(
              (menu, index) =>
                menu.menu_group_name === selectedGroup && (
                  <div
                    className="pb-[34px] pt-[18px] rounded-[10px] px-[7px] my-[34px] border-2 drop-shadow border-[#E7E7E7] max-w-[500px]"
                    key={index}
                    onClick={() => openModal(menu._id)}
                  >
                    {/* <Link to={`/menu-details/${menu._id}`}> */}
                    <div>
                      <img
                        src={menu?.menu_item_image}
                        alt=""
                        className="w-full object-cover h-[217px]"
                      />
                      <p className="text-[32px] text-[#121212] font-[500] px-[24px] mt-[24px]">
                        {menu?.menu_item_name?.length > 18
                          ? `${menu?.menu_item_name.substring(0, 18)}...`
                          : menu?.menu_item_name}
                      </p>
                    </div>
                    {/* </Link> */}
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
                              onClick={decrementCount}
                              className="cursor-pointer"
                            />
                            <p className="text-[16px] font-[500]">
                              {ids.find((item) => item.id === menu._id)
                                ?.quantity || 1}
                            </p>
                            <img
                              src={Add}
                              alt=""
                              onClick={incrementCount}
                              className="cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div>
                            {/* <Link to={`/menu-details/${menu._id}`}> */}
                            <div
                              className="flex items-center justify-end"
                              onClick={() => openModal(menu._id)}
                            >
                              <img src={Add} alt="" />
                            </div>
                            {/* </Link> */}
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
          <div className="px-[16px] sticky bottom-[10px] w-full">
            <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#C5291E] rounded-[3px] ">
              <div className="flex items-center gap-[16px] text-[44px] font-[500] text-white">
                <p className=" text-[44px] font-[400] text-white">
                  {/* #{totalCount.totalQuantity || 0} */}
                </p>
                <p>
                  Total &#x20A6;{totalCount.totalPrice.toLocaleString() || 0.0}
                </p>
              </div>
              <Link to="/basket">
                <p className=" text-white  text-[36px] font-[500] py-[14px] px-[38px] rounded-[5px] bg-[#F38D41]">
                  Checkout
                </p>
              </Link>
            </div>
          </div>
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
