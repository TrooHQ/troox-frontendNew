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
import BarMobile from "../../assets/BarMobile.png";
import Overlay from "../../assets/GreyOverlay.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const LoungesPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className=" relative">
      <Navbar />
      <div className="">
        <img
          src={Circle}
          alt=""
          className="hidden md:block fixed top-0 left-0 w-[100%] -z-50"
        />
        <img
          src={Overlay}
          alt=""
          className=" md:hidden fixed top-0 left-0 w-[100%] -z-50"
        />
      </div>

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] md:py-[62px]">
        <div className=" flex flex-col justify-center gap-[32px] md:gap-[10px] md:flex items-center md:flex-row md:justify-between md:mt-[100px] ">
          <div
            className=" max-w-[278px]  text-center md:mx-0 md:max-w-[409px] md:text-start grid gap-[16px] md:gap-[32px]"
            data-aos="fade-up"
          >
            <p className=" text-[24px] md:text-[44px] font-[500]  leading-[31px] md:leading-[66px]">
              Boost the profit of your bar
            </p>
            <p className=" text-[14px] md:text-[16px] font-[400] text-[#000000] leading-[24px]">
              User-friendly and intuitive software, designed to enhance
              efficiency, improve customer experience, and increase
              profitability in your business.
            </p>

            <div className=" flex  items-center justify-center md:justify-normal gap-[20px] mb-[22px] md:mb-0">
              <p className="  inline text-[14px]  py-[6px] px-[8px] md:py-[10px] md:px-[24px] bg-[#E7E7E7] rounded-[10px] text-[#000000] font-[400]">
                Grow Revenue
              </p>
              <p className="  inline text-[14px] py-[6px] px-[8px] md:py-[10px] md:px-[24px] bg-[#E7E7E7] rounded-[10px] text-[#000000] font-[400]">
                Motivate Staff
              </p>
            </div>
            <div className=" flex items-center justify-center md:justify-normal">
              <Link to="/request-demo">
                <p className=" inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#5955B3] rounded-[5px] text-white">
                  Learn More
                </p>
              </Link>
            </div>
          </div>

          <div className=" max-w-[652px] mx-auto md:mx-0" data-aos="fade-up">
            <img src={Lounge} alt="" className=" hidden md:block" />
            <img src={BarMobile} alt="" className=" md:hidden" />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-[10px] md:mx-[40px] lg:mx-[158px] md:py-[88px]">
        <div className=" flex flex-col items-center justify-center gap-[20px] md:flex  md:flex-row md:items-center md:justify-between mt-[100px] ">
          <div
            className="max-w-[250px] md:max-w-[409px] mx-auto md:mx-0 text-center md:text-start grid gap-[32px]"
            data-aos="fade-up"
          >
            <p className="  text-[18px] md:text-[36px] font-[500] leading-[25px] md:leading-[47px] ">
              Troo solutions for your Club/Lounges
            </p>

            <div className="hidden md:flex items-center">
              <Link to="/request-demo">
                <p className=" inline text-[14px] font-[500]  py-[10px] px-[24px] bg-[#5955B3] rounded-[5px] text-white">
                  Learn More
                </p>
              </Link>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-[16px]" data-aos="fade-up">
            <div className=" md:px-[20px] md:border-l md:border-b">
              <img src={Restaurant1} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px] pb-[32px]">
                ePOS Cash Register
              </p>
            </div>
            <div className=" md:px-[20px] md:border-l md:border-b">
              <img src={Restaurant2} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px] pb-[32px]">
                Order At Table
              </p>
            </div>
            <div className=" md:px-[20px] md:border-l md:pt-[32px]">
              <img src={Restaurant3} alt="" />
              <p className=" text-[16px] font-[400] text-[#000000] pt-[20px]">
                Hand-held
              </p>
            </div>
            <div className="md:px-[20px] md:border-l md:pt-[32px]">
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
