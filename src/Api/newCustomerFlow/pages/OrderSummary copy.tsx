import { MinusIcon, PlusIcon } from 'lucide-react'
import { FaArrowLeftLong, FaCirclePlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/store";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderSummary() {

  const basketItems = useSelector((state: RootState) => state.basket.items);

  console.log("basketItems", basketItems)

  const [home, setHome] = useState("");
  useEffect(() => {
    const home_url = localStorage.getItem("home_url");
    if (home_url) setHome(home_url);
  }, [])

  const navigate = useNavigate();

  useEffect(() => {
    if (basketItems.length < 1) navigate(-1);
  }, [basketItems.length, navigate])


  return (
    <div className="relative w-full min-h-screen mb-24">


      <p className='flex items-center gap-3 px-4 py-3 border-y border-y-gray-300' onClick={() => navigate(-1)}>
        <FaArrowLeftLong className='text-gray-600' />
        Back
      </p>
      <h4 className='px-4 py-3 font-semibold border-b border-b-gray-300'>Order Summary</h4>

      <div className='px-4'>
        {
          basketItems.map((item, index) => (
            <OrderSummaryCard key={index} item={item} />
          ))
        }
      </div>

      <Link to={home} className='flex items-center gap-2 px-4 py-3 border-y border-y-gray-300'>
        <FaCirclePlus className='fill-blue-600' />
        <p className='text-sm font-semibold text-blue-600'>Add more items</p>
      </Link>

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

      <div className="px-4 py-4 border-b border-b-gray-200">
        <label className="block mb-2 text-sm font-medium text-gray-900">Leave a note</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="tell the restaurant your preference" />
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
        <p className='text-sm font-medium '>Total</p><p className='font-semibold'>₦5,000</p>
      </div>

      <div className='fixed bottom-0 left-0 right-0 flex items-center justify-between w-full py-2 bg-white'>
        <button className="text-center  w-[90%] px-4 py-3 mx-auto  text-white bg-black rounded-full">
          Place Order
        </button>
      </div>
    </div>
  )
}


const OrderSummaryCard = ({ item }: any) => {
  return (
    <div className="my-4 bg-white ">

      <div className='flex items-center justify-between w-full gap-4 '>
        <p className="text-base font-semibold text-gray-700">{item.name}</p>
        <p className="text-gray-900 ">₦{item.totalPrice.toLocaleString()}</p>
      </div>

      <div className='flex w-full gap-4 my-2'>
        {item.selectedOptions.length > 0 && <div className='flex flex-wrap items-center w-full gap-2 text-xs'>
          {
            item.selectedOptions.map((option: any, index: number) => (
              <span key={index} className='px-2 py-1 text-gray-600 bg-gray-100 rounded-lg text-[12px]'>{option.quantity}{" "}{option.name}</span>
            ))
          }
        </div>}

      </div>
      <div className='flex items-center justify-between gap-2'>

        <div className='flex items-center justify-center gap-2 px-2 py-1 my-2 border border-gray-100 w-fit rounded-2xl'>
          <MinusIcon className='w-4 ' />
          <input className='w-12 text-center bg-gray-100 rounded-lg focus:border-none' value={1} />
          <PlusIcon className='w-4 ' />
        </div>
        <div className='flex items-center gap-2 '>
          <span className='text-sm font-semibold text-blue-500'>Edit</span>
          <span className='text-sm font-semibold text-red-500'>Remove</span>
        </div>
      </div>

    </div>
  )
}
