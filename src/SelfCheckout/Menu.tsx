import TakeAway from "../SelfCheckout/assets/take-away.svg";
import DineIn from "../SelfCheckout/assets/dine-in.svg";
import Header from "./Header";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
interface Details {
  name: string;
  business_name: string;
  image: string;
}
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const [menuCategory, setMenuCategory] = useState<Details[]>([]);

  const businessDetails = useSelector(
    (state: RootState) => state?.business?.businessDetails
  );
  console.log(businessDetails);

  const business_identifier = businessDetails?._id;
  // const business_name = businessDetails?.business_name;

  const getCategories = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuCategory/?business_identifier=${business_identifier}`,
        headers
      );
      console.log("Business Details Retrieved successfully:", response.data);
      setMenuCategory(response.data.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Header />

      <div className=" mt-[53px]">
        <div className=" px-[21px]">
          <p className=" font-[400] text-[40px] text-[#121212]">
            Menu Category
          </p>
        </div>
        <div className=" px-[21px] items-center place-items-center grid grid-cols-3 gap-[24px] mt-[10px]">
          {menuCategory.map((menu) => (
            <Link to={`/category-details/${menu?.name}`}>
              <div className=" w-[304px] grid  gap-[12px] items-center place-items-center ">
                <div className=" h-[200px] w-[200px] text-center bg-[#FF0000] border-[8px] border-[#FFE100] rounded-full drop-shadow-md">
                  <div className="overflow-hidden h-full w-full rounded-full">
                    <img
                      src={menu.image}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
                <p className=" text-center text-[20px] font-[500] text-[#414141]  uppercase py-[22px] font-GeneralSans">
                  {menu?.name?.length > 18
                    ? `${menu?.name.substring(0, 18)}...`
                    : menu?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className=" pb-[128px] pt-[57px] px-[103px] flex flex-col items-center justify-center">
          <p className=" text-[36px] font-[500] text-[#000000]">
            How would you like your order?
          </p>
          <div
            className=" flex items-center gap-[23px] mt-[44px]"
            onClick={() => setIsOpen(false)}
          >
            <img src={TakeAway} alt="" className=" cursor-pointer" />
            <img src={DineIn} alt="" className=" cursor-pointer" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
