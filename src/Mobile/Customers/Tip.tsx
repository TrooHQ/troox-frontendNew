import TopMenuNav from "./TopMenuNav";
import { Link, useNavigate } from "react-router-dom";

export const Tip = () => {
  const navigate = useNavigate();
  return (
    <div className="  ">
      <TopMenuNav exploreMenuText="Tip" />

      <div className=" mt-[68px] ">
        <div className=" px-[16px] grid gap-[8px] mb-[40px]">
          <p className=" text-center text-[18px] font-[500] text-[#121212]">
            Enter Tip
          </p>
          <div className=" grid grid-cols-3 gap-[8px]">
            <div className=" flex flex-col items-center px-[36px] py-[8px] border border-[#B6B6B6] rounded-[3px]">
              <p className=" text-[#121212] text-[16px] font-[500]">10%</p>
              <p className=" text-[14px] text-[#121212] font-[400]">#510</p>
            </div>
            <div className=" flex flex-col items-center px-[36px] py-[8px] border border-[#B6B6B6] rounded-[3px]">
              <p className=" text-[#121212] text-[16px] font-[500]">12.5%</p>
              <p className=" text-[14px] text-[#121212] font-[400]">#640</p>
            </div>{" "}
            <div className=" flex flex-col items-center px-[36px] py-[8px] border border-[#B6B6B6] rounded-[3px]">
              <p className=" text-[#121212] text-[16px] font-[500]">15%</p>
              <p className=" text-[14px] text-[#121212] font-[400]">#765</p>
            </div>
          </div>
        </div>

        <div className=" flex  items-center justify-center">
          <label htmlFor="">#</label>
          <input
            className="border-b border-[#929292] outline-none focus:border-grey500 pb-[8px] text-center"
            type="text"
            placeholder="Custom Amount"
          />
        </div>

        <div className=" mt-[60px] flex items-center justify-center gap-[16px]">
          <p
            className=" cursor-pointer font-[500] text-[16px] py-[10px] px-[24px]"
            onClick={() => navigate(-1)}
          >
            No Tip
          </p>
          <Link to="/payment-type">
            <p className=" inline font-[500] text-[16px] rounded-[5px] text-[#121212] bg-[#EFB519] py-[10px] px-[56px]">
              Add Tip
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
