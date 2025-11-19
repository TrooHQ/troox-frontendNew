import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_DOMAIN } from "../../../Api/Api";
import Loader from "../../../components/Loader";
import { clearBasket } from "../../../slices/BasketSlice";

export default function OrderStatus() {
  const [home, setHome] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const business = useSelector((state: RootState) => state.business);
  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");

  useEffect(() => {
    setErrorMsg(null);
    const homeUrl = localStorage.getItem("home_url") || sessionStorage.getItem("url") || "";
    setHome(homeUrl);

    try {
      const details = sessionStorage.getItem("OrderDetails");
      if (details) {
        const parsed = JSON.parse(details || "{}");
        const num = parsed?.order_number || parsed?.orderNumber || parsed?.orderId || parsed?.order_id;
        if (num) setOrderNumber(String(num));
      }
    } catch {
      // ignore parsing issues
    }
  }, []);

  const formattedOrderNumber = `#${(orderNumber ?? "").toString().padStart(3, "0")}`;

  const handleBackHome = () => {
    if (home) {
      window.location.href = home;
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!reference) return;
    if (!business?.businessDetails?._id) return;

    const verifyPayment = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${SERVER_DOMAIN}/order/confirmOrderPayment`,
          { reference: reference, businessId: business?.businessDetails?._id }
        );

        if (response.data?.status !== false) {
          await handlePayment();
          toast.success("Payment Successful!");
          setErrorMsg(null);
        } else {
          toast.error("Payment could not be verified.");
          setErrorMsg("Payment could not be verified.");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        toast.error((error as any).response?.data?.message || "An error occurred. Please try again.");
        setErrorMsg((error as any).response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const handlePayment = async () => {
      try {
        const order = sessionStorage.getItem("order_jjv5q");
        const orderObj = JSON.parse(order || "{}");
        const res = await axios.post(
          `${SERVER_DOMAIN}/order/uploadBranchUserOrder`,
          { ...orderObj, transactionRef: reference }
        );
        // console.log("res", res)
        sessionStorage.setItem("OrderDetails", JSON.stringify(res.data.data));
        const num = res?.data?.data?.order_number || res?.data?.data?.orderNumber || res?.data?.data?.orderId || res?.data?.data?.order_id;
        if (num) setOrderNumber(String(num));
        dispatch(clearBasket());
        sessionStorage.removeItem("order_jjv5q");
        sessionStorage.removeItem("reference");
      } catch (error) {
        console.error("Error uploading order:", error);
        const msg = (error as any).response?.data?.message || "An error occurred while finalizing the order.";
        toast.error(msg);
        setErrorMsg(msg);
      }
    };

    verifyPayment();
  }, [reference, business?.businessDetails?._id]);

  if (errorMsg) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-[18px] font-[600] text-[#FF4D4F]">Payment Error</p>
          <p className="mt-2 text-[14px] text-[#FF4D4F]">{errorMsg}</p>
          <button
            onClick={handleBackHome}
            className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-[18px] font-[600] text-[#121212]">Order successful!</p>
        <p className="mt-2 text-[14px] text-[#121212]">Your order number is <span className="font-[700]">{formattedOrderNumber}</span>.</p>
        <p className="mt-4 text-[14px] text-[#606060]">We will notify you when your order is ready,<br /> and it will then be delivered to your room.</p>
        <button
          onClick={handleBackHome}
          className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
        >
          Back home
        </button>
      </div>
    </div>
  );
}
