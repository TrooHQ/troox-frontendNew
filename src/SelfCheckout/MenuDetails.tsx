import React, { useEffect, useState } from "react";
import Add from "../SelfCheckout/assets/incrementwhite.svg";
import Minus from "../SelfCheckout/assets/decrementwhite.svg";
import Back from "../SelfCheckout/assets/Back.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SERVER_DOMAIN } from "../Api/Api";
import axios from "axios";
import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemInBasket,
} from "../slices/BasketSlice";
import Modal from "../components/Modal";
import Counter from "../SelfCheckout/assets/counter.svg";

import Image from "../SelfCheckout/assets/FriedRice.png";
import Scroll from "../SelfCheckout/assets/scroll.svg";
import Loader from "../components/Loader";

const menuItems = [
  {
    name: "Rice",
    price: "₦3,000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "₦3,000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "₦3,000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "₦3,000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "From ₦3000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "From ₦3000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
  {
    name: "Rice",
    price: "From ₦3000",
    image: Image,
    details: "Crispy fried ankara straight from the oven",
  },
];
interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  price: number;
  options?: Option[];
  menu_item_image: string;
  details: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_price: number;
}

interface Option {
  modifier_name: string;
  modifier_price: number;
  value: string;
  price: number;
  name: string;
  label?: string;
}

interface BasketItem {
  id: string;
  quantity: number;
  menuItem: MenuItem;
  selectedOptions: Option[];
  totalPrice: number;
  name: string;
  tableNumber: string;
}

interface MenuDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  menuItemId: string;
}

