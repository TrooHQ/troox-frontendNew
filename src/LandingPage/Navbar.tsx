import Logo from "../assets/trooLogo1.svg";
import Arrow from "../assets/arrow_downward.svg";
const Navbar = () => {
  return (
    <div className=" py-[35px] lg:mx-[158px] border-b border-[#CBCAE7] grid md:flex items-center justify-between">
      <div className="">
        <img src={Logo} alt="" />
      </div>
      <div className="">
        <ul className=" flex items-center gap-[10px]">
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
            Troo for{" "}
            <span>
              {" "}
              <img src={Arrow} alt="" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
