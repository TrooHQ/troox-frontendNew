import TopMenuNav from "./InRoomTopMenuNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import System from "../../SelfCheckout/assets/system.png";
// import QRCode from "../../SelfCheckout/assets//qrcodeScan.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../slices/BasketSlice";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export const InRoomSelectPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketDetails = useSelector((state: RootState) => state.basket);
  const branchId = useSelector((state: RootState) => state.business?.branchID);

  const business = useSelector((state: RootState) => state.business);

  const totalPrice = basketDetails?.totalPrice ?? 0;
  const tip = basketDetails?.tip ?? 0;

  const BusinessDetails = useSelector(
    (state: RootState) => state.business.businessDetails
  );

  const colorScheme = BusinessDetails?.colour_scheme;

  const items = basketDetails.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    menuItem: {
      _id: item.menuItem?._id,
      menu_category_name: item.menuItem?.menu_category_name,
      menu_group_name: item.menuItem?.menu_group_name,
      menu_item_name: item.menuItem?.menu_item_name,
      menu_item_price: item.menuItem?.menu_item_price,
      menu_item_image: item.menuItem?.menu_item_image,
    },
    name: item.name,
    selectedOptions: item.selectedOptions.map((option) => ({
      name: option.name,
      price: option.price,
    })),
    tableNumber: item.tableNumber,
  }));
  const payload = {
    is_paid: "true",
    channel: "in-room-dining",
    branch_id: branchId,
    businessIdentifier: business?.businessIdentifier,
    customerName: basketDetails?.customerName,
    customerPhone: basketDetails?.customerPhone,
    customerTableNumber: basketDetails?.customerTableNumber,
    items: items,
    totalPrice: basketDetails?.totalPrice,
    totalQuantity: basketDetails?.totalQuantity,
    ordered_by: basketDetails?.customerName || "User",
    menu_items: items,
    total_price: basketDetails?.totalPrice,
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/order/uploadBranchUserOrder`,
        payload
      );
      setLoading(false);
      sessionStorage.setItem(
        "OrderDetails",
        JSON.stringify(response.data.data)
      );
      dispatch(clearBasket());
      navigate("/demo/receipt/in_room_dining");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative ">
      <TopMenuNav exploreMenuText="Select Payment" />
      {loading && <Loader />}

      <div className=" text-center mt-[7px] px-6 mx-[10px] my-10">

        <div className="flex items-center justify-between mt-10">
          <p className=" text-[#000000] text-[18px] font-[400] ">
            Balance Due:
          </p>
          <p className=" text-[#121212]">
            ₦ {totalPrice ? totalPrice.toLocaleString() : "0"}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5">
          <p className=" text-[#000000] text-[18px] font-[500]">
            Tip:
          </p>
          <p className=" text-[#000000]"> ₦{tip.toLocaleString() || 0} </p>
        </div>

        <hr
          className=" border mb-[16px] mt-[24px]"
          style={{ borderColor: colorScheme || "#414141" }}
        />

        <div className="flex items-center justify-between ">
          <p className="text-[#000000] text-[18px] font-[600]">
            Pay:{" "}
          </p>
          <span className="text-[#121212]">
            ₦{(totalPrice + (tip ?? 0)).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center my-10">
        <p
          className=" cursor-pointer inline font-[500] text-[18px] rounded-[10px] border   text-white py-[11px] px-[20px]"
          onClick={handlePayment}
          style={{
            backgroundColor: colorScheme || "#FF0000",
            borderColor: colorScheme || "#ff0000",
          }}
        >
          Proceed to Pay
        </p>
      </div>


    </div>
  );
};
