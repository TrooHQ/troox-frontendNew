import Logo from "../../assets/trooLogo.svg";
import { Button } from "../buttons/Button";
import { Link } from "react-router-dom";
import AddWhite from "../../assets/addWhite.svg";
const MenuSetupForm = () => {
  return (
    <div className=" bg-[#EFEFEF] h-screen">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        <>
          <p className=" text-[#121212] text-[14px] my-[24px]">
            Stage 2/ <span className="text-[20px]"> Menu Setup</span>{" "}
          </p>
          <p className=" text-[#5855B3] text-[14px] font-[400] flex items-center">
            <img src={AddWhite} alt="" />
            Add new menu category
          </p>
          <div className=" grid mt-[32px] gap-[8px]">
            <div className=" bg-[#B6B6B6] text-[16px] font-[500] text-[#ffffff] border  w-full text-center py-3 rounded">
              <p>Save and continue</p>
            </div>
            <Link to="/">
              <button className=" text-[16px] font-[500] text-[#929292] border border-[#B6B6B6] w-full text-center py-3 rounded">
                Cancel
              </button>
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};

export default MenuSetupForm;
