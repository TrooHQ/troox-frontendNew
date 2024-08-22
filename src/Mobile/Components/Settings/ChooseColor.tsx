import { useEffect, useState } from "react";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import TopMenuNav from "../TopMenuNav";

const ChooseColor = () => {
  const colors = [
    { name: "Troo Blue", colorCode: "#5955B3" },
    { name: "Troo Black", colorCode: "#121212" },
    { name: "Troo Green", colorCode: "#55B388" },
    { name: "Troo Pink", colorCode: "#B355AF" },
    { name: "Troo Red", colorCode: "#B35557" },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  return (
    <div className="mt-[16px] mx-[20px]">
      <TopMenuNav title="Change Color" />

      <div className="mt-[24px]">
        {colors.map((color) => (
          <div
            key={color.name}
            className="py-[16px] border-b border-b-[#E7E7E7] flex gap-[8px] cursor-pointer"
            onClick={() => setSelectedColor(color)}
          >
            <div
              className="h-[24px] w-[24px] rounded-full"
              style={{ backgroundColor: color.colorCode }}
            ></div>
            <p className="text-[16px] font-[500] text-[#000000] flex-1">
              {color.name}
            </p>
            <div className="text-[24px]">
              {selectedColor.name === color.name ? (
                <FaRegCircleCheck />
              ) : (
                <FaRegCircle />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseColor;
