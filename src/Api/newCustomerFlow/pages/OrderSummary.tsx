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
// removed persistent customer info actions per updated flow
import axios from "axios";
import { PAYMENT_DOMAIN, SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

export default function OrderSummary() {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const basketDetails = useSelector((state: RootState) => state.basket);
  const branchId = useSelector((state: RootState) => state.business?.branchID);
  const business = useSelector((state: RootState) => state.business);
  const { businessIdentifier } = useSelector((state: RootState) => state.business);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [home, setHome] = useState("");
  const [orderType, setOrderType] = useState<'dine in' | 'pickup' | null>(null);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerTable, setCustomerTable] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference") ?? null;

  useEffect(() => {
    const home_url = localStorage.getItem("home_url");
    if (home_url) setHome(home_url);
  }, [])

  useEffect(() => {
    if (basketItems.length < 1) navigate(home);
  }, [basketItems.length, navigate, home])

  useEffect(() => {
    if (!reference) {
      sessionStorage.removeItem("order_jjv5q");
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
    customerName: customerName,
    customerPhone: customerPhone,
    customerTableNumber: customerTable,
    note: note,
    items: items,
    totalPrice: basketDetails?.totalPrice,
    totalQuantity: basketDetails?.totalQuantity,
    ordered_by: customerName || "User",
    menu_items: items,
    total_price: basketDetails?.totalPrice,
    tip,
  };

  console.log("payload", payload)
  // Always show user info card after selecting an option; close via Done
  const IntiatePayment = async () => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      };

      sessionStorage.setItem("order_jjv5q", JSON.stringify(payload));

      const response = await axios.post(
        `${PAYMENT_DOMAIN}/transaction/initiate_paystack_transaction/`,
        {
          business_id: business?.businessDetails?._id,
          name: (customerName || "User"),
          platform: "Online",
          amount: total + tip,
          email: (customerEmail || "user@example.com"),
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

      const order = sessionStorage.getItem("order_jjv5q");

      const orderObj = JSON.parse(order || "{}");

      const response = await axios.post(
        `${SERVER_DOMAIN}/order/uploadBranchUserOrder`,
        { ...orderObj, transactionRef: reference }
      );
      setLoading(false);
      sessionStorage.setItem("OrderDetails", JSON.stringify(response.data.data));
      dispatch(clearBasket());
      sessionStorage.removeItem("order_jjv5q");
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
        sessionStorage.removeItem("order_jjv5q");
      } else {
        toast.error("Payment could not be verified.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("An error occurred. Please try again.");
      // navigate(`/demo/payment-type/online_ordering/`);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    IntiatePayment();
  };

  // Derived checkout visibility
  const canCheckout =
    (orderType === 'dine in' && customerTable.trim().length > 0) ||
    (orderType === 'pickup' && customerName.trim().length > 0 && customerPhone.trim().length > 0 && customerEmail.trim().length > 0);


  return (
    <div className="relative w-full min-h-screen mb-24">
      {loading && <Loader />}

      <div className='flex items-center w-full gap-4 px-4 py-3 border-b-2 border-b-gray-100'>
        <FaArrowLeftLong className='text-gray-600' onClick={() => navigate(-1)} />

        <h4 className='flex-1 font-semibold text-center'>Order Summary</h4>
      </div>

      <div className='px-4'>
        {basketItems.map((item, index) => (
          <OrderSummaryCard key={index} item={item} businessIdentifier={businessIdentifier} />
        ))}
      </div>

      <Link to={home} className='flex items-center gap-2 px-4 py-3 border-y-2 border-y-gray-100'>
        <FaCirclePlus className='fill-blue-600' />
        <p className='text-sm font-semibold text-blue-600'>Add more items</p>
      </Link>

      <div className='px-4 py-3 border-b-2 border-b-gray-100'>
        <div
          className='flex items-center justify-between gap-2 py-3 cursor-pointer'
          onClick={() => { setOrderType('dine in'); setShowCheckOut(false) }}
        >
          <div className='flex items-center gap-2'>
            <img src="/utensils.svg" alt="" className='w-5 h-5' />
            <p>Dine In</p>
          </div>
          <input
            type='radio'
            checked={orderType === 'dine in'}
            onChange={() => { setOrderType('dine in'); setShowCheckOut(false) }}
            className='cursor-pointer'
          />
        </div>

        <div
          className='flex items-center justify-between gap-2 py-3 cursor-pointer'
          onClick={() => { setOrderType('pickup'); setShowCheckOut(false); }}
        >
          <div className='flex items-center gap-2'>
            <img src="/takeout.svg" alt="" className='w-5 h-5' />
            <p>Pick Up</p>
          </div>
          <input
            type='radio'
            checked={orderType === 'pickup'}
            onChange={() => { setOrderType('pickup'); setShowCheckOut(false); }}
            className='cursor-pointer'
          />
        </div>
      </div>

      <div className="px-4 py-4 border-b-2 border-b-gray-100">
        <label className="block mb-2 font-medium text-gray-900">Leave a note</label>
        <input
          className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tell the restaurant your preference"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className='px-4 py-3 border-b-2 border-b-gray-100'>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>SubTotal</p>
          <p className='font-semibold'>₦{subtotal.toLocaleString()}</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>Service Charge</p>
          <p className='font-semibold'>₦{serviceCharge.toLocaleString()}</p>
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-3 border-b-2 border-b-gray-100'>
        <p className='text-sm font-medium'>Total</p>
        <p className='font-semibold'>₦{total.toLocaleString()}</p>
      </div>


      {(orderType !== null && !showCheckOut) && <div className='fixed top-0 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end w-full h-full shadow-lg bg-gray-600/50'>
        <UserInfoCard
          orderType={orderType}
          setOrderType={() => setOrderType(null)}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          customerEmail={customerEmail}
          setCustomerEmail={setCustomerEmail}
          customerTable={customerTable}
          setCustomerTable={setCustomerTable}
          setShowCheckOut={setShowCheckOut}

        />
      </div>}


      {(showCheckOut && canCheckout) && <div className='fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between w-full py-2 bg-white shadow-lg'>
        <button
          className="text-center w-[90%] px-4 py-3 mx-auto text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>}

    </div>
  )
}

const OrderSummaryCard = ({
  item,
  businessIdentifier,
}: any) => {

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
        <p className="text-base font-medium text-gray-700">{item.name}</p>
        <p className="font-semibold text-gray-900">₦{(item.totalPrice * quantity).toLocaleString()}</p>
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
        <div className='flex items-center justify-center gap-2 px-2 py-1 my-2 border-2 border-gray-100 w-fit rounded-2xl'>
          <Minus
            className='w-5 transition-colors cursor-pointer hover:text-red-500'
            onClick={handleDecrement}
          />
          <input
            className='w-12 text-center rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            min="1"
          />
          <Plus
            className='w-5 transition-colors cursor-pointer hover:text-green-500'
            onClick={handleIncrement}
          />
        </div>

        <div className='flex items-center gap-4'>
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


const UserInfoCard = ({ orderType, setOrderType,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  customerTable,
  setCustomerTable,
  setShowCheckOut
}: any) => {
  // Dine In
  // Your order will be brought to your table when ready
  // phone number

  // Pick Up Details
  // name
  // email
  // Phone number

  const [errorState, setErrorState] = useState<string | null>(null)

  const handleSaveUserInfo = () => {
    // Validate required fields for the selected order type
    const isDineInValid = orderType === "dine in" && Boolean(customerTable);
    const isPickupValid = orderType === "pickup" && Boolean(customerName && customerPhone && customerEmail);

    if (isDineInValid || isPickupValid) {
      // Persist latest details without prefilling on next visit
      try {
        const persisted = {
          orderType,
          customerName,
          customerPhone,
          customerEmail,
          customerTableNumber: customerTable,
          updatedAt: Date.now(),
        };
        localStorage.setItem("last_customer_info", JSON.stringify(persisted));
      } catch (e) {
        // Ignore storage failures; do not block checkout
      }

      setShowCheckOut(true);
      setErrorState(null);
    } else {
      setErrorState("Please fill in the above fields");
    }
  };


  return (
    <div className='w-full p-4 bg-white rounded-t-2xl'>
      <div className="w-full mb-2">
        <div className="flex items-center justify-between w-full">
          <h4 className="font-semibold">{orderType} details</h4>
          <CloseLineIcon onClick={setOrderType} />
        </div>
        <p className='mt-2 text-sm'>{orderType === "dine in" && "Your order will be brought to your table when ready"}</p>
      </div>

      {orderType === "pickup" && <div className="flex flex-col justify-center w-full space-y-4 item-center">
        <input
          placeholder='Full name'
          className='w-full p-2 border border-gray-100 active:outline-none focus:outline-none rounded-xl'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          placeholder='Email'
          className='w-full p-2 my-4 border border-gray-100 active:outline-none focus:outline-none rounded-xl'
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}

        />
        <div className="flex items-center overflow-hidden border border-gray-100 rounded-xl">
          <span className='p-2 font-semibold bg-gray-100'>+234</span>
          <input
            placeholder='Phone Number'
            className='w-full p-2 rounded-xl active:outline-none focus:outline-none'
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            type='number'
          />
        </div>
      </div>}


      {orderType === "dine in" && <div className="flex flex-col justify-center w-full space-y-4 item-center">
        <input
          placeholder='Table number'
          className='w-full p-2 my-4 border border-gray-100 active:outline-none focus:outline-none rounded-xl'
          value={customerTable}
          onChange={(e) => setCustomerTable(e.target.value)}
          type='number'
        />
      </div>}
      <p className='text-xs text-red-500 '>{errorState}</p>
      <button className='px-4 py-2 mx-auto my-4 text-white bg-black rounded-lg w-fit' onClick={handleSaveUserInfo}>Done</button>
    </div>
  )
}
