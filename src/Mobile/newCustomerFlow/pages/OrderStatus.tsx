import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_DOMAIN } from "../../../Api/Api";
import Loader from "../../../components/Loader";
import { clearBasket } from "../../../slices/BasketSlice";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false } }
});

export default function OrderStatus() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderStatusContent />
    </QueryClientProvider>
  );
}

function OrderStatusContent() {
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

  const uploadOrder = useMutation({
    mutationFn: async () => {
      const order = JSON.parse(sessionStorage.getItem("order_jjv5q") || "{}");
      const res = await axios.post(
        `${SERVER_DOMAIN}/order/uploadBranchUserOrder`,
        { ...order, transactionRef: reference }
      );
      return res.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      sessionStorage.setItem("OrderDetails", JSON.stringify(data.data));
      const num = data?.data?.order_number || data?.data?.orderNumber || data?.data?.orderId || data?.data?.order_id;
      if (num) setOrderNumber(String(num));
      dispatch(clearBasket());
      sessionStorage.removeItem("order_jjv5q");
      sessionStorage.removeItem("reference");
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "An error occurred while finalizing the order.";
      toast.error(msg);
      setErrorMsg(msg);
    },
    onSettled: () => setLoading(false),
  });

  const confirmPayment = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/confirmOrderPayment`,
        { reference: reference, businessId: business?.businessDetails?._id }
      );
      return response.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
      if (data?.status !== false) {
        await uploadOrder.mutateAsync();
        toast.success("Payment Successful!");
        setErrorMsg(null);
      } else {
        toast.error("Payment could not be verified.");
        setErrorMsg("Payment could not be verified.");
      }
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "An error occurred. Please try again.";
      toast.error(msg);
      setErrorMsg(msg);
    },
    onSettled: () => setLoading(false),
  });

  useEffect(() => {
    if (reference && business?.businessDetails?._id) {
      confirmPayment.mutate();
    }
  }, [reference, business?.businessDetails?._id]);

  return (
    errorMsg ? (
      <div className="flex relative justify-center items-center w-full min-h-screen">
        <div className="px-4 text-center">
          <p className="text-[18px] font-[600] text-[#FF4D4F]">Payment Error</p>
          <p className="mt-2 text-[14px] text-[#FF4D4F]">{errorMsg}</p>
          <button
            onClick={handleBackHome}
            className="inline-flex justify-center items-center px-5 py-2 mt-6 text-blue-600 bg-white rounded-full border border-blue-600 hover:bg-blue-50"
          >
            Back home
          </button>
        </div>
      </div>
    ) : loading ? (
      <div className="flex relative justify-center items-center w-full min-h-screen">
        <Loader />
      </div>
    ) : (
      <div className="flex relative justify-center items-center w-full min-h-screen">
        <div className="px-4 text-center">
          <p className="text-[18px] font-[600] text-[#121212]">Order successful!</p>
          <p className="mt-2 text-[14px] text-[#121212]">Your order number is <span className="font-[700]">{formattedOrderNumber}</span>.</p>
          <p className="mt-4 text-[14px] text-[#606060]">We will notify you when your order is ready,<br /> and it will then be delivered to your room.</p>
          <button
            onClick={handleBackHome}
            className="inline-flex justify-center items-center px-5 py-2 mt-6 text-blue-600 bg-white rounded-full border border-blue-600 hover:bg-blue-50"
          >
            Back home
          </button>
        </div>
      </div>
    )
  );
}
