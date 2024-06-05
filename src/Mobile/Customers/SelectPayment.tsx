import TopMenuNav from "./TopMenuNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../assets/Card.svg";
import Card1 from "../assets/card (1).svg";
import Card2 from "../assets/cardd.svg";
import Cash from "../assets/Cash.svg";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../slices/BasketSlice";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const SelectPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const basketDetails = useSelector((state: RootState) => state.basket);
  const details = useSelector((state: RootState) => state);
  console.log(details);

  const business = useSelector((state: RootState) => state.business);

  const totalPrice = basketDetails?.totalPrice ?? 0;
  const tip = basketDetails?.tip ?? 0;
  const finalTotal = totalPrice + tip;
  console.log(finalTotal);
  console.log(basketDetails);

  const userDetails = useSelector((state: RootState) => state.user);

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
    businessIdentifier: business?.businessIdentifier,
    customerName: basketDetails.customerName,
    customerTableNumber: business?.tableNo,
    items: items,
    totalPrice: basketDetails.totalPrice,
    totalQuantity: basketDetails.totalQuantity,
  };
  const token = userDetails?.userData?.token;
  const handlePayment = async () => {
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
      navigate("/receipt");
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
    <div className="  ">
      <TopMenuNav exploreMenuText="Select Payment" />

      <div className=" mt-[68px] mx-[16px]">
        <div className="">
          <p className=" text-[18px] font-[600] text-[#121212] text-center">
            Total: &#x20A6;{finalTotal}
          </p>

          <div className=" py-[23px] px-[17px] bg-[#FFFADC] mt-[16px] mb-[24px]">
            <p className=" text-[#121212] text-[14px] font-[400] text-center">
              This payment will only be charged when you place an order. We may
              place an authorization to your card for verification purposes; the
              authorization will automatically disappear after a few days.
              Refreshing the page and payment will result in multiple pending
              charges.
            </p>
          </div>
        </div>

        <div className=" border  rounded-[10px] border-[#E7E7E7]">
          <div className="px-[18px] py-[23px] border-b ">
            <label className=" flex cursor-pointer">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => handlePaymentMethodChange("cash")}
                className=" mr-[18px]"
              />
              <div className=" flex items-center gap-[8px]">
                <img src={Cash} alt="" />
                <p className=" text-[14px] text-[#121212] font-[400]"> Cash</p>
              </div>
            </label>
          </div>

          <div className="px-[18px] py-[23px] ">
            <label className=" flex cursor-pointer">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                className=" mr-[18px]"
              />
              <div className=" flex items-center gap-[8px]">
                <img src={Card} alt="" />
                <div className=" flex items-center  gap-[32px]">
                  <p className=" text-[14px] text-[#121212] font-[400]">
                    {" "}
                    Credit Card
                  </p>

                  <div className=" flex items-center gap-[8px]">
                    <img src={Card1} alt="" />
                    <img src={Card2} alt="" />
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {!loading && (
          <div
            className=" bg-[#121212] rounded-[10px] py-[13px] text-center mt-[72px] cursor-pointer"
            onClick={handlePayment}
          >
            <p className=" text-[14px] font-[400] text-white">Pay</p>
          </div>
        )}
      </div>
    </div>
  );
};
