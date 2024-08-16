import React, { useEffect, useState, ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartFill from "../assets/baskets.svg";
import CartWhite from "../assets/basketWhite.svg";
import BackArrow from "../assets/arrow-small-left-White.svg";

interface TopMenuNavProps {
  exploreMenuText?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  children?: ReactNode;
}

const OnlineOrderingTopMenuNav: React.FC<TopMenuNavProps> = ({
  exploreMenuText = "Explore Menu",
  bgColor = "#606060",
  textColor = "#FFFFFF",
  borderColor = "#606060",
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = sessionStorage.getItem("ids");
  const [isSticky, setSticky] = useState(false);

  const hideCartOnPaths = [
    "/demo/receipt/online_ordering",
    "/demo/get-receipt/online_ordering",
    "/demo/basket/online_ordering",
    "/demo/payment-type/online_ordering",
    "/demo/tip/online_ordering",
  ];
  const hideCart = hideCartOnPaths.includes(location.pathname);

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
    <div
      className={`${
        isSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
      } z-10 transition-all duration-300 ease-in-out`}
    >
      <div
        className="grid grid-cols-3 items-center py-4 shadow"
        style={{ backgroundColor: bgColor }}
      >
        <div className="justify-self-start">
          <p
            className="text-[16px] font-[500] flex items-center gap-[8px] p-[18px] border-2"
            style={{
              color: textColor,
              borderColor: borderColor,
              borderStyle: "solid",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            <span className="text-4xl" style={{ color: textColor }}>
              <img src={BackArrow} alt="Go back" />
            </span>
          </p>
        </div>
        <div className="col-span-1 justify-self-center">
          <p className="text-[16px] font-[500]" style={{ color: textColor }}>
            {exploreMenuText}
          </p>
        </div>
        <div className="justify-self-end px-4">
          {!hideCart && (
            <Link to="/demo/basket/online_ordering">
              {id && id.length !== 0 ? (
                <img src={CartFill} alt="Cart" />
              ) : (
                <img src={CartWhite} alt="Cart" />
              )}
            </Link>
          )}
        </div>
      </div>
      <div className="bg-transparent">{children}</div>
    </div>
  );
};

export default OnlineOrderingTopMenuNav;
