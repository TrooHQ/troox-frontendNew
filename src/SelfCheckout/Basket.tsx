import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import Close from "../SelfCheckout/assets/close.svg";
import Back from "../SelfCheckout/assets/Back.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTip } from "../slices/BasketSlice";

export const Basket = () => {
  const navigate = useNavigate();
  const backetDetails = useSelector((state: RootState) => state.basket);
  const tip = useSelector((state: RootState) => state.basket?.tip);
  const tipPercentages = [0.1, 0.125, 0.15];
  console.log(backetDetails);
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null
  );
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const dispatch = useDispatch();
  const totalPrice = useSelector(
    (state: RootState) => state.basket?.totalPrice
  );
  const handlePercentageClick = (tip: number) => {
    setSelectedPercentage(selectedPercentage === tip ? null : tip);
    setCustomAmount(null);
    setTimeout(() => {
      navigate("/payment");
    }, 2000);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [tipModal, setTipModal] = useState(false);

  const handleModal = () => {
    setIsOpen(false);
    setTipModal(true);
  };

  useEffect(() => {
    if (selectedPercentage !== null) {
      const tipAmount = totalPrice * selectedPercentage;
      console.log("Selected tip amount:", tipAmount);
      dispatch(setTip(tipAmount));
    } else if (customAmount !== null) {
      console.log("Custom tip amount:", customAmount);
      dispatch(setTip(customAmount));
    } else {
      console.log("Selected tip: None");
      dispatch(setTip(null));
    }
  }, [selectedPercentage, customAmount, totalPrice]);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setCustomAmount(value);
      setSelectedPercentage(null);
    } else {
      setCustomAmount(null);
    }
  };

  const handleNoTipClick = () => {
    setSelectedPercentage(null);
    setCustomAmount(null);
    dispatch(setTip(null));
    navigate("/payment");
  };
  const handleNext = () => {
    navigate("/payment");
  };
  return (
    <div className=" ">
      <div className=" mt-[10px] ">
        <div className="">
          <img
            src={Back}
            alt=""
            onClick={() => navigate(-1)}
            className="p-[40px] cursor-pointer"
          />
          <p className=" text-[44px] font-[500] text-[#FF0000] text-center">
            Order Summary
          </p>
        </div>
        {backetDetails?.items.map((item, index) => (
          <div
            className=" drop-shadow border border-[#E7E7E7] max-h-[537px] mt-[10px] max-w-[960px] mx-auto rounded-[10px]"
            key={index}
          >
            <div className="  grid items-center">
              <div className=" px-[40px]">
                <div className=" grid grid-cols-3 place-items-center">
                  <p className=" text-[44px] text-[#606060] font-[500] ">
                    {item?.name}
                  </p>

                  <p className=" text-[44px] text-[#606060] font-[500] ">
                    x{item?.quantity}
                  </p>
                  <p className=" text-[44px] text-[#606060] font-[500] ">
                    &#x20A6;
                    {item.menuItem.menu_item_price.toLocaleString()}
                  </p>
                </div>

                {item.selectedOptions && item.selectedOptions?.length > 0 && (
                  <div className=" my-[32px]">
                    <p className=" text-[24px] font-[400] text-[#606060]">
                      MODIFIERS
                    </p>
                    {item.selectedOptions.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <p className=" text-[32px] font-[500] text-[#606060]">
                          {option.name}- &#x20A6;
                          {(option.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className=" mt-[10px]">
                  <p className=" font-[500] text-[44px] text-[#000000]">
                    Sub Total: &#x20A6;
                    {item.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center text-[#121212] font-[600] text-[44px]">
          <p className="   ">To Pay:</p>
          <p className=" ">
            &#x20A6; {backetDetails?.totalPrice.toLocaleString()}
          </p>
        </div>
        <div className=" mt-[10px] flex items-center justify-center gap-[16px]">
          <p
            className=" rounded-full cursor-pointer font-[500] text-[32px] text-[#FF0000] py-[11px] px-[20px] border-[3px] border-[#FF0000]"
            onClick={() => navigate(-1)}
          >
            Cancel
          </p>
          <p
            className=" cursor-pointer inline font-[500] text-[32px] rounded-full border-[3px]  bg-[#FF0000] border-[#FF0000] text-white py-[11px] px-[20px]"
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

          <div className=" max-w-[854px] flex flex-col items-center justify-center ">
            <div className=" px-[74px] text-center">
              <p className=" text-[44px] font-[500] text-[#121212] ">
                Add a Tip
              </p>
              <p className=" text-[32px] font-[500] text-[#121212] my-[16px]">
                Thank you
              </p>
              <p className=" text-[32px] font-[500] text-[#121212]">
                {/* Your Subtotal: ₦ {totalPrice ? totalPrice : "0"} */}
              </p>
              <div className=" grid grid-cols-2 items-center gap-[24px] mt-[40px]">
                {tipPercentages.map((tip, index) => (
                  <p
                    key={index}
                    className={`py-[39px] px-[134px] text-center cursor-pointer rounded-[10px] text-[#121212] text-[36px] font-[500] ${
                      selectedPercentage === tip
                        ? "bg-[#FF0000] border border-[#FF0000] text-white"
                        : "border-2 border-[#606060]"
                    }`}
                    onClick={() => handlePercentageClick(tip)}
                  >
                    {(tip * 100).toFixed(1)}%
                  </p>
                ))}

                <p
                  className=" cursor-pointer text-center py-[39px]  border-2 border-[#606060] rounded-[10px] text-[#121212] text-[36px] font-[500]"
                  onClick={handleModal}
                >
                  Custom
                </p>
              </div>
              <div
                className=" mt-[24px] cursor-pointer"
                onClick={handleNoTipClick}
              >
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
                value={customAmount !== null ? customAmount.toString() : ""}
                onChange={handleCustomAmountChange}
              />

              <div className=" mt-[25px]">
                <p
                  className=" px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#FF0000] text-[16px] font-[500] cursor-pointer"
                  onClick={() => setTipModal(false)}
                >
                  Cancel
                </p>
                <p
                  className={`px-[24px] py-[10px] ${
                    !tip ? " bg-[#85C0BE]" : "bg-[#FF0000] cursor-pointer"
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
