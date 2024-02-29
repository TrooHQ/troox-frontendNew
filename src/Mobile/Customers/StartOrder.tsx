import Logo from "../assets/chickenExpressLogo.svg";
const StartOrder = () => {
  return (
    <div className=" mx-[22px]">
      <div className=" flex flex-col items-center justify-center mt-[64px]">
        <img src={Logo} alt="" />
        <p className=" mt-[24px] text-[16px] font-[400]">
          Food ready in 8-13 minutes after placing order
        </p>

        <div className=" mt-[40px] flex flex-col items-center justify-center">
          <p className=" text-grey500 px-[24px] py-[10px] bg-[#EFB519] rounded-[5px] font-[500] inline  ">
            Start Your Order
          </p>
          <p className=" text-purple500 border-b border-b-purple500 text-[16px] mt-[24px]">
            Click here for menu and nutrition information
          </p>

          <p className=" italic text-center text-[16px] mt-[32px]">
            By clicking “Start Your Order” you agree to our{" "}
            <span className="text-purple500 border-b border-b-purple500">
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartOrder;
