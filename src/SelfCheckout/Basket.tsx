import { useNavigate } from "react-router-dom";
import Pap from "../Mobile/assets/pap and akara 1.png";
import Modal from "../components/Modal";
import { useState } from "react";
import Close from "../SelfCheckout/assets/close.svg";

export const Basket = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // const [userName, setUserName] = useState("");

  return (
    <div className=" ">
      <div className=" mt-[68px] ">
        <div className="">
          <p className=" text-[44px] font-[500] text-[#606060] text-center">
            Order Summary
          </p>
        </div>
        <div className=" drop-shadow border border-[#E7E7E7] max-h-[537px] mt-[63px] max-w-[960px] mx-auto rounded-[10px]">
          <div className="  grid grid-cols-2 items-center">
            <img src={Pap} alt="" className=" h-full object-cover" />
            <div className=" px-[40px]">
              <p className=" text-[44px] text-[#606060] font-[500] ">
                1x Pap Meal
              </p>
              <div className=" mt-[16px]">
                <p className=" text-[24px] font-[400] text-[#606060]">SIDES</p>
                <p className=" text-[32px] font-[500] text-[#606060]">
                  4pcs of Akara
                </p>
              </div>

              <div className=" my-[32px]">
                <p className=" text-[24px] font-[400] text-[#606060]">EXTRAS</p>
                <p className=" text-[32px] font-[500] text-[#606060]">
                  4x Akara
                </p>
                <p className=" text-[32px] font-[500] text-[#606060]">
                  2x Meatballs
                </p>
              </div>

              <div className="">
                <p className=" font-[500] text-[44px] text-[#606060]">
                  &#x20A6;1,200
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-[60px] flex items-center justify-center gap-[16px]">
          <p
            className=" rounded-full cursor-pointer font-[500] text-[32px] text-[#0B7F7C] py-[37px] px-[99px] border-[3px] border-[#0B7F7C]"
            onClick={() => navigate(-1)}
          >
            Cancel
          </p>
          <p
            className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#0B7F7C] text-white py-[37px] px-[40px]"
            onClick={() => setIsOpen(true)}
          >
            Proceed to Pay
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className=" p-[32px]">
          <div
            className="  cursor-pointer flex items-center justify-end"
            onClick={() => setIsOpen(false)}
          >
            <img src={Close} alt="" className="" />
          </div>

          <div className=" w-[854px] flex flex-col items-center justify-center ">
            <div className=" px-[74px] text-center">
              <p className=" text-[44px] font-[500] text-[#121212] ">
                Add a Tip
              </p>
              <p className=" text-[32px] font-[500] text-[#121212] my-[16px]">
                Thank you
              </p>
              <p className=" text-[32px] font-[500] text-[#121212]">
                Your Subtotal: ₦ 2,700
              </p>
              {/* <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your first name"
            value={userName}
            onChange={handleUserNameChange}
          /> */}
              <div className=" grid grid-cols-2 items-center gap-[24px] mt-[40px]">
                <p className=" py-[39px] px-[134px] text-center border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  10%
                </p>
                <p className=" py-[39px] text-center border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  15%
                </p>
                <p className=" py-[39px]  text-center border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  20%
                </p>
                <p className="text-center py-[39px]  border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  Custom
                </p>
              </div>

              <div className=" mt-[24px]">
                <p className="text-center py-[39px]  border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  No Tip
                </p>
              </div>
              {/* <div className=" mt-[25px]">
              <p
                className=" px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#0B7F7C] text-[16px] font-[500] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </p>
              <p
                className={`px-[24px] py-[10px] ${
                  !userName ? " bg-[#85C0BE]" : "bg-[#0B7F7C] cursor-pointer"
                } inline rounded-[5px] text-[#ffffff] text-[16px] font-[500] `}
                onClick={userName ? handleNext : undefined}
              >
                Next
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
