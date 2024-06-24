import { useEffect, useState } from "react";
import Add from "../assets/plusIconRound.svg";
import Minus from "../assets/MinusRound.svg";
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

interface MenuItem {
  _id: string;
  menu_item_name: string;
  menu_item_price: number;
}

interface Details extends MenuItem {
  name: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_image: string;
}

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
        setSelectedGroup(response.data.data[0].name);
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
        <TopMenuNav />

        <div className="mt-[24px] mb-[8px] flex items-center gap-[8px] text-center overflow-x-auto whitespace-nowrap">
          {menuGroup.map((menu) => (
            <div key={menu._id}>
              {menu.menu_category_name === id && (
                <div className="flex items-center">
                  <p
                    className={`px-[12px] py-[8px] inline-block ${
                      selectedGroup === menu.name
                        ? "bg-[#0B7F7C] text-white font-[600]"
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

        <div className=" mx-[24px] mb-[100px]">
          <p className="text-[18px] font-[500] uppercase py-[9px] border-b ">
            {selectedGroup}
          </p>
          {menuItems.map((menu) => (
            <div key={menu._id} className={``}>
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
                            {/* {menu.details} */}
                          </p>
                        </div>

                        <div className="">
                          <Link to={`/menu-details/${menu._id}`}>
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
                              <Link to={`/menu-details/${menu._id}`}>
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
          <div className="px-[16px] sticky bottom-[10px] w-full">
            <div className="flex justify-between items-center py-[13px] px-[24px] text-white bg-[#0B7F7C] rounded-[3px] cursor-pointer">
              <div className="flex items-center gap-[16px]">
                <p className="bg-white rounded-[5px] text-[#0B7F7C] py-[12px] px-[10px] text-[16px] font-[500]">
                  {totalCount.totalQuantity || 0}
                </p>

                <p>&#x20A6;{totalCount.totalPrice || 0.0}</p>
              </div>
              <Link to="/basket">
                <p className="text-[16px] font-[500]">View Basket</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
