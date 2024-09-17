import { RootState } from "../../store/store";
import TopMenuNav from "./TopMenuNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Receipt = () => {
  const BusinessDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );

  const colorScheme = BusinessDetails?.colour_scheme;
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

        <Link to="/demo/get-receipt/orderandpay">
          <div className=" flex items-center justify-center">
            <p
              className=" rounded-[5px] py-[10px] px-[64px] text-center cursor-pointer inline text-[16px] font-[500] text-[#ffffff]"
              style={{ backgroundColor: colorScheme || "#FF0000" }}
            >
              Email
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
