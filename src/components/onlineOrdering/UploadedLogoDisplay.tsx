import { CheckCircle, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import qrImage from "../../assets/qr-code.svg";
import fileDownload from "../../assets/file_download.svg";

interface UploadedLogoDisplayProps {
  logo: any;
  handleUploadLogo: any;
}

const UploadedLogoDisplay: React.FC<UploadedLogoDisplayProps> = ({
  logo,
  handleUploadLogo,
}) => {
  const [customLink, setCustomLink] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCustomizeClick = () => {
    setIsCustomizing(true);
  };

  const handleCancelClick = () => {
    setIsCustomizing(false);
    setCustomLink("");
  };

  const handleGenerateClick = () => {
    setIsCustomizing(false);
  };

  const generatedUrl = customLink
    ? `https://gogrub.co/${customLink}`
    : "https://gogrub.co/kitchenexpress";

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);

    // Reset the icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 items-start justify-start w-[70%] m-auto py-10">
      {/* Logo */}
      <div className="flex items-center justify-start gap-7">
        <img
          src={URL.createObjectURL(logo)}
          alt="Uploaded Logo"
          className="w-[150px] h-auto"
        />
        <button
          className="bg-white text-[#5955B3] border border-[#5955B3] py-2 px-6 rounded"
          onClick={handleUploadLogo}
        >
          Replace logo
        </button>
      </div>

      {/* Text */}
      <div className="px-6 py-3 border border-[#b6b6b6] rounded-lg w-[80%] flex gap-[50px] bg-[rgba(238,238,247,0.40)] mt-8">
        {/* <div> */}
        <div className="min-w-[50%]">
          <h3 className="text-[#5955B3] text-start text-[16px] font-medium leading-[26px] tracking-[0.15px]">
            Your Generated Link Is below
          </h3>
          <div className="flex items-center justify-start gap-2">
            <span className="text-[#121212] text-[16px] font-normal">
              {generatedUrl}
            </span>
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <ContentCopy
                className="w-5 h-5 text-[#929292] cursor-pointer"
                onClick={handleCopy}
              />
            )}{" "}
          </div>
        </div>
        {/* Generated Link Box */}
        <div className="rounded-lg p-0 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* QR Code Placeholder */}
            <div className="w-[50px] h-[50px] bg-gray-300 flex items-center justify-center rounded-md">
              <img src={qrImage} alt="QR Code" className="w-full h-full" />
            </div>

            <div className="border border-[#0D0D0D] rounded-md flex items-center gap-2 px-2 py-1">
              <img
                src={fileDownload}
                alt="QR Code"
                className="w-[32px] h-[32px]"
              />
            </div>
            {/* <IoMdDownload className="text-[#5955B3] cursor-pointer text-[22px]" /> */}
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Customize Link */}
      <div className="w-[80%] mt-8">
        <p className="text-[#504DA3] text-[16px] font-medium mb-2">
          Customize Your Link
        </p>
        <div className="flex gap-2 items-center border border-gray-300 rounded-md overflow-hidden shadow-sm w-full">
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
        <div className="flex gap-4 mt-4">
          <button
            className="bg-[#5955B3] text-white py-2 px-6 rounded"
            onClick={handleGenerateClick}
          >
            Generate link
          </button>
          <button
            className="bg-white text-[#5955B3] border border-[#5955B3] py-2 px-6 rounded"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadedLogoDisplay;
