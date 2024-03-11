import TopMenuNav from "./TopMenuNav";
import { Link, useNavigate } from "react-router-dom";

export const Basket = () => {
  const navigate = useNavigate();
  return (
    <div className=" ">
      <TopMenuNav exploreMenuText="Basket" />

      <div className=" mt-[68px] ">
        <div className=" mx-[24px] border-b pb-[16px] border-[#E7E7E7]">
          <div className=" px-[16px] grid gap-[8px]">
            <div className=" flex items-center justify-between">
              <p className=" text-[16px] text-[#121212] font-[500]">Tacos</p>
              <p className=" text-[16px] text-[#121212] font-[400]">#1,500</p>
            </div>

            <div className=" pl-[8px]">
              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">
                  Chicken Fillet
                </p>
                <p className=" text-[16px] text-[#121212] font-[400]">#500</p>
              </div>

              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">Bacon</p>
                <p className=" text-[16px] text-[#121212] font-[400]">#500</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-[24px] border-b py-[16px] border-[#E7E7E7]">
          <div className=" px-[16px] grid gap-[8px]">
            <div className=" flex items-center justify-between">
              <p className=" text-[16px] text-[#121212] font-[500]">Sandwich</p>
              <p className=" text-[16px] text-[#121212] font-[400]">#1,300</p>
            </div>

            <div className=" pl-[8px]">
              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">
                  Chicken Fillet
                </p>
                <p className=" text-[16px] text-[#121212] font-[400]">#500</p>
              </div>

              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">
                  Extra Tomatoes
                </p>
                <p className=" text-[16px] text-[#121212] font-[400]">#500</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-[24px] border-b py-[16px] border-[#E7E7E7]">
          <div className=" px-[16px] grid gap-[8px]">
            <div className=" flex items-center justify-between">
              <p className=" text-[16px] text-[#121212] font-[500]">
                Sausage Muffins
              </p>
              <p className=" text-[16px] text-[#121212] font-[400]">#800</p>
            </div>

            <div className=" pl-[8px]">
              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">
                  Extra Tomatoes
                </p>
                <p className=" text-[16px] text-[#121212] font-[400]">#0</p>
              </div>

              <div className=" flex items-center justify-between">
                <p className=" text-[16px] text-[#121212] font-[400]">
                  Extra Tomatoes
                </p>
                <p className=" text-[16px] text-[#121212] font-[400]">#500</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-[16px] mx-[24px] ">
          <div className="flex items-center justify-between">
            <p className=" text-[16px] text-[#121212] font-[500]">Total:</p>
            <p className=" text-[16px] text-[#121212] font-[500]">#5,100</p>
          </div>

          <div className=" mt-[60px] flex items-center justify-center gap-[16px]">
            <p
              className=" cursor-pointer font-[500] text-[16px] text-[#E16B07] py-[10px] px-[24px]"
              onClick={() => navigate(-1)}
            >
              Cancel
            </p>
            <Link to="/tip">
              <p className=" inline font-[500] text-[16px] rounded-[5px] text-[#121212] bg-[#EFB519] py-[10px] px-[24px]">
                Proceed to Pay
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
