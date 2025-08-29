import { LinearProgress } from "@mui/material";
import { SERVER_DOMAIN } from "../../../Api/Api";
import axios from "axios";
import { useCallback, useState, useRef } from "react";
import { VscFilePdf } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { CancelOutlined, CheckCircle } from "@mui/icons-material";

export default function BulkUploadComp() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const { selectedBranch } = useSelector((state: any) => state.branches);
  const token = localStorage.getItem("token");

  // Ref for abort controller to cancel uploads
  const controllerRef = useRef<AbortController | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFile(file);
      setUploading(true);
      setStatus("idle");
      setProgress(0);

      controllerRef.current = new AbortController();

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          `${SERVER_DOMAIN}/menu/bulkUploadMenuCategories/?branch_id=${selectedBranch?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            signal: controllerRef.current.signal,
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percent);
              }
            },
          }
        );
        console.log("res", res);
        setStatus("success");

        setUploading(false);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Upload cancelled");
        } else {
          console.error("Error uploading file:", error);
          setStatus("error");
        }
      } finally {
        setUploading(false);
      }
    },
    [token, selectedBranch?.id]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setFile(null);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="w-full">
      {/* Progress */}
      {uploading && file && (
        <FileUploadProgress
          file={file}
          progress={progress}
          onCancel={handleCancel}
        />
      )}
      {/* Dropzone */}
      <div
        className={`w-full flex justify-center items-center border bg-[#fff6f0] p-6 border-dashed rounded-md
         ${isDragActive ? "border-green-500 bg-blue-50" : "border-[#FF4F00]"}`}
        {...getRootProps()}
      >
        <div className="flex flex-col items-center">
          <div className="p-2 mb-2 rounded-md">
            {status === "idle" && <VscFilePdf className="w-10 h-10 text-[#FF4F00]" />}
            {status === "success" && <CheckCircle className="w-10 h-10 text-green-600" />}
            {status === "error" && <CancelOutlined className="w-10 h-10 text-red-600" />}
          </div>

          <label className="px-6 py-2 text-sm font-normal text-white bg-orange-600 rounded cursor-pointer hover:bg-orange-700">
            CHOOSE FILES
            <input {...getInputProps()} />
          </label>

          <p className="px-2 py-1 mt-2 text-xs font-medium text-black ">
            or drop files here
          </p>
        </div>
      </div>


    </div>
  );
}

const FileUploadProgress = ({
  file,
  progress,
  onCancel,
}: {
  file: File;
  progress: number;
  onCancel: () => void;
}) => {
  return (
    <div className="w-full border border-orange-400 bg-[#fff6f0] p-3 rounded-md flex items-center gap-3 my-5">
      <div className="text-orange-500">
        <VscFilePdf className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">{file.name}</p>
        <div className="w-full h-2 mt-1 bg-gray-200 rounded">
          <LinearProgress variant="determinate" value={progress} />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {progress < 100 ? "Uploading..." : "Completed"}
        </p>
      </div>

      <button
        className="text-sm text-gray-500 hover:text-red-500"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};
