import React, { useState, useEffect } from "react";

interface EditModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  modifier: { id: string | number; name: string; price: string } | null;
  onSave: (name: string, price: string) => void;
}

const EditModifierModal: React.FC<EditModifierModalProps> = ({
  isOpen,
  onClose,
  modifier,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (modifier) {
      setName(modifier.name);
      setPrice(modifier.price);
    }
  }, [modifier]);

  if (!isOpen || !modifier) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), price.trim() || "0");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden relative">
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit modifier
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g Extra Cheese"
              className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price(N)
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2,000"
              className="block w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-6 pt-0 flex justify-end gap-3">
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
            disabled={!name.trim()}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0A0A0A] rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModifierModal;
