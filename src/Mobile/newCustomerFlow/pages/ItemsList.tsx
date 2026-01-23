

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
import { SERVER_DOMAIN } from "../../../Api/Api";
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
import SearchModal from "./SearchModal";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";


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


const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false } }
});

export default function ItemsList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsListContent />
    </QueryClientProvider>
  );
}

function ItemsListContent() {

  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [bizLoading, setBizLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  console.log("businessDetails", businessDetails);

  useEffect(() => {

    const getBusinessDetails = async () => {

      setBizLoading(true);
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
        setBizLoading(false);
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

  // Use query data directly

  const { data: menuQueryData = [], isLoading: menuIsLoading } = useQuery({
    queryKey: ["menu", business_identifier, branch],
    queryFn: async () => {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuItem/?business_identifier=${business_identifier}&branch=${branch}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data?.data ?? [];
    },
    enabled: Boolean(business_identifier && branch),
  });

  const loading = menuIsLoading || bizLoading;

  const [activeTab, setActiveTab] = useState("All items");


  // Get unique categories for tabs
  const categories = ['All items', ...new Set((menuQueryData as any[]).map((item: any) => item.menu_category_name))];
  const menuItemNames = [...new Set((menuQueryData as any[]).map((item: any) => ({ name: item.menu_item_name, id: item._id })))]

  // Filter items based on active tab
  const filteredItems = activeTab === 'All items'
    ? (menuQueryData as any[])
    : (menuQueryData as any[]).filter((item: any) => item.menu_category_name === activeTab);

  // Group items by category
  const groupedByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.menu_category_name]) {
      acc[item.menu_category_name] = [];
    }
    acc[item.menu_category_name].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const basketItems = useSelector((state: RootState) => state.basket.items);

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      // toast.success("Link copied to clipboard");
      toast(<CustomAddToCartToast text="Link Copied to clipboard" />, {
        position: "top-center",
        className: "p-0 my-0 bg-transparent shadow-none",
        style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      });
    } catch (e) {
      // toast.error("Unable to copy link. Please try again.");
      toast(<CustomAddToCartToast text="Unable to copy link. Please try again." />, {
        position: "top-center",
        className: "p-0 my-0 bg-transparent shadow-none",
        style: { background: "transparent", boxShadow: "none", padding: 0, margin: "0 auto" },
        closeButton: false,
        hideProgressBar: true,
        icon: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen">
      {showSearch && (<SearchModal setShowSearch={setShowSearch} allMenuItems={menuItemNames} business_identifier={business_identifier} />)}
      <div className='relative mb-12 w-full h-64'>
        <img
          src='/bg-banner.png'
          alt='bg-banner'
          className='object-cover object-center mb-10 w-full h-64'
        />

        <div className="flex absolute top-4 right-4 gap-4 items-center">
          <RxShare2 onClick={handleCopyLink} className="right-2 bottom-2 p-1 text-4xl bg-gray-200 rounded-full cursor-pointer" />
          <IoSearchOutline
            onClick={() => setShowSearch(true)}
            className="right-2 bottom-2 p-1 text-4xl bg-gray-200 rounded-full" />
        </div>
        {/*  */}
        <div className="flex overflow-hidden absolute left-4 -bottom-7 z-10 justify-center items-center p-1 bg-white rounded-full shadow-md size-16">
          {businessDetails?.business_logo ?
            <img
              src={businessDetails?.business_logo}
              alt={businessDetails?.businessFullName}
              className='object-cover object-center w-full h-full rounded-full'
            />
            :
            <TiWaves className="w-full h-full text-orange-400 bg-orange-200 rounded-full" />
          }
        </div>
      </div>

      {/* <div className=""> */}
      <div className="px-4">
        <h2 className="text-base font-semibold text-gray-900">{businessDetails?.businessFullName}</h2>
        <p className="my-2 text-base text-gray-700">{businessDetails?.orderingDescription}</p>

        <p className="flex gap-2 items-center my-2 text-base text-gray-700">{businessDetails?.orderingInstruction}
          {/* <span className="flex gap-2 items-center"> <FaStar className="fill-orange-500" /> 4.5</span> */}
        </p>
        {/* <p className="flex gap-2 items-center my-2 text-xs text-gray-700"><span>Opens 8AM - 8PM</span> <span className="flex gap-2 items-center"> <FaStar className="fill-orange-500" /> 4.5</span></p> */}
      </div>


      <div className="flex overflow-x-auto gap-4 items-center px-4 my-4 whitespace-nowrap no-scrollbar">
        {categories.map((category, index) => <p
          key={index}
          onClick={() => setActiveTab(category)}
          className={`cursor-pointer px-2 py-3 border-b-2 text-base  ${activeTab === category ? "border-b-blue-600 font-semibold text-blue-600" : "text-gray-600  border-b-transparent"}`}>{category}</p>)}
      </div>

      {(Object.entries(groupedByCategory) as [string, MenuItem[]][]).map(([category, items]) => (
        <div key={category}>
          <div className="py-1 w-full bg-gray-200">
            <h3 className="p-4 text-sm font-semibold text-gray-900">{category}</h3>
          </div>

          <div className="mt-4">

            {items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                business_identifier={business_identifier} />
            ))}
          </div>
        </div>
      ))}


      {basketItems.length > 0 && <Link to="/demo/order-summary" className="fixed right-0 bottom-0 left-0 z-50 py-2 w-full bg-white">
        <button className=" w-[90%] px-4 py-3 mx-auto  text-white bg-black rounded-full flex items-center justify-between">

          <span className="flex items-center">Cart <span><GoDotFill className="mx-2 w-2" /></span>{basketItems.length} {basketItems.length === 1 ? "item" : "items"} </span>
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
    <div className="grid relative grid-cols-3 gap-2 px-4 py-3 w-full border-b-2 border-b-gray-100 min-h-32">
      <Link to={`/item-details?id=${item._id}&bid=${business_identifier}`}
        className="absolute z-10 w-full h-full" />

      <div className="col-span-2" >
        <h4 className="text-base font-semibold text-gray-900">{item?.menu_item_name}</h4>
        <p className="my-2 text-sm text-gray-700">{item?.description}</p>
        <p className="text-sm font-semibold text-gray-900">₦{Number(item?.menu_item_price).toLocaleString()}</p>
        {/* <p className="text-sm font-semibold text-gray-900">{formatPrice(Number(item?.menu_item_price))}</p> */}
      </div>

      <div className="relative col-span-1 w-full">
        <div className="overflow-hidden relative w-full h-28 rounded-lg" style={{
          background: `url(${item?.menu_item_image ?? '/bg-banner.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <div className="absolute right-2 bottom-2 z-50">

            {!basketItems.find((b) => b.id === item._id) ? <FiPlus
              className="text-2xl bg-gray-200 rounded-full"
              onClick={() => handleAddToBasket(item)}
            /> : <FiMinus
              className="text-2xl bg-gray-200 rounded-full"
              onClick={() => handleRemoveFromBasket(item)}
            />}
          </div>
        </div>
      </div>
    </div >
  )
}

