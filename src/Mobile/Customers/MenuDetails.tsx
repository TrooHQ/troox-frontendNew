import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import Plus from "../assets/Plus.svg";
import Minus from "../assets/Minus.svg";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBasket,
  removeItemFromBasket,
  updateItemInBasket,
} from "../../slices/BasketSlice";
import Loader from "../../components/Loader";

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

const MenuDetails = () => {
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
    <div className="menu-details relative">
      {loading && <Loader />}

      <TopMenuNav />
      {menuItem && (
        <div>
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
              <p className="text-[#0B7F7C] mx-[24px] font-[500] text-[18px] pb-[16px] pt-[24px]">
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
            <p className="text-[#0B7F7C] text-[16px] font-[500] mx-[24px] mb-[10px]">
              Quantity
            </p>
            <hr />
            <div className="flex items-center justify-center">
              <div className="mt-[24px] mb-[37px] items-center rounded-[5px] justify-center inline-flex bg-[#E7E7E7]">
                <p className="py-[12px] px-[20px]" onClick={handleDecrement}>
                  <img src={Minus} alt="decrement" />
                </p>
                <p className="bg-white py-[12px] px-[25px] text-[16px] font-[500]">
                  {itemCount}
                </p>
                <p className="py-[12px] px-[20px]" onClick={handleIncrement}>
                  <img src={Plus} alt="increment" />
                </p>
              </div>
            </div>
          </div>
          <div className="add-to-basket-button mx-[16px] my-[16px]">
            <div
              className="flex justify-between items-center py-[13px] px-[24px] bg-[#0B7F7C] text-white rounded-[3px] cursor-pointer"
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
