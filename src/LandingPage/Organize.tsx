import POS from "../assets/pointOfSalesImg.png";
import Payment from "../assets/paymentProcessingImg.png";
import KDS from "../assets/kdsImg.png";
import DigitalOrdering from "../assets/digitalOrderingImg.png";
import TableOrdering from "../assets/tableOrderingImg.png";
const Organize = () => {
  return (
    <div className=" bg-white mt-[10px] md:mt-[80px]">
      <p className=" text-center text-[20px] md:text-[24px] font-[500]">
        Organize All Your Tech in One Place
      </p>

      <div className=" md:my-[59px] flex flex-col justify-center items-center md:items-start md:grid md:grid-cols-5 gap-[16px] md:mx-[40px] 2xl:mx-[158px]">
        <div className=" w-[224px] bg-[#EEEEF7] rounded-[5px]">
          <img
            src={POS}
            alt=""
            className=" w-full object-cover rounded-t-[5px]"
          />
          <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
            <p className=" text-[16px] font-[500] text-[#121212]">
              Point of Sale
            </p>
            <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]">
              Fully integrated cash registers & ePOS hardware to withstand the
              rigours of your operations
            </p>
          </div>
        </div>

        <div className=" w-[224px] bg-[#EEEEF7] rounded-[5px]">
          <img
            src={KDS}
            alt=""
            className=" w-full object-cover rounded-t-[5px]"
          />
          <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
            <p className=" text-[16px] font-[500] text-[#121212]">KDS</p>
            <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]">
              Seamlessly connect your front-of-house with the kitchen to ensure
              order accuracy.
            </p>
          </div>
        </div>

        <div className=" w-[224px] bg-[#EEEEF7] rounded-[5px]">
          <img
            src={TableOrdering}
            alt=""
            className=" w-full object-cover rounded-t-[5px]"
          />
          <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
            <p className=" text-[16px] font-[500] text-[#121212]">
              Table Ordering
            </p>
            <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]">
              Empower your wait staff to deliver faster table side ordering with
              troo handhelds.
            </p>
          </div>
        </div>

        <div className=" w-[224px] bg-[#EEEEF7] rounded-[5px]">
          <img
            src={DigitalOrdering}
            alt=""
            className=" w-full object-cover rounded-t-[5px]"
          />
          <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
            <p className=" text-[16px] font-[500] text-[#121212]">
              Digital Ordering
            </p>
            <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]">
              Leverage several digital ordering workflows to accept to in-store
              and online orders.
            </p>
          </div>
        </div>

        <div className=" w-[224px] bg-[#EEEEF7] rounded-[5px]">
          <img
            src={Payment}
            alt=""
            className=" w-full object-cover rounded-t-[5px]"
          />
          <div className=" px-[29px] text-center pt-[16px] pb-[45px]">
            <p className=" text-[16px] font-[500] text-[#121212]">
              Payment Processing
            </p>
            <p className=" text-[12px] font-[400] text-[#121212] leading-[18px] mt-[12px]">
              Payments integrated with your cash register and other touch points
              to ensure no loose ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organize;
