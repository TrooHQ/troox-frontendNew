import Arrow from "../assets/BackArrow.svg";
import DashboardBackButton from "../Buttons/DashboardBackButton";
import MenuTab from "./MenuTab";

const Menu = () => {
  return (
    <div className="my-[16px] mx-[24px]">
      <DashboardBackButton text="Menu" img={Arrow} />
      <div className=" mt-[24px]">
        <MenuTab />
      </div>
    </div>
  );
};

export default Menu;
