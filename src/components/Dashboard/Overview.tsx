import BalanceComp from "../overview-comps/Balance";
import KPI from "../overview-comps/KPI";
import SalesActivities from "../overview-comps/SalesActivities";
import SalesRevenue from "../overview-comps/SalesRevenue";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";

export const storeData = {
  id: 1,
  name: "Chicken Republic Abuja Outlet",
  address: "No 1, Kanta Street, Lagos",
  phoneNo: "0817 8901 234",
  availableBalance: "₦ 35,688,000.85",
  noOfWarehouses: "450",
  noOfProducts: "12,450",
  noOfTransactions: "N2.25M",
  noOfReturns: "24",
};

const Overview: React.FC = () => {
  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Overview" />

        {/* First div */}
        <div className=" my-10">
          <h3 className="text-[#606060] text-[20px] font-normal">
            Hello,{" "}
            <span className="text-[#121212] text-[24px] font-medium">
              {storeData.name}
            </span>
          </h3>
        </div>

        {/* Second div */}
        <BalanceComp storeData={storeData} />

        {/* Third div */}
        <div className="mt-9">
          <SalesActivities />
        </div>

        {/* 4th div */}
        <div className="mt-9">
          <SalesRevenue />
        </div>

        {/* 5th div */}
        <div className="mt-9">
          <h3 className="text-[#012320] text-[20px] font-semibold mb-9">
            Sales Trend
          </h3>
          <KPI />
        </div>

        {/* 6th div */}
        {/* <div className="mt-9">
          <BBB />
        </div> */}
      </DashboardLayout>
    </div>
  );
};

export default Overview;
