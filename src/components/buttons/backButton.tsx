import { useNavigate } from "react-router-dom";
interface ButtonProps {
  text: string;
}
const BackButton: React.FC<ButtonProps> = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)}>
      <p className=" font-[600] text-[16px] text-purple500 cursor-pointer">
        {text}
      </p>
    </div>
  );
};

export default BackButton;
