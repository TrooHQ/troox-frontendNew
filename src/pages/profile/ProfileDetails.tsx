import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";

const ProfileDetails = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Profile Details" />

      <div className="flex items-center space-x-4 mb-8">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
          alt="Sam Doe"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-[16px] font-medium text-[#121212]">Sam Doe</h3>
          <p className="text-gray-600">Admin</p>
          <p className="text-sm text-gray-500">All Outlets</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <SectionHeader title="Personal Information" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">First Name</p>
              <p className="text-gray-900">Sam</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Name</p>
              <p className="text-gray-900">Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-gray-900">samdoe@email.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Phone Number</p>
              <p className="text-gray-900">+234 80 123 4567 89</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <p className="text-gray-900">Admin</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Address" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Country</p>
              <p className="text-gray-900">Nigeria</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">City/State</p>
              <p className="text-gray-900">Lagos, Nigeria</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-gray-900">samdoe@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
