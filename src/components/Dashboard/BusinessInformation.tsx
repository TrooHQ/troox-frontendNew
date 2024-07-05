import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import add from "../../assets/add.svg";
import InformationAccordion from "./components/InformationAccordion";
import { useState } from "react";
import BranchModal from "./components/BranchModal";

const BusinessInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      {" "}
      <TopMenuNav pathName="Restaurant Details" />
      <div className="flex items-center justify-between mt-10">
        <div></div>
        {/* <div className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[16px] py-[10px] font-[500] text-[#ffffff]">
          <button className="text-[14px] flex items-center gap-[8px]" onClick={handleAddMenu}>
            <img src={add} alt="" /> Create New Branch
          </button>
        </div> */}
      </div>
      <InformationAccordion />
      <BranchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </DashboardLayout>
  );
};

export default BusinessInformation;
