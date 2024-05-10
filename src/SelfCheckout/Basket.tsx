import { useNavigate } from "react-router-dom";
import Pap from "../Mobile/assets/pap and akara 1.png";
import Modal from "../components/Modal";
import { ChangeEvent, useState } from "react";
import Close from "../SelfCheckout/assets/close.svg";

export const Basket = () => {
  const totalPrice = sessionStorage.getItem("totalPrice");
  const navigate = useNavigate();
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null
  );

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage(percentage);

    sessionStorage.setItem("percentage", percentage.toString());
    sessionStorage.removeItem("tip");

    setTimeout(() => {
      navigate("/payment");
    }, 2000);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  const [tip, setTip] = useState("");

  const handleTipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTip(e.target.value);
    sessionStorage.setItem("tip", e.target.value);
    sessionStorage.removeItem("percentage");
    console.log(e.target.value);
  };

  const handleModal = () => {
    setIsOpen(false);
    setTipModal(true);
  };

  const handleNoTip = () => {
    navigate("/payment");
    sessionStorage.removeItem("percentage");
    sessionStorage.removeItem("tip");
  };
  const handleNext = () => {
    navigate("/payment");
  };
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
                  &#x20A6;{totalPrice ? totalPrice : "0"}
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
            className=" cursor-pointer inline font-[500] text-[32px] rounded-full border  bg-[#0B7F7C] border-[#0B7F7C] text-white py-[37px] px-[40px]"
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
                Your Subtotal: ₦ {totalPrice ? totalPrice : "0"}
              </p>
              <div className=" grid grid-cols-2 items-center gap-[24px] mt-[40px]">
                <p
                  className={`py-[39px] px-[134px] text-center cursor-pointer rounded-[10px] text-[#121212] text-[36px] font-[500] ${
                    selectedPercentage === 10
                      ? "bg-[#0B7F7C] border border-[#0B7F7C] text-white"
                      : "border-2 border-[#606060]"
                  }`}
                  onClick={() => handlePercentageClick(10)}
                >
                  10%
                </p>
                <p
                  className={`py-[39px] text-center cursor-pointer rounded-[10px] text-[#121212] text-[36px] font-[500] ${
                    selectedPercentage === 15
                      ? "bg-[#0B7F7C] border border-[#0B7F7C] text-white"
                      : "border-2 border-[#606060]"
                  }`}
                  onClick={() => handlePercentageClick(15)}
                >
                  15%
                </p>
                <p
                  className={`py-[39px] text-center cursor-pointer rounded-[10px] text-[#121212] text-[36px] font-[500] ${
                    selectedPercentage === 20
                      ? "bg-[#0B7F7C] border border-[#0B7F7C] text-white"
                      : "border-2 border-[#606060]"
                  }`}
                  onClick={() => handlePercentageClick(20)}
                >
                  20%
                </p>
                <p
                  className=" cursor-pointer text-center py-[39px]  border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]"
                  onClick={handleModal}
                >
                  Custom
                </p>
              </div>
              <div className=" mt-[24px] cursor-pointer" onClick={handleNoTip}>
                <p className="text-center py-[39px]  border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]">
                  No Tip
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={tipModal} onClose={() => setTipModal(false)}>
        <div className=" p-[32px]">
          <div
            className="  cursor-pointer flex items-center justify-end"
            onClick={() => setTipModal(false)}
          >
            <img src={Close} alt="" className="" />
          </div>

          <div className=" w-[854px] flex flex-col items-center justify-center ">
            <div className=" px-[74px] text-center">
              <p className=" text-[44px] font-[500] text-[#121212] ">
                Enter Custom Tip
              </p>

              <input
                className="  border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
                type="number"
                placeholder="Enter Tip"
                value={tip}
                onChange={handleTipChange}
              />

              <div className=" mt-[25px]">
                <p
                  className=" px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#0B7F7C] text-[16px] font-[500] cursor-pointer"
                  onClick={() => setTipModal(false)}
                >
                  Cancel
                </p>
                <p
                  className={`px-[24px] py-[10px] ${
                    !tip ? " bg-[#85C0BE]" : "bg-[#0B7F7C] cursor-pointer"
                  } inline rounded-[5px] text-[#ffffff] text-[16px] font-[500] `}
                  onClick={tip ? handleNext : undefined}
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
