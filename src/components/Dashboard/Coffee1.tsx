import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import AddWhite from "../../assets/addWhite.svg";
import Publish from "../../assets/publish.svg";
import chevron_right from "../../assets/chevron_right.svg";
import activeArrow from "../../assets/activeArrow.svg";
import { useState } from "react";
import CoffeeImg from "../../assets/coffeeImg.png";

interface MenuItem {
  type?: string;
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
  const Menu: string[] = [
    "coffee",
    "soups",
    "specials",
    "desert",
    "happy meal",
  ];
  const arrayDummy: MenuItem[] = [
    {
      title: "coffee",
      data: [
        {
          type: "coffee",
          data: [
            { img: "", price: "200-300", name: "brown coffee" },
            {
              img: "",
              price: "100-500",
              name: "brown coffee1",
            },
            {
              img: "",
              price: "800-900",
              name: "brown coffee2",
            },
            {
              img: "",
              price: "200-400",
              name: "brown coffee3",
            },
          ],
        },
        {
          type: "black coffee",
          data: [
            {
              img: "",
              price: "100-200",
              name: "spanish coffee",
            },
            {
              img: "",
              price: "200-500",
              name: "spanish coffee1",
            },
            {
              img: "",
              price: "300-500",
              name: "spanish coffee1",
            },
            {
              img: "",
              price: "400-500",
              name: "spanish coffee1",
            },
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
      title: "soups",
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
      title: "specials",
      data: [
        {
          type: " chinese special",
          data: [
            { img: "", price: "2000-3000", name: "Vegitabele Pizza" },
            { img: "", price: "100-200", name: "Chicken Pizza" },
            { img: "", price: "200-400", name: "Beef Pizza" },
          ],
        },
      ],
    },
    {
      title: "desert",
      data: [
        {
          type: "desert Pizza",
          data: [
            { img: "", price: "2000-3000", name: "Vegitabele Pizza" },
            { img: "", price: "100-200", name: "Chicken Pizza" },
            { img: "", price: "200-400", name: "Beef Pizza" },
          ],
        },
      ],
    },
    {
      title: "happy meal",
      data: [
        {
          type: "happy meal Pizza",
          data: [
            { img: "", price: "2000-3000", name: "Vegitabele Pizza" },
            { img: "", price: "100-200", name: "Chicken Pizza" },
            { img: "", price: "200-400", name: "Beef Pizza" },
          ],
        },
      ],
    },
    {
      title: "Drinks",
      data: [
        {
          type: "red wine",
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

  const [subMenuContent, setSubmenuContent] = useState<
    {
      img: string;
      price: string;
      name: string;
    }[]
  >([]);
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  // const [type, setType] = useState<string | null>(null);
  const [menuType, setMenuType] = useState<string>("");

  const getSubmenu = (data: string) => {
    const array = arrayDummy.filter((e) => e.title === data);

    if (array.length > 0) {
      const firstData = array[0].data[0];
      if (firstData) {
        // @ts-ignore
        setSubmenu(array[0].data);
        setActiveSubMenu(firstData.type || null);
        setSubmenuContent(firstData.data);
        setActiveMainMenu(array[0].title);
        console.log(array[0].data);
      }
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
            <div className=" flex ">
              <div className="mt-[24px]">
                <nav className="flex flex-col gap-[8px]">
                  {Menu.map((data, index) => (
                    <button
                      onClick={() => getSubmenu(data)}
                      key={index}
                      className={`${
                        activeMainMenu === data &&
                        " bg-purple100 text-purple600 font-[500]"
                      }  text-grey200 hover:bg-purple100 uppercase flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                    >
                      {data}{" "}
                      {activeMainMenu === data ? (
                        <img src={activeArrow} />
                      ) : (
                        <img src={chevron_right} alt="" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              <div className=" flex-grow">
                <div className="mt-[24px] w-full border p-[16px]">
                  <div className=" flex gap-[16px] items-start">
                    <div className=" w-[204px]">
                      <p className=" font-[400] text-[12px] text-[#606060]">
                        Menu Group
                      </p>
                      <div className="">
                        {subMenu.map((data, index) => (
                          <p
                            className={`${
                              activeSubMenu === data.type
                                ? " font-[500] text-[#5855B3] "
                                : " text-grey200"
                            }  hover:bg-purple100 flex justify-between cursor-pointer items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]`}
                            key={index}
                            onClick={() => {
                              // @ts-ignore
                              setSubmenuContent(data.data),
                                setActiveSubMenu(data.type || null);
                              // @ts-ignore
                              setMenuType(data.type);
                            }}
                          >
                            {data.type}
                            {activeSubMenu === data.type ? (
                              <img src={activeArrow} />
                            ) : (
                              <img src={chevron_right} alt="" />
                            )}
                          </p>
                        ))}
                        <div className=" w-[196px]  px-[10px] py-[6px] font-[500] text-purple500">
                          <Link to="/">
                            <button className="text-[16px] flex items-center gap-[8px]">
                              <img src={AddWhite} alt="" /> Add Menu Group
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className=" flex-grow space-y-[16px]">
                      <p className=" font-[400] text-[12px] text-[#606060]">
                        Menu Item
                      </p>
                      <div className=" flex items-start justify-between ">
                        <p className=" text-[16px] font-[500] text-[#5855B3]">
                          {menuType || "Type"}
                        </p>
                        <div className=" ">
                          <Link to="/">
                            <button className="w-[196px]  px-[10px] py-[6px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]">
                              <img src={AddWhite} alt="" /> Add Menu Item
                            </button>
                          </Link>
                        </div>
                      </div>
                      {subMenuContent.map((data, index) => (
                        <div className="" key={index}>
                          <div className=" grid gap-[8px]">
                            <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                              <div className=" flex gap-[8px]">
                                <img src={CoffeeImg} alt="" />

                                <div className="">
                                  <p className=" text-[12px] font-[400] text-grey300">
                                    Item
                                  </p>
                                  <p className=" leading-[24px] text-[16px] text-[#121212] font-[500] capitalize">
                                    {data.name}
                                  </p>
                                  <p className=" text-[12px] font-[400] text-grey300">
                                    Modifier groups (6)
                                  </p>
                                </div>
                              </div>
                              <div className=" flex">
                                <p className=" text-[16px] font-[500] text-[#121212]">
                                  {data.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default Coffee;
