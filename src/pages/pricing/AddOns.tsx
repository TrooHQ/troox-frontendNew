import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Close, ArrowBack } from "@mui/icons-material";
import { fetchUserDetails } from "../../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/src/store/store";
import Modal from "../../components/Modal";
import { RootState } from "../../store/store";

import TopMenuNav from "../../components/Dashboard/TopMenuNav";

const QuarterlyPlans = [
  {
    name: "KDS",
    description:
      "Collect customers orders for food preparation and update waiters on the food prep status for pickup",
    quarterlyPrice: 4500,
    yearlyPrice: 4500 * 4 * 0.85, // Example yearly price with 15% discount
    features: [],
  },
  {
    name: "Flex",
    description:
      "Enable waiters to efficiently manage orders, relay them instantly to the kitchen and track status in real time",
    quarterlyPrice: 4500,
    yearlyPrice: 4500 * 4 * 0.85,
    features: [],
    note: " *a 5% charge is applied on each transaction for customers paying for standalone Flex",
  },
  {
    name: "GoGrub",
    description:
      "Manage online food ordering for restaurants including cloud kitchens and food vendors",
    quarterlyPrice: 7500,
    yearlyPrice: 7500 * 4 * 0.8, // Example yearly price with 20% discount
    features: [],
    note: " *a 5% charge is applied on each transaction for customers paying for standalone GoDeliver",
  },
  {
    name: "Kiosk",
    description:
      "Reduce long wait times for customers. Get multiple options to take payments within the kiosk",
    quarterlyPrice: 7500,
    yearlyPrice: 7500 * 4 * 0.8,
    features: [],
    note: "*a 2.5% charge is applied on each transaction for customers paying for standalone Kiosk",
  },
  {
    name: "viBoards",
    description:
      "Display digital menu boards ensuring clear, engaging and easily updatable menus",
    quarterlyPrice: 7500,
    yearlyPrice: 7500 * 4 * 0.8,
    features: [],
  },
  {
    name: "GoDeliver",
    description:
      "Choose from different delivery partners to deliver your food quickly",
    quarterlyPrice: 4500,
    yearlyPrice: 4500 * 4 * 0.85,
    features: [],
    note: "*a 5% charge is applied on each transaction for customers paying for standalone GoDeliver",
  },
];

const YearlyPlansData = [
  {
    name: "GoGrub",
    description:
      "Manage online food ordering for restaurants including cloud kitchens and food vendors",
    yearlyPrice: 7500 * 4 * 0.75, // Example yearly price with 25% discount
    features: [],
    note: " *a 5% charge is applied on each transaction for customers paying for standalone GoDeliver",
  },
  {
    name: "Kiosk",
    description:
      "Reduce long wait times for customers. Get multiple options to take payments within the kiosk",
    yearlyPrice: 7500 * 4 * 0.75,
    features: [],
    note: "*a 2.5% charge is applied on each transaction for customers paying for standalone Kiosk",
  },
  {
    name: "viBoards",
    description:
      "Display digital menu boards ensuring clear, engaging and easily updatable menus",
    yearlyPrice: 7500 * 4 * 0.75,
    features: [],
  },
  {
    name: "GoDeliver",
    description:
      "Choose from different delivery partners to deliver your food quickly",
    yearlyPrice: 4500 * 4 * 0.8, // Example yearly price with 20% discount
    features: [],
    note: "*a 5% charge is applied on each transaction for customers paying for standalone GoDeliver",
  },
];

const PlanCard = ({ plan, isYearly, setSelectedPlan, setAreYouSure }) => (
  <div className="border border-[#B6B6B6] px-[20px] rounded-[10px] py-[15px] md:width[270px] md:h-[450px] relative">
    <div className="space-y-[20px]">
      <h3 className="text-[28px] font-medium text-gray-800 mb-2">
        {plan.name}
      </h3>
      <p className="text-[#606060] mb-2 text-sm font-normal min-h-[80px]">
        {plan.description}
      </p>
      <div className="flex flex-col items-start mb-2">
        <span className="text-[32px] font-medium text-[#121212]">
          ₦
          {isYearly
            ? plan.yearlyPrice.toLocaleString()
            : plan.quarterlyPrice.toLocaleString()}
        </span>
        {!isYearly && (
          <span className="text-[10px] text-[#121212] font-normal ml-1">
            Billed monthly (₦{(plan.quarterlyPrice / 3).toLocaleString()} per
            month)
          </span>
        )}
        {isYearly && (
          <span className="text-sm text-gray-500 ml-1">Billed yearly</span>
        )}
      </div>
    </div>
    <p className="mt-[60px] py-[10px] font-[400] text-[14px] text-left absolute bottom-24 w-[225px]">
      {plan.note}
    </p>
    <button
      className="mt-[60px] border border-[#000000] bg-[#0d0d0d] py-[10px] rounded-[5px] font-[400] text-[14px] text-[#ffffff] text-center absolute bottom-10 w-[225px]"
      onClick={() => {
        setSelectedPlan(plan);
        setAreYouSure(true);
      }}
    >
      Select Plan
    </button>
  </div>
);

