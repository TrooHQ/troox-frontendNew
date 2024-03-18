import Logo from "../assets/trooLogo1.svg";
import Arrow from "../assets/arrow_downward.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseLineIcon, Menu1LineIcon } from "../assets/icons";

const Navbar = () => {
  const [open, setopen] = useState(true);

  return (
    <div className="  py-[35px] lg:mx-[158px] border-b border-[#CBCAE7] grid md:flex items-center justify-between gap-[20px] md:gap-0">
      <div className="">
        <Link to="/home">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div
        className={`md:flex md:items-center text-white font-[400] ${
          !open ? "block" : "hidden"
        }`}
      >
        <ul className=" grid md:flex items-center gap-[20px]">
          <li className=" flex items-center gap-[5px] text-[14px] font-[500] text-[#414141]">
            Troo for{" "}
            <span>
              {" "}
              <img src={Arrow} alt="" />
            </span>
          </li>

          <li className=" flex items-center gap-[5px] text-[14px] font-[500] text-[#414141]">
            Troo for{" "}
            <span>
              {" "}
              <img src={Arrow} alt="" />
            </span>
          </li>
          <li className=" flex items-center gap-[5px] text-[14px] font-[500] text-[#414141]">
            About us
          </li>

          <li className=" flex items-center gap-[5px] text-[14px] font-[500]  py-[8px] px-[16px] bg-[#5955B3] rounded-[5px] text-white">
            Schedule A Demo
          </li>
        </ul>
      </div>
      {open === true ? (
        <div
          className="absolute top-10 right-4 md:hidden cursor-pointer "
          onClick={() => setopen(false)}
        >
          <Menu1LineIcon />
        </div>
      ) : (
        <div
          className="absolute top-10 right-4 md:hidden cursor-pointer "
          onClick={() => setopen(true)}
        >
          <CloseLineIcon />
        </div>
      )}
    </div>
  );
};

export default Navbar;
