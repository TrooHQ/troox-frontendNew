import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import MiniLogo from "../SelfCheckout/assets/image121.png";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface Header2Props {
  children?: ReactNode;
  onClick?: (navigate: (path: number) => void) => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Header2: React.FC<Header2Props> = ({
  children,
  onClick = (navigate) => navigate(-1),
  bgColor = "#ffffff",
  textColor = "#000000",
  borderColor = "#606060",
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

  return (
    <div>
      <div
        className={`${
          isSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
        } z-10 transition-all duration-300 ease-in-out`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="grid grid-cols-3 items-center py-4 shadow">
          <div className="justify-self-start">
            <p
              className="text-[28px] font-[500] flex items-center gap-[8px] p-[18px] border-2"
              style={{
                color: textColor,
                borderColor: borderColor,
                borderStyle: "solid",
              }}
              onClick={() => onClick(navigate)}
            >
              <span className="text-6xl" style={{ color: textColor }}>
                <MdKeyboardArrowLeft />
              </span>
              Back
            </p>
          </div>
          <div className="col-span-1 justify-self-center">
            <img src={MiniLogo} alt="Logo" />
          </div>
          <div className="justify-self-end px-4"></div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Header2;
