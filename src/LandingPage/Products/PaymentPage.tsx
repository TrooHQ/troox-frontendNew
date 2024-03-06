import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import Phones from "../../assets/PaymentProcessImage.png";
import Consistent from "../../assets/consistent rate.svg";
import Instore from "../../assets/instore.svg";
import OnTheGo from "../../assets/on the go.svg";
import online from "../../assets/online.svg";
import PaymentOption from "../../assets/payment option.svg";
import PhoneOrdering from "../../assets/phone ordering.svg";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";

const PaymentPage = () => {
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
        <div className=" max-w-[736px] mx-auto text-center mt-[100px]">
          <p className=" text-[14px] font-[400] text-[#5855B3]">
            PRODUCTS/PAYMENT PROCESSING
          </p>
          <p className=" text-[44px] font-[500] mb-[25px]">
            Receive Payments Faster & Smarter
          </p>
          <p className=" text-[18px] font-[400] text-[#414141] leading-[28px]">
            Get money into your account from every customer and every order.
            Through our payment processing system, your customers can pay
            through a simple checkout flow.
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
                <img src={PaymentOption} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Flexible Payment Options
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Give your customers many ways to pay via cash, terminals,
                contactless NFC, transfer, online, etc.
              </p>
            </div>

            <div className="h-[243px]  md:border-b md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Instore} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  In-Store
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo in-store smart payment terminals offers more control and
                convenience over payment, tipping, and receipt op- tions so your
                waiters can focus more on service delivery.
              </p>
            </div>
            <div className="h-[243px]  md:border-b  px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={OnTheGo} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  On the Go
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo Go terminals offer payment process- ing options whether you
                are on the shop floor or on delivery runs.
              </p>
            </div>
            <div className=" h-[243px] md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={online} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">Online</p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Seamless online payment options for your business’ online
                ordering flows.
              </p>
            </div>
            <div className=" h-[243px] md:border-r px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={PhoneOrdering} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Phone Ordering
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                Troo virtual terminals lets you take orders and card payments on
                your computer, tablet, or device via a web browser.
              </p>
            </div>

            <div className=" h-[243px]   px-[30px] pt-[51px] pb-[59px]">
              <div className=" flex items-center gap-[24px] ">
                <img src={Consistent} alt="" />
                <p className=" text-[20px] font-[500] text-[#5855B3]">
                  Consistent Rates
                </p>
              </div>
              <p className=" mt-[35px] font-[400] text-[16px] text-[#414141]">
                We offer consistent rates across all cards that won't hurt your
                business.
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

export default PaymentPage;
