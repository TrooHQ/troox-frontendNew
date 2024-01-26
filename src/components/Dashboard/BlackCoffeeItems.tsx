import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/addWhite.svg";
import Publish from "../../assets/publish.svg";
import CoffeeLayout from "./CoffeeLayout";
import MenuLayout from "./MenuLayout";
import BlackCoffeeList from "./BlackCoffeeList";

const BlackCoffeeItems = () => {
  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <Link to="/">
                  <button className="text-[16px] flex items-center gap-[8px]">
                    <img src={Add} alt="" /> Add new menu
                  </button>
                </Link>
              </div>
              <div className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
                <Link to="/">
                  <button className="text-[14px] flex items-center gap-[8px]">
                    <img src={Publish} alt="" /> Publish changes
                  </button>
                </Link>
              </div>
            </div>
            <div className=" flex">
              <MenuLayout />
              <div className="w-full ">
                <div className="mt-[24px] border border-[#5955B3] p-[16px] flex">
                  <div className="">
                    <p className=" font-[400] text-[12px] text-[#606060]">
                      Menu Group
                    </p>
                    <CoffeeLayout />
                  </div>
                  <div className="  w-full">
                    <p className=" font-[400] text-[12px] text-[#606060]">
                      {" "}
                      Menu Item
                    </p>

                    <div className=" mt-[4px] py-[12px] px-[8px]">
                      <div className=" flex justify-between items-center">
                        <p className=" text-[16px] font-[500] text-[#5855B3]">
                          Black Coffee
                        </p>
                        <div className=" ">
                          <Link to="/">
                            <button className="w-[196px]  px-[10px] py-[6px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]">
                              <img src={Add} alt="" /> Add Menu Item
                            </button>
                          </Link>
                        </div>
                      </div>
                      <BlackCoffeeList />
                      {/* <div className=" mt-[16px]">
                        <div className=" grid gap-[8px]">
                          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                            <div className=" flex gap-[8px]">
                              <img src={Coffee} alt="" />
                              <div className="">
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Item
                                </p>
                                <p className=" leading-[24px] text-[16px] text-[#121212] font-[500]">
                                  Cappuccino
                                </p>
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Modifier groups (6)
                                </p>
                              </div>
                            </div>
                            <div className=" flex">
                              <p className=" text-[16px] font-[500] text-[#121212]">
                                N1200-N1800
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                            <div className=" flex gap-[8px]">
                              <img src={Coffee} alt="" />
                              <div className="">
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Item
                                </p>
                                <p className="leading-[24px] text-[16px] text-[#121212] font-[500]">
                                  Cappuccino
                                </p>
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Modifier groups (6)
                                </p>
                              </div>
                            </div>
                            <div className=" flex">
                              <p className=" text-[16px] font-[500] text-[#121212]">
                                N1200-N1800
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                            <div className=" flex gap-[8px]">
                              <img src={Coffee} alt="" />
                              <div className="">
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Item
                                </p>
                                <p className=" leading-[24px] text-[16px] text-[#121212] font-[500]">
                                  Cappuccino
                                </p>
                                <p className=" text-[12px] font-[400] text-grey300">
                                  Modifier groups (6)
                                </p>
                              </div>
                            </div>
                            <div className=" flex">
                              <p className=" text-[16px] font-[500] text-[#121212]">
                                N1200-N1800
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className=" mt-[16px] flex items-center justify-end">
                          <Link to="/">
                            <button className="w-[196px]  px-[16px] py-[8px] font-[500] border border-[#5955B3] rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]">
                              <img src={Add} alt="" /> Add Menu Item
                            </button>
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className=" mt-[32px] max-w-[628px]">
                    <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
                      Modifier Coffee
                    </p>
                    <hr className=" border-[#B6B6B6]" />
                  </div>
                  <div className=" grid gap-[56px]">
                    <div className="grid gap-[16px]">
                      <div className=" mt-[32px]  flex items-center gap-[8px]">
                        <input
                          type="text"
                          className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                          placeholder=" Enter modifier name "
                        />
                        <input
                          type="text"
                          className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[127px] px-[20px]"
                          placeholder=" Enter price "
                        />
                        <div className="">
                          <Link to="/">
                            <button className="  px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]">
                              <img src={Add} alt="" /> Add - edit modifier item
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className=" flex items-center gap-[8px]">
                        <button className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]">
                          Add
                        </button>
                        <button className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]">
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="">
                      <div className=" mt-[32px] max-w-[628px]">
                        <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
                          Modifier Rules
                        </p>
                        <hr className=" border-[#B6B6B6]" />
                      </div>

                      <div className="">
                        <div className="flex items-center gap-[16px] mt-[16px]">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            className="h-6 w-6 border-[#87878780]"
                          />
                          <label
                            htmlFor="rememberMe"
                            className="text-[16px] font-[400] text-[#000000]"
                          >
                            Servers must make a selection for this group
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default BlackCoffeeItems;
