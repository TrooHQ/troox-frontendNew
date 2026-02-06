import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import React, { useState } from "react";

export interface DisplayModifier {
  id: string;
  name: string;
  price: string;
  modifier_group: string;
}

/** @deprecated Use DisplayModifier - kept for backward compatibility */
export type Modifier = DisplayModifier;

export interface DisplayModifierGroup {
  id: string;
  name: string;
  modifiers: DisplayModifier[];
}

interface DisplayModifiersProps {
  isGroupFetching: boolean;
  fetchedModifierGroups: DisplayModifierGroup[];
  editId: string | null;
  newGroupName: string;
  setNewGroupName: (value: string) => void;
  handleSaveClick: (group: DisplayModifierGroup) => void;
  handleEditClick: (group: DisplayModifierGroup) => void;
  handleModifierGroupDeleteClick: (groupId: string) => void;
  handleAddModifier: () => void;
  setEditModifierData: React.Dispatch<React.SetStateAction<DisplayModifier | null>>;
  truncateText: (text: string, length: number) => string;
  Add: string;
  handleKeepModifierGroupDetail: (group: DisplayModifierGroup) => void;
  handleDeleteClick: (modifierId: string) => void;
}

const DisplayModifiers: React.FC<DisplayModifiersProps> = ({
  isGroupFetching,
  fetchedModifierGroups,
  editId,
  newGroupName,
  setNewGroupName,
  handleSaveClick,
  handleEditClick,
  handleModifierGroupDeleteClick,
  handleAddModifier,
  setEditModifierData,
  handleKeepModifierGroupDetail,
  truncateText,
  Add,
  handleDeleteClick,
}) => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  const toggleExpandGroup = (groupId: string) => {
    setExpandedGroupId(expandedGroupId === groupId ? null : groupId);
  };

  return (
    <div className="grid gap-[12px] mt-[32px]">
      {isGroupFetching ? (
        <p>Loading modifier groups...</p>
      ) : fetchedModifierGroups.length === 0 ? (
        <p>No modifiers available</p>
      ) : (
        <>
          {fetchedModifierGroups.map((modifierGroup) => (
            <div key={modifierGroup.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-6">
                <div className="flex items-center justify-between border border-[#929292] rounded-[5px] py-[12px] px-[20px] w-[402px]">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => toggleExpandGroup(modifierGroup.id)}
                  >
                    <div className="flex-1">
                      {editId === modifierGroup.id ? (
                        <input
                          type="text"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          className="text-[18px] font-[500] text-gray-800 border-b-2"
                        />
                      ) : (
                        <p className="text-[18px] font-[500] text-gray-800 capitalize">
                          {truncateText(modifierGroup.name, 22)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {editId === modifierGroup.id ? (
                      <button
                        onClick={() => handleSaveClick(modifierGroup)}
                        className="mr-3 cursor-pointer text-black"
                      >
                        Save
                      </button>
                    ) : (
                      <EditOutlined
                        onClick={() => handleEditClick(modifierGroup)}
                        className="mr-0 cursor-pointer text-black"
                        fontSize="small"
                      />
                    )}
                    <DeleteForeverOutlined
                      onClick={() =>
                        handleModifierGroupDeleteClick(modifierGroup.id)
                      }
                      className="ml-3 text-red-700 cursor-pointer"
                      fontSize="small"
                    />
                  </div>
                </div>
                <button
                  className="px-[16px] py-[8px] font-[500] rounded-[5px] text-black text-[16px] flex items-center gap-[8px]"
                  onClick={() => {
                    handleAddModifier();
                    handleKeepModifierGroupDetail(modifierGroup);
                  }}
                >
                  <img src={Add} alt="" /> Add modifier item
                </button>
              </div>

              {expandedGroupId === modifierGroup.id && (
                <div className="p-4 mt-2 border-l-4 border-black-500 rounded-md bg-gray-50">
                  {modifierGroup.modifiers.length > 0 ? (
                    modifierGroup.modifiers.map((modifier) => (
                      <div
                        key={modifier.id}
                        className="flex justify-start gap-6 items-center py-2 border-b border-gray-300 last:border-b-0"
                      >
                        <p className="flex-1 text-sm text-gray-700">
                          {modifier.name}
                        </p>
                        <p className="flex-none text-sm font-semibold text-gray-700">
                          ₦{modifier.price}
                        </p>
                        <div className="flex-1" />
                        <div>
                          <EditOutlined
                            sx={{
                              fontSize: "20px",
                              fontWeight: "300",
                            }}
                            onClick={() => setEditModifierData(modifier)}
                            className="ml-3 cursor-pointer"
                          />
                          <DeleteForeverOutlined
                            onClick={() => handleDeleteClick(modifier.id)}
                            className="ml-3 text-red-700 cursor-pointer"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">
                      No modifiers found for this group.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayModifiers;
