import TopMenuNav from "./InRoomTopMenuNav";
import { Link } from "react-router-dom";

export const InRoomReceipt = () => {
  return (
    <div className="  ">
      <TopMenuNav exploreMenuText="Select Payment" />

      <div className=" mt-[68px] mx-[16px]">
        <div className=" mb-[40px]">
          <p className=" text-[18px] font-[500] text-[#121212] text-center">
            How would you like your receipt?
          </p>

          <div className=" py-[23px] px-[17px]  mt-[16px] ">
            <p className=" text-[#121212] text-[14px] font-[400] text-center">
              Once your order has been completed and payment submitted we will
              automatically send your receipt to the indicated location.
            </p>
          </div>
        </div>

        <Link to="/demo/get-receipt/in_room_dining">
          <div className=" flex items-center justify-center">
            <p className="bg-[#FF0000] rounded-[5px] py-[10px] px-[64px] text-center cursor-pointer inline text-[16px] font-[500] text-[#ffffff]">
              Email
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
