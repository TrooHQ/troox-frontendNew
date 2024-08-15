import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../../../Api/Api";
import { toast } from "react-toastify";
import Modal from "../../Modal"; // Import the Modal component, adjust path accordingly

const Modifiers = ({
  activeMainMenu,
  activeSubMenu,
  handleAddModifier,
  Add,
  selectedBranch,
  menuItems,
}: any) => {
  const [modifiers, setModifiers] = useState([
    { id: Date.now(), name: "", price: "", menuItem: "" },
  ]);
  const [menuOptions, setMenuOptions] = useState<any[]>([]);
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMenuOptions(menuItems);
  }, [menuItems]);

  const addModifier = () => {
    setModifiers([
      ...modifiers,
      { id: Date.now(), name: "", price: "", menuItem: "" },
    ]);
  };

  const updateModifier = (id: number, field: string, value: string) => {
    setModifiers(
      modifiers.map((modifier) =>
        modifier.id === id ? { ...modifier, [field]: value } : modifier
      )
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
    modifiers.forEach((modifier) => {
      const payload = {
        branch_id: selectedBranch.id,
        attach_to: "item",
        modifier_name: modifier.name,
        menu_item_name: modifier.menuItem,
        price: parseFloat(modifier.price),
      };

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post(`${SERVER_DOMAIN}/menu/addMenuModifier`, payload, headers)
        .then((response) =>
          toast.success(
            response.data.message ||
              `Modifier ${modifier.name} added successfully.`
          )
        )
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => {
          setConfirmSaveModal(false);
          setLoading(false);
        });
    });
    // setConfirmSaveModal(false);
    // setSuccessModal(true);
  };

  return (
    <div className="">
      <div className=" mt-[32px] max-w-[628px]">
        <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
          Modifier
        </p>
        <hr className=" border-[#B6B6B6]" />
      </div>
      <div className=" grid gap-[56px]">
        <div>
          {modifiers.map((modifier) => (
            <div key={modifier.id} className="grid gap-[16px]">
              <div className=" mt-[32px] flex items-center gap-[8px]">
                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[202px] px-[20px]"
                  placeholder=" Enter modifier name "
                  value={modifier.name}
                  onChange={(e) =>
                    updateModifier(modifier.id, "name", e.target.value)
                  }
                />

                <select
                  className="border border-[#929292] rounded-[5px] py-[12px] px-[20px] w-[202px]"
                  value={modifier.menuItem}
                  onChange={(e) =>
                    updateModifier(modifier.id, "menuItem", e.target.value)
                  }
                >
                  <option value="">Select Menu Item</option>
                  {menuOptions.map((item) => (
                    <option key={item._id} value={item.menu_item_name}>
                      {item.menu_item_name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[127px] px-[20px]"
                  placeholder=" Enter price "
                  value={modifier.price}
                  onChange={(e) =>
                    updateModifier(modifier.id, "price", e.target.value)
                  }
                />
                <div className="flex items-center">
                  <button
                    className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                    onClick={handleAddModifier}
                  >
                    <img src={Add} alt="" /> Add - edit modifier item
                  </button>
                  {modifiers.length > 1 && (
                    <Close onClick={() => removeModifier(modifier.id)} />
                  )}
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
            <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
              Modifier Rules
            </p>
            <hr className=" border-[#B6B6B6]" />
            <div className="">
              <div className="flex items-center gap-[16px] my-[16px]">
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
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  This group is optional and is shown on add
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  This group is optional and is not shown on add
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  More than one modifier can be chosen
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  Only one modifier can be chosen{" "}
                </label>
              </div>
            </div>
            <hr className=" border-[#B6B6B6]" />
            <div className="flex items-center justify-end py-[16px]">
              <div
                className="cursor-pointer inline border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
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
        <Modal
          isOpen={confirmSaveModal}
          onClose={() => setConfirmSaveModal(false)}
        >
          <div className="w-[443px] px-[32px] py-[32px]">
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={() => setConfirmSaveModal(false)}
            >
              <Close />
            </div>
            <div className="flex flex-col gap-[24px] items-center justify-center">
              <p className="text-grey500 text-[22px] font-[500]">
                Save changes
              </p>
              <p className="text-[16px] font-[400] text-grey500">
                Do you want to save changes made to this menu?
              </p>
              <div
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={handleConfirmSave}
              >
                <button className="text-[16px]">
                  {loading ? "Sending..." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Success Modal (if needed) */}
      {successModal && (
        <Modal isOpen={successModal} onClose={() => setSuccessModal(false)}>
          <div className="w-[443px] px-[32px] py-[32px]">
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={() => setSuccessModal(false)}
            >
              <Close />
            </div>
            <div className="flex flex-col gap-[24px] items-center justify-center">
              <p className="text-grey500 text-[22px] font-[500]">Success!</p>
              <p className="text-[16px] font-[400] text-grey500">
                Modifiers have been saved successfully.
              </p>
              <div
                className="border border-purple500 bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={() => setSuccessModal(false)}
              >
                <button className="text-[16px]">Close</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Modifiers;
