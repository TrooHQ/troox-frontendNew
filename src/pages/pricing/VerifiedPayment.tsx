
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import GoGrubLogo from "../../assets/business_logo.svg";
import CheckCircle from "../../assets/check_circle.svg";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/troo-logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_DOMAIN } from "../../Api/Api";

const VerifiedPayment: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const token = userData?.token;
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const trxref = queryParams.get("trxref");

  const SubcribePlan = async () => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const selectedPlan = JSON.parse(
        localStorage.getItem("selectedPlan") || "{}"
      );
      const payload = {
        productAddOns: [selectedPlan?._id],
      };
      const response = await axios.put(
        `${SERVER_DOMAIN}/plan/productAddOn`,
        payload,
        headers
      );
      toast.success(response.data.message || "Plan subscribed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    if (!reference || !trxref) {
      setError("Missing required parameters in the URL.");
      setLoading(false);
      return;
    }

    // "https://staging.troopay.com/api/v1/transaction/verify_subscription_payment/",
    try {
      const response = await axios.post(
        `https://staging.troopay.co/api/v1/transaction/verify_subscription_payment/`,
        { reference }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        toast.success("Payment verified successfully!");
        await SubcribePlan();
      } else {
        setError("Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("An error occurred while verifying your payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [reference, trxref]);

  const renderLogo = () => {
    if (userData?.onboarding_type === "gogrub") {
      return (
        <img
          src={GoGrubLogo}
          alt="GoGrubLogo"
          className="mb-[10px] w-[100px] h-[100px]"
        />
      );
    }
    return (
      <img
        src={userData?.business_logo || Logo}
        alt="Logo"
        className="mb-[10px] w-[100px] h-[100px]"
      />
    );
  };

  return (
    <div className="h-screen transition-all duration-500 ease-in-out bg-[#EFEFEF] py-[40px]">
      <div className="max-w-[536px] min-h-[541px] mx-auto w-full py-[50px]">
        <div className="flex flex-col items-center justify-center space-y-[40px] font-GeneralSans text-center">
          {renderLogo()}

          {loading && <p>Verifying your payment...</p>}

          {!loading && isSuccess && (
            <>
              <img
                src={CheckCircle}
                alt="Check"
                className="w-[100px] h-[100px]"
              />
              <div className="space-y-[28px]">
                <p className="text-[20px] lg:text-[24px] font-[500] text-[#0D0D0D]">
                  Payment Successful
                </p>
                <p className="text-[14px] lg:text-[16px] font-[400] text-[#121212]">
                  You have successfully subscribed!
                </p>
              </div>
              <p className="text-center font-[500] text-[16px] text-[#FFFFFF] bg-[#0D0D0D] py-[13px] w-full rounded-[5px]">
                <Link to="/overview">Re-direct to Dashboard</Link>
              </p>
            </>
          )}

          {!loading && error && (
            <div className="space-y-4">
              <p className="text-lg font-bold text-red-600">Payment Failed</p>
              <p className="text-gray-700">{error}</p>
              <p className="text-center font-[500] text-[16px] text-[#FFFFFF] bg-[#0D0D0D] py-[13px] w-full rounded-[5px]">
                <Link to="/plans">Try Again</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifiedPayment;
