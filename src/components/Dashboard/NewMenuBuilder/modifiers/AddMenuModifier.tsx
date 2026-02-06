import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { createModifierGroup } from "../../../../slices/modifierSlice";
import LayoutComponent from "../../../Overview/Layout/LayoutComponent";
import AddModifierModal from "../components/AddModifierModal";

interface ModifierFormItem {
  id: number;
  name: string;
  price: string;
}

const AddMenuModifier: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [minSelections, setMinSelections] = useState(0);
  const [maxSelections, setMaxSelections] = useState<number | "Unlimited">(1);
  const [modVisibility, setModVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiers, setModifiers] = useState<ModifierFormItem[]>([]);
  const [saving, setSaving] = useState(false);

  const handleAddModifiers = (
    newModifiers: { name: string; price: string }[]
  ) => {
    const baseId = Date.now();
    setModifiers((prev) => [
      ...prev,
      ...newModifiers.map((m, i) => ({
        id: baseId + i,
        name: m.name,
        price: m.price,
      })),
    ]);
  };

  const handleRemoveModifier = (id: number) => {
    setModifiers(modifiers.filter((m) => m.id !== id));
  };

  const handleSaveChanges = async () => {
    if (!groupName.trim()) return;
    setSaving(true);
    try {
      const maxVal =
        maxSelections === "Unlimited" ? 999 : Number(maxSelections);
      const groupPayload = {
        name: groupName.trim(),
        description: description.trim() || undefined,
        is_active: modVisibility,
        sort_order: 0,
        required: minSelections > 0,
        min_selections: minSelections,
        max_selections: maxVal,
        modifiers:
          modifiers.length > 0
            ? modifiers
                .filter((m) => m.name.trim())
                .map((m, i) => ({
                  name: m.name.trim(),
                  price_delta: (
                    Number.parseFloat(m.price || "0") || 0
                  ).toFixed(2),
                  is_active: true,
                  sort_order: i,
                }))
            : undefined,
      };
      await dispatch(createModifierGroup(groupPayload)).unwrap();
      navigate("/menu-modifiers");
    } catch {
      // Toast handled by thunk
    } finally {
      setSaving(false);
    }
  };

  return (
    <LayoutComponent
      title="Menu modifiers"
      description="Organize your menu with modifier groups and modifiers"
      HeaderAction={
        <div className="flex gap-3">
          <Link
            to="/menu-modifiers"
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            onClick={handleSaveChanges}
            disabled={saving || !groupName.trim()}
            className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      }
    >
      <div className="min-h-screen">
        <div className="h-px w-full bg-gray-100 mb-8" />

        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-3">
            <h3 className="text-base font-semibold text-gray-900">
              Modifier groups
            </h3>
          </div>
          <div className="col-span-9 space-y-6">
            <div className="max-w-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Group name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g Toppings"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="max-w-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g Choose your toppings"
                className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 max-w-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min selections
                </label>
                <select
                  value={minSelections}
                  onChange={(e) => setMinSelections(Number(e.target.value))}
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max selections
                </label>
                <select
                  value={maxSelections}
                  onChange={(e) =>
                    setMaxSelections(
                      e.target.value === "Unlimited"
                        ? "Unlimited"
                        : Number(e.target.value)
                    )
                  }
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 10].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                  <option value="Unlimited">Unlimited</option>
                </select>
              </div>
            </div>

            <div className="max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Show as active
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    This modifier group will be visible on the menu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModVisibility(!modVisibility)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    modVisibility ? "bg-black" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      modVisibility ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 mb-8" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h3 className="text-base font-semibold text-gray-900">Modifiers</h3>
          </div>
          <div className="col-span-9 space-y-4">
            {modifiers.length > 0 && (
              <div className="max-w-lg space-y-3">
                {modifiers.map((modifier) => (
                  <div
                    key={modifier.id}
                    className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {modifier.name}
                      </p>
                      <p className="text-xs text-gray-500">N {modifier.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveModifier(modifier.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="max-w-lg">
              <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add modifiers
              </button>
            </div>
          </div>
        </div>

        <AddModifierModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddModifiers}
          groupName={groupName}
        />
      </div>
    </LayoutComponent>
  );
};

export default AddMenuModifier;
