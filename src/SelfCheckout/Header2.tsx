import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../SelfCheckout/assets/Back.svg";
import MiniLogo from "../SelfCheckout/assets/image121.png";

interface Header2Props {
  children?: ReactNode;
  onClick?: (navigate: (path: number) => void) => void;
  BG?: string;
}

const Header2: React.FC<Header2Props> = ({
  children,
  onClick = (navigate) => navigate(-1),
  BG = "#ffffff",
}) => {
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerStyle = {
    backgroundColor: BG,
  };

  return (
    <div>
      <div
        className={`${
          isSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
        } z-10 transition-all duration-300 ease-in-out`}
        style={containerStyle}
      >
        <div className="grid grid-cols-3 items-center py-4 shadow">
          <div className="justify-self-start px-4">
            <img
              src={Back}
              alt="Back"
              onClick={() => onClick(navigate)}
              className="cursor-pointer"
            />
          </div>
          <div className="col-span-1 justify-self-center">
            <img src={MiniLogo} alt="Logo" />
          </div>
          <div className="justify-self-end px-4"></div>
        </div>
        {children && <div className=" ">{children}</div>}
      </div>
    </div>
  );
};

export default Header2;