const MenuDetailsModal: React.FC<MenuDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  menuItemId,
}) => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuModifiers, setMenuModifiers] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [itemCount, setItemCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );
  const basketItems = useSelector(
    (state: RootState) => state.basket.items
  ) as BasketItem[];
  const businessIdentifier = userDetails?._id;

  const handleCheckboxChange = (option: Option) => {
    const optionIndex = selectedOptions.findIndex(
      (selectedOption) => selectedOption.name === option.modifier_name
    );
    if (optionIndex !== -1) {
      const updatedOptions = [
        ...selectedOptions.slice(0, optionIndex),
        ...selectedOptions.slice(optionIndex + 1),
      ];
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([
        ...selectedOptions,
        {
          name: option.modifier_name,
          price: option.modifier_price,
          modifier_name: option.modifier_name,
          modifier_price: option.modifier_price,
          value: option.value,
        },
      ]);
    }
  };

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getMenuItemByID/?business_identifier=${businessIdentifier}&menu_item_id=${menuItemId}`
      );
      setMenuItem(response.data.data);
      setMenuModifiers(response.data.modifiers);
      setLoading(false);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [menuItemId]);

  const existingItem = basketItems.find((item) => item.id === menuItemId);

  useEffect(() => {
    if (existingItem) {
      setMenuItem(existingItem.menuItem);
      setSelectedOptions(existingItem.selectedOptions);
      setItemCount(existingItem.quantity);
    }
  }, [existingItem]);

  const handleIncrement = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const calculateTotalPrice = () => {
    if (!menuItem) return 0;

    const optionTotalPrice =
      selectedOptions.reduce((total, option) => {
        const selectedOption = menuModifiers.find(
          (opt) => opt.modifier_name === option.name
        );
        if (selectedOption) {
          total += selectedOption.modifier_price;
        }
        return total;
      }, 0) * itemCount;

    const itemPrice = menuItem.menu_item_price * itemCount;

    return itemPrice + optionTotalPrice;
  };

  const handleAddToBasket = () => {
    if (menuItem) {
      const totalPrice = calculateTotalPrice();
      const basketItem: BasketItem = {
        id: menuItem._id,
        quantity: itemCount,
        menuItem,
        selectedOptions,
        totalPrice,
        name: menuItem.menu_item_name,
        tableNumber: userDetails?.tableNumber ?? "",
      };

      if (itemCount === 0) {
        if (existingItem) {
          dispatch(removeItemFromBasket({ id: existingItem.id }));
        }
      } else {
        if (existingItem) {
          dispatch(updateItemInBasket({ ...existingItem, ...basketItem }));
        } else {
          dispatch(addItemToBasket(basketItem));
        }
      }

      onRequestClose();
    }
  };

  return (
    <div className=" relative">
      {loading ? (
        <Loader />
      ) : (
        <Modal isOpen={isOpen} onClose={onRequestClose} bg="bg-[#F1F1F1]">
          <div className=" relative">
            <div className="px-[8px] flex items-center justify-between mt-[66px] mx-[32px]">
              <img
                src={Back}
                alt=""
                onClick={onRequestClose}
                className="cursor-pointer"
              />
            </div>
            <div>
              {menuItem && (
                <div>
                  <div className="mx-[24px] mt-[32px]">
                    <img
                      src={menuItem.menu_item_image}
                      alt={menuItem.menu_item_name}
                      className="w-full h-[400px] object-cover rounded-[20px] mb-[32px]"
                    />
                  </div>
                  <div className="pb-[16px] mx-[49px]">
                    <div>
                      <div className="flex items-start justify-between">
                        <p className="text-grey500 font-[500] text-[36px] mb-[17px]">
                          {menuItem.menu_item_name}
                        </p>
                        <p className="text-[##121212] text-[36px] font-[500] mx-[24px]">
                          &#x20A6; {menuItem.menu_item_price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-grey500 font-[400] text-[28px] mb-[17px]">
                          {menuItem.details ||
                            "If it Ain't Delicious, it Ain't from Chicken Republic"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {menuModifiers.length > 0 && (
                    <div>
                      <p className="text-[#121212] mx-[49px] font-[500] text-[24px] pb-[16px] pt-[24px]">
                        Side Options
                      </p>
                    </div>
                  )}

                  <div className="mx-[49px] grid grid-cols-2 gap-[20px]">
                    {menuModifiers.map((option) => (
                      <div
                        key={option.modifier_name}
                        className="border-b shadow border rounded-[5px]"
                      >
                        <div
                          className="flex items-center gap-[24px] py-[31px] px-[24px] cursor-pointer"
                          onClick={() => handleCheckboxChange(option)}
                        >
                          <div
                            id={option.modifier_name}
                            className={`h-[48px] w-[48px] border rounded-full ${
                              selectedOptions.some(
                                (opt) => opt.name === option.modifier_name
                              )
                                ? "bg-red-600"
                                : " border-[3px] border-[#B6B6B6]"
                            }`}
                          ></div>
                          <label
                            htmlFor={option.modifier_name}
                            className="ml-2 text-[28px] font-[500]"
                          >
                            {option.modifier_name}
                            <span className="text-[16px] font-[400] text-[#000000]">
                              {" "}
                              (&#x20A6;{option.modifier_price?.toLocaleString()}
                              )
                            </span>
                          </label>
                          <input
                            type="checkbox"
                            id={option.modifier_name}
                            value={option.modifier_name}
                            checked={selectedOptions.some(
                              (opt) => opt.name === option.modifier_name
                            )}
                            onChange={() => handleCheckboxChange(option)}
                            className="sr-only "
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className=" mx-[24px] my-[80px]">
                    <div className=" flex items-center justify-between py-[32px] px-[24px]">
                      <p className=" text-[32px] font-[500] text-[#121212]">
                        Recommended Beverages
                      </p>
                      <div className="">
                        <img src={Scroll} alt="" />
                      </div>
                    </div>

                    <div className="flex items-center gap-[50px] overflow-x-scroll py-[11px]  cursor-pointer">
                      {menuItems.map((menu, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-[531px] h-[231px] border shadow-md "
                        >
                          <div className="flex items-center justify-between px-[24px]">
                            <div className="w-[180px] grid gap-[40px]">
                              <p className="text-[28px] text-[#121212] font-[500] ">
                                {menu.name}
                              </p>
                              <p className="text-[28px] text-[#606060]">
                                {menu.price.toLocaleString()}
                              </p>
                            </div>
                            <div className=" relative">
                              <img
                                src={menu.image}
                                alt={menu.name}
                                className=" h-auto w-[224px] object-cover rounded-[8px]"
                              />
                              <div className=" absolute bottom-2 right-2">
                                <img src={Counter} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className=" mx-[24px] my-[80px]">
                    <div className=" flex items-center justify-between py-[32px] px-[24px]">
                      <p className=" text-[32px] font-[500] text-[#121212]">
                        You Might Also Like
                      </p>
                      <div className="">
                        <img src={Scroll} alt="" />
                      </div>
                    </div>

                    <div className="flex items-center gap-[50px] overflow-x-scroll py-[11px]  cursor-pointer">
                      {menuItems.map((menu, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-[531px] h-[231px] border shadow-md "
                        >
                          <div className="flex items-center justify-between px-[24px]">
                            <div className="w-[180px] grid gap-[40px]">
                              <p className="text-[28px] text-[#414141] font-[500] ">
                                {menu.name}
                              </p>
                              <p className="text-[28px] text-[#606060]">
                                {menu.price.toLocaleString()}
                              </p>
                            </div>
                            <div className=" relative">
                              <img
                                src={menu.image}
                                alt={menu.name}
                                className=" h-auto w-[224px] object-cover rounded-[8px]"
                              />
                              <div className=" absolute bottom-2 right-2">
                                <img src={Counter} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className=" mx-[24px] my-[150px]">
                    <div className=" flex items-center justify-between py-[32px] px-[24px]">
                      <p className=" text-[32px] font-[500] text-[#121212]">
                        Add Special Instructions
                      </p>
                    </div>

                    <div className=" ">
                      <div className="">
                        <textarea
                          className=" w-full h-[153px] border text-[24px] font-[400] text-[#929292] border-gray-300 rounded-md p-2 shadow-md"
                          placeholder="Enter message"
                        />
                      </div>
                      <div className=" mt-[10px] flex items-center justify-end">
                        <button className="bg-[#11AE16] text-white px-4 py-2 rounded-md font-[500] text-[36px]">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-32px)] mx-auto my-[16px]">
                    <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#C5291E] text-white rounded-[10px] w-full">
                      <p className="text-[36px] font-[500]">
                        &#x20A6; {calculateTotalPrice().toLocaleString()}
                      </p>

                      <div className="flex items-center justify-between gap-[20px]">
                        <img
                          src={Minus}
                          alt=""
                          onClick={handleDecrement}
                          className="cursor-pointer"
                        />
                        <p className="text-[36px] font-[500]">{itemCount}</p>
                        <img
                          src={Add}
                          alt=""
                          onClick={handleIncrement}
                          className="cursor-pointer"
                        />
                      </div>

                      <p
                        className="text-[36px] font-[500] py-[14px] px-[48px] rounded-[5px] bg-[#FFE100] text-[#C5291E] cursor-pointer"
                        onClick={handleAddToBasket}
                      >
                        Add
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MenuDetailsModal;
