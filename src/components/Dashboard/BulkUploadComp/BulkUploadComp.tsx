import { useEffect, useState } from 'react'
import { convertToBase64 } from "../../../utils/imageToBase64";
import { VscFilePdf } from "react-icons/vsc";
export default function BulkUploadComp() {

  const [file, setFile] = useState<string>();

  console.log(file)


  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    // setImageName(file.name);
    try {
      const base64 = await convertToBase64(file);
      setFile(base64 as string);
      // handleInputChange("businessLogo", base64 as string);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  return (
    <div className='w-full'>

      <div className="w-full flex justify-center items-center border border-[#FF4F00] bg-[#fff6f0] p-6 border-dashed rounded-md">
        <div className="flex flex-col items-center">
          {/* PDF Icon */}
          <div className="p-2 mb-2 rounded-md">
            <VscFilePdf className="w-10 h-10 text-[#FF4F00]" />
          </div>

          {/* Choose File Button */}
          <label className="px-6 py-2 text-sm font-normal text-white bg-orange-600 rounded cursor-pointer hover:bg-orange-700">
            CHOOSE FILES
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* Size Label */}
          <p className="px-2 py-1 mt-2 text-xs font-medium text-black ">
            or drop files here
          </p>
        </div>
      </div>

      <div className='w-full'>
        <FileUploadProgress />
      </div>

      {/* <div className="flex items-center gap-[16px]">
      <label
        htmlFor="fileInput"
        className="w-[72px] border border-dashed p-[20px] border-[#121212] cursor-pointer"
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        
      </label>
      <div>
        <label
          htmlFor="fileInput"
          className="text-[#121212] font-[500] text-[16px] mb-[8px] cursor-pointer"
        >
          Click to upload{" "}
          <span className="font-[400] text-grey300">or drag and drop</span>
        </label>
        <p className="text-[14px] font-[400] text-grey300">
          Max. file size: 2MB
        </p>
      </div>
    </div> */}



    </div>
  )
}

const FileUploadProgress = () => {
  const [progress, setProgress] = useState(0);

  // Simulate upload progress
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 10), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="w-full  border border-orange-400 bg-[#fff6f0] p-3 rounded-md flex items-center gap-3 my-10">
      {/* File Icon */}
      <div className="text-orange-500">
        <VscFilePdf className='w-5 h-5' />
      </div>

      {/* File Info + Progress */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">
          file title
        </p>
        <div className="w-full h-2 mt-1 bg-gray-200 rounded">
          <div
            className="h-2 bg-orange-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {/* {`${(progress * 5).toFixed(0)}KB of 1024KB`} —{" "} */}
          {progress < 100 ? "Uploading..." : "Completed"}
        </p>
      </div>

      {/* Cancel Button */}
      <button className="text-sm text-gray-500 hover:text-red-500">Cancel</button>
    </div>
  );
};