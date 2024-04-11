import Arrow from "../assets/BackArrow.svg";
import DashboardBackButton from "../Buttons/DashboardBackButton.tsx";
import ReportTab from "./ReportTab";

const Reporting = () => {
  return (
    <div className="my-[16px] mx-[24px]">
      <DashboardBackButton text="Reporting" img={Arrow} />
      <div className=" mt-[24px]">
        <ReportTab />
      </div>
    </div>
  );
};

export default Reporting;
