

// business identifier and branch id are requried for fetch the appropriate menu list item
// https://troox-backend-new.onrender.com/api/business/getBusinessDetails/?business_identifier=6729de3ac6a9cd9c11abdcbf
// https://troox-backend-new.onrender.com/api/menu/getAllMenuItem/?business_identifier=6729de3ac6a9cd9c11abdcbf&branch=6729de3ac6a9cd9c11abdccd

// import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa6"
import { TiWaves } from "react-icons/ti"
import { RxShare2 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setBranchID, setBusinessDetails, setBusinessIdentifier, setGroupName, setURL } from "../../../slices/businessSlice";
import { SERVER_DOMAIN } from "../../Api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { GoDotFill } from "react-icons/go";
import {
  addItemToBasket,
  removeItemFromBasket,
  // removeItemFromBasket,
  // updateItemInBasket,
  // updateItemQuantity,
} from "../../../slices/BasketSlice";
import { toast } from "react-toastify";
import CustomAddToCartToast from "../CustomToast";


interface MenuItem {
  _id: string;
  created_by: string;
  branch: string;
  menu_category_name: string;
  menu_group_name?: string;
  menu_item_name: string;
  description: string;
  menu_item_price: number;
  is_frozen: boolean;
  is_recommended: boolean;
  menu_item_image?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export interface BasketItem {
  id: string;
  quantity: number;
  menuItem: MenuItem;
  selectedOptions: Option[];
  totalPrice: number;
  name: string;
  tableNumber: string;
  complimentary?: string[];
}

// interface GroupedByCategory {
//   [category: string]: MenuItem[];
// }


export default function ItemsList() {

  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  sessionStorage.setItem("url", fullUrl);

  useEffect(() => {
    localStorage.setItem("home_url", window.location.href);
  }, [])

  const business_identifier = queryParams.get("business_identifier");
  const branch = queryParams.get("branch");
  // const type = queryParams.get("type");
  const group_name = queryParams.get("group_name") ?? "default_group_name";

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );

  useEffect(() => {

    const getBusinessDetails = async () => {

      setLoading(true);
      const headers = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/business/getBusinessDetails/?business_identifier=${business_identifier}`,
          headers
        );
        dispatch(setBusinessDetails(response.data.data));
      } catch (error) {
        console.error("Error getting Business Details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (business_identifier) {
      dispatch(setBusinessIdentifier(business_identifier));
      dispatch(setGroupName(group_name));
      dispatch(setBranchID(branch as string));
      dispatch(setURL(fullUrl));

      getBusinessDetails();
    } else {
      navigate("/demo/login/troo-portal");
    }
  }, [business_identifier, group_name, navigate, branch, fullUrl, dispatch]);

  useEffect(() => {
    // delete existing orders in the localstorage.
    localStorage.removeItem("order_x445ij");

    localStorage.setItem("mark", window.location.href)
  }, [])

  const [menuItems, setMenuItems] = useState<Array<any>>([]);

  useEffect(() => {

    const getItems = async () => {
      setLoading(true);
      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/menu/getAllMenuItem/?business_identifier=${business_identifier}&branch=${branch}`,
          headers
        );
        setMenuItems(response?.data?.data);
      } catch (error) {
        console.error("Error getting Menu Items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();

  }, [business_identifier, branch]);

  const [activeTab, setActiveTab] = useState("All items");


  // Get unique categories for tabs
  const categories = ['All items', ...new Set(menuItems.map(item => item.menu_category_name))];

  // Filter items based on active tab
  const filteredItems = activeTab === 'All items'
    ? menuItems
    : menuItems.filter(item => item.menu_category_name === activeTab);

  // Group items by category
  const groupedByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.menu_category_name]) {
      acc[item.menu_category_name] = [];
    }
    acc[item.menu_category_name].push(item);
    return acc;
  }, {});

  const basketItems = useSelector((state: RootState) => state.basket.items);

  console.log("active", activeTab)
  console.log("category", categories)

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen">

      <div className='relative w-full h-64 mb-12'>
        <img
          src='/bg-banner.png'
          alt='bg-banner'
          className='object-cover object-center w-full h-64 mb-10'
        />

        <div className="absolute flex items-center gap-4 top-4 right-4">
          <RxShare2 className="p-1 text-3xl bg-gray-200 rounded-full bottom-2 right-2" />
          <IoSearchOutline className="p-1 text-3xl bg-gray-200 rounded-full bottom-2 right-2" />
        </div>
        {/*  */}
        <div className="absolute z-10 flex items-center justify-center p-1 overflow-hidden bg-white rounded-full shadow-md -bottom-7 left-4 size-16 ">
          <TiWaves className="w-full h-full text-orange-400 bg-orange-200 rounded-full " />
        </div>
      </div>

      {/* <div className=""> */}
      <div className="px-4">
        <h2 className="text-base font-semibold text-gray-900">{businessDetails?.businessFullName}</h2>
        <p className="my-2 text-xs text-gray-700">{businessDetails?.orderingDescription}</p>

        <p className="flex items-center gap-2 my-2 text-xs text-gray-700">{businessDetails?.orderingInstruction}
          {/* <span className="flex items-center gap-2"> <FaStar className="fill-orange-500" /> 4.5</span> */}
        </p>
        {/* <p className="flex items-center gap-2 my-2 text-xs text-gray-700"><span>Opens 8AM - 8PM</span> <span className="flex items-center gap-2"> <FaStar className="fill-orange-500" /> 4.5</span></p> */}
      </div>


      <div className="flex items-center gap-4 px-4 my-4 overflow-x-auto whitespace-nowrap">
        {categories.map((category, index) => <p
          key={index}
          onClick={() => setActiveTab(category)}
          className={`cursor-pointer px-2 py-3 border-b-2 text-xs  ${activeTab === category ? "border-b-blue-600 font-semibold text-blue-600" : "text-gray-600  border-b-transparent"}`}>{category}</p>)}
      </div>

      {(Object.entries(groupedByCategory) as [string, MenuItem[]][]).map(([category, items]) => (
        <div key={category}>
          <div className="w-full py-1 bg-gray-200">
            <h3 className="p-4 text-sm font-semibold text-gray-900">{category}</h3>
          </div>

          <div className="mt-4 ">

            {items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                business_identifier={business_identifier} />
            ))}
          </div>
        </div>
      ))}


      {basketItems.length > 0 && <Link to="/demo/order-summary" className="fixed bottom-0 left-0 right-0 z-50 w-full py-2 bg-white">
        <button className=" w-[90%] px-4 py-3 mx-auto  text-white bg-black rounded-full flex items-center justify-between">

          <span className="flex items-center">Cart <span><GoDotFill className="w-2 mx-2" /></span>{basketItems.length} {basketItems.length === 1 ? "item" : "items"} </span>
          <span>₦{basketItems.reduce((total, item) => total + item.totalPrice, 0).toLocaleString()}</span>

        </button>
      </Link>}
    </div>
  )
}




