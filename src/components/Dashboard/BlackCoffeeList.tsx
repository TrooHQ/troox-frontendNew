import { Link } from "react-router-dom";
import Coffee from "../../assets/coffeeImg.png";
import Add from "../../assets/addWhite.svg";

const BlackCoffeeList = () => {
  return (
    <div>
      <div className=" mt-[16px]">
        <div className=" grid gap-[8px]">
          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
            <div className=" flex gap-[8px]">
              <img src={Coffee} alt="" />
              <div className="">
                <p className=" text-[12px] font-[400] text-grey300">Item</p>
                <p className=" leading-[24px] text-[16px] text-[#121212] font-[500]">
                  Cortado
                </p>
                <p className=" text-[12px] font-[400] text-grey300">
                  Modifier groups (6)
                </p>
              </div>
            </div>
            <div className=" flex">
              <p className=" text-[16px] font-[500] text-[#121212]">
                N1200-N1800
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
            <div className=" flex gap-[8px]">
              <img src={Coffee} alt="" />
              <div className="">
                <p className=" text-[12px] font-[400] text-grey300">Item</p>
                <p className="leading-[24px] text-[16px] text-[#121212] font-[500]">
                  Affogato
                </p>
                <p className=" text-[12px] font-[400] text-grey300">
                  Modifier groups (6)
                </p>
              </div>
            </div>
            <div className=" flex">
              <p className=" text-[16px] font-[500] text-[#121212]">
                N1200-N1800
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
            <div className=" flex gap-[8px]">
              <img src={Coffee} alt="" />
              <div className="">
                <p className=" text-[12px] font-[400] text-grey300">Item</p>
                <p className=" leading-[24px] text-[16px] text-[#121212] font-[500]">
                  Red eye
                </p>
                <p className=" text-[12px] font-[400] text-grey300">
                  Modifier groups (6)
                </p>
              </div>
            </div>
            <div className=" flex">
              <p className=" text-[16px] font-[500] text-[#121212]">
                N1200-N1800
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-[16px] flex items-center justify-end">
          <Link to="/">
            <button className="w-[196px]  px-[16px] py-[8px] font-[500] border border-[#5955B3] rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]">
              <img src={Add} alt="" /> Add Menu Item
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlackCoffeeList;
