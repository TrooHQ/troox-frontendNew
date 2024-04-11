import { useNavigate } from "react-router-dom";
import Arrow from "../assets/BackArrow.svg";
import OrderTab from "./OrderTab";

const Order = () => {
  const navigate = useNavigate();

  return (
    <div className="my-[16px] mx-[24px]">
      <div
        onClick={() => navigate(-1)}
        className=" inline-flex items-center gap-[20px] cursor-pointer"
      >
        <img src={Arrow} alt="" />
        <p className=" font-[500] text-[20px] text-grey500 cursor-pointer">
          Orders
        </p>
      </div>
      <div className=" mt-[24px]">
        <OrderTab />
      </div>
    </div>
  );
};

export default Order;
