import React, { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

const Themes = () => {
  const [colors, setColors] = useState([
    "#3450B0",
    "#000000",
    "#097F7C",
    "#5955B3",
    "#FF0000",
    // "#7C4DFF",
    // "#FF3D00",
    // "#FF9100",
  ]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorClick = (color: any) => {
    setSelectedColor(color);
  };

  const handleCustomColorSave = () => {
    if (selectedColor && !colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };

  return (
    <div className="p-4 flex gap-[50px]">
      <div>
        <h2 className="text-[20px] font-medium text-[#5855b3] mb-4">
          Brand colors
        </h2>
        <p className="mb-2 text-base text-[#121212] font-normal">
          Select or customize your brand color
        </p>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-6 mb-4 justify-items-center">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-[80px] h-[80px] flex items-center justify-center cursor-pointer transition-all duration-300
              ${
                color === selectedColor
                  ? "rounded-lg border-4 rounded-tl-[30px] rounded-tr-[30px] border-blue-500"
                  : "rounded-full border-2 border-gray-300"
              }
              hover:w-[100px] hover:h-[100px] filter drop-shadow-[0px_4px_14.8px_rgba(0,0,0,0.25)] bg-[#F8F8F8]
            `}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            >
              {color === selectedColor && (
                <CheckCircle className="text-white" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-[60px]">
          <span className="text-[#606060] font-medium text-base">
            Custom color
          </span>
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            readOnly
            placeholder="#000000"
            className="border px-3 py-6 rounded-[5px] bg-[#EEEEF7]"
          />

          <div
            className="w-[78px] h-[78px] rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: selectedColor }}
          >
            <div
              className="w-[64px] h-[64px] rounded-full"
              style={{ backgroundColor: selectedColor }}
            ></div>
          </div>
          {/* <button
            onClick={handleCustomColorSave}
            className="bg-purple500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Themes;
