import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  fetchModifierGroups,
  fetchModifiers,
  deleteModifierGroup,
} from "../../../../slices/modifierSlice";
import LayoutComponent from "../../../Overview/Layout/LayoutComponent";

const MenuModifiers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { modifierGroups, modifiers, loading } = useSelector(
    (state: RootState) => state.modifier
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchModifierGroups());
    dispatch(fetchModifiers());
  }, [dispatch]);

  const tableRows = useMemo(() => {
    return modifierGroups.map((group) => {
      const count =
        group.modifiers?.length ??
        modifiers.filter(
          (m) =>
            (m as { modifier_group?: string; group_id?: string }).modifier_group ===
              group.id ||
            (m as { modifier_group?: string; group_id?: string }).group_id ===
              group.id
        ).length;
      return {
        id: group.id,
        name: group.name,
        modifierCount: count,
        minSelection: group.min_selections ?? 0,
        maxSelection: group.max_selections ?? 1,
      };
    });
  }, [modifierGroups, modifiers]);

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return tableRows;
    return tableRows.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tableRows, searchQuery]);

  const handleEditClick = (row: (typeof tableRows)[0]) => {
    navigate(`/menu-modifiers/${row.id}/edit`);
  };

  const handleDeleteClick = (row: (typeof tableRows)[0]) => {
    setDeleteConfirm({ id: row.id, name: row.name });
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirm) {
      await dispatch(deleteModifierGroup(deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  return (
    <LayoutComponent
      title="Menu modifiers"
      description="Organize your menu with modifier groups and modifiers"
      HeaderAction={
        <Link
          to="/menu-modifiers/add"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-medium">New Modifier Group</span>
        </Link>
      }
    >
      <div className="min-h-screen">
        <div className="mb-8">
          <div className="relative max-w-sm">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              placeholder="Search by group name"
            />
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                >
                  Modifier groups
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                >
                  Modifiers
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                >
                  Min selection
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                >
                  Max selection
                </th>
                <th scope="col" className="px-6 py-4 w-24"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    Loading modifier groups...
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {row.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {row.modifierCount} modifiers
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {row.minSelection}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {row.maxSelection}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex gap-2 justify-end items-center">
                          <button
                            onClick={() => handleEditClick(row)}
                            className="p-2 text-gray-400 rounded-lg border border-gray-200 transition-colors hover:text-gray-600 hover:bg-gray-50"
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
                            onClick={() => handleDeleteClick(row)}
                            className="p-2 text-red-500 rounded-lg border border-red-100 transition-colors hover:bg-red-50"
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && filteredRows.length === 0 && (
            <div className="py-12 text-center">
              <svg
                className="mx-auto w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No modifiers found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or create a new modifier group.
              </p>
            </div>
          )}
        </div>

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete modifier group
              </h3>
              <p className="text-gray-700 mb-6">
                You are about to delete{" "}
                <span className="font-semibold">{deleteConfirm.name}</span>{" "}
                group. This action cannot be undone.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default MenuModifiers;
