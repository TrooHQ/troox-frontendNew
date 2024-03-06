import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import Phones from "../../assets/phones.jpg";
import QRCode from "../../assets/QR code.svg";
import Star from "../../assets/star_outline.svg";
import Synchronize from "../../assets/synchronize 2.svg";
import optimize from "../../assets/optimize.svg";
import Order from "../../assets/order 2.svg";
import Trending from "../../assets/trending_up.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";

const TableOrderingPage = () => {
  return (
    <div className=" relative">
      <Navbar />
      <div className="">
        <img
          src={Circle}
          alt=""
          className="hidden md:block absolute top-0 left-0 w-[1132px] -z-50"
        />
      </div>

      <div className="">
        <div className=" max-w-[625px] mx-auto text-center mt-[100px]">
          <p className=" text-[14px] font-[400] text-[#5855B3]">
            PRODUCTS/TABLE ORDERING
          </p>
          <p className=" text-[44px] font-[500] mb-[25px]">
            Order From Anywhere In-Store
          </p>
          <p className=" text-[18px] font-[400] text-[#414141] leading-[28px]">
            Avoid the long queues at the counter. Get your customers to place an
            order from anywhere in your building by simply scanning the QR code
            at the table. Works for restaurants, works for hotels, and works for
            your business.
          </p>
          <p className=" text-[18px] font-[400] text-[#414141] my-[32px]">
            Book a demo TODAY to learn how this works for your business.
          </p>
          <p className="  inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#5955B3] rounded-[5px] text-white">
            Schedule A Demo
          </p>
        </div>

        <div className=" max-w-[835px] mx-auto mt-[56px]">
          <img src={Phones} alt="" />
        </div>

        <div className="">
          <div className=" mt-[20px] md:my-[59px] flex flex-col justify-center items-start md:items-start md:grid md:grid-cols-3 md:mx-[40px] 2xl:mx-[158px]">
            <div className="h-[243px]  md:border-b md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={QRCode} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Order via QR Code
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                The customer scans the QR and directly sees the menu associated
                with their table.
              </p>
            </div>

            <div className="h-[243px]  md:border-b md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Order} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Order From the Menu
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                The customer navigates through your digital menu and chooses the
                products they want to order, without waiting.
              </p>
            </div>
            <div className="h-[243px]  md:border-b  px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Synchronize} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Synchronized with your System
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Orders automatically arrive at printers, POS and order takers.
              </p>
            </div>
            <div className=" h-[243px] md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Trending} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Increase Turnover
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Ramp up orders
              </p>
            </div>
            <div className=" h-[243px] md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Star} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  The Best Experience
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Don’t leave the customer with their hand raised.
              </p>
            </div>

            <div className=" h-[243px]   px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={optimize} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Optimize your Business
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Get the most performance and profitability
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingPageFAQ />
      <Blog />
      <Footer />
    </div>
  );
};

export default TableOrderingPage;
