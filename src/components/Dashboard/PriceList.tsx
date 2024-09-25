import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Print from "../../assets/print.svg";
import edit from "../../assets/edit.png";
import SearchIcon from "../../assets/searchIcon.svg";
import { fetchMenuItems } from "../../slices/menuSlice";

import Publish from "../../assets/publish.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "@/src/store/store";

const PriceList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { menuItems, loading } = useSelector((state: any) => state.menu);
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(selectedBranch);
  console.log(menuItems);
  useEffect(() => {
    dispatch(fetchMenuItems({ branch_id: selectedBranch?.id }));
  }, []);

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Price List" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[16px] flex items-center gap-[8px]">
                  <img src={Print} alt="" /> Print price list
                </button>
              </div>
              <div className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
                <button className="text-[14px] flex items-center gap-[8px]">
                  <img src={Publish} alt="" /> Publish changes
                </button>
              </div>
            </div>

            <div className="my-[40px]">
              <div className="flex items-center justify-between">
                <div></div>
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <input
                      type="text"
                      className="bg-[#F8F8F8] rounded p-2 pl-14 outline-none border border-[#5855B3]"
                      placeholder="Search"
                    />
                    <img
                      src={SearchIcon}
                      alt=""
                      className="absolute left-6 top-3 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#606060] text-white text-center text-base font-normal">
                      <th className="py-2 px-4 text-base font-normal">Menu Group</th>
                      <th className="py-2 px-4 text-base font-normal text-start">Menu Name</th>
                      <th className="py-2 px-4 text-base font-normal">Price</th>
                      <th className="py-2 px-4 text-base font-normal">Actions</th>
                    </tr>
                  </thead>

                  <hr className="mb-2 text-[#E7E7E7]" />

                  {loading ? (
                    <div className="text-center min-w-full">Loading...</div>
                  ) : menuItems.length !== 0 ? (
                    <tbody>
                      {menuItems.map((item: any, index: number) => (
                        <tr
                          key={item.id}
                          className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"}`}
                        >
                          <td className="text-base font-medium py-2 px-4">
                            {item.menu_group_name}
                          </td>
                          <td className="text-base font-medium py-2 px-4">{item.menu_item_name}</td>
                          <td className="text-base font-medium text-center py-2 px-4 break-words">
                            &#8358;{parseFloat(item.menu_item_price).toLocaleString()}
                          </td>

                          <td className="flex items-center text-center">
                            <button className="flex items-center gap-2">
                              <img src={edit} alt="" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <div>
                      <p className="text-center min-w-full">No menu items found</p>
                    </div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PriceList;
