import SectionHeader from "../../components/Dashboard/Profile/SectionHeader";

const Security = () => {
  return (
    <div className="space-y-8">
      <div>
        <SectionHeader title="Password" />
        <p className="text-gray-900">************</p>
      </div>

      <div>
        <SectionHeader title="Pin" />
        <p className="text-gray-900">****</p>
      </div>
    </div>
  );
};

export default Security;
