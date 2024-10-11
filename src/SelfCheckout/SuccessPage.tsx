import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessPage = () => {
  const orderId = sessionStorage.getItem("orderId");

  const url = sessionStorage.getItem("url");

  const color = useSelector(
    (state: RootState) => state.business?.businessDetails?.colour_scheme
  );

  return (
    <div className="">
      <div className=" text-black mt-[100px] max-w-[600px] mx-auto space-y-[16px] text-center">
        <div className="flex items-center justify-center relative mb-[50px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[150px] h-[150px] rounded-full animate-ping border-2 border-green-500"></div>
          </div>
          <FaCircleCheck className="text-[100px] relative z-10 text-green-500" />
        </div>

        <p className="text-[30px] font-[500]">Thank you!</p>
        <p className="text-[30px] font-[500]">
          Please, Kindly Find your{" "}
          <span
            className=" font-bold"
            style={{
              color: color,
            }}
          >
            Collection Number
          </span>{" "}
          below and Present it at collection point
        </p>

        <div className="">
          <p className="text-[30px] font-[500]">
            Your Collection Number is:
            <span
              className=" font-bold"
              style={{
                color: color,
              }}
            >
              {" "}
              {orderId}
            </span>
          </p>
        </div>
      </div>

      <div
        className=" mt-[100px] flex items-center justify-center "
        onClick={() => {
          setTimeout(() => {
            window.location.href = `${url}`;
          }, 1000);
        }}
      >
        <div
          className="text-white text-center  rounded-[8px]"
          style={{
            backgroundColor: color,
          }}
        >
          <p className="text-[40px] font-[500] px-[10px] py-[10px] ">
            Continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
