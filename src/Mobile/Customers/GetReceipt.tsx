import TopMenuNav from "./TopMenuNav";
import { Link } from "react-router-dom";
import Logo from "../assets/chickenExpressLogo.svg";
export const GetReceipt = () => {
  return (
    <div className="  ">
      <TopMenuNav exploreMenuText="Select Payment" />

      <div className=" mt-[68px] mx-[16px] ">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>{" "}
        <div className=" mt-[40px]">
          <p className=" text-[18px] font-[500] text-[#121212] text-center">
            Thank you!
          </p>

          <div className=" py-[23px] px-[17px]  mt-[16px] ">
            <p className=" text-[#121212] text-[14px] font-[400] text-center">
              Your order #115 <br /> at Chicken Express is being processed
            </p>
            <p className="  text-[#121212] text-[14px] font-[500] text-center mt-[24px]">
              ETA - Less 15 mins
            </p>
          </div>
        </div>
        <div className="grid gap-[16px] items-center justify-center">
          <Link to="/start-order">
            <div className=" flex items-center justify-center">
              <p className="bg-[#EFB519] rounded-[5px] py-[10px] px-[24px] text-center cursor-pointer inline text-[16px] font-[500] text-[#121212]">
                Get an eReceipt
              </p>
            </div>
          </Link>
          <Link to="/start-order">
            <div className=" flex items-center justify-center">
              <p className=" border border-[#E16B07] rounded-[5px] py-[10px] px-[41px] text-center cursor-pointer inline text-[16px] font-[500] text-[#121212]">
                Order more
              </p>
            </div>
          </Link>
        </div>
        <div className=" py-[23px] px-[17px]  mt-[16px] ">
          <p className=" text-[#121212] text-[14px] font-[400] text-center">
            Do not close this webpage - you will need it as your proof of
            purchase (you can take a sceenshot)
          </p>
        </div>
      </div>
    </div>
  );
};
