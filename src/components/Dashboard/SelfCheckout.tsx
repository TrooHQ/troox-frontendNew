import DashboardLayout from './DashboardLayout'
import TopMenuNav from './TopMenuNav'
import { FiUploadCloud } from 'react-icons/fi'

export default function SelfCheckout() {
  return (

    <DashboardLayout>
      <TopMenuNav pathName="Troo Kiosk" />
      <div className='w-full min-h-screen my-5 border border-gray-400 rounded-md'>

        <div className='flex items-center justify-between w-full gap-4 m-5'>
          <div className='w-full'>


            <div className='mx-auto sm:w-full lg:w-2/3'>
              <h2>Upload Self-Checkout images.</h2>
              <p>Add 3-5 images as your Kiosk screen saver</p>
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


          <div className='w-full p-4 h-fit '>
            <div className='flex flex-col items-center justify-center w-full max-w-[360px]  gap-4 p-5 border border-gray-300 rounded-md cursor-pointer lg:h-[520px]' >
              <div style={{ backgroundImage: "url(/public/img1.jpg)" }} className='w-full h-full bg-center bg-cover border border-black border-solid rounded-md '>

              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}
