"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setPlanDetails, fetchUserDetails } from "../../slices/UserSlice";

interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  discount?: string;
}

const UpgradeSubscription: React.FC = () => {
  const dispatch = useDispatch();
  const dispatchs = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { userData, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    _id: string;
  } | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [openFeatures, setOpenFeatures] = useState<string | null>(null);

  const currentPlanId = userDetails?.businessPlan?.plan._id ?? null;

  const features: Record<string, string[]> = {
    quarterly: [
      "Branded Online Store",
      "Custom Menu & Pricing",
      "Pickup & Delivery Scheduling",
      "Unique GoGrub URL",
    ],
    yearly: [
      "Branded Online Store",
      "Custom Menu & Pricing",
      "Pickup & Delivery Scheduling",
      "Unique GoGrub URL",
      "Real-Time Order Management",
      "Sales Report & Analysis",
      "Customer Insights & Data",
      "Automated Order Notifications",
      "Online Payment Processing (Low Transaction Fees)",
    ],
  };

  const updateLocalStorage = (key: string, value: string): void => {
    const storedData = JSON.parse(
      localStorage.getItem("businessInfo") || "{}"
    ) as Record<string, string>;
    storedData[key] = value;
    localStorage.setItem("businessInfo", JSON.stringify(storedData));
  };

  const handlePlanSelect = (plan: Plan): void => {
    setSelectedPlan(plan);
    updateLocalStorage("selectedPlan", JSON.stringify(plan));
  };

  const handleToggleFeatures = (planName: string): void => {
    setOpenFeatures((prev) => (prev === planName ? null : planName));
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/plan/getPlans?secretKey=trooAdminDev&planType=gogrub`
        );
        const plansData = response.data.data;
        setPlans(plansData);

        if (currentPlanId) {
          const plan = plansData.find(
            (plan: Plan) => plan._id === currentPlanId
          );
          if (plan) {
            setCurrentPlan(plan.name);
            setSelectedPlan(plan);
          }
        }
      } catch (error) {
        console.error("Error fetching plans data:", error);
      }
    };

    fetchPlans();
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
      const response = await axios.post(
        `${SERVER_DOMAIN}/plan/subcribeBusinessPlan?secretKey=trooAdminDev`,
        {
          planId: selectedPlan?._id,
        },
        headers
      );
      dispatch(setPlanDetails(response.data.data));

      sessionStorage.setItem("currentPlanName", selectedPlan?.name || "");
      toast.success(response.data.message || "Plan subscribed successfully!");
      setIsOpen(false);
      setLoading(false);
      navigate("/verified-payment");
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const handleOpenSubscriptionModal = () => {
    setOpenSubscriptionModal(true);
  };

  const handleCloseSubscriptionModal = () => {
    setOpenSubscriptionModal(false);
  };
  const handleUpgrade = () => {
    if (selectedPlan) {
      SubcribePlan();
    } else {
      toast.error("Please select a plan to upgrade.");
    }
  };

  return (
    <Modal
      isOpen={openSubscriptionModal}
      onClose={handleCloseSubscriptionModal}
    >
      hiii
    </Modal>
  );
};

export default UpgradeSubscription;
