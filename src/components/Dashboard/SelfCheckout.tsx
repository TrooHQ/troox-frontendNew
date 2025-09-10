import { MdTouchApp } from 'react-icons/md'
import DashboardLayout from './DashboardLayout'
import TopMenuNav from './TopMenuNav'
import { FiUploadCloud } from 'react-icons/fi'
import { BsFileEarmarkImage } from "react-icons/bs";
import { useCallback, useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { SERVER_DOMAIN } from '../../Api/Api';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import Modal from "../Modal";
import { toast } from 'react-toastify';
import card from "../../assets/cards.png"
import troo_b_logo from "../../assets/troo-b-logo.png"
// import { Add } from '@mui/icons-material';
export default function SelfCheckout() {

  const [showDetails, setShowDetails] = useState<any>({});
  const [kioskImages, setKioskImages] = useState([]);
  const MAX_ITEM_COUNT = 5;
  const MAX_FILE_SIZE = 1024 * 1024 * 10;

  const { selectedBranch } = useSelector((state: any) => state.branches);

  // handle fetching and displaying uploaded images
  const fetchUploadedImages = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${SERVER_DOMAIN}/branches/${selectedBranch?.id}/self-checkout/assets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDetails({});

      console.log("response", response.data);
      setKioskImages(response?.data?.data);
    } catch (error: any) {
      console.error("Error fetching pickup locations:", error);
    }
  }

  console.log("kioskImage", kioskImages)

  useEffect(() => {
    fetchUploadedImages();
  }, [selectedBranch?.id]);

  const [isUploading, setIsUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("images", file);
        !editMode && formData.append("branch_id", selectedBranch?.id);

        const token = localStorage.getItem("token");

        let response;

        if (editMode && showDetails?._id) {
          // PATCH request for editing
          response = await axios.patch(
            `${SERVER_DOMAIN}/branches/${selectedBranch?.id}/self-checkout/assets/${showDetails?._id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Image updated successfully");
        } else {
          // POST request for adding new
          response = await axios.post(
            `${SERVER_DOMAIN}/branches/${selectedBranch?.id}/self-checkout/assets`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Image uploaded successfully");
        }

        console.log("response", response);
        fetchUploadedImages();

        // reset states after upload/update
        setEditMode(false);
        setShowDetails(null);

      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Something went wrong while uploading");
      } finally {
        setIsUploading(false);
      }
    },
    [editMode, showDetails, selectedBranch?.id]
  );


  const { getRootProps, getInputProps, open, } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });


  return (

    <DashboardLayout>
      <TopMenuNav pathName="Troo Kiosk" />

      <div
        className="bg-white w-full flex items-center gap-[8px] my-5 py-2 px-4"
      >
        <button className={`bg-black  w-fit rounded-[5px] px-6 py-3 font-semibold text-white ${kioskImages?.length >= MAX_ITEM_COUNT ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} onClick={open} disabled={kioskImages?.length < MAX_ITEM_COUNT}>
          {/* <Add className="w-5 h-5 text-[#0D0D0D]" /> */}
          Upload Image
        </button>
      </div>

      <div className='relative w-full min-h-screen my-5 border border-gray-400 rounded-md'>

        {isUploading && <Loader />}

        <div className='flex w-full gap-4 px-5 my-20 justify-evenly'>
          <div className='w-full'>
            <div className='relative mx-auto sm:w-full lg:w-2/3'>
              <h2 className='text-sm font-semibold'>Upload Troo Kiosk images.</h2>
              <p className='text-sm'>Add 3-5 images as your Kiosk screen saver</p>
              {/* this line prevents the drag and drop from working once 5 items have been uploaded  */}
              {kioskImages?.length >= MAX_ITEM_COUNT && <div className="absolute top-0 left-0 w-full h-full cursor-not-allowed bg-black opacity-0 z-[99999]" />}
              <div className='w-full p-4 mt-4 border border-gray-300 rounded-md h-fit'  {...getRootProps()}>
                <div className='flex flex-col items-center justify-center w-full gap-4 p-4 border border-gray-300 border-dashed rounded-md cursor-pointer h-fit'>

                  <FiUploadCloud className='size-14 stroke-gray-400' />

                  <div className='space-y-3 text-center'>
                    <input {...getInputProps()} />
                    {kioskImages?.length < MAX_ITEM_COUNT ?
                      <>
                        <h4 className='font-semibold '>Select a file or drag and drop here</h4>
                        <p className='text-xs'>JPG, PNG, file size no more than 10MB</p>
                        <button className='px-6 py-2 text-sm text-black bg-transparent border border-black rounded hover:bg-black hover:text-white'>Select Image</button>
                      </>

                      : <div className='relative overflow-hidden'>
                        <h4 className='font-semibold '>You can not upload more than 5 images</h4>
                        <p className='text-xs'>Delete an Item to make room for more</p>
                      </div>}
                    {/* <p className='text-xs'>1080px by 1920px</p> */}
                  </div>


                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            {
              showDetails?._id ?
                <SelfCheckoutDisplay
                  setShowDetails={setShowDetails}
                  showDetails={showDetails}
                  updateImages={open}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  fetchUploadedImages={fetchUploadedImages}
                />
                :
                <>
                  {
                    (kioskImages && kioskImages?.length > 0) ?
                      <div className='my-10'>
                        {
                          kioskImages?.map((image: any, index) => (
                            <SelfCheckoutList setShowDetails={setShowDetails} imageDetails={image} key={index} />
                          ))
                        }

                      </div> : <div>
                        <p className='text-sm font-semibold text-center'>No uploaded images yet</p>
                        <p className='text-sm text-center'>Upload images to see them here</p>
                      </div>
                  }</>
            }
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}


const SelfCheckoutDisplay = ({ setShowDetails, showDetails, updateImages, setEditMode, fetchUploadedImages }: any) => {

  console.log("showDetails", showDetails)

  const [deleteModal, setDeleteModal] = useState(false);


  return (
    <div className='w-full p-4 h-fit '>
      <div className='relative flex flex-col items-center justify-center w-full max-w-[360px]  gap-4 p-5 border border-gray-300 rounded-md cursor-pointer lg:h-[520px] mx-auto' >
        <IoMdCloseCircleOutline className='absolute text-2xl text-gray-400 cursor-pointer -top-2 -right-2' onClick={() => setShowDetails(null)} />
        <div style={{ backgroundImage: `url(${showDetails?.image_url})` }} className='w-full h-full bg-center bg-cover border-[6px] border-gray-900 rounded-md '>
          <div className='relative w-full h-full overflow-hidden'>
            <div className='absolute top-0 left-0 bg-black/50 w-full h-[520px] ' />

            <div className='relative z-10 flex flex-col items-center justify-center w-full h-full gap-8 text-center '>
              <div className='space-y-5'>
                <h2 className='font-bold text-white text-7xl'>ORDER & PAY HERE</h2>
                <button className='px-8 py-2 text-sm text-white bg-[#FE7812] rounded font-semibold flex item-center justify-center mx-auto gap-2'>
                  <MdTouchApp className='text-xl -rotate-45' />
                  TOUCH TO START</button>
              </div>
              <div className='flex flex-col items-center justify-center space-y-2'>
                <p className='text-xs text-white '>All Cards and Mobile Payments Accepted</p>
                <img src={card} />
              </div>
            </div>
          </div>
        </div>

        <img src={troo_b_logo} />
      </div>

      <div className='flex items-center justify-between w-full gap-4 mt-4'>
        <button className="w-full px-8 py-2 font-semibold text-black border border-black text-md rounded-xl" onClick={() => { setEditMode(true); updateImages() }}>Edit</button>
        <button className="w-full px-8 py-2 font-semibold text-red-500 border border-red-500 text-md rounded-xl" onClick={() => setDeleteModal(true)}>Delete</button>
      </div>

      <DeleteModalConfirmation
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        showDetails={showDetails}
        fetchUploadedImages={fetchUploadedImages}
      />
    </div>
  )
}

const SelfCheckoutList = ({ setShowDetails, imageDetails }: any) => {



  return (
    <div className='flex items-center justify-between w-[90%] mx-auto gap-4 p-4 mb-4'>
      <div className='flex items-center gap-4'>
        {imageDetails?.image_url ?
          <div style={{ backgroundImage: `url(${imageDetails.image_url})` }} className='w-12 h-12 bg-center bg-cover border border-gray-300 rounded-md' />
          : <BsFileEarmarkImage />
        }
        <p>{imageDetails?.original_filename || "File name"}</p>
      </div>
      <button onClick={() => setShowDetails(imageDetails)} className='px-3 py-1 text-[10px] text-black border border-black rounded'>Preview</button>
    </div>
  )

}


const DeleteModalConfirmation = ({ isOpen, closeModal, showDetails, fetchUploadedImages }: any) => {
  //  /branches/:branchId/self-checkout/assets/:assetId
  console.log("showDetails in delete", showDetails)
  const { selectedBranch } = useSelector((state: any) => state.branches);
  const deleteImage = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        // `${SERVER_DOMAIN}/branches/${showDetails?.branch?._id}/self-checkout/assets/${showDetails?._id}`,
        `${SERVER_DOMAIN}/branches/${selectedBranch?.id}/self-checkout/assets/${showDetails?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);
      fetchUploadedImages();
    } catch (error: any) {
      console.error("Error fetching pickup locations:", error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="w-full max-w-[400px]  p-6 bg-gray-100 rounded-md">
        <h4>Are you sure you want to delete this image?</h4>

        <div className="flex justify-between gap-6 my-4 item-center ">
          <button onClick={deleteImage} className="w-full px-6 py-2 text-white bg-black rounded-md">Delete</button>
          <button onClick={closeModal} className="w-full px-6 py-2 border border-black rounded-md">Cancel</button>
        </div>
      </div>
    </Modal>

  )
}