const AddOns = () => {
  const dispatchs = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
  } | null>(null);
  const [areyousure, setAreYouSure] = useState(false);

  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    dispatchs(fetchUserDetails());
  }, [dispatchs]);
  const token = userData?.token;

  const SubcribePlan = async () => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = {
        productAddOns: [selectedPlan?.name || ""], // Use the selected plan's name
      };
      const response = await axios.put(
        `${SERVER_DOMAIN}/plan/productAddOn`,
        payload,
        headers
      );
      console.log(response, "response for plan subscription");
      toast.success(response.data.message || "Plan subscribed successfully!");
      setLoading(false);
      navigate("/verified-payment");
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (value) => {
    setIsYearly(value === "yearly");
  };

  const displayedPlans = isYearly ? YearlyPlansData : QuarterlyPlans;
  console.log(isYearly, "displayedPlans", displayedPlans);
  return (
    <div>
      <div className="max-w-[92vw] 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
        <TopMenuNav pathName="Pricing Page" />
      </div>
      <div className="relative text-[#121212] bg-[#FFFFFF]">
        <div className="max-w-6xl 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="flex items-center gap-2 text-[#121212] text-[14px] font-[400] mr-auto ml-5"
          >
            <ArrowBack className="w-[20px] h-[20px]" />
            Back
          </button>
          <div
            className="w-full mx-auto text-center md:mt-[0px]"
            data-aos="fade-up"
          >
            <p className="text-[24px] lg:text-[44px] font-[500]">
              Add-ons Subscription Plan
            </p>
            <p className="text-[10px] lg:text-[14px] font-[400] text-[#121212]">
              Choose your Subscription Plan
            </p>
          </div>

          <div className="my-[20px] flex gap-[5px] items-start py-[5px] px-[6px] border border-[#CBCAE7] rounded-[5px] w-fit">
            {["Quarterly", "Yearly"].map((tab) => (
              <p
                key={tab}
                onClick={() => handleToggle(tab.toLowerCase())}
                className={`text-[16px] font-[500] max-w-[148px] w-full text-center py-[13px] px-[16px] text-[#0D0D0D] cursor-pointer transition-all min-w-[200px] ${
                  (isYearly && tab === "Yearly") ||
                  (!isYearly && tab === "Quarterly")
                    ? "border rounded-[5px] border-[#CBCAE7] bg-[#121212] text-white"
                    : "border-none"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          <div className="pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPlans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                isYearly={isYearly}
                setSelectedPlan={setSelectedPlan}
                setAreYouSure={setAreYouSure}
              />
            ))}
          </div>
          {/* {!isYearly && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  viBoards
                </h3>
                <p className="text-gray-600 mb-4">
                  Display digital menu boards ensuring clear, engaging and
                  easily updatable menus
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₦7,500
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    Billed Quarterly (₦2,500/month)
                  </span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Select Plan
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  GoDeliver
                </h3>
                <p className="text-gray-600 mb-4">
                  Choose from different delivery partners to deliver your food
                  quickly
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₦4,500
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    Billed Quarterly (₦1,500/month)
                  </span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Select Plan
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>

      <Modal isOpen={areyousure} onClose={() => setAreYouSure(false)}>
        <div className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px]">
          <div
            className="flex items-center justify-end cursor-pointer"
            onClick={() => setAreYouSure(false)}
          >
            <Close />
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <p className="text-[24px] font-[500] text-purple500">Subscribe</p>

            <div>
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to select this add-on?
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                <div
                  className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                  onClick={() => setAreYouSure(false)}
                >
                  <p className="font-[500] text-[16px] text-purple500 cursor-pointer">
                    No
                  </p>
                </div>

                <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                  <button
                    onClick={() => SubcribePlan()}
                    className=" text-[16px]"
                  >
                    {loading ? "Loading..." : "Yes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddOns;
