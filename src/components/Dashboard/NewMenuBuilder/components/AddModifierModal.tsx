import React, { useState, useEffect } from 'react';

interface ModifierRow {
  id: number;
  name: string;
  price: string;
}

interface AddModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (modifiers: { name: string; price: string }[]) => void;
  groupName: string;
}

const AddModifierModal: React.FC<AddModifierModalProps> = ({
  isOpen,
  onClose,
  onSave,
  groupName,
}) => {
  const [rows, setRows] = useState<ModifierRow[]>([]);

  useEffect(() => {
    if (isOpen) {
      setRows([{ id: Date.now(), name: '', price: '' }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateRow = (id: number, field: 'name' | 'price', value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now(), name: '', price: '' }]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  const handleSave = () => {
    const valid = rows.filter((r) => r.name.trim());
    if (valid.length > 0) {
      onSave(
        valid.map((r) => ({ name: r.name.trim(), price: r.price.trim() || '0' }))
      );
      onClose();
    }
  };

  const hasValidRows = rows.some((r) => r.name.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start flex-shrink-0">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Modifiers for "{groupName || 'Group'}"
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Add modifiers for the {groupName || 'current'} group
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {rows.map((row) => (
            <div key={row.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                  placeholder="e.g Extra Cheese"
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price(N)
                </label>
                <input
                  type="text"
                  value={row.price}
                  onChange={(e) => updateRow(row.id, 'price', e.target.value)}
                  placeholder="2,000"
                  className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-shrink-0 pb-1">
                <button
                  type="button"
                  onClick={addRow}
                  className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                  aria-label="Add row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length === 1}
                  className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                  aria-label="Remove row"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasValidRows}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0A0A0A] rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save modifiers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModifierModal;
