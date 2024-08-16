import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopMenuNav from "./OnlineOrderingTopMenuNav";
import { Link, useNavigate } from "react-router-dom";

import Minus from "../assets/minueGrey.svg";
import Add from "../assets/addGrey.svg";
import Delivery from "../assets/delivery.svg";
import Pickup from "../assets/pickup.svg";
import {
  removeItemFromBasket,
  setDeliveryFee,
  updateCustomerAddress,
  updateCustomerDetails,
  updateItemQuantity,
} from "../../slices/BasketSlice";
import { TiDelete } from "react-icons/ti";
import MenuModal from "../Components/MenuModal";
import Back from "../assets/Cancel.svg";
import { useState } from "react";

export const OnlineOrderingBasket = () => {
  const navigate = useNavigate();
  const basketDetails = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [pickupModal, setPickupModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressvalue, setAddressvalue] = useState("");

  const DELIVERY_PRICE = 500;
  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "delivery") {
      setPickupModal(true);
      dispatch(setDeliveryFee(DELIVERY_PRICE));
    } else if (value === "pickup") {
      setDeliveryModal(true);
      dispatch(setDeliveryFee(0));
    }
  };

  const handleCloseDeliveryModal = () => {
    setDeliveryModal(false);
    setPickupModal(false);
    setSelectedOption("");
  };

  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const addressLocation = event.target.value;
    setAddressvalue(addressLocation);
    dispatch(updateCustomerAddress(addressLocation));
  };

  const handleAddressSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCloseDeliveryModal();
    navigate("/demo/tip/online_ordering");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateCustomerDetails({ name: userName, phone, address }));
    handleCloseDeliveryModal();
    navigate("/demo/tip/online_ordering");
  };

  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    dispatch(updateItemQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  return (
    <div className=" ">
      <TopMenuNav exploreMenuText="Basket" />

      <div className="mt-[68px]">
        {basketDetails?.items.length > 0 ? (
          basketDetails.items.map((item, index) => (
            <>
              <div key={index}>
                <div className="mx-[24px]  border-b pb-[16px] border-[#E7E7E7] mt-[16px]">
                  <div className="grid gap-[8px]">
                    <div className="  flex items-start justify-between gap-[20px] place-items-center">
                      <Link
                        to={`/demo/menu-details/${item.id}/online_ordering`}
                      >
                        <p className="text-[16px] text-[#121212] font-[500]">
                          <span className="pr-2">{item.quantity}x</span>
                          {item.name}
                        </p>
                      </Link>
                      <div className="flex items-center mr-[10px]">
                        <img
                          className=" w-[20px]"
                          src={Minus}
                          alt=""
                          onClick={() =>
                            handleDecreaseQuantity(item.id, item.quantity)
                          }
                        />
                        <p className="text-[18px] text-[#000000] font-[500] mx-[10px]">
                          x{item?.quantity}
                        </p>
                        <img
                          className=" w-[20px]"
                          src={Add}
                          alt=""
                          onClick={() =>
                            handleIncreaseQuantity(item.id, item.quantity)
                          }
                        />
                      </div>
                      {item.menuItem && (
                        <p className="text-[#121212]">
                          &#x20A6;
                          {(
                            item.menuItem.menu_item_price * item.quantity
                          ).toLocaleString()}
                        </p>
                      )}

                      <p
                        className=" text-[30px] text-[#606060]"
                        onClick={() =>
                          dispatch(removeItemFromBasket({ id: item.id }))
                        }
                      >
                        <TiDelete />
                      </p>
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
                                {(
                                  option.price * item.quantity
                                ).toLocaleString()}
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
            <p className=" text-7xl font-bold text-black"></p>
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
                &#x20A6;{basketDetails?.totalPrice}
              </p>
            </div>

            {/* <div className="mt-[60px] flex items-center justify-center gap-[16px]">
              <p
                className="cursor-pointer font-[500] border border-[#B11111] rounded-[5px] text-[16px] text-[#B11111] py-[10px] px-[24px]"
                onClick={() => navigate(-1)}
              >
                Cancel
              </p>

              <Link to="/demo/tip/online_ordering">
                <p className=" font-[500] text-[16px] border border-[#11AE16] rounded-[5px] bg-[#11AE16] text-white py-[10px] px-[24px]">
                  Proceed to Pay
                </p>
              </Link>
            </div> */}
          </div>
        )}
      </div>

      {basketDetails?.items.length > 0 && (
        <div className="mt-[40px]">
          <div className="py-[20px] mx-[24px] grid gap-[10px] border-t-[#E7E7E7] border-t">
            <p className="font-[400] text-[14px] text-[#414141]">
              Choose your pickup option
            </p>
            <div className="py-[25px] flex items-center border-b justify-center">
              <label className="flex items-center gap-[12px] px-[24px] border-r cursor-pointer">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="pickup"
                  checked={selectedOption === "pickup"}
                  onChange={handleDeliveryOptionChange}
                  className=""
                />
                <img src={Pickup} alt="Pickup" />
                <p className="font-[500] text-[16px] text-[#414141]">Pickup</p>
              </label>

              <label className="flex items-center gap-[12px] px-[24px] cursor-pointer">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={selectedOption === "delivery"}
                  onChange={handleDeliveryOptionChange}
                  className=""
                />
                <img src={Delivery} alt="Delivery" />
                <p className="font-[500] text-[16px] text-[#414141]">
                  Delivery
                </p>
              </label>
            </div>
          </div>
        </div>
      )}

      <MenuModal isOpen={deliveryModal} onClose={handleCloseDeliveryModal}>
        <form action="" onSubmit={handleAddressSubmit}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={handleCloseDeliveryModal}
            >
              <img src={Back} alt="" />
            </div>
            <div>
              <p className=" text-center text-[18px] font-[500] text-[#121212]">
                Choose your preferred pickup location
              </p>

              <div className="py-[25px] grid gap-[16px]">
                <label className="flex items-center gap-[12px] px-[24px] border-r cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Lekki"
                    checked={addressvalue === "Lekki"}
                    onChange={handleAddress}
                    className=""
                  />
                  <p className="font-[400] text-[18px] text-[#121212]">Lekki</p>
                </label>

                <label className="flex items-center gap-[12px] px-[24px] cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Ikeja"
                    checked={addressvalue === "Ikeja"}
                    onChange={handleAddress}
                    className=""
                  />
                  <p className="font-[400] text-[18px] text-[#121212]">Ikeja</p>
                </label>

                <label className="flex items-center gap-[12px] px-[24px] cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Ikoyi"
                    checked={addressvalue === "Ikoyi"}
                    onChange={handleAddress}
                    className=""
                  />
                  <p className="font-[400] text-[18px] text-[#121212]">Ikoyi</p>
                </label>

                <label className="flex items-center gap-[12px] px-[24px] cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Yaba"
                    checked={addressvalue === "Yaba"}
                    onChange={handleAddress}
                    className=""
                  />
                  <p className="font-[400] text-[18px] text-[#121212]">Yaba</p>
                </label>

                <label className="flex items-center gap-[12px] px-[24px] cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Surulere"
                    checked={addressvalue === "Surulere"}
                    onChange={handleAddress}
                    className=""
                  />
                  <p className="font-[400] text-[18px] text-[#121212]">
                    Surulere
                  </p>
                </label>
              </div>
              <div className="mt-[24px] flex items-center justify-center gap-[16px]">
                <p
                  className="cursor-pointer font-[500] border border-[#B11111] rounded-[5px] text-[16px] text-[#B11111] py-[10px] px-[24px]"
                  onClick={handleCloseDeliveryModal}
                >
                  Cancel
                </p>

                <button
                  type="submit"
                  disabled={!addressvalue}
                  className=" font-[500] text-[16px] border border-[#11AE16] rounded-[5px] bg-[#11AE16] text-white py-[10px] px-[24px]"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal isOpen={pickupModal} onClose={handleCloseDeliveryModal}>
        <form action="" onSubmit={handleSubmit}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={handleCloseDeliveryModal}
            >
              <img src={Back} alt="" />
            </div>
            <div>
              <p className=" text-left text-[18px] font-[500] text-[#121212]">
                Enter your details
              </p>

              <div className="py-[25px] grid gap-[16px]">
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Full Name"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
                <input
                  type="tel"
                  id="name"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
                <input
                  type="text"
                  id="name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
              </div>
              <div className="mt-[24px] flex items-center justify-center gap-[16px]">
                <p
                  className="cursor-pointer font-[500] border border-[#B11111] rounded-[5px] text-[16px] text-[#B11111] py-[10px] px-[24px]"
                  onClick={handleCloseDeliveryModal}
                >
                  Cancel
                </p>

                <button
                  type="submit"
                  disabled={!address || !userName || !phone}
                  className=" font-[500] text-[16px] border border-[#11AE16] rounded-[5px] bg-[#11AE16] text-white py-[10px] px-[24px]"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>
    </div>
  );
};
