import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { ArrowBack, Close, DeleteForeverOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import clsx from "clsx";
import ConfirmationDialog from "./ConfirmationDialog";
import { Tooltip } from "@mui/material";
import SearchIcon from "../../assets/searchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../slices/branchSlice";
import { AppDispatch } from "../../store/store";
import { fetchMenuItems } from "../../slices/menuSlice";

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
  _id: string;
  name: string;
  manager: string;
}

interface ConfirmationDialogState {
  open: boolean;
  id: string | null;
}

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const branches = useSelector((state: any) => state.branches.branches);
  const { menuItems, loading } = useSelector((state: any) => state.menu);

  const [openModal, setOpenModal] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState<Modifiers | null>(null);
  const [viewingBranch, setViewingBranch] = useState<Branch | null>(null);

  const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({});

  const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogState>({
    open: false,
    id: null,
  });

  // Set toggleStates after menuItems are fetched
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      const initialState: { [key: string]: boolean } = {};
      menuItems.forEach((item: any) => {
        initialState[item._id] = true; // Default all items to enabled
      });
      setToggleStates(initialState);
    }
  }, [menuItems]);

  const handleToggleChange = (id: string) => {
    setConfirmationDialog({ open: true, id });
  };

  const handleConfirmToggleChange = () => {
    const { id } = confirmationDialog;
    if (id !== null) {
      setToggleStates((prevStates) => ({
        ...prevStates,
        [id]: !prevStates[id],
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
    dispatch(fetchMenuItems({ branch_id: branch._id }));
  };

  const handleBackToBranches = () => {
    setViewingBranch(null);
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

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
                  {branches.map((branch: any) => (
                    <tr key={branch._id} className="bg-[#ffffff]">
                      <td className="text-base font-medium py-2 px-4 text-start">
                        {branch.branch_name}
                      </td>
                      <td className="text-base font-medium py-2 px-4 text-start">
                        {branch.branch_email}
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
              className="border border-purple500 text-purple500 mb-4 rounded-[6px] px-2 flex items-center"
            >
              {" "}
              <ArrowBack />
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
                    <th className="py-2 px-4 text-base font-normal">Menu Group</th>
                    <th className="py-2 px-4 text-base font-normal text-start">Menu Name</th>
                    <th className="py-2 px-4 text-base font-normal">Quantity</th>
                    <th className="py-2 px-4 text-base font-normal">Price</th>
                    <th className="py-2 px-4 text-base font-normal">Modifiers</th>
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
                        <td className="text-base font-medium py-2 px-4">{item.menu_group_name}</td>
                        <td className="text-base font-medium py-2 px-4">{item.menu_item_name}</td>
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
                          &#8358;{item.menu_item_price}
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
                ) : (
                  <div>
                    <p className="text-center min-w-full">No menu items found</p>
                  </div>
                )}
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
