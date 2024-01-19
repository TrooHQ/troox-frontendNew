import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)}>
      <p className=" font-[500] text-[16px] text-[#5955B3] cursor-pointer">
        Go Back
      </p>
    </div>
  );
};

export default BackButton;
