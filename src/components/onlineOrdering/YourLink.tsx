import React, { useState } from "react";
import { ContentCopy } from "@mui/icons-material";

const YourLink = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);

  const [customLink, setCustomLink] = useState("");

  const handleCustomizeClick = () => {
    setIsCustomizing(true);
  };

  const handleCancelClick = () => {
    setIsCustomizing(false);
    setCustomLink("");
  };

  const handleGenerateClick = () => {
    console.log("Generated Link:", customLink);
    setIsCustomizing(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center h-full pt-[100px]">
        <h3 className="text-[#3E3C7F] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
          Your Generated Link
        </h3>
        <div className="flex items-center gap-1">
          <span>https://gogrub.co/chickenrepublic</span>
          <ContentCopy className="w-5 h-5 text-[#929292]" />
        </div>
      </div>

      {!isCustomizing && (
        <div className="mt-11 text-center">
          <button
            className="text-[#3E3C7F] bg-white py-3 px-6 rounded mt-5 border border-purple500 w-fit"
            onClick={handleCustomizeClick}
          >
            Customize Link
          </button>
        </div>
      )}

      {isCustomizing && (
        <div className="flex flex-col items-center mt-8 gap-4">
        <div className="flex gap-2 items-center border border-gray-300 rounded-md overflow-hidden shadow-sm w-[60%]">
          <span className="bg-gray-100 text-gray-500 px-3 py-2">
            https://gogrub.co/
          </span>
          <input
            type="text"
            placeholder="Please enter your preferred URL"
            value={customLink}
            onChange={(e) => setCustomLink(e.target.value)}
            className="focus:outline-none px-2 py-2 text-gray-500 w-full"
          />
        </div>
        <div className="flex gap-4">
          <button
            className="bg-purple500 text-white py-2 px-4 rounded"
            onClick={handleGenerateClick}
          >
            Generate link
          </button>
          <button
            className="bg-white text-purple500 border border-purple-500 py-2 px-4 rounded"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default YourLink;
