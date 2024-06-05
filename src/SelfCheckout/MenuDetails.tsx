import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Add from "../SelfCheckout/assets/incrementwhite.svg";
import Minus from "../SelfCheckout/assets/decrementwhite.svg";

import Back from "../SelfCheckout/assets/Back.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SERVER_DOMAIN } from "../Api/Api";
import axios from "axios";
import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemInBasket,
} from "../slices/BasketSlice";

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
const MenuDetails = () => {
  const history = useNavigate();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuModifiers, setMenuModifiers] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState<number>(1);
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
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getMenuItemByID/?business_identifier=${businessIdentifier}&menu_item_id=${id}`
      );
      setMenuItem(response.data.data);
      console.log(response.data.data);

      setMenuModifiers(response.data.modifiers);
      console.log(response.data.modifiers);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [id]);

  const existingItem = basketItems.find((item) => item.id === id);

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
          (total += selectedOption.modifier_price), 10;
        }
        return total;
      }, 0) * itemCount;

    const itemPrice = menuItem.menu_item_price * itemCount;

    const totalPrice = itemPrice + optionTotalPrice;

    console.log(totalPrice);
    return totalPrice;
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

      console.log("Updated basket item:", basketItem);

      navigate(-1);
    }
  };
  return (
    <div className="  ">
      <div className=" px-[8px] flex items-center justify-between mt-[66px] mx-[32px]">
        <img
          src={Back}
          alt=""
          onClick={() => history(-1)}
          className=" cursor-pointer"
        />
      </div>
      <div className="">
        {menuItem && (
          <div>
            <div className=" mx-[24px] mt-[32px]">
              <img
                src={menuItem.menu_item_image}
                alt={menuItem.menu_item_name}
                className=" w-full h-[400px] object-cover rounded-[20px] mb-[32px]"
              />
            </div>
            <div className=" pb-[16px] mx-[49px]">
              <div className="">
                <div className=" flex items-start justify-between">
                  <p className=" text-grey500 font-[500] text-[36px] mb-[17px] ">
                    {menuItem.menu_item_name}
                  </p>
                  <p className=" text-[#FF0000] text-[36px] font-[500]  mx-[24px]">
                    &#x20A6; {menuItem.menu_item_price}
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <p className=" text-grey500 font-[400] text-[28px] mb-[17px] ">
                    {menuItem?.details ||
                      "If it Ain't Delicious, it Ain't from Chicken Republic"}
                  </p>
                </div>
              </div>
            </div>

            {menuModifiers && (
              <div className=" ">
                <p className=" text-[#121212] mx-[49px] font-[500] text-[24px] pb-[16px] pt-[24px]">
                  Modifiers
                </p>
              </div>
            )}

            <div className=" mx-[49px]">
              {menuModifiers.map((option) => (
                <div key={option.modifier_name} className="border-b shadow">
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
                          : "bg-white"
                      }`}
                    ></div>
                    <label
                      htmlFor={option.modifier_name}
                      className="ml-2 text-[28px] font-[500]"
                    >
                      {option.modifier_name}
                      <span className="text-[16px] font-[400] text-gray-500">
                        {" "}
                        ({option.modifier_price})
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
                      className="sr-only"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className=" mx-[16px] my-[16px] ">
              <div className="flex justify-between  items-center py-[13px] px-[24px] bg-[#FF0000] text-white rounded-[3px]">
                <p className="text-[36px] font-[500]">
                  &#x20A6; {calculateTotalPrice()}
                </p>

                <div className=" flex items-center justify-between gap-[20px]">
                  <img
                    src={Minus}
                    alt=""
                    onClick={handleDecrement}
                    className=" cursor-pointer"
                  />
                  <p className=" text-[36px] font-[500]">{itemCount}</p>
                  <img
                    src={Add}
                    alt=""
                    onClick={handleIncrement}
                    className=" cursor-pointer"
                  />
                </div>

                <p
                  className="text-[36px] font-[500] py-[14px] px-[48px] rounded-[5px] bg-[#F38D41] cursor-pointer"
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
  );
};

export default MenuDetails;