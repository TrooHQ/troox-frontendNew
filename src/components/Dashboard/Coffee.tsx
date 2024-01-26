import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import Publish from "../../assets/publish.svg";

import chevron_right from "../../assets/chevron_right.svg";
import { useState } from "react";

interface MenuItem {
  title: string;
  data: {
    type: string;
    data: {
      img: string;
      price: string;
      name: string;
    }[];
  }[];
}
const Coffee = () => {
  const Menu: string[] = ["coffee", "soup", "pizza"];
  const arrayDummy: MenuItem[] = [
    {
      title: "coffee",
      data: [
        {
          type: "coffee",
          data: [
            { img: "", price: "200-300", name: "brown coffee" },
            { img: "", price: "100-500", name: "brown coffee1" },
            { img: "", price: "800-900", name: "brown coffee2" },
            { img: "", price: "200-400", name: "brown coffee3" },
          ],
        },
        {
          type: "black coffee",
          data: [
            { img: "", price: "100-200", name: "spanish coffee" },
            { img: "", price: "200-500", name: "spanish coffee1" },
            { img: "", price: "300-500", name: "spanish coffee1" },
            { img: "", price: "400-500", name: "spanish coffee1" },
          ],
        },
        {
          type: "latte",
          data: [
            { img: "", price: "100-550", name: "latte special" },
            { img: "", price: "150-750", name: "latte special1" },
            { img: "", price: "200-550", name: "latte special2" },
            { img: "", price: "200-450", name: "latte special3" },
          ],
        },
        {
          type: "expreso",
          data: [
            { img: "", price: "450-500", name: "espreso Chocolate" },
            { img: "", price: "300-500", name: "espreso Chocolate1" },
            { img: "", price: "200-500", name: "espreso Chocolate2" },
            { img: "", price: "100-500", name: "espreso Chocolate3" },
          ],
        },
      ],
    },
    {
      title: "soup",
      data: [
        {
          type: "Egusi",
          data: [
            { img: "", price: "1000-2000", name: "Fried Egusi" },
            { img: "", price: "1500-2000", name: "Boiled Egusi" },
            { img: "", price: "1300-2000", name: "Fried Egusi2" },
            { img: "", price: "1700-2000", name: "Fried Egusi3" },
          ],
        },
        {
          type: "Vegitable",
          data: [
            { img: "", price: "1000-2000", name: "Boiled Vegitable" },
            { img: "", price: "1500-2000", name: "fried Vegitable" },
            { img: "", price: "1300-2000", name: "Stewed Vegitable2" },
          ],
        },
      ],
    },
    {
      title: "pizza",
      data: [
        {
          type: "Spanish Pizza",
          data: [
            { img: "", price: "2000-3000", name: "Vegitabele Pizza" },
            { img: "", price: "100-200", name: "Chicken Pizza" },
            { img: "", price: "200-400", name: "Beef Pizza" },
          ],
        },
      ],
    },
  ];

  const [subMenu, setSubmenu] = useState<MenuItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  // const SubMenuContent = [];

  const getSubmenu = (data: string) => {
    const array = arrayDummy.filter((e) => e.title === data);
    setSubmenu(array);
    console.log(array);
  };
  const toggleGroup = (groupTitle: string) => {
    if (selectedGroup === groupTitle) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(groupTitle);
    }
  };
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
            <div className=""></div>
            <div className=" flex ">
              {/* {Menu.map((data, index) => (
                <div className=" grid gap-5">
                  <button
                    className={`text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px] 
                    )}`}
                  >
                    COFFEE <img src={chevron_right} alt="" />
                  </button>
                </div>
              ))} */}
              <div className="mt-[24px]">
                <nav className="flex flex-col gap-[8px]">
                  {Menu.map((data, index) => (
                    <button
                      onClick={() => getSubmenu(data)}
                      key={index}
                      className={`  text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                    >
                      {data} <img src={chevron_right} alt="" />
                    </button>
                  ))}
                </nav>
              </div>
              <div className="">
                <div className="mt-[24px] w-full border p-[16px]">
                  <p className=" font-[400] text-[12px] text-[#606060]">
                    Menu Group
                  </p>
                  {subMenu.map((menuGroup, index) => (
                    <div key={index}>
                      {menuGroup.data.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          <p
                            className=" text-grey200 hover:bg-purple100 flex justify-between items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]"
                            onClick={() => toggleGroup(group.type)}
                          >
                            {group.type}{" "}
                            <img src={chevron_right} alt="" className=" " />
                          </p>

                          <div className="">
                            {selectedGroup === group.type && (
                              <div>
                                {group.data.map(
                                  (
                                    item: { name: string; price: string },
                                    itemIndex: number
                                  ) => (
                                    <div className=" mt-[16px]" key={itemIndex}>
                                      <div className=" grid gap-[8px]">
                                        <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                                          <div className=" flex gap-[8px]">
                                            {/* <img src={Coffee} alt="" /> */}
                                            <div className="">
                                              <p className=" text-[12px] font-[400] text-grey300">
                                                Item
                                              </p>
                                              <p className=" leading-[24px] text-[16px] text-[#121212] font-[500]">
                                                {item.name}
                                              </p>
                                              <p className=" text-[12px] font-[400] text-grey300">
                                                Modifier groups (6)
                                              </p>
                                            </div>
                                          </div>
                                          <div className=" flex">
                                            <p className=" text-[16px] font-[500] text-[#121212]">
                                              {item.price}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <p>{item.name}</p>
                                      <p>{item.price}</p> */}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>{" "}
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

export default Coffee;
