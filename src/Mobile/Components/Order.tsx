import Arrow from "../assets/BackArrow.svg";
import DashboardBackButton from "../Buttons/DashboardBackButton.tsx";
import OrderTab from "./OrderTab";

const Order = () => {
  return (
    <div className="my-[16px] mx-[24px]">
      <DashboardBackButton text="Orders" img={Arrow} />
      <div className=" mt-[24px]">
        <OrderTab />
      </div>
    </div>
  );
};

export default Order;
