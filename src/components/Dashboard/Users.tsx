import { useState } from "react";
import Profileimg from "../../assets/Profileimg.svg";
import Delete from "../../assets/DeleteIcon.svg";
import Modal from "../Modal";
import { Link } from "react-router-dom";
// import CancelButton from "../Buttons/CancelButton";
const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className=" grid grid-cols-7 items-center border-b px-5 border-b-grey100 text-grey300 text-[16px] font-[400]">
        <p className="col-span-2 px-3 py-2">User details</p>
        <p className=" px-3 py-2">Role</p>
        <p className="  px-3 py-2">Employee ID</p>
        <p className="  px-3 py-2">Mobile #</p>
        <p className=" col-span-2 px-3 py-2"></p>
      </div>
      <div className=" grid mt-[16px] gap-[8px]">
        <div className=" grid grid-cols-7 items-center px-5 py-4 font-[400] bg-[#F8F8F8] text-[16px] text-grey500  ">
          <div className="col-span-2 px-3 py-2 flex items-center gap-[16px]">
            <img src={Profileimg} alt="" />
            <div className="">
              <p className=" text-[20px] "> Admin</p>
              <p className="   "> samdoe@restaurant.com</p>
            </div>
          </div>
          <p className=" px-3 py-2">Admin</p>
          <p className=" px-3 py-2">MC1270 </p>
          <p className=" ">090123453789</p>
          <div className="px-3 py-2 flex items-center col-span-2  justify-end">
            <div className="text-[14px] flex gap-2 items-center border-2 rounded-md border-grey200">
              <button className=" px-3 py-2  text-purple500 border-r-2 border-grey200">
                Edit
              </button>
              <button className=" px-3 py-2   text-purple500   ">Clone</button>
              <button
                className="px-3 py-2 border-l-2 border-grey200 text-[#B61C1C]"
                onClick={() => setIsModalOpen(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-7 items-center px-5 py-4 font-[400] bg-[#F8F8F8] text-[16px] text-grey500 ">
          <div className="col-span-2 px-3 py-2 flex items-center gap-[16px]">
            <img src={Profileimg} alt="" />
            <div className="">
              <p className=" text-[20px] "> Admin</p>
              <p className="   "> samdoe@restaurant.com</p>
            </div>
          </div>
          <p className=" px-3 py-2">Admin</p>
          <p className=" px-3 py-2">MC1270 </p>
          <p className=" ">090123453789</p>
          <div className="px-3 py-2 flex items-center col-span-2  justify-end">
            <div className="text-[14px] flex gap-2 items-center border-2 rounded-md border-grey200">
              <button className=" px-3 py-2  text-purple500 border-r-2 border-grey200">
                Edit
              </button>
              <button className=" px-3 py-2   text-purple500   ">Clone</button>
              <button className="px-3 py-2 border-l-2 border-grey200 text-[#B61C1C]">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="">
          <div className="px-[56px] py-[40px] flex flex-col items-center justify-center">
            <div className="text-center">
              <img src={Delete} alt="" className="mx-auto my-auto" />
              <p className="text-[16px] font-[400] pt-[8px] pb-[32px]">
                Are you sure you want to delete this user from your list?
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="border cursor-pointer border-purple500 rounded-[5px] px-[24px] py-[10px] font-[600] text-purple500"
                onClick={() => setIsModalOpen(false)}
              >
                <p className="font-[500] text-[16px] text-purple500 cursor-pointer">
                  Cancel
                </p>
                {/* <CancelButton text="Cancel" /> */}
              </div>
              <div className="border border-[#ED5048] bg-[#ED5048] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <Link to="/">
                  <button className="text-[16px]">Delete user</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
