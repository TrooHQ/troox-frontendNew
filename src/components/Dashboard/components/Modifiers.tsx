import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import Modal from "../../Modal"; // Import the Modal component, adjust path accordingly
import OutletSelectionRadioGroup from "../OutletSelectionRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchBranches, userSelectedBranch } from "../../../slices/branchSlice";

type ModifierRules = {
  requireSelection: boolean;
  optionalShown: boolean;
  optionalNotShown: boolean;
  multipleChoices: boolean;
  singleChoice: boolean;
};

const Modifiers = ({
  activeMainMenu,
  activeSubMenu,
  handleAddModifier,
  Add,
  selectedBranch,
  menuItems,
  selectedMenuItem,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [modifiers, setModifiers] = useState([
    { id: Date.now(), name: "", price: "", menuItem: "" },
  ]);
  const [menuOptions, setMenuOptions] = useState<any[]>([]);
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
  const [isFetching, setIsFetching] = useState(false);

  const { branches } = useSelector((state: any) => state.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const transformedBranches = branches.map((branch: any) => ({
    label: branch.branch_name,
    id: branch._id,
  }));

  useEffect(() => {
    setMenuOptions(menuItems);
  }, [menuItems]);

  useEffect(() => {
    // Clear the fetched modifiers when activeSubMenu changes
    setFetchedModifiers([]);
  }, [activeSubMenu]);

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
    console.log(activeMainMenu, selectedBranch);
    if (selectedMenuItem) {
      fetchModifiers();
    }
  }, [selectedMenuItem, selectedBranch?.id, activeSubMenu]);

  // useEffect(() => {
  //   const fetchModifiers = async () => {
  //     setIsFetching(true);
  //     const headers = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     };
  //     try {
  //       const response = await axios.get(
  //         `${SERVER_DOMAIN}/menu/getMenuModifier/?attach_to=item&name=${selectedMenuItem}&branch_id=${selectedBranch?.id}`,
  //         headers
  //       );

  //       setFetchedModifiers(response.data.data || []);
  //       toast.success("Modifiers fetched successfully.");
  //     } catch (error) {
  //       toast.error("Failed to fetch modifiers.");
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   console.log(activeMainMenu, selectedBranch);
  //   if (selectedMenuItem) {
  //     fetchModifiers();
  //   }
  //   // fetchModifiers();
  // }, [selectedMenuItem, selectedBranch?.id, activeSubMenu]);

  const addModifier = () => {
    setModifiers([...modifiers, { id: Date.now(), name: "", price: "", menuItem: "" }]);
  };

  const updateModifier = (id: number, field: string, value: string) => {
    setModifiers(
      modifiers.map((modifier) => (modifier.id === id ? { ...modifier, [field]: value } : modifier))
    );
  };

  const removeModifier = (id: number) => {
    setModifiers(modifiers.filter((modifier) => modifier.id !== id));
  };

  const saveModifiers = () => {
    setConfirmSaveModal(true); // Open the confirmation modal
  };

  const handleConfirmSave = () => {
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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });

    Promise.all(promises)
      .then(() => {
        fetchModifiers();
        setModifiers([]);
      })
      .finally(() => {
        setConfirmSaveModal(false);
        setLoading(false);
      });
  };

  const handleRuleChange = (rule: keyof ModifierRules) => {
    setModifierRules((prevRules) => ({
      ...prevRules,
      [rule]: !prevRules[rule],
    }));
  };

  // Handle apply changes
  const handleApplyChanges = (selectedOutletIds: string[]) => {
    // Handle the application of changes based on the selected outlets
    console.log("Selected Outlet IDs:", selectedOutletIds);

    // If you need to update state or perform any actions with the selected outlets, do it here
    // For example, you could filter branches, make an API call, or update local state
    // Assuming you want to save the selected outlets to state, you could do:
    // setSelectedOutlets(selectedOutletIds);

    // Placeholder toast for demonstration
    // toast.info("Changes applied to selected outlets");
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

  return (
    <div className="">
      <div className=" mt-[32px] max-w-[628px]">
        <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">Modifier</p>
        <hr className=" border-[#B6B6B6]" />
      </div>

      {/* Display Fetched Modifiers */}
      <div className="grid gap-[24px] mt-[32px]">
        {isFetching ? (
          <p>Loading modifiers...</p> // Loading indicator
        ) : fetchedModifiers.length === 0 ? (
          <p>No modifiers available</p> // Placeholder when no modifiers
        ) : (
          <>
            {fetchedModifiers.map((modifier) => (
              <div
                key={modifier._id}
                className="border p-[16px] rounded-lg shadow-sm flex items-center gap-[16px]"
              >
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
            ))}
          </>
        )}
      </div>

      {/* Modifier Form Section */}
      <div className=" grid gap-[56px]">
        <div>
          {modifiers.map((modifier) => (
            <div key={modifier.id} className="grid gap-[16px]">
              <div className=" mt-[32px] flex items-center gap-[8px]">
                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                  placeholder=" Enter modifier name "
                  value={modifier.name}
                  onChange={(e) => updateModifier(modifier.id, "name", e.target.value)}
                />

                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[127px] px-[20px]"
                  placeholder=" Enter price "
                  value={modifier.price}
                  onChange={(e) => updateModifier(modifier.id, "price", e.target.value)}
                />
                <div className="flex items-center">
                  {/* <button
                    className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                    onClick={handleAddModifier}
                  >
                    <img src={Add} alt="" /> Add - edit modifier item
                  </button> */}
                  {modifiers.length > 1 && <Close onClick={() => removeModifier(modifier.id)} />}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center gap-[8px]">
            <button
              className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]"
              onClick={addModifier}
            >
              Add
            </button>
            <button className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]">
              Edit
            </button>
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

      {/* Confirmation Modal */}
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
    </div>
  );
};

export default Modifiers;
