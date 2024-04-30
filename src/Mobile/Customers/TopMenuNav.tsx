import CartFill from "../assets/baskets.svg";
import CartWhite from "../assets/basketWhite.svg";
import BackArrow from "../assets/arrow-small-left-White.svg";
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
      <div className="px-[23px] py-[18px] flex items-center justify-between bg-[#0B7F7C]">
        <img
          src={BackArrow}
          alt="Go back"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <p className="text-[16px] font-[500] text-white">{exploreMenuText}</p>
        <Link to="/basket">
          {id && id.length !== 0 ? (
            <img src={CartFill} alt="Cart" />
          ) : (
            <img src={CartWhite} alt="Cart" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default TopMenuNav;
