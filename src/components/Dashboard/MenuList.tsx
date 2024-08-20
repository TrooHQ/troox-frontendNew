import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { Close, DeleteForeverOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import clsx from "clsx";
import ConfirmationDialog from "./ConfirmationDialog";
import { Tooltip } from "@mui/material";
import SearchIcon from "../../assets/searchIcon.svg";
import BackButtonMain from "../buttons/BackButtonMain";

interface Modifier {
  name: string;
  price: string;
}

interface Modifiers {
  addOns: Modifier[];
  proteins: Modifier[];
}

interface Branch {
  id: number;
  name: string;
  manager: string;
}

const branches: Branch[] = [
  { id: 1, name: "Branch A", manager: "John Doe" },
  { id: 2, name: "Branch B", manager: "Jane Smith" },
  { id: 3, name: "Branch C", manager: "Alice Johnson" },
];

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

interface ConfirmationDialogState {
  open: boolean;
  id: string | null;
}

const MenuList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState<Modifiers | null>(null);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);

  const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>(() => {
    const initialState: { [key: number]: boolean } = {};
    data.forEach((item) => {
      initialState[item.id] = true; // Default all items to enabled
    });
    return initialState;
  });

  const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogState>({
    open: false,
    id: null,
  });

  const handleToggleChange = (id: any) => {
    setConfirmationDialog({ open: true, id });
  };

  const handleConfirmToggleChange = () => {
    const { id } = confirmationDialog;
    if (id !== null) {
      setToggleStates((prevStates) => ({
        ...prevStates,
        [id]: !prevStates[id as any],
      }));
    }
    setConfirmationDialog({ open: false, id: null });
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

  const handleViewMore = (branch: Branch) => {
    setViewingBranch(branch);
  };

  const handleBackToBranches = () => {
    setViewingBranch(null);
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Menu" />
      <div className="">
        {viewingBranch === null ? (
          <div className="my-[40px]">
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-center text-base font-normal">
                    <th className="py-2 px-4 text-base font-normal text-start">Branch Name</th>
                    <th className="py-2 px-4 text-base font-normal text-start">Manager</th>
                    <th className="py-2 px-4 text-base font-normal text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className="bg-[#ffffff]">
                      <td className="text-base font-medium py-2 px-4 text-start">{branch.name}</td>
                      <td className="text-base font-medium py-2 px-4 text-start">
                        {branch.manager}
                      </td>
                      <td className="text-base font-medium py-2 px-4 text-center">
                        <button className="text-blue-500" onClick={() => handleViewMore(branch)}>
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="my-[40px]">
            <button
              onClick={handleBackToBranches}
              className="border border-purple500 text-purple500 mb-4 rounded-[6px] px-2"
            >
              Back
            </button>
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
                        <Tooltip
                          title="Freezing this menu list will remove it from all your product channels"
                          arrow
                        >
                          <IconButton onClick={() => handleToggleChange(item.id)} color="default">
                            {toggleStates[item.id] ? (
                              <ToggleOnIcon style={{ color: "#5855B3", fontSize: "40px" }} />
                            ) : (
                              <ToggleOffIcon style={{ fontSize: "40px" }} />
                            )}
                          </IconButton>
                        </Tooltip>
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
        )}

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
      <ConfirmationDialog
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, id: null })}
        onConfirm={handleConfirmToggleChange}
        message={`Are you sure you want to ${
          confirmationDialog.id !== null && toggleStates[confirmationDialog.id as any]
            ? "freeze"
            : "unfreeze"
        } this menu item? ${
          confirmationDialog.id !== null && toggleStates[confirmationDialog.id as any]
            ? "Freezing it will remove it from all your product channels."
            : ""
        }`}
      />
    </DashboardLayout>
  );
};

export default MenuList;
