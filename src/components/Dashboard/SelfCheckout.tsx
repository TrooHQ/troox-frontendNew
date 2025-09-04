import { MdTouchApp } from 'react-icons/md'
import DashboardLayout from './DashboardLayout'
import TopMenuNav from './TopMenuNav'
import { FiUploadCloud } from 'react-icons/fi'
import { BsFileEarmarkImage } from "react-icons/bs";
import { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
export default function SelfCheckout() {

  const [_showDetails, setShowDetails] = useState(false);

  return (

    <DashboardLayout>
      <TopMenuNav pathName="Troo Kiosk" />
      <div className='w-full min-h-screen my-5 border border-gray-400 rounded-md'>

        <div className='flex w-full gap-4 px-5 my-20 justify-evenly'>
          <div className='w-full'>
            <div className='mx-auto sm:w-full lg:w-2/3'>
              <h2 className='text-sm font-semibold'>Upload Self-Checkout images.</h2>
              <p className='text-sm'>Add 3-5 images as your Kiosk screen saver</p>
              <div className='w-full p-4 mt-4 border border-gray-300 rounded-md h-fit'>
                <div className='flex flex-col items-center justify-center w-full gap-4 p-4 border border-gray-300 border-dashed rounded-md cursor-pointer h-fit'>

                  <FiUploadCloud className='size-14 stroke-gray-400' />

                  <div className='space-y-3 text-center'>
                    <h4 className='font-semibold '>Select a file or drag and drop here</h4>
                    <p className='text-xs'>JPG, PNG, file size no more than 10MB</p>
                    <p className='text-xs'>1080px by 1920px</p>
                  </div>

                  <button className='px-6 py-2 text-sm text-black bg-transparent border border-black rounded hover:bg-black hover:text-white'>Select Files</button>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            {
              _showDetails ?
                <SelfCheckoutDisplay setShowDetails={setShowDetails} />
                :
                <div className='my-10'>
                  <SelfCheckoutList setShowDetails={setShowDetails} />
                  <SelfCheckoutList setShowDetails={setShowDetails} />
                  <SelfCheckoutList setShowDetails={setShowDetails} />
                </div>
            }
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}


const SelfCheckoutDisplay = ({ setShowDetails }: any) => {
  return (
    <div className='w-full p-4 h-fit '>
      <div className='relative flex flex-col items-center justify-center w-full max-w-[360px]  gap-4 p-5 border border-gray-300 rounded-md cursor-pointer lg:h-[520px]' >
        <IoMdCloseCircleOutline className='absolute text-2xl text-gray-400 cursor-pointer -top-2 -right-2' onClick={() => setShowDetails(false)} />
        <div style={{ backgroundImage: "url('/img1.jpg')" }} className='w-full h-full bg-center bg-cover border-[6px] border-gray-900 rounded-md '>
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
                <img src="/public/cards.png" />
              </div>
            </div>
          </div>
        </div>

        <img src='/public/troo-b-logo.png' />
      </div>
    </div>
  )
}

const SelfCheckoutList = ({ setShowDetails }: any) => {
  return (
    <div className='flex items-center justify-between w-[90%] mx-auto gap-4 p-4 mb-4'>
      <div className='flex items-center gap-4'>
        <BsFileEarmarkImage />
        <p>File name</p>
      </div>
      <button onClick={() => setShowDetails(true)} className='px-3 py-1 text-[10px] text-black border border-black rounded'>Preview</button>
    </div>
  )

}
