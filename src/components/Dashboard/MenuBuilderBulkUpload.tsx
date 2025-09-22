import BulkUploadComp from './BulkUploadComp/BulkUploadComp';
import DashboardLayout from './DashboardLayout'
import TopMenuNav from './TopMenuNav'
import { FiInfo } from "react-icons/fi";

export default function MenuBuilderBulkUpload() {
  return (
    <div>

      <DashboardLayout>
        <TopMenuNav pathName="Bulk Upload" goBack={true} />

        <div className='mt-8'>
          <div className='flex bg-[#FFF5F0] p-4 gap-2'>
            <FiInfo className='size-3' />
            <p className='text-xs font-medium'>Follow the step-by-step guide below for bulk upload</p>
          </div>

          <div className='w-10/12 mt-8'>
            <div className="flex items-center w-full gap-6 border border-gray-300 rounded-md cursor-pointer ps-3 hover:border-orange-500">
              <div className="p-2 ">
                <h4 className="text-[14px] font-semibold">Step 1</h4>
              </div>
              <div className='w-full px-8 py-3 border border-gray-200 rounded-s-md'>
                <h4 className="text-[14px] font-semibold">Download the sample csv spreadsheet</h4>
                <p className="my-3 text-sm">This spreedsheet will serve as a template to organize the menu bulk upload</p>
                <a href="/bulkupload.xlsx" download="bulkupload.xlsx">
                  <button className="px-4 py-2 text-xs text-white bg-black rounded">Download Template</button>
                </a>
              </div>
            </div>

            <div className="flex items-center w-full gap-6 my-8 border border-gray-300 rounded-md cursor-pointer ps-3 hover:border-orange-500">
              <div className="p-2 ">
                <h4 className="text-[14px] font-semibold">Step 2</h4>
              </div>
              <div className='w-full px-8 py-3 border border-gray-200 rounded-s-md'>
                <h4 className="text-[14px] font-semibold">CSV Guide</h4>
                <ul className='text-sm list-decimal list-inside'>
                  <li>Do not modify the column header name</li>
                  <li>Enter the menu category and menu groups</li>
                  <li>Enter the menu items, image URL, pricing and description</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center w-full gap-6 my-8 border border-gray-300 rounded-md cursor-pointer ps-3 hover:border-orange-500">
              <div className="p-2 ">
                <h4 className="text-[14px] font-semibold">Step 3</h4>
              </div>
              <div className='w-full px-8 py-3 border border-gray-200 rounded-s-md'>
                <h4 className="text-[14px] font-semibold">Upload Template</h4>
                <ul className='text-sm'>
                  <li>Use the ‘ Choose Files’ button to select your category CSV.</li>
                  <li>Alternatively you can drag and drop your file into the section below.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <BulkUploadComp />
      </DashboardLayout>
    </div>
  )
}
