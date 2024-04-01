import Cart from "../assets/basket.svg";
import CartFill from "../assets/basketFill.svg";
import BackArrow from "../assets/arrow-small-left.svg";
import { Link, useNavigate } from "react-router-dom";

interface TopMenuNavProps {
  exploreMenuText?: string;
}

const TopMenuNav: React.FC<TopMenuNavProps> = ({
  exploreMenuText = "Explore Menu",
}) => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("ids");

  return (
    <div>
      <div className="px-[23px] py-[18px] flex items-center justify-between bg-[#EFB519]">
        <img
          src={BackArrow}
          alt="Go back"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <p className="text-[16px] font-[500]">{exploreMenuText}</p>
        <Link to="/basket">
          {id && id.length !== 0 ? (
            <img src={CartFill} alt="Cart" />
          ) : (
            <img src={Cart} alt="Cart" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default TopMenuNav;
