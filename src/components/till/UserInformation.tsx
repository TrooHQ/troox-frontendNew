import React from "react";

const UserInformation = () => {
  return (
    <div className="flex items-center gap-3.5 mb-10 mt-4">
      <div className="bg-[#606060] rounded-full h-8 w-8 flex items-center">
        <img src="/avatar.svg" alt="User avatar" className="m-auto" />
      </div>
      <div>
        <span className="text-[#121212] text-base font-medium">Steven</span>
        <p className="text-[#606060] text-xs font-light">Signed in 9:15am</p>
      </div>
    </div>
  );
};

export default UserInformation;
