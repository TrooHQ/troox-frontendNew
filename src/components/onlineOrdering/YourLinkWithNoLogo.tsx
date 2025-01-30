import { useState } from "react";
import linkImage from "../../assets/link-outline.svg";
import uploadImage from "../../assets/upload.svg";
import UploadedLogoDisplay from "./UploadedLogoDisplay";

const YourLinkWithNoLogo = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleUploadLogo = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedLogo(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (uploadedLogo) {
      // Simulate a file upload process
      setTimeout(() => {
        setIsUploadSuccessful(true);
        setIsModalOpen(false);
      }, 1000);
    }
  };

  return (
    <div>
      {!isUploadSuccessful ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full pt-[100px] w-[45%] m-auto">
          <img src={linkImage} alt="link" className="w-[200px] h-[200px]" />
          <h3 className="text-[#929292] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
            To Get Your Generated{" "}
            <span className="text-[#5855B3] text-center font-sans text-[20px] not-italic font-medium leading-[26px] tracking-[0.15px]">
              {" "}
              Online Ordering Link
            </span>
            , Upload Your Business Logo
          </h3>
          <div className="border border-purple500 bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500 mt-8">
            <button className="text-[16px] flex items-center gap-[8px]" onClick={handleUploadLogo}>
              Upload Business LOGO
            </button>
          </div>

          {isCustomizing && (
            <div className="flex flex-col items-center mt-8 gap-4">
              <div className="flex gap-2 items-center border border-gray-300 rounded-md overflow-hidden shadow-sm w-[60%]">
                <span className="bg-gray-100 text-gray-500 px-3 py-2">https://gogrub.co/</span>
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
      ) : (
        <UploadedLogoDisplay logo={uploadedLogo} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-purple500 text-center">
                Upload Your Business LOGO
              </h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Upload your business logo that is to be displayed via your online ordering link page.
            </p>
            <div className="border-2 border-dashed border-gray-300 mt-6 flex flex-col items-center p-4 rounded-md">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <img src={uploadImage} alt="upload image" className="w-[70px] h-[70px]" />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Select a file or drag and drop here
                </p>
                <p className="text-xs text-gray-400 text-center">
                  (JPG, PNG, file size no more than 10MB)
                </p>
              </label>
              <button
                className="mt-6 border border-purple500 bg-white text-purple500 py-2 px-4 rounded"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourLinkWithNoLogo;
