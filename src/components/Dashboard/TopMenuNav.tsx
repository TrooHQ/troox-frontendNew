import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import NotificationIcon from "../../assets/notificationIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchUserDetails } from "../../slices/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
interface TopMenuNavProps {
  pathName: string;
  goBack?: boolean;
}

const TopMenuNav: React.FC<TopMenuNavProps> = ({ pathName, goBack = false }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, userDetails } = useSelector((state: any) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <div className="">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(goBack) ? <button onClick={() => navigate(-1)}><IoMdArrowBack /></button> : null}
            <p className="text-[28px] font-[500] Capitalize text-purple500">
              {pathName}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {/* <div className="relative">
              <input
                type="text"
                className="bg-[#F8F8F8] rounded p-2 pl-14"
                placeholder="Search"
              />
              <img
                src={SearchIcon}
                alt=""
                className="absolute pointer-events-none left-6 top-3"
              />
            </div> */}

            <div className="ml-3 mr-5 ">
              <img src={NotificationIcon} alt="" />
            </div>
            <div>
              <p className="text-grey500 text-[16px] font-[500]">
                {userData && userData.personal_email}
              </p>
              <p className="capitalize text-right text-grey300 text-[12px]">
                {userData && userData.user_role}
              </p>
            </div>
            <div>
              <Avatar sx={{ width: 40, height: 40 }}>
                {userDetails ? (
                  <img
                    src={userDetails?.photo || userDetails?.business_logo || ""}
                    alt={`${userDetails?.first_name} ${userDetails?.last_name}`}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenuNav;
