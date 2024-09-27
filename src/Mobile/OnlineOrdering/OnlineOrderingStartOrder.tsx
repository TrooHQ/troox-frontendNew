import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessIdentifier,
  setBusinessDetails,
  setURL,
  setBranchID,
} from "../../slices/businessSlice";
import { RootState } from "../../store/store";
import NotFound from "../NotFound";

const OnlineOrderingStartOrder = () => {
  const location = useLocation();
  const { id, branchId } = useParams();

  const userDetails = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const token = userDetails?.userData?.token;

  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  sessionStorage.setItem("url", fullUrl);

  const business_identifier = id;
  const BranchId = branchId;

  useEffect(() => {
    if (business_identifier && BranchId) {
      dispatch(setBusinessIdentifier(business_identifier));
      dispatch(setBranchID(BranchId));
      dispatch(setURL(fullUrl));
    }

    getBusinessDetails();
  }, [business_identifier, BranchId]);

  const getBusinessDetails = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/business/getBusinessDetails/?business_identifier=${business_identifier}&branch=${BranchId}`,
        headers
      );

      dispatch(setBusinessDetails(response.data.data));
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );

  const color = businessDetails?.colour_scheme;

  if (!business_identifier) {
    return <NotFound />;
  }

  return (
    <div className={`mx-[22px] `} style={{ color: color || "#606060" }}>
      <div className="flex flex-col items-center justify-center mt-[64px]">
        <img
          src={businessDetails?.business_logo}
          alt=""
          className="mb-[10px]"
        />
        <p>
          Welcome to{" "}
          <span className="font-bold">{businessDetails?.business_name}</span>{" "}
          Page
        </p>
        <p className="mt-[24px] text-[16px] font-[400] text-center">
          Food ready in <span className="font-bold">8-13 minutes</span> after
          placing order
        </p>

        <div className="mt-[40px] flex flex-col items-center justify-center">
          <Link
            to={`/demo/${businessDetails?.business_name}/items/online_ordering`}
          >
            <p
              className="cursor-pointer text-[#ffffff] px-[40px] py-[10px] rounded-[5px] font-[500] inline"
              style={{ backgroundColor: color || "#606060" }}
            >
              Start Your Order
            </p>
          </Link>
          <a href="">
            <p
              className={`text-center ${
                color ? `text-[${color}]` : "text-[#606060]"
              } underline text-[16px] mt-[24px]`}
            >
              Click here for menu and nutrition information
            </p>
          </a>

          <p className="italic text-center text-[16px] mt-[32px]">
            By clicking “Start Your Order” you agree to our{" "}
            <a href="">
              <span
                className={`underline ${
                  color ? `text-[${color}]` : "text-[#606060]"
                }`}
              >
                Terms & Conditions
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrderingStartOrder;
