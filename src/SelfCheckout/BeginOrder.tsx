import HeroImage from "./assets/selfCheckDisplayImg.png";
import Visa from "./assets/visa.png";
import Mastercard from "./assets/mastercard.png";
import Verve from "./assets/verve.png";
import Header from "./Header";
import CustomInput from "../Mobile/inputFields/CustomInput";

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCustomerName } from "../slices/BasketSlice";
import {
  setBusinessDetails,
  setBusinessIdentifier,
  setGroupName,
  setTableNo,
  setURL,
} from "../slices/businessSlice";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import Header2 from "./Header2";
const BeginOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTableOpen, setTableIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { id } = useParams();
  const [number, setNumber] = useState("");

  const handleNext = () => {
    setIsOpen(false);
    setTableIsOpen(true);
  };

  const location = useLocation();

  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);

  const fullUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  sessionStorage.setItem("url", fullUrl);

  const business_identifier = id;
  const tableNo = queryParams.get("table");
  const group_name = queryParams.get("group_name") ?? "default_group_name";

  useEffect(() => {
    if (business_identifier && tableNo) {
      console.log(`Business Identifier: ${business_identifier}`);
      dispatch(setBusinessIdentifier(business_identifier));
      dispatch(setGroupName(group_name));
      dispatch(setTableNo(tableNo));
      dispatch(setURL(fullUrl));
      console.log(`Table: ${tableNo}`);
    }

    getBusinessDetails();
  }, [business_identifier, tableNo, group_name]);

  const getBusinessDetails = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/business/getBusinessDetails/?business_identifier=${business_identifier}`,
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
          <div className="">
            <img
              src={HeroImage}
              alt=""
              className=" h-[50vh] w-full object-cover"
            />
          </div>

          <div className=" mt-[10px] max-w-[574px] mx-auto">
            <p
              className=" cursor-pointer text-[32px] text-center font-[500] text-white px-[48px] py-[37px] bg-[#FF0000] rounded-full"
              onClick={() => setIsOpen(true)}
            >
              START ORDER
            </p>
            <div className=" flex items-center justify-between mt-[61px]">
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
              <Link to="/menu">
                <p
                  className={` px-[99px] py-[37px] text-[32px] font-[500] ${
                    !number ? " bg-[#B6B6B6]" : "bg-[#FF0000] cursor-pointer"
                  } rounded-full inline-flex text-white text-center`}
                  // onClick={name ? handleNext : undefined}
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
