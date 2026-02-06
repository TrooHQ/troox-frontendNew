import React from "react";
import { FaTrashCan, FaXmark } from "react-icons/fa6";

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    categoryName: string;
    subCategoryCount: number;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    categoryName,
    subCategoryCount,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-[440px] bg-white rounded-[16px] p-[24px] relative shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header with Icon */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <FaTrashCan className="text-red-600 text-xl" />
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaXmark className="text-xl" />
                    </button>

                    <h2 className="text-[20px] font-[600] text-[#101010] mb-2">
                        Delete Category?
                    </h2>
                    <p className="text-[14px] text-gray-500 max-w-[320px]">
                        Are you sure you want to delete <span className="font-semibold text-gray-900">"{categoryName}"</span>?
                        This action cannot be undone and will remove {subCategoryCount} sub-category{subCategoryCount !== 1 ? 'ies' : ''}.
                    </p>
                </div>

                {/* Warning Box */}
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm text-orange-800">
                            Deleting this category will also affect any menu items specifically assigned only to this category.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className="w-full py-[12px] bg-red-600 hover:bg-red-700 text-white font-[600] rounded-lg transition-colors shadow-sm"
                    >
                        Yes, delete category
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-[12px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-[600] rounded-lg transition-colors"
                    >
                        No, keep it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;
