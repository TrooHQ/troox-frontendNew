import { Link } from "react-router-dom";
import ArrowRight from "../assets/chevronrightt.svg";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopMenuNav from "../Customers/TopMenuNav";

interface Details {
  name: string;
  business_name: string;
  image: string;
}
export const AdminMenuPage = () => {
  const [menuCategory, setMenuCategory] = useState<Details[]>([]);

  const businessDetails = useSelector(
    (state: RootState) => state.business?.businessDetails
  );
  console.log(businessDetails);

  const userDetails = useSelector((state: RootState) => state.user);
  const token = userDetails?.userData?.token;

  const business_name = businessDetails?.business_name;

  const getCategories = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuCategory`,
        headers
      );
      console.log("Business Details Retrieved successfully:", response.data);
      setMenuCategory(response.data.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className=" relative ">
      <div className="  ">
        <TopMenuNav />

        <div className=" px-[21px] ">
          {menuCategory.map((menu) => (
            <div className="mt-[24px]">
              <div className=" flex items-center justify-between ">
                <p className=" text-[16px] font-[500] text-[#121212]  uppercase">
                  {menu.name}
                </p>
                <Link to={`/${business_name}/menu-page/${menu.name}`}>
                  <div className=" flex items-center">
                    <p className=" text-[14px] text-[#0B7F7C] font-[400] leading-[21px]">
                      Explore Menu
                    </p>
                    <img src={ArrowRight} alt="" />
                  </div>
                </Link>
              </div>
              <div className=" pt-[16px] pb-[20px] border-b">
                <img src={menu?.image} alt="" className=" w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
