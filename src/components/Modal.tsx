import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-[20px] max-w-full max-h-[90%] overflow-y-auto p-4">
          <div>{children}</div>
          {/* <div className="text-right">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
