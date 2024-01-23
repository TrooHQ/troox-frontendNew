import React from "react";

const Users = () => {
  return (
    <div>
      <div className=" grid grid-cols-6 items-center border-b border-b-[#B6B6B6] text-[#606060] text-[16px]">
        <p className=" px-3 py-2">User details</p>
        <p className=" px-3 py-2">Role</p>
        <p className="  px-3 py-2">Employee ID</p>
        <p className="  px-3 py-2">Mobile #</p>
        <p className=" col-span-2 px-3 py-2"></p>
      </div>
      <div className=" grid grid-cols-6 items-center px-5 py-4  bg-[#F8F8F8] text-[#606060] text-[16px] my-3">
        <p className=" px-3 py-2">Admin</p>
        <p className=" px-3 py-2">Admin</p>
        <p className=" px-3 py-2">Admin</p>
        <p className=" ">Unrestricted access to all modules</p>
        <div className="px-3 py-2 flex items-center col-span-2  justify-end">
          <div className="text-[14px] flex gap-2 items-center border-2 rounded-md border-[#929292]">
            <button className=" px-3 py-2  text-[#5955B3] border-r-2 border-[#929292]">
              Edit
            </button>
            <button className=" px-3 py-2   text-[#5955B3]   ">Clone</button>
            <button className="px-3 py-2 border-l-2 border-[#929292] text-[#B61C1C]">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
