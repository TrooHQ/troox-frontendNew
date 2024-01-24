import ProfilePic from "../../assets/profilePic.png";
import NotificationIcon from "../../assets/notificationIcon.png";
import SearchIcon from "../../assets/searchIcon.svg";
interface TopMenuNavProps {
  pathName: string;
}

const TopMenuNav: React.FC<TopMenuNavProps> = ({ pathName }) => {
  const userName = "John Doe";
  const role = "Admin";

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[28px] font-[600] Capitalize text-purple500">
              {pathName}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <div className="relative">
              <input
                type="text"
                className="bg-[#F8F8F8] rounded p-2 pl-14 border"
                placeholder="Search"
              />
              <img
                src={SearchIcon}
                alt=""
                className="absolute left-6 top-3 pointer-events-none"
              />
            </div>

            <div className=" ml-3 mr-5">
              <img src={NotificationIcon} alt="" />
            </div>
            <div>
              <p className="text-grey500 text-[16px] font-[500]">{userName}</p>
              <p className="text-right text-grey300 text-[12px]">{role}</p>
            </div>
            <div>
              <img src={ProfilePic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuNav;
