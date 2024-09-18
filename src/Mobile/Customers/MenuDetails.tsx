import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import Add from "../assets/Plus.svg";
import MinusMain from "../assets/MinusCounter.svg";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";

import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemInBasket,
} from "../../slices/BasketSlice";
import Loader from "../../components/Loader";
import Image from "../assets/FriedRice.png";

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

export interface BasketItem {
  id: string;
  quantity: number;
  menuItem: MenuItem;
  selectedOptions: Option[];
  totalPrice: number;
  name: string;
  tableNumber: string;
}

const menuItems = [
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
const MenuDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuModifiers, setMenuModifiers] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [itemCount, setItemCount] = useState<number>(1);
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );

  const colorScheme = userDetails?.colour_scheme;

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
  const [loading, setLoading] = useState(false);

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getMenuItemByID/?business_identifier=${businessIdentifier}&menu_item_id=${id}`
      );
      setMenuItem(response.data.data);
      setMenuModifiers(response.data.modifiers);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    } finally {
      setLoading(false);
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

      navigate(-1);
    }
  };

  return (
    <div className="menu-details relative">
      {loading && <Loader />}

      <TopMenuNav />
      {menuItem && (
        <div className=" relative">
          <div className="menu-item-image-container mx-[24px] mt-[32px] max-w-[400px] h-[300px] rounded-[20px] overflow-hidden">
            <img
              src={menuItem.menu_item_image}
              alt={menuItem.menu_item_name}
              className="w-full object-cover"
            />
          </div>

          <div className="menu-item-details mt-[24px] pb-[16px] border-b">
            <div className="flex items-center justify-between mx-[24px]">
              <p className="text-grey500 font-[500] text-[18px] mb-[17px]">
                {menuItem.details || "A Delicious Delicacy"}
              </p>
            </div>
            <p className="text-grey500 text-[16px] mx-[24px]">
              &#x20A6; {menuItem.menu_item_price}
            </p>
          </div>

          {menuModifiers.length > 0 && (
            <div className="menu-item-modifiers pb-[16px] border-b">
              <p className="text-[#FF0000] mx-[24px] font-[500] text-[18px] pb-[16px] pt-[24px]">
                Customize
              </p>
              {menuModifiers.map((option) => (
                <div key={option.modifier_name} className="border-b">
                  <div className="flex items-center justify-between py-[16px] mx-[24px]">
                    <label htmlFor={option.modifier_name} className="ml-2">
                      {option.modifier_name} ({option.modifier_price})
                    </label>
                    <input
                      type="checkbox"
                      id={option.modifier_name}
                      value={option.modifier_name}
                      checked={selectedOptions.some(
                        (opt) => opt.name === option.modifier_name
                      )}
                      onChange={() => handleCheckboxChange(option)}
                      className={`h-5 w-5 ${
                        selectedOptions.some(
                          (opt) => opt.name === option.modifier_name
                        )
                          ? "bg-red-600"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="menu-item-quantity py-[16px]">
            <p
              className=" text-[16px] font-[500] mx-[24px] mb-[10px]"
              style={{ color: colorScheme || "#ff0000" }}
            >
              Quantity
            </p>
            <hr />
            <div className="flex items-center justify-center">
              <div className="mt-[24px] mb-[37px] items-center rounded-[5px] justify-center inline-flex bg-[#E7E7E7]">
                <p className="py-[12px] px-[20px]" onClick={handleDecrement}>
                  <img src={MinusMain} alt="decrement" />
                </p>
                <p className="bg-white py-[12px] px-[25px] text-[16px] font-[500]">
                  {itemCount}
                </p>
                <p className="py-[12px] px-[20px]" onClick={handleIncrement}>
                  <img src={Add} alt="increment" />
                </p>
              </div>
            </div>
          </div>

          <div className=" mx-[24px]">
            <p className="text-[16px] text-[#121212] font-[500] my-[20px]">
              People also ordered for
            </p>

            <div className="flex items-center gap-[50px] overflow-x-scroll py-[11px] border-t border-[#E7E7E7] cursor-pointer">
              {menuItems.map((menu, index) => (
                <div key={index} className="flex-shrink-0 w-[280px]">
                  <div className="flex items-center justify-between">
                    <div className="w-[180px]">
                      <p className="text-[16px] text-[#121212] font-[500]">
                        {menu.name}
                      </p>
                      <p className="text-[12px] text-[#121212]">
                        {menu.details}
                      </p>
                    </div>
                    <div>
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="h-[80px] w-[80px] object-cover rounded-[8px]"
                      />
                    </div>
                  </div>
                  <div className="pt-[8px] flex items-center justify-between">
                    <p className="text-[16px] text-[#121212] font-[500]">
                      {menu.price}
                    </p>
                    <div className="w-[100px]">
                      <div className="flex items-center justify-between">
                        <img
                          src={MinusMain}
                          alt="decrement"
                          className="cursor-pointer"
                        />
                        <p className="text-[16px] font-[500]">1</p>
                        <img
                          src={Add}
                          alt="increment"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-[24px]">
            <p className="text-[16px] text-[#121212] font-[500] my-[20px]">
              Recommended Items
            </p>

            <div className="flex items-center gap-[50px] overflow-x-scroll py-[11px] border-t border-[#E7E7E7] cursor-pointer">
              {menuItems.map((menu, index) => (
                <div key={index} className="flex-shrink-0 w-[280px]">
                  <div className="flex items-center justify-between">
                    <div className="w-[180px]">
                      <p className="text-[16px] text-[#121212] font-[500]">
                        {menu.name}
                      </p>
                      <p className="text-[12px] text-[#121212]">
                        {menu.details}
                      </p>
                    </div>
                    <div>
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="h-[80px] w-[80px] object-cover rounded-[8px]"
                      />
                    </div>
                  </div>
                  <div className="pt-[8px] flex items-center justify-between">
                    <p className="text-[16px] text-[#121212] font-[500]">
                      {menu?.price}
                    </p>
                    <div className="w-[100px]">
                      <div className="flex items-center justify-between">
                        <img
                          src={MinusMain}
                          alt="decrement"
                          className="cursor-pointer"
                        />
                        <p className="text-[16px] font-[500]">1</p>
                        <img
                          src={Add}
                          alt="increment"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" mx-[24px] mb-[150px] mt-[16px]">
            <div className=" flex items-center justify-between py-[16px] ">
              <p className=" text-[16px] font-[500] text-[#121212]">
                Add Special Instructions
              </p>
            </div>

            <div className=" ">
              <div className="">
                <textarea
                  className=" text-[16px] w-full h-[153px] border  font-[400] text-[#929292] border-gray-300 rounded-md p-2 shadow-md"
                  placeholder="Enter message here "
                />
              </div>
              <div className=" mt-[10px] flex items-center justify-end">
                <button
                  className=" font-[500] text-[40px]"
                  style={{ color: colorScheme || "#ff0000" }}
                >
                  <FaCircleCheck />
                </button>
              </div>
            </div>
          </div>

          <div
            className="fixed bottom-[10px] left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-32px)] mx-auto  my-[16px]"
            style={{
              backgroundColor: colorScheme || "#414141",
            }}
          >
            <div
              className="flex justify-between items-center py-[13px] px-[24px]  text-white rounded-[3px] cursor-pointer"
              onClick={handleAddToBasket}
            >
              <p className="text-[16px] font-[500]">
                &#x20A6; {calculateTotalPrice()}
              </p>
              <p className="text-[16px] font-[500]">Add to basket</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDetails;
