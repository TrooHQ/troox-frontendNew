import { SetStateAction, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { Close, DeleteForeverOutlined, X } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import clsx from "clsx";

interface Modifier {
  name: string;
  price: string;
}

interface Modifiers {
  addOns: Modifier[];
  proteins: Modifier[];
}

const data = [
  {
    id: 1,
    menuName: "Semo",
    qty: 250,
    status: "Restocked",
    price: "₦2000",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 2,
    menuName: "Amala",
    qty: 300,
    status: "Restocked",
    price: "₦1300",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 3,
    menuName: "Poundo yam",
    qty: 50,
    status: "Almost out of stock",
    price: "₦2500",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 4,
    menuName: "Eba",
    qty: 250,
    status: "Restocked",
    price: "₦1400",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 5,
    menuName: "Jollof rice",
    qty: 450,
    status: "Restocked",
    price: "₦3000",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 6,
    menuName: "Fried rice",
    qty: 28,
    status: "Almost out of stock",
    price: "₦2000",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 7,
    menuName: "Grilled chicken",
    qty: 0,
    status: "Out of stock",
    price: "₦4000",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 8,
    menuName: "Fried chicken",
    qty: 450,
    status: "Restocked",
    price: "₦2000",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
  {
    id: 9,
    menuName: "Coconut rice",
    qty: 300,
    status: "Restocked",
    price: "₦3400",
    modifiers: {
      addOns: [
        { name: "Egusi Soup", price: "₦1500" },
        { name: "Oha Soup", price: "₦1500" },
        { name: "Ogbono Soup", price: "₦1500" },
        { name: "White Soup", price: "₦1500" },
      ],
      proteins: [
        { name: "Goat Meat", price: "₦1500" },
        { name: "Beef", price: "₦1500" },
        { name: "Snail", price: "₦1500" },
        { name: "Tilapia", price: "₦1500" },
      ],
    },
  },
];

const MenuList = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState<Modifiers | null>(null);

  const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>(() => {
    const initialState: { [key: number]: boolean } = {};
    data.forEach((item) => {
      initialState[item.id] = true; // Default all items to enabled
    });
    return initialState;
  });

  const handleToggleChange = (id: any) => {
    // Check if the item is currently unfrozen and prompt for confirmation
    if (
      toggleStates[id] &&
      !window.confirm("Are you sure you want to do this? This item will become unavailable.")
    ) {
      return; // Early return if the user cancels the action
    }

    // Proceed to toggle the state as before
    setToggleStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Restocked":
        return "bg-green-100 text-green-800";
      case "Almost out of stock":
        return "bg-red-100 text-red-800";
      case "Out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const handleOpenModal = (modifiers: any) => {
    setSelectedModifiers(modifiers);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedModifiers(null);
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Menu" />
      <div className="">
        <div className="my-[40px]">
          <div className="flex items-center justify-between">
            <div className=" flex items-center gap-[32px]">
              <div className="">
                <p className=" font-[500] text-[16px] text-[#121212]">Filter by:</p>
              </div>
              <div className=" flex items-center gap-[8px]">
                <div className="border border-purple500 bg-purple500  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#ffffff]">
                  <button className="text-[12px] ">Add</button>
                </div>
                <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[121212]">
                  <button className="text-[12px] ">Menu Name</button>
                </div>
                <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                  <button className="text-[12px] ">Quantity</button>
                </div>
                <div className="border border-[#B6B6B6]  rounded-[5px] px-[16px] py-[8px] font-[400] text-[#121212]">
                  <button className="text-[12px] ">Price</button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#606060] text-white text-center text-base font-normal">
                  <th className="py-2 px-4 text-base font-normal">Menu Name</th>
                  <th className="py-2 px-4 text-base font-normal">Quantity</th>
                  <th className="py-2 px-4 text-base font-normal">Price</th>
                  <th className="py-2 px-4 text-base font-normal">Modifiers</th>
                  <th className="py-2 px-4 text-base font-normal">Actions</th>
                </tr>
              </thead>

              <hr className="mb-2 text-[#E7E7E7]" />

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"}`}
                  >
                    <td className="text-base font-medium py-2 px-4">{item.menuName}</td>
                    <td className="text-base font-medium text-center py-2 px-4 break-words">
                      <div className="flex justify-start gap-0 items-center pl-[60px]">
                        <span className="w-[60px] ml-0">{item.qty}</span>
                        {item.status !== "Restocked" && (
                          <span
                            className={`inline-block py-1 px-2 rounded-full text-xs ${getStatusBgColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-base font-medium text-center py-2 px-4 break-words">
                      {item.price}
                    </td>
                    <td className="text-base font-medium text-center py-2 px-4 break-words">
                      <button
                        className="text-blue-500"
                        onClick={() => handleOpenModal(item.modifiers)}
                      >
                        Click to see modifiers
                      </button>
                    </td>

                    <td className="flex items-center text-center">
                      <IconButton onClick={() => handleToggleChange(item.id)} color="default">
                        {toggleStates[item.id] ? (
                          <ToggleOnIcon style={{ color: "#5855B3", fontSize: "40px" }} />
                        ) : (
                          <ToggleOffIcon style={{ fontSize: "40px" }} />
                        )}
                      </IconButton>
                      <span
                        className={clsx(
                          toggleStates[item.id] ? "text-[#5855b3]" : "text-gray-700",
                          "text-base font-medium"
                        )}
                      >
                        {toggleStates[item.id] ? "Unfreeze" : "Freeze"}
                      </span>
                      <DeleteForeverOutlined className="text-red-700 ml-3" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white min-w-[30%] p-6 rounded-lg z-10 relative">
              <h2 className="text-lg font-semibold mb-4">
                Semo
                <span className="text-sm font-normal ml-5">MODIFIER</span>
              </h2>
              <hr className="h-[1px] bg-[#929292] my-3" />

              {selectedModifiers && (
                <>
                  <div>
                    <h3 className="font-semibold text-sm mb-2 text-[#414141]">Add-Ons:</h3>
                    <ul>
                      {selectedModifiers.addOns.map((addOn: any, index: any) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-lg font-normal text-[#414141]">{addOn.name}</span>
                          <span className="text-lg font-medium  text-[#414141]">{addOn.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="h-[1px] bg-[#929292] my-3" />

                  <div className="mt-4">
                    <h3 className="font-semibold text-sm mb-2 text-[#414141]">Proteins:</h3>
                    <ul>
                      {selectedModifiers.proteins.map((protein: any, index: any) => (
                        <li key={index} className="flex justify-between">
                          <span className="text-lg font-normal text-[#414141]">{protein.name}</span>
                          <span className="text-lg font-medium text-[#414141]">
                            {protein.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <Close className="absolute top-3 right-3 cursor-pointer" onClick={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MenuList;
