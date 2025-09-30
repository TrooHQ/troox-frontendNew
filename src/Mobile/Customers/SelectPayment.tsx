import TopMenuNav from "./TopMenuNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import System from "../../SelfCheckout/assets/system.png";
// import QRCode from "../../SelfCheckout/assets//qrcodeScan.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../slices/BasketSlice";
import axios from "axios";
import { PAYMENT_DOMAIN, SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export const SelectPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(window.location.search);

  console.log("searchParams", searchParams);

  const reference = searchParams.get("reference") ?? null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketDetails = useSelector((state: RootState) => state.basket);

  const branchId = useSelector((state: RootState) => state.business?.branchID);

  const business = useSelector((state: RootState) => state.business);

  const totalPrice = basketDetails?.totalPrice ?? 0;
  const tip = basketDetails?.tip ?? 0;

  const BusinessDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );

  const colorScheme = BusinessDetails?.colour_scheme;

  const items = basketDetails.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    menuItem: {
      _id: item.menuItem?._id,
      menu_category_name: item.menuItem?.menu_category_name,
      menu_group_name: item.menuItem?.menu_group_name,
      menu_item_name: item.menuItem?.menu_item_name,
      menu_item_price: item.menuItem?.menu_item_price,
      menu_item_image: item.menuItem?.menu_item_image,
    },
    name: item.name,
    selectedOptions: item.selectedOptions.map((option) => ({
      name: option.name,
      price: option.price,
    })),
    tableNumber: item.tableNumber,
  }));
  const payload = {
    is_paid: "true",
    channel: "qr-order-and-pay",
    branch_id: branchId,
    businessIdentifier: business?.businessIdentifier,
    customerName: basketDetails?.customerName,
    customerTableNumber: business?.tableNo,
    items: items,
    totalPrice: basketDetails.totalPrice,
    totalQuantity: basketDetails.totalQuantity,
    ordered_by: basketDetails.customerName || "User",
    menu_items: items,
    total_price: basketDetails.totalPrice,
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

      localStorage.setItem("order_x445ij", JSON.stringify(payload));

      const response = await axios.post(
        `${PAYMENT_DOMAIN}/transaction/initiate_paystack_transaction/`,
        {
          business_id: business?.businessDetails?._id,
          name: basketDetails.customerName || "User",
          platform: "Online",
          // amount: parseInt(pricePlusTax.toString()) + parseInt(deliveryFee ? deliveryFee.toString() : "0"),
          amount: totalPrice + tip,
          email: "user@example.com",
          callback_url: "https://troo-admin.netlify.app/demo/payment-type/in_room_dining",
          // callback_url: window.location.href.includes("netlify.app") ?            
          // "// https://troo-admin.netlify.app/demo/payment-type/in_room_dining" : "https://gogrub.shop/demo/payment-type/online_ordering",

          menu_items: items,
        },
        headers
      );

      sessionStorage.setItem("reference", response?.data?.transaction?.ref);
      console.log("reference", response?.data?.transaction?.ref);
      // route this to a blank page
      window.location.href = response.data.paystack_data.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
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
        payload
      );
      setLoading(false);
      console.log(response.data);
      sessionStorage.setItem(
        "OrderDetails",
        JSON.stringify(response.data.data)
      );
      dispatch(clearBasket());
      toast.success("Order has been Made successfully");
      navigate("/demo/receipt/orderandpay");
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          // toast.error("An error occurred. Please try again later.");
        }
      } else {
        // toast.error("An error occurred. Please try again later.");
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
        { reference: reference, businessId: business?.businessDetails?._id });
      // { reference: reference, businessId: uniqueId?.split("_").join(" ") });


      if (response.data?.status !== false) {
        console.log("Payment verification response:", response);
        // handleOrderUpload();
        handlePayment();
        toast.success("Payment Successful!");
        sessionStorage.removeItem("reference");
      } else {
        toast.error("Payment could not be verified.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      // toast.error("An error occurred. Please try again.");
      navigate(`/demo/payment-type/online_ordering/`);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (!reference) {
      localStorage.removeItem("order_x445ij");
      return;
    }

    business?.businessDetails?._id && verifyPayment();
  }, [business?.businessDetails?._id]);


  return (
    <div className="relative ">
      <TopMenuNav exploreMenuText="Select Payment" />
      {loading && <Loader />}

      <div className=" text-center mt-[7px] w-full mx-[10px]">
        <p className=" text-[#000000] text-[18px] font-[400] mt-[36px]">
          Balance Due:{" "}
          <span className=" text-[#121212]">
            ₦ {totalPrice ? totalPrice.toLocaleString() : "0"}
          </span>
        </p>
        <p className=" text-[#000000] text-[18px] font-[500]">
          Tip: ₦ { }{" "}
          <span className=" text-[#000000]">{tip.toLocaleString() || 0} </span>
        </p>

        <hr
          className=" border mb-[16px] mt-[24px]"
          style={{ borderColor: colorScheme || "#414141" }}
        />
        <p className="text-[#000000] text-[18px] font-[600]">
          Pay:{" "}
          <span className="text-[#121212]">
            ₦{(totalPrice + (tip ?? 0)).toLocaleString()}
          </span>
        </p>
      </div>


      <div className="flex items-center justify-center my-10">
        <p
          className=" cursor-pointer inline font-[500] text-[18px] rounded-[10px] border   text-white py-[11px] px-[20px]"
          onClick={IntiatePayment}
          // onClick={handlePayment}
          style={{
            backgroundColor: colorScheme || "#FF0000",
            borderColor: colorScheme || "#ff0000",
          }}
        >
          Proceed to Pay
        </p>
      </div>

    </div>
  );
};
