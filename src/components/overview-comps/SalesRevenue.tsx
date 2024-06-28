import clsx from "clsx";
import styles from "./Header.module.css";
import DaysTab from "./DaysTab";
import Recharts from "./Recharts";
import DaysTab2 from "./DaysTab2";

const SalesRevenue = () => {
  return (
    <div className="border border-[#C7C6CF] bg-white p-6 rounded-2xl mb-12">
      {" "}
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesRevenue)}>Sales Revenue</h5>
        <DaysTab2
          backgroundColor="#ffffff"
          selectedBackgroundColor="#494953"
          selectedColor="white"
          nonSelectedColor="#606060"
          iconClassName={clsx("text-[#ADADB9]")}
          border="1px solid var(--Kanta-Neutral-200, #C7C6CF)"
        />
      </div>
      <Recharts />
    </div>
  );
};

export default SalesRevenue;
