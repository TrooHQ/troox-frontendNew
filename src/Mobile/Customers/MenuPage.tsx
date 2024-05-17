import image1 from "../assets/image 39.png";

import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import ArrowRight from "../assets/chevronrightt.svg";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { useEffect, useState } from "react";

interface Details {
  name: string;
  business_name: string;
}
export const MenuPage = () => {
  const [menuCategory, setMenuCategory] = useState<Details[]>([]);
  const business_name = sessionStorage.getItem("business_name");
  const business_identifier = sessionStorage.getItem("business_identifier");
  const token = sessionStorage.getItem("token");

  const getCategories = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuCategory/?business_identifier=${business_identifier}`,
        headers
      );
      console.log(
        "Business Details Retrieved successfully:",
        response.data.data
      );
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
                <Link to={`/${business_name}/category-details/${menu.name}`}>
                  <div className=" flex items-center">
                    <p className=" text-[14px] text-[#0B7F7C] font-[400] leading-[21px]">
                      Explore Menu
                    </p>
                    <img src={ArrowRight} alt="" />
                  </div>
                </Link>
              </div>
              <div className=" pt-[16px] pb-[20px] border-b">
                <img src={image1} alt="" className=" w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
