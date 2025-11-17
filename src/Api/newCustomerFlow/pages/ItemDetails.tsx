import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  addItemToBasket,
  updateItemInBasket,
  // removeItemFromBasket,
} from "../../../slices/BasketSlice";
import { RootState } from "../../../store/store";
import { SERVER_DOMAIN } from "../../Api";
import CustomAddToCartToast from "../CustomToast";

interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  price: number;
  options?: Option[];
  menu_item_image: string;
  description: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_price: number;
}

interface Modifier {
  modifier_name: string;
  modifier_price: number;
  value: string;
}

interface Option {
  modifier_name: string;
  modifier_price: number;
  value: string;
  price: number;
  name: string;
  label?: string;
  modifiers?: Modifier[];
  modifier_group_name?: string;
}

interface SelectedModifier {
  name: string;
  quantity: number;
  price: number;
}

export default function ItemDetails() {
  const [modifierList, setModifierList] = useState<Option[]>([]);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [complimentaryList, setComplimentaryList] = useState<Option[]>([]);
  const [selectedComplimentary, setSelectedComplimentary] = useState<string[]>([]);
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  console.log("basketItems", basketItems)

  const queryParams = new URLSearchParams(location.search);
  const businessIdentifier = queryParams.get("bid");
  const id = queryParams.get("id");

  // Fetch menu item data
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/menu/getMenuItemByID/?business_identifier=${businessIdentifier}&menu_item_id=${id}`
        );

        setMenuItem(response.data.data);
        setModifierList(response.data.modifiers);
        setComplimentaryList(response.data.complimentary);

        // Check if item exists in cart and load its selections
        const itemInCart = basketItems.find((item) => item.id === response.data.data._id);
        if (itemInCart) {
          setSelectedModifiers(itemInCart.selectedOptions || []);
          setSelectedComplimentary(itemInCart.complimentary || []);
          setItemQuantity(itemInCart.quantity || 1);
        }
      } catch (error) {
        console.error("Error getting menu item:", error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [id, businessIdentifier]);

  // Calculate total price whenever modifiers or quantity changes
  const calculateTotalPrice = (): number => {
    if (!menuItem) return 0;

    const basePrice = menuItem.menu_item_price;
    const modifiersTotal = selectedModifiers.reduce(
      (sum, mod) => sum + mod.price * mod.quantity,
      0
    );

    return (basePrice + modifiersTotal) * itemQuantity;
  };

  const totalPrice = calculateTotalPrice();

  // Handle complimentary selection
  const handleComplimentaryChange = (option: string) => {
    setSelectedComplimentary([option]);
  };

  // Toggle modifier selection
  const handleModifierToggle = (modifier: Option) => {
    setSelectedModifiers((prev) => {
      const exists = prev.some((item) => item.name === modifier.modifier_name);

      if (exists) {
        return prev.filter((item) => item.name !== modifier.modifier_name);
      } else {
        return [
          ...prev,
          {
            name: modifier.modifier_name,
            quantity: 1,
            price: modifier.modifier_price,
          },
        ];
      }
    });
  };

  // Increase modifier quantity
  const handleModifierIncrease = (modifierName: string) => {
    setSelectedModifiers((prev) =>
      prev.map((item) =>
        item.name === modifierName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease modifier quantity
  const handleModifierDecrease = (modifierName: string) => {
    setSelectedModifiers((prev) =>
      prev
        .map((item) =>
          item.name === modifierName
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // // Increase item quantity
  // const handleItemIncrease = () => {
  //   setItemQuantity((prev) => prev + 1);
  // };

  // // Decrease item quantity
  // const handleItemDecrease = () => {
  //   setItemQuantity((prev) => Math.max(1, prev - 1));
  // };

  // Add or update item in cart
  const handleAddToBasket = () => {
    if (!menuItem) return;

    const isInCart = basketItems.find((item) => item.id === menuItem._id);

    const basketItem = {
      id: menuItem._id,
      quantity: itemQuantity,
      selectedOptions: selectedModifiers,
      itemPrice: menuItem.menu_item_price,
      totalPrice,
      name: menuItem.menu_item_name,
      tableNumber: "",
      complimentary: selectedComplimentary,
    };

    if (isInCart) {
      dispatch(updateItemInBasket(basketItem));
      toast(<CustomAddToCartToast count={itemQuantity} text="Item updated successfully" />, {
        position: "top-center",
        className: "p-0 my-0 bg-transparent shadow-none",
        style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      });

    } else {
      dispatch(addItemToBasket(basketItem));
      toast(<CustomAddToCartToast count={itemQuantity} text="Item added to cart" />, {
        position: "top-center",
        className: "p-0 my-0 bg-transparent shadow-none",
        style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      });
    }

    navigate(-1);
  };

  // Remove item from cart (logic ready, you handle UI)
  // const handleRemoveFromCart = () => {
  //   if (!menuItem) return;
  //   dispatch(removeItemFromBasket(menuItem._id));
  //   toast.info("Item removed from cart");
  //   navigate(-1);
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const isInCart = menuItem && basketItems.some((item) => item.id === menuItem._id);

  return (
    <div className="relative w-full min-h-screen pb-14">
      {/* Image Header */}
      <div className="relative w-full h-64">
        <img
          src={menuItem?.menu_item_image ?? "/bg-banner.png"}
          alt="menu-item"
          className="object-cover object-center w-full h-64 mb-10"
        />
        <IoMdClose
          className="absolute flex items-center gap-2 p-1 text-2xl bg-gray-200 rounded-full cursor-pointer top-2 left-2"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Item Details */}
      <div className="px-4 py-4 border-b border-b-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {menuItem?.menu_item_name}
        </h2>
        <p className="my-2 font-semibold text-gray-900">
          ₦{Number(menuItem?.menu_item_price).toLocaleString()}
        </p>
        <p className="my-2 text-xs text-gray-700">{menuItem?.description}</p>
      </div>

      {/* Complimentary Selection */}
      {complimentaryList?.length > 0 && (
        <div className="px-4 py-4 border-b border-b-gray-200">
          <h3 className="mb-1 font-semibold text-gray-900">Select Complimentary</h3>
          <p className="flex items-center text-sm">
            Required <GoDotFill className="w-2 mx-2" /> Select One
          </p>

          <div className="flex flex-col my-2 ">
            {complimentaryList?.map((opt) => (
              <label key={opt.modifier_name} className="flex items-center space-x-2 cursor-pointer ">
                <input
                  type="radio"
                  name="complimentary"
                  checked={selectedComplimentary.includes(opt.modifier_name)}
                  onChange={() => handleComplimentaryChange(opt.modifier_name)}
                />
                <span className="font-semibold">{opt.modifier_name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Modifiers/Toppings */}
      {modifierList?.length > 0 && (
        <div className="my-4 border-b border-b-gray-200">
          <h3 className="px-4 mb-1 font-semibold text-gray-900">Add Toppings</h3>
          <p className="flex items-center px-4 text-sm">
            Optional <GoDotFill className="w-2 mx-2" /> Select up to 3
          </p>

          <div className="flex flex-col my-6">
            {modifierList?.map((opt) => {
              const selectedItem = selectedModifiers.find(
                (item) => item.name === opt.modifier_name
              );
              const isSelected = !!selectedItem;

              return (
                <div
                  key={opt.modifier_name}
                  className="flex items-center justify-between px-4 py-3 space-x-2 border-t border-t-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="modifiers"
                      checked={isSelected}
                      onChange={() => handleModifierToggle(opt)}
                    />
                    <span className="font-semibold">{opt.modifier_name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-100 rounded-2xl">
                      <MinusIcon
                        className="w-5 cursor-pointer"
                        onClick={() => handleModifierDecrease(opt.modifier_name)}
                      />
                      <input
                        className="w-12 text-center bg-gray-100 rounded-lg focus:outline-none"
                        value={selectedItem ? selectedItem.quantity : 0}
                        readOnly
                      />
                      <PlusIcon
                        className="w-5 cursor-pointer"
                        onClick={() => handleModifierIncrease(opt.modifier_name)}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      ₦{opt.modifier_price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full py-2 bg-white shadow-lg">
        <button
          className="w-[90%] px-4 py-3 mx-auto text-white bg-black rounded-full flex items-center justify-between"
          onClick={handleAddToBasket}
          disabled={!menuItem}
        >
          <span>{isInCart ? "Update Cart" : "Add to Cart"}</span>
          <span>₦{totalPrice.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
}
