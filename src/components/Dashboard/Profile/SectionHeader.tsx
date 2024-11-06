import EditButton from "./EditButton";

interface SectionHeaderProps {
  title: string;
  showEdit?: boolean;
}

const SectionHeader = ({ title, showEdit = true }: SectionHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-[18px] font-normal text-[#121212]">{title}</h2>
    {showEdit && <EditButton />}
  </div>
);

export default SectionHeader;
