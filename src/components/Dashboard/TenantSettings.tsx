import TenantAccordion from "./components/TenantAccordionOptimised";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";

const TenantSettings = () => {
  return (
    <DashboardLayout>
      {" "}
      <TopMenuNav pathName="Tenant settings" />
      <div className="mt-[40px] mb-[100px] md:p-[5%]">
        <h3 className="text-xl font-normal text-[#121212]">Customer Apps Settings</h3>

        <TenantAccordion />

        <div>
          <h3 className="text-xl font-medium text-[#121212] mt-[40px] mb-[32px]">
            Operations Apps Settings
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="text-lg font-normal">Waiter App</li>
            <li className="text-lg font-normal">KDS(Kitchen Display System)</li>
            <li className="text-lg font-normal">Tickets</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TenantSettings;
