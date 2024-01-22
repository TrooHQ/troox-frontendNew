import ProfilePic from "../../assets/profilePic.png";
import NotificationIcon from "../../assets/notificationIcon.png";

const TopMenuNav = ({ pathName }) => {
  const userName = "John Doe";
  const role = "Admin";

  return (
    <div className="">
      <div className=" w-full">
        <div className=" flex  items-center justify-between">
          <div className="">
            <p className=" text-[28px] font-[600] Capitalize text-[#5955B3]">
              {pathName}
            </p>
          </div>
          <div className=" flex gap-3 items-center">
            <input
              type="text"
              className=" bg-[#F8F8F8] rounded p-2 mr-2 border"
              placeholder="Search"
            />
            <div className=" mr-5">
              <img src={NotificationIcon} alt="" />
            </div>
            <div className="">
              <p className=" text-[#121212] text-[16px] font-[500]">
                {userName}
              </p>
              <p className=" text-right text-[#606060] text-[12px]">{role}</p>
            </div>
            <div className="">
              <img src={ProfilePic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuNav;
