import { useSelector } from "react-redux";
// import Logo from "./assets/chickenRepublic.png";
import { RootState } from "../store/store";

const Header = () => {
  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );

  const color = businessDetails?.colour_scheme || "#FF0000";

  return (
    <div>
      <div
        className="h-[236px] flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <img src={businessDetails?.business_logo} alt="Business Logo" />
      </div>
    </div>
  );
};

export default Header;
