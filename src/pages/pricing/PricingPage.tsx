import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Minus from "../../assets/minus-svgrepo-com 1.svg";
import Check from "../../assets/check-circle-svgrepo-com 1.svg";
// import DashboardLayout from "../../components/Dashboard/DashboardLayout";
// import TopMenuNav from "../../components/Dashboard/TopMenuNav";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("Quarterly");

  const pricingPlans = [
    {
      name: "Basic",
      description: "Ideal for businesses with smaller requirements",
      price: "₦9,000",
      info: "Billed quaterly (N3,000 per month)",
      note: "Note: A 5% transaction fee applies for standalone GoGrub users.",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Essential",
      description: "Designed for growing businesses that need more control",
      price: "₦15,000",
      info: "Billed quaterly (N5,000 per month)",
      note: "Note: A 5% transaction fee applies for standalone GoGrub users.",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Premium",
      description:
        "Best for established businesses looking for deeper automation",
      price: "₦45,000",
      info: "Billed quaterly (N15,000 per month)",
      note: "Note: A 5% transaction fee applies for standalone GoGrub users.",
      buttonText: "Select Plan",
      isEnterprise: false,
    },
    {
      name: "Enterprise",
      description:
        "Entry-level plan offering core features, ideal for individuals or small teams. Limited access to advanced tools and support.",
      price: "Contact Us",
      info: "Select Plan with a simple website, record sales & share invoices/receipts for your new business.",
      note: "Note: A 5% transaction fee applies for standalone GoGrub users.",
      buttonText: "Select Plan",
      isEnterprise: true,
    },
  ];

  const comparisonData = [
    {
      feature: "Features",
      isHeader: true,
      plans: ["Basic", "Essential", "Premium", "Enterprise"],
    },
    {
      feature: "Basic Features",
      basic: true,
      essential: true,
      premium: true,
      enterprise: true,
    },
    {
      feature: "Users",
      basic: false,
      essential: false,
      premium: true,
      enterprise: true,
    },
    {
      feature: "Individual data",
      basic: false,
      essential: true,
      premium: false,
      enterprise: true,
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      {/* <TopMenuNav pathName="Pricing Page" /> */}
      <div className="relative text-[#121212] bg-[#FFFFFF]">
        <div className="max-w-6xl 2xl:max-w-7xl md:mx-auto mx-[20px] px-3">
          <div
            className="w-full mx-auto text-start md:mt-[0px]"
            data-aos="fade-up"
          >
            <p className="text-[24px] lg:text-[44px] font-[500]">
              Subscription Plan
            </p>
            <p className="text-[10px] lg:text-[14px] font-[400] text-[#121212]">
              Choose your Subscription Plan
            </p>
          </div>

          <div className="my-[20px] flex gap-[5px] items-start py-[5px] px-[6px] border border-[#CBCAE7] rounded-[5px] w-fit">
            {["Quarterly", "Yearly"].map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[16px] font-[500] max-w-[148px] w-full text-center py-[13px] px-[16px] text-[#0D0D0D] cursor-pointer transition-all min-w-[200px] ${
                  activeTab === tab
                    ? "border rounded-[5px] border-[#CBCAE7] bg-[#121212] text-white"
                    : "border-none"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          <div className="grid items-start place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[21px] my-[50px]">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="border border-[#B6B6B6] px-[20px] rounded-[10px] py-[30px]"
              >
                <div className="space-y-[20px]">
                  <div className="space-y-[12px]">
                    <p className="text-[#121212] text-[28px] font-[500]">
                      {plan.name}
                    </p>
                    <p className="text-[#606060] text-[14px] font-[400]">
                      {plan.description}
                    </p>
                  </div>
                  <div>
                    <div className="pb-[16px] border-b border-[#000000]">
                      {plan.isEnterprise ? (
                        <button className="w-full border border-[#000000] py-[10px] rounded-[5px] font-[400] text-[14px] text-[#121212] text-center">
                          {plan.price}
                        </button>
                      ) : (
                        <>
                          <p className="text-[#121212] text-[28px] font-[500]">
                            {plan.price}
                          </p>
                          <p className="text-[14px] font-[400]">
                            Billed {activeTab.toLowerCase()} (N14,000 per month)
                          </p>
                        </>
                      )}
                    </div>
                    <p className="pt-[16px] font-[400] text-[14px] text-[#121212]">
                      {plan.info}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-[60px] border border-[#000000] py-[10px] rounded-[5px] font-[400] text-[14px] text-[#121212] text-center">
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div
            className="max-w-[271px] md:max-w-[607px] mx-auto text-center md:mt-[100px]"
            data-aos="fade-up"
          >
            <p className="text-[24px] lg:text-[44px] font-[500]">
              Compare Plan
            </p>
            <p className="text-[10px] lg:text-[14px] font-[400]">
              Lorem ipsum dolor sit amet consectetur. Nisl sit proin tincidunt
              nunc egestas enim dui. Turpis sed.
            </p>
          </div>

          <div className="py-[50px] overflow-x-auto">
            {comparisonData.map((row) => (
              <div
                key={row.feature}
                className="min-w-[768px] text-[#000000] grid grid-cols-5 border-b border-[#000000] py-[16px] px-[10px]"
              >
                <p className="max-w-[232px] font-[500] text-[16px]">
                  {row.feature}
                </p>

                {row.isHeader ? (
                  row.plans.map((plan) => (
                    <p
                      key={plan}
                      className="max-w-[232px] font-[500] text-[16px] text-center"
                    >
                      {plan}
                    </p>
                  ))
                ) : (
                  <>
                    <div className="max-w-[232px] font-[500] text-[16px] flex items-center justify-center">
                      <img
                        src={row.basic ? Check : Minus}
                        alt={row.basic ? "check" : "minus"}
                      />
                    </div>
                    <div className="max-w-[232px] font-[500] text-[16px] flex items-center justify-center">
                      <img
                        src={row.essential ? Check : Minus}
                        alt={row.essential ? "check" : "minus"}
                      />
                    </div>
                    <div className="max-w-[232px] font-[500] text-[16px] flex items-center justify-center">
                      <img
                        src={row.premium ? Check : Minus}
                        alt={row.premium ? "check" : "minus"}
                      />
                    </div>
                    <div className="max-w-[232px] font-[500] text-[16px] flex items-center justify-center">
                      <img
                        src={row.enterprise ? Check : Minus}
                        alt={row.enterprise ? "check" : "minus"}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
