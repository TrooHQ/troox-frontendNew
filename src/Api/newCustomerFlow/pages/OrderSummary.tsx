import { MinusIcon, PlusIcon } from 'lucide-react'
import { FaArrowLeftLong, FaCirclePlus } from 'react-icons/fa6'
// import { ReactComponent as Utensils } from '/assets/utensils.svg'

export default function OrderSummary() {
  return (
    <div className="relative w-full min-h-screen mb-24">


      <p className='flex items-center gap-3 px-4 py-3 border-y border-y-gray-300'>
        <FaArrowLeftLong className='text-gray-600' />
        Back
      </p>
      <h4 className='px-4 py-3 font-semibold border-b border-b-gray-300'>Order Summary</h4>

      <div className='px-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <OrderSummaryCard key={index} />
        ))}
      </div>



      <div className='flex items-center gap-2 px-4 py-3 border-y border-y-gray-300'>
        <FaCirclePlus className='fill-blue-600' />
        <p className='text-sm font-semibold text-blue-600'>Add more items</p>
      </div>

      <div className='px-4 py-3 border-b border-b-gray-300'>
        <div className='flex items-center justify-between gap-2 py-3'>
          <div className='flex items-center gap-2'>
            <img src="/utensils.svg" alt="" className='w-5 h-5' />
            <p>Dining</p>
          </div>
          <input type='radio' />
        </div>

        <div className='flex items-center justify-between gap-2 py-3'>
          <div className='flex items-center gap-2'>
            <img src="/takeout.svg" alt="" className='w-5 h-5' />
            <p>Pick Up</p>
          </div>
          <input type='radio' />
        </div>
      </div>

      <div className='px-4 py-3 border-b border-b-gray-300'>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>SubTotal</p>
          <p className='font-semibold'>₦4,500</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm font-medium'>Service Charge</p>
          <p className='font-semibold'>₦500</p>
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-3 border-y border-y-gray-300'>
        <p className='text-sm font-medium '>Total</p><p className='font-semibold'>₦5,000</p></div>

      <button className="text-center flex items-center justify-between fixed bottom-0 left-0 right-0 w-[90%] px-4 py-3 mx-auto mb-4 text-white bg-black rounded-full">
        Place Order
      </button>
    </div>
  )
}


const OrderSummaryCard = () => {
  return (
    <div className="my-4 bg-white ">

      <div className='flex items-center justify-between w-full gap-4 '>
        <p className="text-base font-semibold">Item Name</p>
        <p className="text-gray-700">₦4,300</p>
      </div>

      <div className='grid items-start justify-center w-full grid-cols-5 gap-4 my-2'>

        <div className='flex flex-wrap items-center w-full col-span-3 gap-2 text-xs'>
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className='px-2 py-1 text-blue-700 bg-blue-200 rounded-lg text-[12px]'>{index} Plantain</span>
          ))}
        </div>

        <div className='flex items-center justify-center w-full col-span-2 gap-2 px-3 py-2 border border-gray-100 rounded-2xl'>
          <MinusIcon className='w-5 ' />
          <input className='w-12 text-center bg-gray-100 rounded-lg focus:border-none' value={1} />
          <PlusIcon className='w-5 ' />
        </div>

        <div className='flex items-center gap-2 '>
          <span className='text-sm font-semibold text-blue-500'>Edit</span>
          <span className='text-sm font-semibold text-red-500'>Remove</span>
        </div>

      </div>

    </div>
  )
}
