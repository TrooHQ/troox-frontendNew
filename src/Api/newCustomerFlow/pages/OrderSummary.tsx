import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
// import { FaCirclePlus } from 'react-icons/fa6'

export default function OrderSummary() {
  return (
    <div className="relative w-full min-h-screen pb-14">

      {Array.from({ length: 3 }).map((_, index) => (
        <OrderSummaryCard key={index} />
      ))}



      {/* <div className='border-y border-y-gray-300'>
        <FaCirclePlus className='' />
      </div> */}

      <button className="flex items-center justify-between fixed bottom-0 left-0 right-0 w-[90%] px-4 py-3 mx-auto mb-4 text-white bg-black rounded-full">
        Place Order
      </button>
    </div>
  )
}


const OrderSummaryCard = () => {
  return (
    <div className="w-[90%] mx-auto my-2 p-4 bg-white rounded-lg shadow-md ">

      <div className='flex items-center justify-between w-full gap-4 '>
        <p className="text-base font-semibold">Item Name</p>
        <p>$4,300</p>
      </div>

      <div className='grid items-center justify-center w-full grid-cols-5 gap-4 my-2'>

        <div className='flex flex-wrap items-center w-full col-span-3 gap-2 text-xs'>
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className='px-2 py-1 text-blue-700 bg-blue-200 rounded-lg text-[10px]'>1 Plantain</span>
          ))}
        </div>

        <div className='flex items-center justify-center w-full col-span-2 gap-2 px-3 py-2 border border-gray-100 rounded-full'>
          <MinusIcon className='w-5 ' />
          <input className='w-12 text-center bg-gray-100 rounded-lg focus:border-none' value={1} />
          <PlusIcon className='w-5 ' />
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-red-500'>Edit  </span>
          <span className='text-sm text-blue-500'>Delete</span>
        </div>

      </div>

    </div>
  )
}
