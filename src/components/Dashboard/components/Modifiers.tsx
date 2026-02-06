import { Close } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import Modal from "../../Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchBranches } from "../../../slices/branchSlice";
import {
  fetchModifierGroups,
  fetchModifiers,
  createModifierGroup,
  updateModifierGroup,
  deleteModifierGroup,
  createModifier,
  updateModifier,
  deleteModifier,
  ModifierGroup,
} from "../../../slices/modifierSlice";
import type { DisplayModifierGroup } from "./DisplayModifiers";
import ConfirmationDialog from "../ConfirmationDialog";
import Add from "../../../assets/addWhite.svg";
import { truncateText } from "../../../utils/truncateText";
import ModifierModal from "./ModifierModal";
import DisplayModifiers from "./DisplayModifiers";

interface ModifierFormItem {
  id: number;
  name: string;
  price: string;
}

const Modifiers = ({
  activeSubMenu: _activeSubMenu,
  selectedBranch: _selectedBranch,
  selectedMenuItem: _selectedMenuItem,
  addModifierModar,
  setAddModifierModal,
  handleAddModifier,
  setEditModifierData,
  editModifierData,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { modifierGroups, modifiers, loading } = useSelector(
    (state: RootState) => state.modifier
  );

  const [modifierFormItems, setModifierFormItems] = useState<ModifierFormItem[]>([
    { id: 1, name: "", price: "" },
  ]);
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ModifierGroup | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    id: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, value: "" });
  const [modGroupLoading, setModGroupLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");

  const setEditModifierDataHandler = (data: typeof editModifierData) => {
    if (setEditModifierData) setEditModifierData(data);
  };

  useEffect(() => {
    if (editModifierData) {
      setModifierFormItems([
        {
          id: 1,
          name: editModifierData.name,
          price: String(editModifierData.price ?? ""),
        },
      ]);
    }
  }, [editModifierData]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchModifierGroups());
    dispatch(fetchModifiers());
  }, [dispatch]);

  const groupsWithModifiers: DisplayModifierGroup[] = useMemo(() => {
    return modifierGroups.map((group) => ({
      id: group.id,
      name: group.name,
      modifiers: modifiers.filter((m) => m.modifier_group === group.id),
    }));
  }, [modifierGroups, modifiers]);

  const handleKeepModifierGroupDetail = (group: DisplayModifierGroup) => {
    setSelectedGroup(group);
  };

  const removeModifier = (id: number) => {
    setModifierFormItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleConfirmSave = async () => {
    if (!selectedGroup || !modifierFormItems[0]?.name) return;
    setLocalLoading(true);
    try {
      await dispatch(
        createModifier({
          name: modifierFormItems[0].name,
          modifier_group: selectedGroup.id,
          price: String(Number.parseFloat(modifierFormItems[0].price || "0") || 0),
        })
      ).unwrap();
      setAddModifierModal(false);
      setModifierFormItems([{ id: 1, name: "", price: "" }]);
      setSelectedGroup(null);
    } catch {
      // Toast handled by thunk
    } finally {
      setLocalLoading(false);
      setConfirmSaveModal(false);
    }
  };

  const handleUpdateMod = async () => {
    if (!editModifierData) return;
    setLocalLoading(true);
    try {
      await dispatch(
        updateModifier({
          id: editModifierData.id,
          name: editModifierData.name ?? "",
          price: String(Number.parseFloat(String(editModifierData.price ?? "0")) || 0),
        })
      ).unwrap();
      setEditModifierDataHandler(null);
      setAddModifierModal(false);
      setModifierFormItems([{ id: 1, name: "", price: "" }]);
    } catch {
      // Toast handled by thunk
    } finally {
      setLocalLoading(false);
      setConfirmSaveModal(false);
    }
  };

  const handleDeleteClick = (modifierId: string) => {
    setConfirmationDialog({ open: true, id: modifierId });
  };

  const handleModifierGroupDeleteClick = (groupId: string) => {
    setDeleteDialog({ open: true, value: groupId });
  };

  const handleConfirmDelete = async () => {
    if (confirmationDialog.id) {
      await dispatch(deleteModifier(confirmationDialog.id));
      setConfirmationDialog({ open: false, id: "" });
    }
  };

  const handleConfirmGroupDelete = async () => {
    if (deleteDialog.value) {
      await dispatch(deleteModifierGroup(deleteDialog.value));
      setDeleteDialog({ open: false, value: "" });
    }
  };

  const handleAddModifierGroup = async () => {
    if (!groupName.trim()) return;
    setModGroupLoading(true);
    try {
      await dispatch(
        createModifierGroup({
          name: groupName.trim(),
          is_active: true,
          min_selections: 0,
          max_selections: 1,
        })
      ).unwrap();
      setGroupName("");
    } catch {
      // Toast handled by thunk
    } finally {
      setModGroupLoading(false);
    }
  };

  const handleEditClick = (group: DisplayModifierGroup) => {
    setEditId(group.id);
    setNewGroupName(group.name);
  };

  const handleSaveClick = async (group: DisplayModifierGroup) => {
    if (!newGroupName.trim()) return;
    try {
      await dispatch(
        updateModifierGroup({ id: group.id, name: newGroupName.trim() })
      ).unwrap();
      setEditId(null);
    } catch {
      // Toast handled by thunk
    }
  };

  const isLoading = loading || localLoading;

  return (
    <div className="">
      <div className=" mt-[32px] max-w-[628px]">
        <p className=" text-[20px] font-[500] text-black mb-[8px]">Modifiers</p>
        <hr className=" border-[#B6B6B6]" />
      </div>

      <DisplayModifiers
        isGroupFetching={loading}
        fetchedModifierGroups={groupsWithModifiers}
        editId={editId}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        handleSaveClick={handleSaveClick}
        handleEditClick={handleEditClick}
        handleModifierGroupDeleteClick={handleModifierGroupDeleteClick}
        handleAddModifier={handleAddModifier}
        setEditModifierData={setEditModifierDataHandler}
        truncateText={truncateText}
        Add={Add}
        handleKeepModifierGroupDetail={handleKeepModifierGroupDetail}
        handleDeleteClick={handleDeleteClick}
      />

      <div className=" grid gap-[56px]">
        <div>
          {modifierFormItems.map((modifier) => (
            <div key={modifier.id} className="grid gap-[8px]">
              <div className=" mt-[16px] flex items-center gap-[8px]">
                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                  placeholder=" Enter modifier group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button
                  className=" border border-[#121212] rounded-[5px]  px-[16px] py-[8px] font-[500] text-black text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddModifierGroup}
                >
                  {modGroupLoading ? "Loading..." : "Save"}
                </button>
                <div className="flex items-center">
                  {modifierFormItems.length > 1 && (
                    <Close onClick={() => removeModifier(modifier.id)} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmationDialog
        open={confirmationDialog.open}
        onClose={() => setConfirmationDialog({ open: false, id: "" })}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this modifier?`}
      />

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
                Save modifier(s)
              </p>
              <p className="text-[16px] font-[400] text-grey500">
                Are you sure you want to save the modifier(s)?
              </p>
              <div
                className="border borderblack bg-black rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={handleConfirmSave}
              >
                <button className="text-[16px]">
                  {isLoading ? "Sending..." : "Yes"}
                </button>
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

      <ModifierModal
        addModifierModar={addModifierModar}
        setAddModifierModal={setAddModifierModal}
        handleConfirmSave={handleConfirmSave}
        modifiers={modifierFormItems}
        setModifiers={setModifierFormItems}
        editModifierData={editModifierData}
        setEditModifierData={setEditModifierDataHandler}
        loading={isLoading}
        handleUpdateMod={handleUpdateMod}
      />
    </div>
  );
};

export default Modifiers;
