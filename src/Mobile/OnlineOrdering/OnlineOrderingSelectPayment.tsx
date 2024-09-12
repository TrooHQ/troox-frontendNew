import TopMenuNav from "./OnlineOrderingTopMenuNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import System from "../../SelfCheckout/assets/system.png";
import QRCode from "../../SelfCheckout/assets//qrcodeScan.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../slices/BasketSlice";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export const OnlineOrderingSelectPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketDetails = useSelector((state: RootState) => state.basket);
  const details = useSelector((state: RootState) => state);
  console.log(details);

  const business = useSelector((state: RootState) => state.business);
  const branchId = useSelector((state: RootState) => state.business?.branchID);

  const totalPrice = basketDetails?.totalPrice ?? 0;
  const deliveryFee = basketDetails?.deliveryFee ?? 0;
  const finalTotal = totalPrice;
  console.log(finalTotal);
  console.log(basketDetails);

  const userDetails = useSelector((state: RootState) => state.user);

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
    branch_id: branchId,
    businessIdentifier: business?.businessIdentifier,
    customerName: basketDetails.customerName,
    ordered_by: basketDetails.customerName || "User",
    customerTableNumber: business?.tableNo,
    items: items,
    menu_items: items,
    total_price: basketDetails.totalPrice,
    totalPrice: basketDetails.totalPrice,
    totalQuantity: basketDetails.totalQuantity,
  };
  const token = userDetails?.userData?.token;
  const colorScheme = useSelector(
    (state: RootState) => state.business?.businessDetails?.colour_scheme
  );
  console.log(colorScheme);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/createBranchOrder`,
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
      navigate("/demo/receipt/online_ordering");
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
    <div className="  relative mb-[20px]">
      <TopMenuNav exploreMenuText="Select Payment" />
      {loading && <Loader />}

      <div className=" text-center mt-[7px] w-full mx-[10px]">
        <p className=" text-[#000000] text-[18px] font-[400] mt-[36px]">
          Balance Due:{" "}
          <span className=" text-[#121212]">
            ₦ {totalPrice ? totalPrice.toLocaleString() : "0"}
          </span>
        </p>

        {deliveryFee !== 0 && (
          <p className=" text-[#000000] text-[14px] font-[400] ">
            Delivery Fee:{" "}
            <span className=" text-[#121212]">
              ₦ {deliveryFee ? deliveryFee.toLocaleString() : "0"}
            </span>
          </p>
        )}

        <hr className=" border border-[#414141] mb-[16px] mt-[24px]" />
        <p className="text-[#000000] text-[18px] font-[600]">
          Pay:{" "}
          <span className="text-[#121212]">
            ₦{(totalPrice + (deliveryFee ?? 0)).toLocaleString()}
          </span>
        </p>
      </div>

      <div className=" mt-[30px] border border-[#E7E7E7] px-[12px] py-[32px] rounded-[10px] flex items-center gap-[8px] mx-[8px] overflow-x-auto">
        <p
          className={`text-[14px] font-[500] min-w-[120px] w-full cursor-pointer text-center py-[16px] px-[8px] bg-white rounded-[10px] ${
            selectedOption === "Bank Transfer"
              ? "border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("Bank Transfer")}
        >
          Bank Transfer
        </p>
        <p
          className={`min-w-[120px] w-full text-[14px] font-[500] cursor-pointer text-center py-[16px] px-[8px] bg-white rounded-[10px] ${
            selectedOption === "WebPay"
              ? "border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("WebPay")}
        >
          WebPay
        </p>
        <p
          className={`min-w-[120px] w-full text-[14px] font-[500] cursor-pointer text-center py-[16px] px-[8px] bg-white rounded-[10px] ${
            selectedOption === "Terminals"
              ? "border-4 border-[#5855B3] text-[#5855B3]"
              : "border-4 border-[#B6B6B6] text-[#414141]"
          }`}
          onClick={() => setSelectedOption("Terminals")}
        >
          Terminals
        </p>
      </div>

      {selectedOption && (
        <div className=" mx-[42px] mt-[20px]">
          {selectedOption === "Bank Transfer" && (
            <div className="">
              <p className=" text-[18px] font-[500] text-[#414141] px-[28px] py-[15px]">
                Bank Transfer
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[10px] max-w-[566px] mx-auto text-center">
                <p className=" text-[14px]  font-[400] text-[#121212]">
                  Scan QR Code below in your bank app to complete this payment
                </p>

                <div className=" flex justify-center">
                  <img src={QRCode} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[18px] rounded-[10px] border   text-white py-[11px] px-[20px]"
                  onClick={handlePayment}
                  style={{
                    backgroundColor: colorScheme || "#606060",
                    borderColor: colorScheme || "#606060",
                  }}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
          {selectedOption === "WebPay" && (
            <div className="">
              <p className=" text-[18px] font-[500] text-[#414141] px-[28px] py-[15px]">
                WebPay
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[10px] max-w-[566px] mx-auto text-center">
                <p className=" text-[14px]  font-[400] text-[#121212]">
                  Scan QR Code with your phone camera
                </p>

                <div className=" flex justify-center">
                  <img src={QRCode} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[18px] rounded-[10px] border   text-white py-[11px] px-[20px]"
                  onClick={handlePayment}
                  style={{
                    backgroundColor: colorScheme || "#606060",
                    borderColor: colorScheme || "#606060",
                  }}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
          {selectedOption === "Terminals" && (
            <div className="">
              <p className=" text-[18px] font-[500] text-[#414141] px-[28px] py-[15px]">
                Terminals
              </p>
              <hr className=" border-[#929292] border" />

              <div className=" my-[10px] max-w-[566px] mx-auto text-center">
                <p className=" text-[14px]  font-[400] text-[#121212]">
                  Tap attached NFC device
                </p>

                <div className=" flex justify-center">
                  <img src={System} alt="" className=" mt-[40px]" />
                </div>
              </div>

              <div className=" flex items-center  justify-center">
                <p
                  className=" cursor-pointer inline font-[500] text-[18px] rounded-[10px] border   text-white py-[11px] px-[20px]"
                  onClick={handlePayment}
                  style={{
                    backgroundColor: colorScheme || "#606060",
                    borderColor: colorScheme || "#606060",
                  }}
                >
                  Proceed to Pay
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
