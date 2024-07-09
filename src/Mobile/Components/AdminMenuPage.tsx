import { Link } from "react-router-dom";
import ArrowRight from "../assets/chevronrightt.svg";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TopMenuNav from "./TopMenuNav";
import Loader from "../../components/Loader";

interface Details {
  name: string;
  business_name: string;
  image: string;
}

export const AdminMenuPage = () => {
  const [menuCategory, setMenuCategory] = useState<Details[]>([]);
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state: RootState) => state.user);
  const token = userDetails?.userData?.token;

  const business_name = userDetails?.userData?.business_name;

  const getCategories = async () => {
    setLoading(true);

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
      setMenuCategory(response.data.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="relative mx-[16px]">
      {loading && <Loader />}
      <div className="">
        <TopMenuNav title="Menu" />

        <div className="px-[21px]">
          {menuCategory.map((menu, index) => (
            <Link key={index} to={`/${business_name}/menu-page/${menu.name}`}>
              <div className="mt-[24px]">
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-[500] text-[#121212] uppercase">
                    {truncateText(menu.name, 15)}
                  </p>
                  <div className="flex items-center">
                    <p className="text-[14px] text-[#0B7F7C] font-[400] leading-[21px]">
                      Explore Menu
                    </p>
                    <img src={ArrowRight} alt="" />
                  </div>
                </div>
                <div className="pt-[16px] pb-[20px] border-b max-w-[200px] mx-auto">
                  <img src={menu?.image} alt="" className="w-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
