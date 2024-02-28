import { useState } from "react";
import Arrow from "../assets/BackArrow.svg";
import AccountIcon from "../assets/AccountSettings.svg";
import MenuModal from "../Components/MenuModal";
import CheckCircle from "../assets/check_circle.svg";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import DashboardBackButton from "../Buttons/DashboardBackButton";

interface FormData extends FieldValues {
  employee_name?: string;
  employee_email?: string;
  employee_phone?: string;
}

const EmployeeSettingsPage = () => {
  const [resetSuccessModal, setResetSuccessModal] = useState(false);

  const [resetPasswordModal, setResetPasswordModal] = useState(false);

  const handlePasswordResetModal = () => {
    setResetPasswordModal(true);
  };

  const handlePasswordResetSuccessModal = () => {
    setResetPasswordModal(false);
    setResetSuccessModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="my-[16px] mx-[24px]">
        <DashboardBackButton text="Settings" img={Arrow} />

        <div className="mt-[24px]">
          <div className="bg-[#CFF5EE] p-[24px] rounded-[5px]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={AccountIcon} alt="" />
                <p className="text-[#121212] text-[20px]">Account</p>
              </div>
            </div>

            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p
                className="  text-grey300 text-[16px] cursor-pointer"
                onClick={handlePasswordResetModal}
              >
                Reset Password
              </p>
            </div>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-[#121212]">
                Reset password
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors && "All Fields are required"} */}
                </p>
                <input
                  type="password"
                  id="new_password"
                  {...register("new_password", {
                    required: "New Password is required",
                  })}
                  placeholder="Create new password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.new_password ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="password"
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                  })}
                  placeholder="Confirm password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.confirm_password ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="submit"
                  onClick={handlePasswordResetSuccessModal}
                  className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={resetSuccessModal}
        onClose={() => setResetSuccessModal(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[380px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setResetSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500">
              Your password has been reset successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default EmployeeSettingsPage;
