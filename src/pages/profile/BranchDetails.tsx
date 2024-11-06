import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";

const BranchDetails = () => {
  const privileges = [
    "Create Menu",
    "View All Menus",
    "Freeze/Unfreeze Menu List",
    "Edit Menu",
    "Create QR Codes for Tables",
    "Generate Online Ordering Link",
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Branch Details" />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Branch Name</p>
          <p className="text-gray-900">Lekki Branch</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Role</p>
          <p className="text-gray-900">Admin</p>
        </div>
      </div>

      <div>
        <SectionHeader title="Privileges" />
        <ul className="space-y-3">
          {privileges.map((privilege, index) => (
            <li key={index} className="text-gray-700">
              {privilege}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BranchDetails;
