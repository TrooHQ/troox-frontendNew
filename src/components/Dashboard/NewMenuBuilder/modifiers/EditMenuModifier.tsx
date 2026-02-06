import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  fetchModifierGroups,
  updateModifierGroup,
  createModifier,
  updateModifier,
  deleteModifier,
} from "../../../../slices/modifierSlice";
import type { ModifierGroupNestedModifier } from "../../../../slices/modifierSlice";
import LayoutComponent from "../../../Overview/Layout/LayoutComponent";
import AddModifierModal from "../components/AddModifierModal";
import EditModifierModal from "../components/EditModifierModal";
import { toast } from "react-toastify";

interface ModifierFormItem {
  id: string | number;
  name: string;
  price: string;
}

const EditMenuModifier: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { modifierGroups, loading } = useSelector(
    (state: RootState) => state.modifier,
  );

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [minSelections, setMinSelections] = useState(0);
  const [maxSelections, setMaxSelections] = useState<number | "Unlimited">(1);
  const [modVisibility, setModVisibility] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiers, setModifiers] = useState<ModifierFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [editingModifier, setEditingModifier] =
    useState<ModifierFormItem | null>(null);

  const group = modifierGroups.find((g) => g.id === id);

  useEffect(() => {
    dispatch(fetchModifierGroups());
  }, [dispatch, id]);

  useEffect(() => {
    if (group && !ready) {
      setGroupName(group.name);
      setDescription(group.description ?? "");
      setMinSelections(group.min_selections ?? 0);
      const max = group.max_selections;
      setMaxSelections(
        max === undefined || max === null || max >= 999 ? "Unlimited" : max,
      );
      setModVisibility(group.is_active ?? true);
      setModifiers(
        (group.modifiers ?? []).map((m: ModifierGroupNestedModifier) => ({
          id: m.id,
          name: m.name,
          price: m.price_delta ?? "0",
        })),
      );
      setReady(true);
    }
  }, [group, ready]);

  const handleAddModifiers = (
    newModifiers: { name: string; price: string }[],
  ) => {
    const baseId = Date.now();
    setModifiers((prev) => [
      ...prev,
      ...newModifiers.map((m, i) => ({
        id: `new-${baseId + i}`,
        name: m.name,
        price: m.price,
      })),
    ]);
  };

  const handleRemoveModifier = (idToRemove: string | number) => {
    setModifiers((prev) => prev.filter((m) => m.id !== idToRemove));
  };

  const handleEditModifierSave = (name: string, price: string) => {
    if (!editingModifier) return;
    setModifiers((prev) =>
      prev.map((m) =>
        m.id === editingModifier.id ? { ...m, name, price } : m,
      ),
    );
  };

  const syncModifiers = async () => {
    const formMods = modifiers.filter((m) => m.name.trim());
    const existingMap = new Map(
      (group!.modifiers ?? []).map((m) => [m.id, m]),
    );

    for (let i = 0; i < formMods.length; i++) {
      const mod = formMods[i];
      const isNew =
        typeof mod.id === "string" && mod.id.startsWith("new-");
      if (isNew) {
        await dispatch(
          createModifier({
            group_id: id!,
            name: mod.name.trim(),
            price_delta: (
              Number.parseFloat(mod.price || "0") || 0
            ).toFixed(2),
            is_active: true,
            sort_order: i,
          }),
        ).unwrap();
      } else if (existingMap.has(String(mod.id))) {
        const orig = existingMap.get(String(mod.id))!;
        const priceFormatted = (
          Number.parseFloat(mod.price || "0") || 0
        ).toFixed(2);
        const changed =
          orig.price_delta !== priceFormatted ||
          orig.name !== mod.name.trim();
        if (changed) {
          await dispatch(
            updateModifier({
              id: String(mod.id),
              name: mod.name.trim(),
              price_delta: priceFormatted,
              is_active: true,
              sort_order: i,
            }),
          ).unwrap();
        }
      }
    }

    for (const existing of group!.modifiers ?? []) {
      const stillInForm = formMods.some((m) => String(m.id) === existing.id);
      if (!stillInForm) {
        await dispatch(deleteModifier(existing.id)).unwrap();
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!groupName.trim() || !id || !group) return;
    setSaving(true);
    try {
      const maxVal =
        maxSelections === "Unlimited" ? 999 : Number(maxSelections);

      await dispatch(
        updateModifierGroup({
          id,
          name: groupName.trim(),
          description: description.trim() || undefined,
          is_active: modVisibility,
          sort_order: 0,
          required: minSelections > 0,
          min_selections: minSelections,
          max_selections: maxVal,
        }),
      ).unwrap();

      await syncModifiers();

      navigate("/menu-modifiers");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    navigate("/menu-modifiers");
    return null;
  }

  if (loading && !group) {
    return (
      <LayoutComponent title="Edit Menu modifiers">
        <div className="flex items-center justify-center min-h-[200px] text-gray-500">
          Loading...
        </div>
      </LayoutComponent>
    );
  }

  if (!group && !loading) {
    navigate("/menu-modifiers");
    return null;
  }

  return (
    <LayoutComponent
      title="Edit Menu modifiers"
      description="Edit modifier group and its modifiers"
      HeaderAction={
        <div className="flex gap-3">
          <Link
            to="/menu-modifiers"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
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
                        : Number(e.target.value),
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
              <div className="flex flex-wrap gap-2">
                {modifiers.map((modifier) => (
                  <span
                    key={modifier.id}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                  >
                    <span className="text-gray-900">{modifier.name}</span>
                    <span className="text-gray-600">+ N{modifier.price}</span>
                    <div className="ml-1 flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => setEditingModifier(modifier)}
                        className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Edit modifier"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveModifier(modifier.id)}
                        className="p-0.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove modifier"
                      >
                        <svg
                          className="w-4 h-4"
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
                  </span>
                ))}
              </div>
            )}

            <div className="max-w-lg">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  className="w-4 h-4"
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

        <EditModifierModal
          isOpen={!!editingModifier}
          onClose={() => setEditingModifier(null)}
          modifier={editingModifier}
          onSave={handleEditModifierSave}
        />
      </div>
    </LayoutComponent>
  );
};

export default EditMenuModifier;
