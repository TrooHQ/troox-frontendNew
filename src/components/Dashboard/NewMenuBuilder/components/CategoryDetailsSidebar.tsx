import React from 'react';
import { Category } from '../../../../slices/categorySlice';
import { FaXmark } from "react-icons/fa6";

interface Props {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryDetailsSidebar: React.FC<Props> = ({ category, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !category) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-[450px] bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onEdit(category)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category)}
              className="text-sm font-medium text-red-500 hover:text-red-600"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaXmark className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Status</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${category.is_active
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-600'
                }`}
            >
              {category.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Sub-categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Sub-categories</h3>
            <div className="space-y-4">
              {category.subcategories && category.subcategories.length > 0 ? (
                category.subcategories.map((sub, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{sub.name}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${sub.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {sub.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No sub-categories.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetailsSidebar;
