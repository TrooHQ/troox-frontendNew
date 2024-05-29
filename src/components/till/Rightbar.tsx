"use client";
import styles from "./Rightbar.module.css";
import { MoreVert, ReadMore } from "@mui/icons-material";
import TillTable from "./TillTable";
import { useContext, useState } from "react";
import Link from "next/link";
import { ItemContext } from "@/context/ItemContext";
import MoreVertDropdown from "../common/MoreVertDropdown";
import EndOfDayModal from "./EndOfDayModal";

const Rightbar = ({ setItems, items }: any) => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useContext was used outside of the ItemContextProvider");
  }

  const { incrementQty, decrementQty } = context;

  const totalAmount = items.reduce((total: number, item: { qty: number; price: string }) => {
    const itemPrice = Number(item.price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
    return total + itemPrice * item.qty;
  }, 0);

  // End of day summary
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  console.log("====================================");
  console.log(open);
  console.log("====================================");
  return (
    <div className={styles.container}>
      <div className="bg-[#f3f3f5] px-4 py-2 mb-2 mr-3 top-0 right-5 sticky z-10">
        <div className="flex items-center justify-between">
          <div
            className="bg-[#F3F3F5] px-[10px] py-[11px]"
            style={{ borderRadius: "100px ", border: "1px solid #9D9DAC" }}
          >
            <p className="text-xs font-normal text-[#201F44]">
              Invoice Number: 10298 | 11:25 AM | 10/04/2024
            </p>
          </div>
          <MoreVertDropdown
            menuItems={[
              {
                text: "Integration",
                onClick: handleOpen,
              },
              { text: "End of day summary", onClick: handleOpen },
            ]}
          />
        </div>
      </div>
      <div className="bg-[#f3f3f5] px-6 py-1 mb-2 mr-3 relative h-[54vh] overflow-y-auto">
        <div className={styles.text}>
          <TillTable items={items} incrementQty={incrementQty} decrementQty={decrementQty} />
        </div>
      </div>

      <div className="bg-[#f3f3f5] px-6 py-2 mr-3 relative">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-[#201F44] text-base font-light">Total Amount</p>
            <p className="text-[#201F44] text-base font-light">
              ₦{totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#201F44] text-base font-light">Discount</p>
            <p className="text-[#201F44] text-base font-light">₦0.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#201F44] text-base font-light">Tax</p>
            <p className="text-[#201F44] text-base font-light">₦0.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#201F44] text-base font-light">Amount Due</p>
            <p className="text-[#201F44] text-base font-light">
              ₦{totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid items-center justify-center grid-cols-3 gap-2">
            <button className="bg-[#5855B3] text-white py-3 mt-5 rounded-[4px]">
              <p className="text-center">Hold/Recall</p>
            </button>
            <button className="bg-[#5855B3] text-white py-3 mt-5 rounded-[4px]">
              <p className="text-center">Void</p>
            </button>
            <button className="bg-[#5855B3] text-white py-3 mt-5 rounded-[4px]">
              <p className="text-center">Apply Discount</p>
            </button>
          </div>
          <div>
            <Link href={`/checkout`}>
              <button className="bg-[#5855B3] text-white w-full py-3 mt-1 rounded-md">
                <p className="text-center">Pay Amount</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* End of day modal */}
      {/* {endOfDayModal && ( */}
      <EndOfDayModal handleOpen={handleOpen} open={open} setOpen={setOpen} />
      {/* )} */}
    </div>
  );
};

export default Rightbar;
