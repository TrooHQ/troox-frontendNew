import clsx from "clsx";
import styles from "./Header.module.css";
import DaysTab from "./DaysTab";
import PieCharts from "./PieChart";
import img1 from "../../assets/image1.png";
import img2 from "../../assets/image2.png";
import img3 from "../../assets/image3.png";
import DaysTab2 from "./DaysTab2";

export const productsSold = [
  {
    name: "Chicken Pie",
    image: img1,
    numberSold: 3400,
    amountSold: "₦6,105,000.00",
    indicator: "#9787FF",
  },

  {
    name: "Spicy Yam Meal",
    image: img2,
    numberSold: 1000,
    amountSold: "₦4,050,000.00",
    indicator: "#FFA5DA",
  },
  {
    name: "Chicken Salad",
    image: img3,
    numberSold: 2409,
    amountSold: "₦2,352,000.00",
    indicator: "#0096FF",
  },
  {
    name: "Wrapstar Meal",
    image: img1,
    numberSold: 3200,
    amountSold: "₦1,768,000.00",
    indicator: "#5BD222",
  },
  {
    name: "Flame Grilled Chicken",
    image: img2,
    numberSold: 1280,
    amountSold: "₦2,011,000.00",
    indicator: "#FDB600",
  },
];

const KPI = () => {
  return (
    <div className="border border-[#C7C6CF] p-6 rounded-2xl mb-12">
      {" "}
      <div className={clsx("flex justify-between items-center w-full mb-9")}>
        <h5 className={clsx(styles.salesRevenue)}>Highest Selling Product</h5>
        <DaysTab2
          backgroundColor="initial"
          selectedBackgroundColor="#494953"
          selectedColor="white"
          nonSelectedColor="#C7C6CF"
          iconClassName={clsx("text-[#ADADB9]")}
          border="1px solid var(--Kanta-Neutral-200, #C7C6CF)"
        />
      </div>
      <div className="overflow-auto whitespace-nowrap scrollbar-hide">
        {productsSold.map((product, index) => (
          <div
            key={index}
            className="border border-[#C7C6CF] rounded-[10px] overflow-auto inline-block mr-4"
          >
            <div className="flex flex-col items-center gap-4 min-w-[200px] py-7 px-8">
              <img
                src={product.image}
                alt="product"
                className="w-[80px] h-[60px]"
              />
              <h6 className="text-[#201F44] font-medium">{product.name}</h6>
              <p className="text-[#B2B1DC] text-sm">
                {product.numberSold} quantities sold
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2.5 mt-6">
        <div className="bg-white rounded-[10px] px-5 py-[48px]">
          <PieCharts />
        </div>

        <div className="bg-white rounded-[10px] px-5 py-[48px] flex-grow flex flex-col gap-[22px]">
          {productsSold.map((product, index) => {
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: product.indicator }}
                  ></div>
                  <div>
                    <h6 className="text-[#201F44] text-[16px] font-medium">
                      {product.name}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[#858497] text-base font-normal">
                    {product.amountSold}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KPI;
