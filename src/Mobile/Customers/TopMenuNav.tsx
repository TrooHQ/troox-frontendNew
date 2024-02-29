import Cart from "../assets/basket.svg";
import BackArrow from "../assets/arrow-small-left.svg";
import { useNavigate } from "react-router-dom";

const TopMenuNav = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-[23px] py-[18px] flex items-center justify-between bg-[#EFB519]">
        <img
          src={BackArrow}
          alt="Go back"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <p className="text-[16px] font-[500]">Explore Menu</p>
        <img src={Cart} alt="Cart" />
      </div>
    </div>
  );
};

export default TopMenuNav;
