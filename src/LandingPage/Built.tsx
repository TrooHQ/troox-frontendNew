import Icon1 from "../assets/icon 1.svg";
import Icon2 from "../assets/icon 2.svg";
import Icon3 from "../assets/icon 3.svg";
import Icon4 from "../assets/icon 4.svg";
import Icon5 from "../assets/icon 5.svg";
import Icon6 from "../assets/icon 6.svg";

const Built = () => {
  return (
    <div className=" bg-white mt-[20px] md:mt-[80px]">
      <p className=" text-center text-[20px] md:text-[24px] font-[500]">
        Built To Help Your Business Succeed
      </p>

      <div className=" mt-[20px] md:my-[59px] flex flex-col justify-center items-center md:items-start md:grid md:grid-cols-3 gap-[8px] md:mx-[40px] 2xl:mx-[158px]">
        <div className="h-[243px]  border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon1} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              24/7 Support
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            Expert service support team to ensure you get the help you need when
            you need it.
          </p>
        </div>

        <div className=" h-[243px]  border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon2} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              Built-in Tools
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            Whatever your need or current set up, our team will configure troo
            and the right tools to set you up for success.
          </p>
        </div>
        <div className="h-[243px]  border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon3} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              Analytics & Reporting
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            Login from your PC or phone from anywhere to track your business
            performance indicators like sales, orders, etc.
          </p>
        </div>
        <div className="h-[243px]  border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon4} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              Team Friendly
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            Keep tabs on your team's performance, offer incentives, manage
            schedules and set user roles and privileges.
          </p>
        </div>
        <div className=" h-[243px] border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon5} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              Next Day Deposits
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            All processed payments get deposited into your business account
            without delays.
          </p>
        </div>
        <div className=" h-[243px] border px-[30px] pt-[51px] pb-[59px]">
          <div className=" flex items-center gap-[24px] ">
            <img src={Icon6} alt="" />
            <p className=" text-[20px] font-[500] text-[#5855B3]">
              Troo Capital
            </p>
          </div>
          <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
            Troo wallet helps you plan, save and get access to business
            operations loans for growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Built;
