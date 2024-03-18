import { useState } from "react";
import Modal from "../Components/Modal";
import Logo from "../assets/chickenExpressLogo.svg";
import { Link } from "react-router-dom";
const StartOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" mx-[22px]">
      <div className=" flex flex-col items-center justify-center mt-[64px]">
        <img src={Logo} alt="" />
        <p className=" mt-[24px] text-[16px] font-[400]">
          Food ready in 8-13 minutes after placing order
        </p>

        <div className=" mt-[40px] flex flex-col items-center justify-center">
          <p
            className=" cursor-pointer text-grey500 px-[24px] py-[10px] bg-[#EFB519] rounded-[5px] font-[500] inline  "
            onClick={() => setIsOpen(true)}
          >
            Start Your Order
          </p>
          <p className=" text-purple500 border-b border-b-purple500 text-[16px] mt-[24px]">
            Click here for menu and nutrition information
          </p>

          <p className=" italic text-center text-[16px] mt-[32px]">
            By clicking “Start Your Order” you agree to our{" "}
            <span className="text-purple500 border-b border-b-purple500">
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div className=" w-[330px] h-[228px] flex flex-col items-center justify-center">
          <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your first name"
          />
          <div className=" mt-[25px]">
            <p
              className=" px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#E16B07] text-[16px] font-[500] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </p>
            <Link to="/explore-menu">
              <p className=" px-[24px] py-[10px] bg-[#EFB519] inline rounded-[5px] text-grey500 text-[16px] font-[500]">
                Submit
              </p>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StartOrder;
