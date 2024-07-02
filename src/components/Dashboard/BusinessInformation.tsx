import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import add from "../../assets/add.svg";
import InformationAccordion from "./components/InformationAccordion";

const BusinessInformation = () => {
  return (
    <DashboardLayout>
      {" "}
      <TopMenuNav pathName="Restaurant Details" />
      <div className="flex items-center justify-between mt-10">
        <div></div>
        <div className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
          <button className="text-[16px] flex items-center gap-[8px]">
            <img src={add} alt="" /> Create New Branch
          </button>
        </div>
      </div>
      <InformationAccordion />
    </DashboardLayout>
  );
};

export default BusinessInformation;
