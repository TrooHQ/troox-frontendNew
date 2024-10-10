import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import clsx from "clsx";
import styles from "./Header.module.css";
import DaysTab2 from "./DaysTab2";

const SalesActivities = () => {
  const state = {
    salesActivities: [
      {
        icon: ArrowDown,
        title: "Total Sales Revenue",
        time: "12:45 PM",
        amount: "₦ 10,500,000",
        statusIcon: ArrowDown,
        status: "-25% from yesterday",
      },
      {
        icon: ArrowUp,
        title: "Sales Growth Rate",
        time: "12:45 PM",
        amount: "78%",
        statusIcon: ArrowUp,
        status: "22% from yesterday",
      },
      {
        icon: ArrowUp,
        title: "Average Order Value",
        time: "12:45 PM",
        amount: "₦ 4,500",
        statusIcon: ArrowUp,
        status: "10% from yesterday",
      },
      {
        icon: ArrowDown,
        title: "Gross Profit",
        time: "12:45 PM",
        amount: "₦ 5,250,000",
        statusIcon: ArrowDown,
        status: "10% from yesterday",
      },
    ],
  };
  return (
    <div className="border border-[#C7C6CF] p-6 rounded-2xl mb-12">
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesActivitiesH4)}>Sales Activities</h5>
        <DaysTab2
          backgroundColor="initial"
          selectedBackgroundColor="#f38d41"
          selectedColor="white"
          nonSelectedColor="#606060"
          iconClassName={clsx("text-[#ADADB9]")}
          border="1px solid var(--Kanta-Neutral-200, #C7C6CF)"
        />
      </div>{" "}
      <div className="grid grid-cols-4 gap-6">
        {state.salesActivities.map((activity, index) => (
          <div
            key={index}
            className={clsx(
              styles.activityDiv,
              "flex flex-col items-start justify-center border border-[#C7C6CF] rounded-[10px] overflow-auto py-4 px-3 gap-3"
            )}
          >
            <h5>{activity.title}</h5>
            <span>{activity.amount}</span>
            <div className="flex items-center justify-start gap-2">
              <img src={activity.icon} alt="icon" />
              <p>{activity.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesActivities;