const ItemCard = ({ item, business_identifier }: { item: MenuItem, business_identifier: string | null }) => {

  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  const handleAddToBasket = (menuItem: MenuItem) => {

    const isInCart = basketItems.find((item) => item.id === menuItem._id);

    if (!isInCart) {
      const basketItem = {
        id: menuItem._id,
        quantity: 1,
        selectedOptions: [],
        itemPrice: menuItem.menu_item_price,
        totalPrice: menuItem.menu_item_price,
        name: menuItem.menu_item_name,
        tableNumber: "",
      };
      dispatch(addItemToBasket(basketItem));
      toast(<CustomAddToCartToast count={1} text="Item added to cart" />, {
        position: "top-center",
        className: "p-0 my-0 bg-transparent shadow-none",
        style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      });
    }
  };

  const handleRemoveFromBasket = (menuItem: MenuItem,) => {
    dispatch(removeItemFromBasket({ id: menuItem._id }));
    toast(<CustomAddToCartToast count={1} text="Item removed from cart" />, {
      position: "top-center",
      className: "p-0 my-0 bg-transparent shadow-none",
      style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
      closeButton: false,
      hideProgressBar: true,
      icon: false,
    });
  }

  return (
    <div className="relative grid w-full grid-cols-3 gap-2 px-4 py-3 border-b-2 border-b-gray-100 min-h-32">
      <Link to={`/item-details?id=${item._id}&bid=${business_identifier}`}
        className="absolute z-10 w-full h-full" />

      <div className="col-span-2" >
        <h4 className="text-base font-semibold text-gray-900">{item?.menu_item_name}</h4>
        <p className="my-2 text-sm text-gray-700">{item?.description}</p>
        <p className="text-sm font-semibold text-gray-900">₦{Number(item?.menu_item_price).toLocaleString()}</p>
        {/* <p className="text-sm font-semibold text-gray-900">{formatPrice(Number(item?.menu_item_price))}</p> */}
      </div>

      <div className="relative w-full col-span-1">
        <div className="relative w-full overflow-hidden rounded-lg h-28" style={{
          background: `url(${item?.menu_item_image ?? '/bg-banner.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <div className="absolute z-50 bottom-2 right-2">

            {!basketItems.find((b) => b.id === item._id) ? <FiPlus
              className="text-xl bg-gray-200 rounded-full"
              onClick={() => handleAddToBasket(item)}
            /> : <FiMinus
              className="text-xl bg-gray-200 rounded-full"
              onClick={() => handleRemoveFromBasket(item)}
            />}
          </div>
        </div>
      </div>
    </div >
  )
}
