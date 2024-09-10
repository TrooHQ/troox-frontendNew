import { Close, DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import OutletSelectionRadioGroup from "../OutletSelectionRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchBranches } from "../../../slices/branchSlice";
import ConfirmationDialog from "../ConfirmationDialog";
import Add from "../../../assets/addWhite.svg";
import { truncateText } from "../../../utils/truncateText";
import ModifierModal from "./ModifierModal";

type ModifierRules = {
  requireSelection: boolean;
  optionalShown: boolean;
  optionalNotShown: boolean;
  multipleChoices: boolean;
  singleChoice: boolean;
};

interface Modifier {
  id: number;
  name: string;
  price: string;
}

const Modifiers = ({
  activeMainMenu,
  activeSubMenu,
  selectedBranch,
  selectedMenuItem,
  addModifierModar,
  setAddModifierModal,
  handleAddModifier,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [modifiers, setModifiers] = useState<Modifier[]>([{ id: 1, name: "", price: "" }]);
  const [modifierName, setModifierName] = useState("");
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modifierRules, setModifierRules] = useState<ModifierRules>({
    requireSelection: false,
    optionalShown: false,
    optionalNotShown: false,
    multipleChoices: false,
    singleChoice: false,
  });
  const [fetchedModifiers, setFetchedModifiers] = useState<any[]>([]);
  const [fetchedModifierGroups, setFetchedModifierGroups] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isGroupFetching, setIsGroupFetching] = useState(false);

  const { branches } = useSelector((state: any) => state.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const transformedBranches = branches.map((branch: any) => ({
    label: branch.branch_name,
    id: branch._id,
  }));

  useEffect(() => {
    // Clear the fetched modifiers when activeSubMenu changes
    setFetchedModifiers([]);
  }, [activeSubMenu]);

  const fetchModifierGroups = async () => {
    setIsGroupFetching(true);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllModifierGroups/?branch_id=${selectedBranch?.id}`,
        headers
      );

      setFetchedModifierGroups(response.data.data || []);
      // toast.success("Modifier groups fetched successfully.");
    } catch (error) {
      toast.error("Failed to fetch modifiers.");
    } finally {
      setIsGroupFetching(false);
    }
  };
  const fetchModifiers = async () => {
    setIsFetching(true);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getMenuModifier/?attach_to=item&name=${selectedMenuItem}&branch_id=${selectedBranch?.id}`,
        headers
      );

      setFetchedModifiers(response.data.data || []);
      toast.success("Modifiers fetched successfully.");
    } catch (error) {
      toast.error("Failed to fetch modifiers.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (selectedMenuItem) {
      const fetchData = async () => {
        await Promise.all([fetchModifiers(), fetchModifierGroups()]);
      };
      fetchData();
    }
  }, [selectedMenuItem, selectedBranch?.id, activeSubMenu]);

  const addModifier = () => {
    setModifiers((prev) => [...prev, { id: Date.now(), name: "", price: "", menuItem: "" }]);
  };

  const updateModifier = (id: number, field: string, value: string) => {
    setModifiers((prev) =>
      prev.map((modifier) => (modifier.id === id ? { ...modifier, [field]: value } : modifier))
    );
  };

  const removeModifier = (id: number) => {
    setModifiers((prev) => prev.filter((modifier) => modifier.id !== id));
  };

  const saveModifiers = () => {
    setConfirmSaveModal(true); // Open the confirmation modal
  };

  const handleConfirmSave = async () => {
    // Proceed with saving modifiers after user confirms
    setLoading(true);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const promises = modifiers.map((modifier) => {
      const payload = {
        branch_id: selectedBranch.id,
        attach_to: "item",
        modifier_name: modifier.name,
        menu_item_name: selectedMenuItem,
        price: parseFloat(modifier.price),
      };

      return axios
        .post(`${SERVER_DOMAIN}/menu/addMenuModifier`, payload, headers)
        .then((response) => {
          toast.success(response.data.message || `Modifier ${modifier.name} added successfully.`);
          setAddModifierModal(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {});
    });

    Promise.all(promises)
      .then(() => {
        fetchModifiers();
        setModifiers([]);
      })
      .finally(() => {
        setConfirmSaveModal(false);
        setLoading(false);
        setModifiers([{ id: 1, name: "", price: "" }]);
      });
  };
  console.log(modifiers, "llllll");
  const handleRuleChange = (rule: keyof ModifierRules) => {
    setModifierRules((prevRules) => ({
      ...prevRules,
      [rule]: !prevRules[rule],
    }));
  };

  // Handle apply changes
  const handleApplyChanges = (selectedOutletIds: string[]) => {
    console.log("Selected Outlet IDs:", selectedOutletIds);
  };

  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    id: "",
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    value: "",
  });

  const handleDeleteClick = (modifierId: string) => {
    setConfirmationDialog({ open: true, id: modifierId });
  };
  const handleModifierGroupDeleteClick = (modifierName: string) => {
    setDeleteDialog({ open: true, value: modifierName });
  };

  const handleConfirmDelete = async () => {
    if (confirmationDialog.id) {
      await handleDeleteModifier(confirmationDialog.id);
      setConfirmationDialog({ open: false, id: "" });
    }
  };
  const handleConfirmGroupDelete = async () => {
    if (deleteDialog.value) {
      await handleDeleteModifierGroup(deleteDialog.value);
      setDeleteDialog({ open: false, value: "" });
    }
  };

  const handleDeleteModifierGroup = async (modifierName: string) => {
    try {
      const authToken = localStorage.getItem("token"); // Retrieve the auth token from local storage
      console.log(modifierName, "ooop");
      const response = await axios.delete(
        `${SERVER_DOMAIN}/menu/deleteModifierGroup/?branch_id=${selectedBranch.id}&modifier_group_name=${modifierName}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Optionally refresh the list of modifiers after deletion
        toast.success("Modifier deleted successfully");
        fetchModifierGroups();
      } else {
        toast.error("Failed to delete modifier");
      }
    } catch (error) {
      console.error("Error deleting modifier:", error);
      toast.error("An error occurred while deleting the modifier");
    }
  };

  const handleDeleteModifier = async (modifierId: string) => {
    try {
      const authToken = localStorage.getItem("token"); // Retrieve the auth token from local storage

      const response = await axios.delete(`${SERVER_DOMAIN}/menu/deleteMenuModifier/`, {
        params: {
          branch_id: selectedBranch.id,
          modifier_id: modifierId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        // Optionally refresh the list of modifiers after deletion
        toast.success("Modifier deleted successfully");
        setFetchedModifiers((prevModifiers) =>
          prevModifiers.filter((modifier) => modifier._id !== modifierId)
        );
      } else {
        toast.error("Failed to delete modifier");
      }
    } catch (error) {
      console.error("Error deleting modifier:", error);
      toast.error("An error occurred while deleting the modifier");
    }
  };

  const rules: { label: string; key: keyof ModifierRules }[] = [
    {
      label: "Servers must make a selection for this group",
      key: "requireSelection",
    },
    {
      label: "This group is optional and is shown on add",
      key: "optionalShown",
    },
    {
      label: "This group is optional and is not shown on add",
      key: "optionalNotShown",
    },
    {
      label: "More than one modifier can be chosen",
      key: "multipleChoices",
    },
    {
      label: "Only one modifier can be chosen",
      key: "singleChoice",
    },
  ];

  const [modGroupLoading, setModGroupLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [modGroup, setModGroup] = useState([]);

  const handleAddModifierGroup = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      group_name: groupName,
      branch_id: selectedBranch.id,
    };
    try {
      setModGroupLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/createMenuModifierGroup/`,
        payload,
        headers
      );
      console.log(response, "eeee");
      toast.success(response.data.message || "Successful");
      fetchModifierGroups();
      setModGroup(response.data.data);
      setGroupName("");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setModGroupLoading(false);
    }
  };

  console.log(fetchedModifierGroups);

  const [editId, setEditId] = useState(null); // Track the currently edited modifier
  const [newGroupName, setNewGroupName] = useState(""); // Store the new group name

  const handleEditClick = (modifier: any) => {
    setEditId(modifier._id); // Set the ID of the modifier being edited
    setNewGroupName(modifier.modifier_group_name); // Initialize with the current group name
  };

  const handleSaveClick = async (modifier: any) => {
    const payload = {
      branch_id: selectedBranch.id, // Replace with the correct branch ID
      modifier_group_name: modifier.modifier_group_name,
      new_group_name: newGroupName,
      rule: "single", // Adjust as necessary
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      await axios.put(`${SERVER_DOMAIN}/menu/updateModifierGroup/`, payload, headers);
      // Handle success (e.g., refetch data or update UI)
      setEditId(null); // Exit edit mode
      fetchModifierGroups();
    } catch (error: any) {
      console.error("Error updating modifier group:", error);
      // Handle error
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="">
      <div className=" mt-[32px] max-w-[628px]">
        <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">Modifiers</p>
        <hr className=" border-[#B6B6B6]" />
      </div>

      {/* Display Fetched Modifiers */}
      <div className="grid gap-[12px] mt-[32px]">
        {isGroupFetching ? (
          <p>Loading modifier groups...</p>
        ) : fetchedModifierGroups.length === 0 ? (
          <p>No modifiers available</p> // Placeholder when no modifiers
        ) : (
          <>
            {fetchedModifierGroups.map((modifier) => (
              <div key={modifier._id} className="flex items-center">
                <div
                  key={modifier._id}
                  className=" flex items-center gap-[16px] justify-between  border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      {editId === modifier._id ? (
                        // Render input if in edit mode
                        <input
                          type="text"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          className="text-[18px] font-[500] text-gray-800 border-b-2"
                        />
                      ) : (
                        // Render name if not editing
                        <p className="text-[18px] font-[500] text-gray-800">
                          {truncateText(modifier.modifier_group_name, 22)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {editId === modifier._id ? (
                      // Save button when in edit mode
                      <button
                        onClick={() => handleSaveClick(modifier)}
                        className="text-purple500 mr-3 cursor-pointer"
                      >
                        Save
                      </button>
                    ) : (
                      // Edit button when not in edit mode
                      <EditOutlined
                        onClick={() => handleEditClick(modifier)}
                        className="text-purple500 mr-0 cursor-pointer"
                        fontSize="small"
                      />
                    )}
                    <DeleteForeverOutlined
                      onClick={() => handleModifierGroupDeleteClick(modifier.modifier_group_name)}
                      className="text-red-700 ml-3 cursor-pointer"
                      fontSize="small"
                    />
                  </div>
                </div>
                <button
                  className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifier}
                >
                  <img src={Add} alt="" /> Add - edit modifier item
                </button>
              </div>
            ))}
          </>
        )}

        {/* {isFetching ? (
          <p>Loading modifiers...</p>
        ) : fetchedModifiers.length === 0 ? (
          <p>No modifiers available</p>
        ) : (
          <>
            {fetchedModifiers.map((modifier) => (
              <div
                key={modifier._id}
                className="border p-[16px] rounded-lg shadow-sm flex items-center gap-[16px] justify-between"
              >
                <div className="flex items-center gap-4">
                  <div>
                    {modifier.image ? (
                      <img
                        src={modifier.image}
                        alt={modifier.modifier_name}
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">{modifier.modifier_name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[18px] font-[500] text-gray-800">{modifier.modifier_name}</p>
                    <p className="text-[16px] text-gray-600">Price: ₦ {modifier.modifier_price}</p>
                  </div>
                </div>
                <DeleteForeverOutlined
                  onClick={() => handleDeleteClick(modifier._id)}
                  className="text-red-700 ml-3 cursor-pointer"
                />
              </div>
            ))}
          </>
        )} */}
      </div>

      {/* Modifier Form Section */}
      <div className=" grid gap-[56px]">
        <div>
          {modifiers.map((modifier) => (
            <div key={modifier.id} className="grid gap-[8px]">
              {/* <div className=" mt-[32px] flex items-center gap-[8px]"> */}
              {/* <button
                  className="w-[196px] border border-[#5955B3] rounded-[5px]  px-[16px] py-[8px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifierGroup}
                >
                  {modGroupLoading ? "Loading..." : "Save Modifier Group"}
                </button> */}
              {/* <button
                  className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifierGroup}
                >
                  <img src={Add} alt="" /> Add - edit modifier item
                </button> */}
              {/* </div> */}
              <div className=" mt-[16px] flex items-center gap-[8px]">
                {/* <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                  placeholder=" Enter modifier name "
                  value={modifier.name}
                  onChange={(e) => updateModifier(modifier.id, "name", e.target.value)}
                /> */}

                {/* <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[127px] px-[20px]"
                  placeholder=" Enter price "
                  value={modifier.price}
                  onChange={(e) => updateModifier(modifier.id, "price", e.target.value)}
                /> */}

                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                  placeholder=" Enter modifier group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <button
                  className=" border border-[#5955B3] rounded-[5px]  px-[16px] py-[8px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifierGroup}
                >
                  {modGroupLoading ? "Loading..." : "Save"}
                </button>
                <div className="flex items-center">
                  {modifiers.length > 1 && <Close onClick={() => removeModifier(modifier.id)} />}
                </div>
                {/* <button
                  className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifierGroup}
                >
                  <img src={Add} alt="" /> Add - edit modifier item
                </button> */}
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center gap-[8px]">
            {/* <button
              className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]"
              onClick={addModifier}
            >
              Add
            </button>
            <button className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]">
              Edit
            </button> */}
          </div>
        </div>

        <div className="">
          <div className=" mt-[32px] max-w-[628px]">
            <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">Modifier Rules</p>
            <hr className=" border-[#B6B6B6]" />
            <div>
              {rules.map((rule) => (
                <div key={rule.key} className="flex items-center gap-[16px] my-[16px]">
                  <input
                    type="checkbox"
                    id={rule.key}
                    className="h-6 w-6 border-[#87878780]"
                    checked={modifierRules[rule.key]}
                    onChange={() => handleRuleChange(rule.key)}
                  />
                  <label htmlFor={rule.key} className="text-[16px] font-[400] text-[#000000]">
                    {rule.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className=" border-[#B6B6B6]" />
            <OutletSelectionRadioGroup
              allOutlets={transformedBranches}
              onApplyChanges={handleApplyChanges}
            />
            <hr className=" border-[#B6B6B6] mt-3" />
            <div className="flex items-center justify-end py-[16px]">
              <div
                className="cursor-pointer inline border mb-5 border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                onClick={saveModifiers}
              >
                <button className=" text-[16px]">Save Modifier</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationDialog
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, id: "" })}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this modifier?`}
      />

      {confirmSaveModal && (
        <Modal isOpen={confirmSaveModal} onClose={() => setConfirmSaveModal(false)}>
          <div className="w-[443px] px-[32px] py-[32px]">
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={() => setConfirmSaveModal(false)}
            >
              <Close />
            </div>
            <div className="flex flex-col gap-[24px] items-center justify-center">
              <p className="text-grey500 text-[22px] font-[500]">Save modifier(s)</p>
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to save the modifier(s)?
              </p>
              <div
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={handleConfirmSave}
              >
                <button className="text-[16px]">{loading ? "Sending..." : "Yes"}</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmationDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, value: "" })}
        onConfirm={handleConfirmGroupDelete}
        message={`Are you sure you want to delete this modifier group?`}
      />

      {/* Add modifier modal */}
      <ModifierModal
        addModifierModar={addModifierModar}
        setAddModifierModal={setAddModifierModal}
        handleConfirmSave={handleConfirmSave}
        modifiers={modifiers}
        setModifiers={setModifiers}
      />
    </div>
  );
};

export default Modifiers;
