import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopMenuNav from "./TopMenuNav";
import { Link, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
// import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon";

export const Basket = () => {
  const navigate = useNavigate();
  const basketDetails = useSelector((state: RootState) => state.basket);
  console.log(basketDetails);
  return (
    <div className=" ">
      <TopMenuNav exploreMenuText="Basket" />

      <div className="mt-[68px]">
        {basketDetails?.items.length > 0 ? (
          basketDetails.items.map((item, index) => (
            <>
              <div className="py-[20px] mx-[24px] grid gap-[10px]">
                <p className="">
                  Hello{" "}
                  <span className="font-bold">
                    {basketDetails?.customerName}
                  </span>
                </p>
                <p>
                  Table Number:{" "}
                  <span className="font-bold">
                    {basketDetails?.customerTableNumber}
                  </span>
                </p>
                <p>Below are the items you ordered:</p>
              </div>
              <div key={index}>
                <div className="mx-[24px] border-b pb-[16px] border-[#E7E7E7]">
                  <div className="grid gap-[8px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] text-[#121212] font-[500]">
                        <span className="pr-2">{item.quantity}x</span>
                        {item.name}
                      </p>
                      {item.menuItem && (
                        <p>
                          &#x20A6;
                          {(
                            item.menuItem.menu_item_price * item.quantity
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                    {item.selectedOptions &&
                      item.selectedOptions.length > 0 && (
                        <div className="ml-4">
                          {item.selectedOptions.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex justify-between"
                            >
                              <p className="text-[14px] text-[#121212] font-[400]">
                                {option.name}
                              </p>
                              <p className="text-[14px] text-[#121212] font-[400]">
                                &#x20A6;
                                {(option.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="py-[20px] mx-[24px] text-center text-[16px] text-[#121212] font-[500] grid place-items-center items-center">
            <p className=" text-7xl font-bold text-black">
              <GiShoppingCart />
            </p>
            <p>Your cart is empty.</p>
            <p
              className=" px-[16px] py-[9px] bg-[#DB7F3B] text-white rounded-[8px] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Start Ordering
            </p>
          </div>
        )}
        {basketDetails?.items.length > 0 && (
          <div className="py-[16px] mx-[24px]">
            <div className="flex items-center justify-between">
              <p className="text-[16px] text-[#121212] font-[500]">Total:</p>
              <p className="text-[16px] text-[#121212] font-[500]">
                &#x20A6;{basketDetails?.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="mt-[60px] flex items-center justify-center gap-[16px]">
              <p
                className="cursor-pointer font-[500] text-[16px] text-[#0B7F7C] py-[10px] px-[24px]"
                onClick={() => navigate(-1)}
              >
                Cancel
              </p>
              <Link to="/tip">
                <p className="inline font-[500] text-[16px] rounded-[5px] bg-[#0B7F7C] text-white py-[10px] px-[24px]">
                  Proceed to Pay
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
