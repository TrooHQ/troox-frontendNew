import { useState } from "react";
import Modal from "../Components/Modal";
import Logo from "../assets/Restaurant_Logo.svg";
import { Link } from "react-router-dom";

const StartOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTableOpen, setTableIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [table, setTable] = useState("");

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTable(event.target.value);
  };

  const handleNext = () => {
    setIsOpen(false);
    setTableIsOpen(true);
  };
  return (
    <div className=" mx-[22px] ">
      <div className=" flex flex-col items-center justify-center mt-[64px]">
        <img src={Logo} alt="" />
        <p className=" mt-[24px] text-[16px] font-[400] text-center">
          Food ready in <span className=" font-bold">8-13 minutes</span> after
          placing order
        </p>

        <div className=" mt-[40px] flex flex-col items-center justify-center">
          <p
            className=" cursor-pointer text-[#ffffff] px-[40px] py-[10px] bg-[#0B7F7C] rounded-[5px] font-[500] inline  "
            onClick={() => setIsOpen(true)}
          >
            Start Your Order
          </p>
          <a href="">
            <p className=" text-center text-[#0B7F7C] underline  text-[16px] mt-[24px]">
              Click here for menu and nutrition information
            </p>
          </a>

          <p className=" italic text-center text-[16px] mt-[32px]">
            By clicking “Start Your Order” you agree to our{" "}
            <a href="">
              <span className="text-[#0B7F7C]  underline">
                Terms & Conditions
              </span>
            </a>
          </p>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div className=" w-[330px] h-[228px] flex flex-col items-center justify-center">
          <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your first name"
            value={userName}
            onChange={handleUserNameChange}
          />
          <div className=" mt-[25px]">
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
          </div>
        </div>
      </Modal>
      <Modal isOpen={isTableOpen}>
        <div className=" w-[330px] h-[228px] flex flex-col items-center justify-center">
          <input
            className="border-b border-grey500 outline-none focus:border-grey500 w-full pb-[36px] text-center"
            type="text"
            placeholder="Enter your table number"
            value={table}
            onChange={handleTableChange}
          />
          <div className=" mt-[25px]">
            <p
              className=" px-[24px] py-[10px] bg-none inline rounded-[5px] text-[#0B7F7C] text-[16px] font-[500] cursor-pointer"
              onClick={() => setTableIsOpen(false)}
            >
              Cancel
            </p>
            <Link to="/explore-menu">
              <p
                className={`px-[24px] py-[10px] ${
                  !table ? " bg-[#85C0BE]" : "bg-[#0B7F7C]"
                } inline rounded-[5px] text-[#ffffff] text-[16px] font-[500]`}
              >
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
