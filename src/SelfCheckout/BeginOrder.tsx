// import HeroImage from "./assets/selfCheckDisplayImg.png";
import Visa from "./assets/visa.png";
import Mastercard from "./assets/mastercard.png";
import Verve from "./assets/verve.png";
import FastOrdering from "./assets/fast-food value.svg";
import selfOrdering from "./assets/self order-food.svg";
import Queue from "./assets/queue.svg";
import Header from "./Header";
import CustomInput from "../Mobile/inputFields/CustomInput";

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerName } from "../slices/BasketSlice";
import {
  setBranchID,
  setBusinessDetails,
  setBusinessIdentifier,
  setGroupName,
  setURL,
} from "../slices/businessSlice";

import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import Header2 from "./Header2";
import { RootState } from "../store/store";
const BeginOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTableOpen, setTableIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { id, branchId } = useParams();

  const [number, setNumber] = useState("");

  const handleNext = () => {
    setIsOpen(false);
    setTableIsOpen(true);
  };

  const location = useLocation();

  const dispatch = useDispatch();
  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );

  const color = businessDetails?.colour_scheme || "#FF0000";

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);

  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  sessionStorage.setItem("url", fullUrl);

  const business_identifier = id;
  const BranchId = branchId;
  const tableNo = queryParams.get("table");
  const group_name = queryParams.get("group_name") ?? "default_group_name";

  useEffect(() => {
    if (business_identifier && BranchId) {
      dispatch(setBusinessIdentifier(business_identifier));
      dispatch(setGroupName(group_name));
      dispatch(setBranchID(BranchId));
      dispatch(setURL(fullUrl));
    }

    getBusinessDetails();
  }, [business_identifier, BranchId, tableNo, group_name]);

  const getBusinessDetails = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/business/getBusinessDetails/?business_identifier=${business_identifier}&branch=${BranchId}`,
        headers
      );
      console.log(
        "Business Details Retrieved successfully:",
        response.data.data
      );
      dispatch(setBusinessDetails(response.data.data));
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  const handleUserNameChange = (name: string) => {
    setUserName(name);
    dispatch(updateCustomerName(name));
  };
  return (
    <div>
      {!isOpen && !isTableOpen && (
        <>
          <Header />
          <div className="animate-pulse">
            <div className=" space-y-[24px] text-center grid items-center place-items-center py-[30px] bg-[#F4F4F4]">
              <img src={selfOrdering} alt="" className=" w-[80px]" />
              <p className=" font-[500] text-[35px] text-[#000000]">
                Self - Ordering
              </p>
            </div>
            <div className=" space-y-[24px] text-center grid items-center place-items-center py-[30px] bg-[#ffffff]">
              <img src={FastOrdering} alt="" className=" w-[80px]" />
              <p className=" font-[500] text-[35px] text-[#000000]">
                Fast - Checkout
              </p>
            </div>

            <div className=" space-y-[24px] text-center grid items-center place-items-center py-[30px] bg-[#F4F4F4]">
              <img src={Queue} alt="" className=" w-[80px]" />
              <p className=" font-[500] text-[35px] text-[#000000]">
                Skip The Queue
              </p>
            </div>
          </div>

          <div className=" mt-[10px] max-w-[574px] mx-auto">
            <p
              className=" cursor-pointer text-[32px] text-center font-[500] text-white px-[48px] py-[37px]  rounded-full"
              onClick={() => setIsOpen(true)}
              style={{ backgroundColor: color }}
            >
              START ORDER
            </p>
            <div className=" flex items-center justify-between mt-[61px] ">
              <img src={Mastercard} alt="" className=" w-[20%] " />
              <img src={Verve} alt="" className="w-[20%] " />
              <img src={Visa} alt="" className="w-[20%] " />
            </div>
          </div>
        </>
      )}

      {isOpen && (
        <div className="">
          <Header2
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <div className=" max-w-[818px]  mx-auto mt-[50px] ">
            <label htmlFor="" className=" font-[500] text-[40px] mx-[20px]">
              Enter your first name and last name initial.
            </label>
            <div className="mt-[10px] mb-[50px]  mx-[20px]">
              <CustomInput
                type="text"
                label="Enter your first name and last name iniital"
                value={userName}
                onChange={handleUserNameChange}
                textSize="text-[60px]"
                labelSize="text-[20px]"
              />
            </div>

            <div className=" flex items-center justify-center">
              <p
                className={` px-[120px] py-[37px] text-[32px]  font-bold ${
                  !userName ? " bg-[#B6B6B6]" : "bg-[#FF0000] cursor-pointer"
                } rounded-full inline-flex text-white text-center`}
                style={{
                  backgroundColor: !userName ? "#B6B6B6" : color,
                }}
                onClick={userName ? handleNext : undefined}
              >
                NEXT
              </p>
            </div>
            <p className=" text-[32px] font-[400] text-black mt-[40px] px-[10px]">
              You will receive a text message when your order is ready
            </p>
          </div>
        </div>
      )}

      {isTableOpen && (
        <div className="">
          <Header2
            onClick={() => {
              setTableIsOpen(false);
            }}
          />
          <div className=" max-w-[818px]  mx-auto mt-[50px]">
            <label htmlFor="" className=" font-[500] text-[40px] mx-[20px]">
              Enter your phone number
            </label>
            <div className="mt-[50px] mb-[100px] mx-[20px]">
              <CustomInput
                type="number"
                label=""
                value={number}
                onChange={(newValue) => setNumber(newValue)}
                textSize="text-[60px]"
              />
            </div>
            <div className=" flex items-center justify-center gap-[24px]">
              {" "}
              <p
                className={` px-[99px] py-[37px] text-[32px] font-[500] text-[#B6B6B6]  border-[3px]  border-[#B6B6B6] cursor-default rounded-full inline-flex text-center`}
              >
                CANCEL
              </p>
              <Link to="/demo/category-details/selfcheckout">
                <p
                  className={`px-[99px] py-[37px] text-[32px] font-[500] rounded-full inline-flex text-white text-center ${
                    !number ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: !number ? "#B6B6B6" : color,
                  }}
                  // onClick={number ? handleNext : undefined}
                >
                  CONTINUE
                </p>
              </Link>
            </div>
            <p className=" text-[32px] font-[400] text-black mt-[40px] px-[10px]">
              You will receive a text message when your order is ready
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeginOrder;
