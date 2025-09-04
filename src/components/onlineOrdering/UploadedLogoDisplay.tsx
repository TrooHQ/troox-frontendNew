import { CheckCircle, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import fileDownload from "../../assets/file_download.svg";
import { truncateText } from "../../utils/truncateText";
import CustomInput from "../inputFields/CustomInput";
import CustomTextarea from "../inputFields/CustomTextarea";

interface UploadedLogoDisplayProps {
  logo: any;
  handleUploadLogo: any;
  onlineOrderingLink: any;
  loading: any;
  handleGenerateClick: any;
  businessFullName: any;
  setBusinessFullName: any;
  simpleDescription: any;
  setSimpleDescription: any;
  instruction: any;
  setInstruction: any;
  showForm: any;
}

const UploadedLogoDisplay: React.FC<UploadedLogoDisplayProps> = ({
  logo,
  handleUploadLogo,
  onlineOrderingLink,
  loading,
  handleGenerateClick,
  businessFullName,
  setBusinessFullName,
  simpleDescription,
  setSimpleDescription,
  instruction,
  setInstruction,
  showForm,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(onlineOrderingLink?.onlineOrderingLink);
    setCopied(true);

    // Reset the icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = onlineOrderingLink?.qrcode;
    link.download = "qr-code.png"; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBusinessFullNameChange = (newValue: string) => {
    setBusinessFullName(newValue);
  };

  const handleSimpleDescriptionChange = (newValue: string) => {
    setSimpleDescription(newValue);
  };

  const handleInstructionChange = (newValue: string) => {
    setInstruction(newValue);
  };

  return (
    <div className="flex flex-col gap-4 items-start justify-start w-[70%] m-auto py-10">
      {/* Logo */}
      <div className="flex items-center justify-start gap-7">
        <img src={logo} alt="Uploaded Logo" className="w-[150px] h-auto" />
        <button
          className="bg-white text-[#0d0d0d] border border-[#0d0d0d] py-2 px-6 rounded"
          onClick={handleUploadLogo}
        >
          Replace logo
        </button>
      </div>

      {/* Text */}
      <div className="px-6 py-3 border border-[#b6b6b6] rounded-lg w-[80%] flex gap-[50px] bg-[rgba(238,238,247,0.40)] mt-8">
        {/* <div> */}

        <div className="min-w-[50%]">
          <h3 className="text-[#121212] text-start text-[16px] font-medium leading-[26px] tracking-[0.15px]">
            Your Generated Link Is below
          </h3>
          <div className="flex items-center justify-start gap-2">
            <span className="text-[#121212] text-[16px] font-normal">
              {loading
                ? "Loading..."
                : onlineOrderingLink?.onlineOrderingLink
                  ? truncateText(onlineOrderingLink?.onlineOrderingLink, 30)
                  : "No link generated yet"}
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
        <div className="flex items-center justify-between w-full p-0 rounded-lg">
          <div className="flex items-center gap-4">
            {/* QR Code Placeholder */}
            <div className="w-[50px] h-[50px] bg-gray-300 flex items-center justify-center rounded-md">
              <img
                src={onlineOrderingLink?.qrcode}
                alt="QR Code"
                className="w-full h-full"
              />
            </div>

            <div
              className="border border-[#0D0D0D] rounded-md flex items-center gap-2 px-2 py-1 cursor-pointer"
              onClick={handleDownloadQR}
            >
              <img
                src={fileDownload}
                alt="QR Code"
                className="w-[32px] h-[32px]"
              />
            </div>
            {/* <IoMdDownload className="text-[#121212] cursor-pointer text-[22px]" /> */}
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Description and instruction form */}
      {showForm && (
        <form className="flex flex-col w-4/5 gap-4 mt-5">
          <CustomInput
            type="text"
            label="Add Business Full Name *"
            value={businessFullName}
            onChange={handleBusinessFullNameChange}
            className="border-gray-500"
            fullWidth
          />

          <CustomTextarea
            label="Add a simple description  *"
            placeholder="E.g.  A top-rated restaurant serving fresh and delicious meals daily"
            value={simpleDescription}
            onChange={handleSimpleDescriptionChange}
          />
          <CustomTextarea
            label="Add your instruction *"
            placeholder="E.g. Orders are accepted from 12 PM to 5 PM, Monday to Friday. Tap the link to start receiving online orders."
            value={instruction}
            onChange={handleInstructionChange}
          />

          <button
            type="button"
            className="bg-[#0d0d0d] text-center text-white py-3 px-4 rounded w-fit"
            onClick={handleGenerateClick}
          >
            {loading ? "Generating..." : "Generate Your link"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadedLogoDisplay;
