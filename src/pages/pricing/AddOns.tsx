import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
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

interface Plan {
  _id: string;
  description: string;
  billingPerMonth: number;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
}
const AddOns = () => {
  const { userDetails } = useSelector((state: RootState) => state.user);
  const [addOns, setAddOns] = useState<Plan[]>([]);
  const dispatchs = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
    price: number;
    description: string;
  } | null>(null);
  const [areyousure, setAreYouSure] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    dispatchs(fetchUserDetails());
  }, [dispatchs]);

  const SubcribePlan2 = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://staging.troopay.com/api/v1/transaction/subscription_payment/`,
        {
          plan_id: selectedPlan?._id,
          business_email: userDetails?.business_email,
          amount: selectedPlan?.price,
          plan_description: selectedPlan?.description,
          callback_url: "https://trootab.com/verified-payment",
        }
      );
      sessionStorage.setItem("currentPlanName", selectedPlan?.name || "");
      toast.success(response.data.message || "Plan subscribed successfully!");
      setLoading(false);
      window.location.href =
        response.data.data.paystack_data.data.authorization_url;
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddOns = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER_DOMAIN}/plan/getPlanAddons?secretKey=trooAdminDev&billingCycle=${isYearly ? "yearly" : "quarterly"
        }`
      );
      const fetchedPlans = response.data.data;
      setAddOns(fetchedPlans);
    } catch (error) {
      console.error("Error fetching addons data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (value: any) => {
    setIsYearly(value === "yearly");
  };

  useEffect(() => {
    fetchAddOns();
  }, [isYearly]);

  return (
    <div>
      <div className="max-w-[92vw] 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
        <TopMenuNav pathName="Pricing Page" />
      </div>
      <div className="relative text-[#121212] bg-[#FFFFFF]">
        <div className="max-w-6xl 2xl:max-w-7xl md:mx-auto mx-[20px] px-3 mt-8">
          <button
            onClick={() => navigate(-1)}
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
                className={`text-[16px] font-[500] max-w-[148px] w-full text-center py-[13px] px-[16px] text-[#0D0D0D] cursor-pointer transition-all min-w-[200px] ${(isYearly && tab === "Yearly") ||
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
            {addOns.map((plan) => (
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
                        ? plan.price.toLocaleString()
                        : plan.price.toLocaleString()}
                    </span>
                    {!isYearly && (
                      <span className="text-[10px] text-[#121212] font-normal ml-1">
                        Billed monthly (₦
                        {plan.billingPerMonth.toLocaleString()} per month)
                      </span>
                    )}
                    {isYearly && (
                      <span className="text-sm text-gray-500 ml-1">
                        Billed yearly
                      </span>
                    )}
                  </div>
                </div>
                {/* <p className="mt-[60px] py-[10px] font-[400] text-[14px] text-left absolute bottom-24 w-[225px]">
                  {plan.note}
                </p> */}
                <button
                  className="mt-[60px] border border-[#000000] bg-[#0d0d0d] py-[10px] rounded-[5px] font-[400] text-[14px] text-[#ffffff] text-center absolute bottom-10 w-[225px]"
                  onClick={() => {
                    setSelectedPlan(plan);
                    localStorage.setItem("selectedPlan", JSON.stringify(plan));
                    setAreYouSure(true);
                  }}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
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
            <p className="text-[24px] font-[500] text-black">Subscribe</p>

            <div>
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to select this add-on?
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                <div
                  className="border cursor-pointer borderblack rounded px-[24px]  py-[10px] font-[600] text-black"
                  onClick={() => setAreYouSure(false)}
                >
                  <p className="font-[500] text-[16px] text-black cursor-pointer">
                    No
                  </p>
                </div>

                <div className="border borderblack bg-black rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                  <button
                    onClick={() => SubcribePlan2()}
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
