import Close from "../../assets/CloseIcon.svg";
import Modal from "../Modal";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
        <div
          className="flex items-center justify-end cursor-pointer"
          onClick={onClose}
        >
          <img src={Close} alt="Close" />
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="text-[24px] font-[500] text-black">Delete User</p>
          <div>
            <p className="text-[16px] font-[400] text-grey500">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div
                className="border cursor-pointer borderblack rounded px-[24px] py-[10px] font-[600] text-black"
                onClick={onClose}
              >
                <p className="font-[500] text-[16px] text-black cursor-pointer">
                  No
                </p>
              </div>
              <div
                className="border borderblack bg-black rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
                onClick={onConfirm}
              >
                <p className="text-[16px]">Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
