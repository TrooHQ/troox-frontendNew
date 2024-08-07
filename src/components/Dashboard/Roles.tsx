const Roles = () => {
  const roleData = [
    {
      roleName: "Admin",
      description: "Unrestricted access to all modules",
      actions: ["Edit", "Clone", "Delete"],
    },
    {
      roleName: "Operations",
      description: "Access to all modules, cannot delete admin",
      actions: ["Edit", "Clone", "Delete"],
    },
    {
      roleName: "General Users",
      description: "Role specific user access e.g cashier, waiter, etc.",
      actions: ["Edit", "Clone", "Delete"],
    },
  ];
  return (
    <div className="">
      <div className=" grid grid-cols-5 items-center border-b border-b-grey100 text-grey300 text-[16px]">
        <p className=" px-3 py-2">Role Name</p>
        <p className=" px-3 py-2">Description</p>
        <p className=" col-span-2 px-3 py-2"></p>
      </div>
      {roleData.map((role) => (
        <div className=" grid grid-cols-5 items-center px-5 py-4  bg-[#F8F8F8] text-grey500 text-[16px] my-3">
          <p className="px-3 py-2">{role.roleName}</p>
          <p className="col-span-2">{role.description}</p>
          <div className="px-3 py-2 flex items-center col-span-2 justify-end">
            <div className="text-[14px] flex gap-2 items-center border rounded-md border-grey200">
              {role.actions.map((action, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 ${
                    action === "Delete" ? "text-[#B61C1C]" : "text-purple500"
                  } ${index > 0 ? "border-l border-grey200" : ""}`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roles;
