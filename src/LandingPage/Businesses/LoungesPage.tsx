import Navbar from "../Navbar";
import Circle from "../../assets/greyCircle.svg";
import Lounge from "../../assets/Lounges.png";
import Restaurant1 from "../../assets/troo for restaurant img 1.png";
import Restaurant2 from "../../assets/troo for restaurant img 2.png";
import Restaurant3 from "../../assets/troo for bar img 2.png";
import Restaurant4 from "../../assets/troo for bar.png";
import LandingPageFAQ from "../LandingPageFAQ";
import Blog from "../Blog";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const LoungesPage = () => {
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

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] py-[62px]">
        <div className=" grid gap-[10px] md:flex items-center justify-between md:mt-[100px] ">
          <div className=" max-w-[409px] text-start grid gap-[32px]">
            <p className=" text-[44px] font-[500] leading-[66px]">
              Boost the profit of your bar
            </p>
            <p className=" text-[16px] font-[400] text-[#000000] leading-[24px]">
              User-friendly and intuitive software, designed to enhance
              efficiency, improve customer experience, and increase
              profitability in your business.
            </p>

            <div className=" flex  items-center gap-[20px]">
              <p className="  inline text-[14px]  py-[10px] px-[24px] bg-[#E7E7E7] rounded-[10px] text-[#000000] font-[400]">
                Grow Revenue
              </p>
              <p className="  inline text-[14px]  py-[10px] px-[24px] bg-[#E7E7E7] rounded-[10px] text-[#000000] font-[400]">
                Motivate Staff
              </p>
            </div>
            <div className=" flex items-center">
              <Link to="/request-demo">
                <p className=" inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#5955B3] rounded-[5px] text-white">
                  Learn More
                </p>
              </Link>
            </div>
          </div>

          <div className=" max-w-[652px]">
            <img src={Lounge} alt="" />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] py-[88px]">
        <div className=" grid gap-[20px] md:flex items-center justify-between mt-[100px] ">
          <div className=" max-w-[409px] text-start grid gap-[32px]">
            <p className=" text-[36px] font-[500] leading-[47px]">
              Troo solutions for your Club/Lounges
            </p>

            <div className=" flex items-center">
              <Link to="/request-demo">
                <p className=" inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#5955B3] rounded-[5px] text-white">
                  Learn More
                </p>
              </Link>
            </div>
          </div>

          <div className=" flex flex-col items-center md:grid md:grid-cols-2">
            <div className=" px-[20px] md:border-l md:border-b">
              <img src={Restaurant1} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px] pb-[32px]">
                ePOS Cash Register
              </p>
            </div>
            <div className=" px-[20px] md:border-l md:border-b">
              <img src={Restaurant2} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px] pb-[32px]">
                Order At Table
              </p>
            </div>
            <div className=" px-[20px] md:border-l pt-[32px]">
              <img src={Restaurant3} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px]">
                Hand-held
              </p>
            </div>
            <div className="px-[20px] md:border-l pt-[32px]">
              <img src={Restaurant4} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px]">
                Tips
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

export default LoungesPage;
