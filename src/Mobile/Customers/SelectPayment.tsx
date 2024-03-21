import TopMenuNav from "./TopMenuNav";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "../assets/Card.svg";
import Card1 from "../assets/card (1).svg";
import Card2 from "../assets/cardd.svg";
import Cash from "../assets/Cash.svg";

export const SelectPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  return (
    <div className="  ">
      <TopMenuNav exploreMenuText="Select Payment" />

      <div className=" mt-[68px] mx-[16px]">
        <div className="">
          <p className=" text-[18px] font-[600] text-[#121212] text-center">
            Total: #5,100
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

        <Link to="/receipt">
          <div className=" bg-[#121212] rounded-[10px] py-[13px] text-center mt-[72px] cursor-pointer">
            <p className=" text-[14px] font-[400] text-white">Pay</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
