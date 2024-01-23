import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";

const NewRoles = () => {
  return (
    <DashboardLayout>
      <TopMenuNav pathName="Manage Users" />
      <div className="my-10">
        <p className="text-[24px] font-[500] text-purple500">New Roles</p>
        <div className="  ">
          <div className="my-8 w-full flex items-center">
            <p className="">Role name</p>
            <div className=" w-full">
              <input
                type="text"
                className="p-2  rounded border-2 w-full border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewRoles;
