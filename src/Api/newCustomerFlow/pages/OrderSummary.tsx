import { Minus, Plus } from 'lucide-react'
import { FaArrowLeftLong, FaCirclePlus } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/store";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeItemFromBasket,
  updateItemInBasket
} from "../../../slices/BasketSlice";
import { clearBasket } from "../../../slices/BasketSlice";
import axios from "axios";
import { PAYMENT_DOMAIN, SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

export default function OrderSummary() {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const basketDetails = useSelector((state: RootState) => state.basket);
  const branchId = useSelector((state: RootState) => state.business?.branchID);
  const business = useSelector((state: RootState) => state.business);
  const { businessIdentifier } = useSelector((state: RootState) => state.business);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [home, setHome] = useState("");
  const [orderType, setOrderType] = useState<'dining' | 'pickup'>('dining');
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference") ?? null;

  useEffect(() => {
    const home_url = localStorage.getItem("home_url");
    if (home_url) setHome(home_url);
  }, [])

  useEffect(() => {
    if (basketItems.length < 1) navigate(-1);
  }, [basketItems.length, navigate])

  useEffect(() => {
    if (!reference) {
      localStorage.removeItem("order_jjv5q");
      return;
    }

    business?.businessDetails?._id && verifyPayment();
  }, [business?.businessDetails?._id]);

  console.log('basketItems', basketItems)

  // Calculate totals
  const subtotal = basketItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;

  // Build items and payload to match InRoomSelectPayment
  const tip = basketDetails?.tip ?? 0;
  const items = basketDetails.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    menuItem: item.menuItem
      ? {
          _id: item.menuItem._id,
          menu_category_name: item.menuItem.menu_category_name,
          menu_group_name: item.menuItem.menu_group_name,
          menu_item_name: item.menuItem.menu_item_name,
          menu_item_price: item.menuItem.menu_item_price,
          menu_item_image: item.menuItem.menu_item_image,
        }
      : undefined,
    name: item.name,
    selectedOptions: item.selectedOptions.map((option) => ({
      name: option.name,
      price: option.price,
    })),
    tableNumber: item.tableNumber,
  }));

  const payload = {
    is_paid: "true",
    channel: "in-room-dining",
    branch_id: branchId,
    businessIdentifier: business?.businessIdentifier,
    customerName: basketDetails?.customerName,
    customerPhone: basketDetails?.customerPhone,
    customerTableNumber: basketDetails?.customerTableNumber,
    items: items,
    totalPrice: basketDetails?.totalPrice,
    totalQuantity: basketDetails?.totalQuantity,
    ordered_by: basketDetails?.customerName || "User",
    menu_items: items,
    total_price: basketDetails?.totalPrice,
    tip,
  };

  const IntiatePayment = async () => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      };

      localStorage.setItem("order_jjv5q", JSON.stringify(payload));

      const response = await axios.post(
        `${PAYMENT_DOMAIN}/transaction/initiate_paystack_transaction/`,
        {
          business_id: business?.businessDetails?._id,
          name: basketDetails.customerName || "User",
          platform: "Online",
          amount: total + tip,
          email: "user@example.com",
          callback_url: window.location.href,
          menu_items: items,
        },
        headers
      );

      sessionStorage.setItem("reference", response?.data?.transaction?.ref);
      window.location.href = response.data.paystack_data.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment initiation failed. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/uploadBranchUserOrder`,
        { ...payload, transactionRef: reference }
      );
      setLoading(false);
      sessionStorage.setItem("OrderDetails", JSON.stringify(response.data.data));
      dispatch(clearBasket());
      navigate("/demo/receipt/in_room_dining");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/confirmOrderPayment`,
        { reference: reference, businessId: business?.businessDetails?._id }
      );

      if (response.data?.status !== false) {
        handlePayment();
        toast.success("Payment Successful!");
        sessionStorage.removeItem("reference");
      } else {
        toast.error("Payment could not be verified.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("An error occurred. Please try again.");
      navigate(`/demo/payment-type/online_ordering/`);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    IntiatePayment();
  };

  return (
    <div className="relative w-full min-h-screen mb-24">
      {loading && <Loader />}
      <p className='flex items-center gap-3 px-4 py-3 cursor-pointer border-y border-y-gray-300' onClick={() => navigate(-1)}>
        <FaArrowLeftLong className='text-gray-600' />
        Back
      </p>

      <h4 className='px-4 py-3 font-semibold border-b border-b-gray-300'>Order Summary</h4>

      <div className='px-4'>
        {basketItems.map((item, index) => (
          <OrderSummaryCard key={index} item={item} businessIdentifier={businessIdentifier} />
        ))}
      </div>

      <Link to={home} className='flex items-center gap-2 px-4 py-3 border-y border-y-gray-300'>
        <FaCirclePlus className='fill-blue-600' />
        <p className='text-sm font-semibold text-blue-600'>Add more items</p>
      </Link>

      <div className='px-4 py-3 border-b border-b-gray-300'>
        <div
          className='flex items-center justify-between gap-2 py-3 cursor-pointer'
          onClick={() => setOrderType('dining')}
        >
          <div className='flex items-center gap-2'>
            <img src="/utensils.svg" alt="" className='w-5 h-5' />
            <p>Dining</p>
          </div>
          <input
            type='radio'
            checked={orderType === 'dining'}
            onChange={() => setOrderType('dining')}
            className='cursor-pointer'
          />
        </div>

        <div
          className='flex items-center justify-between gap-2 py-3 cursor-pointer'
          onClick={() => setOrderType('pickup')}
        >
          <div className='flex items-center gap-2'>
            <img src="/takeout.svg" alt="" className='w-5 h-5' />
            <p>Pick Up</p>
          </div>
          <input
            type='radio'
            checked={orderType === 'pickup'}
            onChange={() => setOrderType('pickup')}
            className='cursor-pointer'
          />
        </div>
      </div>

      <div className="px-4 py-4 border-b border-b-gray-200">
        <label className="block mb-2 text-sm font-medium text-gray-900">Leave a note</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tell the restaurant your preference"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className='px-4 py-3 border-b border-b-gray-300'>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>SubTotal</p>
          <p className='font-semibold'>₦{subtotal.toLocaleString()}</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>Service Charge</p>
          <p className='font-semibold'>₦{serviceCharge.toLocaleString()}</p>
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-3 border-y border-y-gray-300'>
        <p className='text-sm font-medium'>Total</p>
        <p className='font-semibold'>₦{total.toLocaleString()}</p>
      </div>

      <div className='fixed bottom-0 left-0 right-0 flex items-center justify-between w-full py-2 bg-white shadow-lg'>
        <button
          className="text-center w-[90%] px-4 py-3 mx-auto text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

const OrderSummaryCard = ({ item, businessIdentifier }: any) => {

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    const basketItem = { ...item, quantity: newQuantity };

    dispatch(updateItemInBasket(basketItem));

  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      const basketItem = { ...item, quantity: newQuantity };

      dispatch(updateItemInBasket(basketItem));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);

      const basketItem = { ...item, quantity: value };

      dispatch(updateItemInBasket(basketItem));
    }
  };

  const handleEdit = () => {
    navigate(`/item-details?bid=${businessIdentifier}&id=${item.id}`);
  };
  const dispatch = useDispatch();
  const handleRemove = (itemId: string) => {
    console.log("Removing item with ID:", itemId);
    dispatch(removeItemFromBasket({ id: itemId }));
  };

  return (
    <div className="my-4 bg-white">
      <div className='flex items-center justify-between w-full gap-4'>
        <p className="text-base font-semibold text-gray-700">{item.name}</p>
        <p className="text-gray-900">₦{(item.totalPrice * quantity).toLocaleString()}</p>
      </div>

      <div className='flex w-full gap-4 my-2'>
        {item.selectedOptions?.length > 0 && (
          <div className='flex flex-wrap items-center w-full gap-2 text-xs'>
            {item.selectedOptions.map((option: any, index: number) => (
              <span key={index} className='px-2 py-1 text-gray-600 bg-gray-100 rounded-lg text-[12px]'>
                {option.quantity} {option.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center justify-center gap-2 px-2 py-1 my-2 border border-gray-100 w-fit rounded-2xl'>
          <Minus
            className='w-4 transition-colors cursor-pointer hover:text-red-500'
            onClick={handleDecrement}
          />
          <input
            className='w-12 text-center bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            min="1"
          />
          <Plus
            className='w-4 transition-colors cursor-pointer hover:text-green-500'
            onClick={handleIncrement}
          />
        </div>

        <div className='flex items-center gap-2'>
          <span
            className='text-sm font-semibold text-blue-500 cursor-pointer hover:text-blue-700'
            onClick={handleEdit}
          >
            Edit
          </span>
          <span
            className='text-sm font-semibold text-red-500 cursor-pointer hover:text-red-700'
            onClick={() => handleRemove(item.id)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  )
}