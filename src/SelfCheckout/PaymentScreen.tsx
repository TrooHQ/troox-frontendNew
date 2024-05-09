import { useNavigate } from "react-router-dom";
import Back from "../SelfCheckout/assets/Back.svg";
import Transfer from "../SelfCheckout/assets/transfer 1.png";
import System from "../SelfCheckout/assets/system.png";
import QRCode from "../SelfCheckout/assets//qrcodeScan.png";
import Money from "../SelfCheckout/assets/money.png";
import { useState } from "react";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className=" ">
      <img
        src={Back}
        alt=""
        onClick={() => navigate(-1)}
        className="p-[40px] cursor-pointer"
      />

      <div className=" text-center mt-[57px] max-w-[554px] mx-auto">
        <p className=" text-[#121212] text-[44px] font-[500]">
          Payment Options
        </p>
        <p className=" text-[#929292] text-[32px] font-[500] mt-[56px]">
          Balance Due: <span className=" text-[#121212]">₦ 2,700</span>
        </p>

        <p className=" text-[#929292] text-[32px] font-[500]">Tip: No Tip</p>
        <hr className=" border border-[#414141] mb-[16px] mt-[24px]" />
        <p className=" text-[#929292] text-[32px] font-[600] ">
          Pay:<span className=" text-[#121212]"> ₦ 2,700</span>
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
        <div className=" mx-[42px] mt-[120px]">
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
                  <img src={Transfer} alt="" className=" mt-[40px]" />
                </div>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
