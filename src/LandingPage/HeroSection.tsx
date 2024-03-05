import Mockup from "../assets/Mockups.svg";

const HeroSection = () => {
  return (
    <div className=" grid md:flex items-center justify-between mt-[83px] ml-[40px] lg:ml-[230px] max-w-[1440px]">
      <div className=" max-w-[409px]">
        <p className=" text-[#121212] text-[44px] font-[500]">
          Operating system built for your hospitality business
        </p>
        <p className=" my-[32px] text-[18px] font-[400] text-[#414141]">
          Delight your customers and boost your bottom line with our intuitive
          software.
        </p>
        <p className="  px-[24px] py-[10px] bg-[#5955B3] text-white rounded-[5px] inline cursor-pointer z-50">
          Learn More
        </p>
      </div>

      <div className="">
        <img src={Mockup} alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
