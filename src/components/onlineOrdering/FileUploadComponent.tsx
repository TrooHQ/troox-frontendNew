import { useState, useEffect } from "react";
import { Close, TaskOutlined } from "@mui/icons-material";
import markgif from "../../assets/markgif.gif";
import { truncateText } from "../../utils/truncateText";

interface FileUploadComponentProps {
  backFromSelection: () => void;
  uploadedLogo: File | null;
  getYourLink: () => void;
  logo: any;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  backFromSelection,
  uploadedLogo,
  getYourLink,
  logo,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (uploadProgress < 100) {
      const timer = setInterval(() => {
        setUploadProgress((prev) => {
          const nextProgress = Math.min(prev + 5, 100);
          if (nextProgress === 100) {
            setUploadComplete(true);
          }
          return nextProgress;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [uploadProgress]);

  const handleUploadClick = () => {
    if (uploadComplete) {
      setShowSuccessScreen(true);
    }
  };

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  if (showSuccessScreen) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={backFromSelection}
        >
          <Close />
        </button>
        <p className="text-[#3E3C7F] text-lg text-center font-medium mb-4">
          Uploaded
        </p>
        <div className="flex items-center justify-center mb-4">
          <img src={markgif} alt="Success" className="w-[100px] h-[100px]" />
        </div>
        <p className="text-[#606060] text-start mb-4">
          Your business logo has been successfully added. You can now get your
          link.
        </p>
        <div className="flex justify-start items-center">
          <button
            onClick={getYourLink}
            className="px-4 py-2 text-purple500 border border-purple500 rounded-lg hover:bg-purple-100"
          >
            Get Your Link
          </button>
        </div>
      </div>
    );
  }

  if (uploadComplete) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={backFromSelection}
        >
          &times;
        </button>
        <p className="text-gray-700 text-lg font-medium mb-4">File Added</p>
        <div className="flex items-center gap-4 mb-4 justify-between">
          <div className="flex items-center gap-4">
            <TaskOutlined className="text-[#5855B3] text-2xl" />
            <p className="text-gray-700 truncate">
              {uploadedLogo ? truncateText(uploadedLogo.name, 15) : ""}
            </p>
            <p
              onClick={handlePreviewClick}
              className="text-purple500 underline text-sm"
            >
              Preview
            </p>
          </div>
          {uploadedLogo ? formatFileSize(uploadedLogo.size) : ""}
        </div>
        <p className="text-gray-500 text-sm">
          {showPreview ? (
            <img
              src={URL.createObjectURL(logo)}
              alt="Uploaded Logo"
              className="w-[150px] h-auto"
            />
          ) : (
            ""
          )}
        </p>
        <div className="flex justify-between items-center mb-4 mt-4">
          <button
            className="px-4 py-2 text-purple500 border border-purple500 rounded-[5px] hover:bg-purple-100"
            onClick={backFromSelection}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-purple500 rounded-[5px]"
            onClick={handleUploadClick}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={backFromSelection}
      >
        <Close />
      </button>
      <p className="text-gray-700 text-lg font-medium mb-4">File Added</p>
      <div className="flex items-center gap-4 mb-4">
        <TaskOutlined className="text-purple500 text-2xl" />
        <p className="text-gray-700 truncate">
          {uploadedLogo ? uploadedLogo.name : ""}
        </p>
        <p className="text-gray-500 text-sm">
          {uploadedLogo ? uploadedLogo.size : ""}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
        <div
          className="bg-purple500 h-1 rounded-full"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 text-purple500 border borderpurple-500 rounded-lg hover:bg-purple-100"
          onClick={backFromSelection}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg ${
            uploadProgress === 100 ? "bgpurple-500" : "bg-purple-300"
          }`}
          disabled={uploadProgress < 100}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUploadComponent;
