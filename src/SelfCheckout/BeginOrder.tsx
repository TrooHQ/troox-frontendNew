import HeroImage from "./assets/rice_.png";
import Visa from "./assets/visa.png";
import Mastercard from "./assets/mastercard.png";
import Header from "./Header";
import CustomInput from "../Mobile/inputFields/CustomInput";

import { useState } from "react";
import { Link } from "react-router-dom";
const BeginOrder = () => {
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const [number, setNumber] = useState("");
  const [isTableOpen, setTableIsOpen] = useState(false);

  const handleNext = () => {
    setIsOpen(false);
    setTableIsOpen(true);
  };
  return (
    <div>
      <Header />
      {!isOpen && !isTableOpen && (
        <>
          <div className="">
            <img src={HeroImage} alt="" className=" w-full" />
          </div>

          <div className=" mt-[69px] max-w-[574px] mx-auto">
            <p
              className=" cursor-pointer text-[32px] font-[500] text-white px-[48px] py-[37px] bg-[#0B7F7C] inline-flex rounded-full"
              onClick={() => setIsOpen(true)}
            >
              TOUCH HERE TO BEGIN ORDER
            </p>
            <div className=" flex items-center justify-between mt-[61px]">
              <img src={Mastercard} alt="" />
              <img src={Visa} alt="" />
            </div>
          </div>
        </>
      )}

      {isOpen && (
        <div className="">
          <div className=" max-w-[818px]  mx-auto mt-[200px]">
            <label htmlFor="" className=" font-[500] text-[40px]">
              Enter your first name and last name initial.
            </label>
            <div className="mt-[50px] mb-[100px]">
              <CustomInput
                type="text"
                label="Enter your first name and last name iniital"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />
            </div>

            <div className=" flex items-center justify-center">
              <p
                className={` px-[120px] py-[37px] ${
                  !name ? " bg-[#85C0BE]" : "bg-[#0B7F7C] cursor-pointer"
                } rounded-full inline-flex text-white text-center`}
                onClick={name ? handleNext : undefined}
              >
                DONE
              </p>
            </div>
            <p className=" text-[32px] font-[400] text-black mt-[40px]">
              You will receive a text message when your order is ready
            </p>
          </div>
        </div>
      )}

      {isTableOpen && (
        <div className="">
          <div className=" max-w-[818px]  mx-auto mt-[200px]">
            <label htmlFor="" className=" font-[500] text-[40px]">
              Enter your phone number
            </label>
            <div className="mt-[50px] mb-[100px]">
              <CustomInput
                type="number"
                label=""
                value={number}
                onChange={(newValue) => setNumber(newValue)}
              />
            </div>

            <div className=" flex items-center justify-center gap-[24px]">
              {" "}
              <p
                className={` px-[99px] py-[37px] text-[32px] font-[500] text-[#B6B6B6]  border-[3px]  border-[#B6B6B6] cursor-default rounded-full inline-flex text-center`}
              >
                CANCEL
              </p>
              <Link to="/menu">
                <p
                  className={` px-[99px] py-[37px] text-[32px] font-[500] ${
                    !number ? " bg-[#B6B6B6]" : "bg-[#0B7F7C] cursor-pointer"
                  } rounded-full inline-flex text-white text-center`}
                  // onClick={name ? handleNext : undefined}
                >
                  CONTINUE
                </p>
              </Link>
            </div>
            <p className=" text-[32px] font-[400] text-black mt-[40px]">
              You will receive a text message when your order is ready
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeginOrder;
