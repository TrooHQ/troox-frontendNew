import { useNavigate } from "react-router-dom";
import Back from "../SelfCheckout/assets/Back.svg";
import System from "../SelfCheckout/assets/system.png";
import QRCode from "../SelfCheckout/assets//qrcodeScan.png";
import Money from "../SelfCheckout/assets/money.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { clearBasket } from "../slices/BasketSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const PaymentScreen = () => {
  const basketDetails = useSelector((state: RootState) => state.basket);
  const details = useSelector((state: RootState) => state);
  console.log(details);
  const url = sessionStorage.getItem("url");
  console.log(url);

  const business = useSelector((state: RootState) => state.business);
  console.log(business?.businessDetails?._id);

  const totalPrice = basketDetails?.totalPrice ?? 0;
  const tip = basketDetails?.tip ?? 0;
  console.log(tip);

  const finalTotal = totalPrice + tip;
  console.log(finalTotal);
  console.log(basketDetails);

  const userDetails = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("");

  const items = basketDetails.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    menuItem: {
      _id: item.menuItem._id,
      menu_category_name: item.menuItem.menu_category_name,
      menu_group_name: item.menuItem.menu_group_name,
      menu_item_name: item.menuItem.menu_item_name,
      menu_item_price: item.menuItem.menu_item_price,
      menu_item_image: item.menuItem.menu_item_image,
    },
    name: item.name,
    selectedOptions: item.selectedOptions.map((option) => ({
      name: option.name,
      price: option.price,
    })),
    tableNumber: item.tableNumber,
  }));
  const payload = {
    businessIdentifier: business?.businessDetails?._id,
    customerName: basketDetails.customerName,
    customerTableNumber: business?.tableNo,
    items: items,
    totalPrice: basketDetails.totalPrice,
    totalQuantity: basketDetails.totalQuantity,
  };
  const token = userDetails?.userData?.token;
  const handlePayment = async () => {
    if (loading) return;
    try {
      // if (!password || !confirmPassword || !token) {
      //   setError("All fields are required!");
      //   return;
      // }

      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/uploadUserOrder`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log(response.data);
      toast.success("Order has been Made successfully");
      dispatch(clearBasket());
      // dispatch(resetBusinessDetails());
      window.location.href = `${url}`;
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

  return (
    <div className=" ">
      <img
        src={Back}
        alt=""
        onClick={() => navigate(-1)}
        className="p-[10px] cursor-pointer"
      />

      <div className=" text-center mt-[7px] max-w-[554px] mx-auto">
        <p className=" text-[#121212] text-[44px] font-[500]">
          Payment Options
        </p>
        <p className=" text-[#929292] text-[32px] font-[500] mt-[56px]">
          Balance Due:{" "}
          <span className=" text-[#121212]">
            ₦ {totalPrice ? totalPrice : "0"}
          </span>
        </p>
        <p className=" text-[#000000] text-[32px] font-[500]">
          Tip: ₦ {} <span className=" text-[#929292]">{tip || 0} </span>
        </p>

        <hr className=" border border-[#414141] mb-[16px] mt-[24px]" />
        <p className="text-[#929292] text-[32px] font-[600]">
          Pay:{" "}
          <span className="text-[#121212]">
            ₦{(totalPrice + (tip ?? 0)).toFixed(2)}
          </span>
        </p>
      </div>

      <div className="bg-[#F8F8F8] border border-[#E7E7E7] px-[24px] py-[32px] rounded-[10px] grid grid-cols-4 gap-[8px] items-center mx-[18px] mt-[80px]">
        <p
          className={`text-[25px] font-[500] cursor-pointer text-center  py-[35px] px-[8px]  bg-white rounded-[10px] ${
            selectedOption === "Bank Transfer QR"
              ? " border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("Bank Transfer QR")}
        >
          Bank Transfer QR
        </p>
        <p
          className={`text-[25px] font-[500] cursor-pointer  py-[35px] px-[8px] text-center border  bg-white rounded-[10px] ${
            selectedOption === "WebPay"
              ? " border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("WebPay")}
        >
          WebPay
        </p>
        <p
          className={`text-[25px] font-[500] cursor-pointer text-[#414141] py-[35px] px-[8px] text-center  bg-white rounded-[10px] ${
            selectedOption === "Terminals"
              ? " border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("Terminals")}
        >
          Terminals
        </p>
        <p
          className={`text-[28px] font-[500] cursor-pointer text-[#414141] py-[35px] px-[8px] text-center  bg-white rounded-[10px] ${
            selectedOption === "Cash"
              ? " border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("Cash")}
        >
          Cash
        </p>
      </div>

      {selectedOption && (
        <div className=" mx-[42px] mt-[20px]">
          {selectedOption === "Bank Transfer QR" && (
            <div className="">
              <p className=" text-[32px] font-[500] text-[#414141] px-[28px] py-[15px]">
                Bank Transfer QR
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[40px] max-w-[566px] mx-auto text-center">
                <p className=" text-[28px]  font-[400] text-[#121212]">
                  Scan QR Code below in your bank app to complete this payment
                </p>

                <div className=" flex justify-center">
                  <img src={QRCode} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#FF0000] border-[#FF0000] text-white py-[37px] px-[40px]"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
          {selectedOption === "WebPay" && (
            <div className="">
              <p className=" text-[32px] font-[500] text-[#414141] px-[28px] py-[15px]">
                WebPay
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[40px] max-w-[566px] mx-auto text-center">
                <p className=" text-[28px]  font-[400] text-[#121212]">
                  Scan QR Code with your phone camera
                </p>

                <div className=" flex justify-center">
                  <img src={QRCode} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#FF0000] border-[#FF0000] text-white py-[37px] px-[40px]"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
          {selectedOption === "Terminals" && (
            <div className="">
              <p className=" text-[32px] font-[500] text-[#414141] px-[28px] py-[15px]">
                Terminals
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[40px] max-w-[566px] mx-auto text-center">
                <p className=" text-[28px]  font-[400] text-[#121212]">
                  Tap attached NFC device
                </p>

                <div className=" flex justify-center">
                  <img src={System} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#FF0000] border-[#FF0000] text-white py-[37px] px-[40px]"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
          {selectedOption === "Cash" && (
            <div className="">
              <p className=" text-[32px] font-[500] text-[#414141] px-[28px] py-[15px]">
                Cash
              </p>
              <hr className=" border-[#929292] border" />
              <div className=" my-[40px] max-w-[566px] mx-auto text-center">
                <p className=" text-[28px]  font-[400] text-[#121212]">
                  Make your cash payment with the cashier
                </p>

                <div className=" flex justify-center">
                  <img src={Money} alt="" className=" mt-[40px]" />
                </div>
              </div>
              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#FF0000] border-[#FF0000] text-white py-[37px] px-[40px]"
                  onClick={handlePayment}
                >
                  {loading ? "Making Payment..." : "Proceed to Pay"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
