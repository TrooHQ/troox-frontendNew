import React from "react";
import KantaLogo from "../../../assets/trooLogo1.svg";
import { Link } from "react-router-dom";

const SelectModuleComp = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div className=" mb-[40px]">
        <Link to="/">
          <img src={KantaLogo} alt="" />
        </Link>
      </div>
      <div className="">
        <h5 className="text-[#121212] text-xl font-light mb-6">
          Choose which module your wish to log into
        </h5>
        <div className="flex flex-col gap-6 w-[60%] m-auto">
          <Link className="" to="/till/cash-register">
            <button className="text-base font-normal border border-[#5955b3] rounded-[5px] bg-[#5955b3] px-6 py-2.5 text-white w-[100%] m-auto">
              Cash Register
            </button>
          </Link>
          <Link className="" to="/till/kds">
            <button className="text-base font-normal border border-[#5955b3] rounded-[5px] bg-[#5955b3] px-6 py-2.5 text-white w-[100%] m-auto">
              KDS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectModuleComp;
