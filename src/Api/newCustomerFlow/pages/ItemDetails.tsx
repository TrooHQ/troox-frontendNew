import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
export default function ItemDetails() {
  return (
    <div className="relative w-full min-h-screen pb-14">

      <div className='relative w-full h-64'>
        <img
          src='/bg-banner.png'
          alt='bg-banner'
          className='object-cover object-center w-full h-64 mb-10'
        />

        <IoMdClose className="absolute flex items-center gap-2 p-1 text-2xl bg-gray-200 rounded-full top-2 left-2 bottom-2 right-2" />
      </div>

      <div className="px-4 py-4 border-b border-b-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Full Chicken</h2>
        <p className="my-2 font-semibold text-gray-900">₦1,000</p>
        <p className="my-2 text-xs text-gray-700">Tender, all-white turkey breast, slow-roasted to succulent perfection with a savory rub of rosemary, thyme, and garlic-herb butter.</p>
      </div>

      <div className="px-4 py-4 border-b border-b-gray-200">
        <h3 className="mb-1 font-semibold text-gray-900">Select Size</h3>
        <p className="flex items-center text-sm">Required <span><GoDotFill className="w-2 mx-2" /></span> Select 1</p>


        <div className="flex flex-col mx-2 my-2 gap-y-4">
          <label className="space-x-2">
            <input type="radio" name="selection" />
            <span className="font-semibold ">Small</span>
          </label>
          <label className="space-x-2">
            <input type="radio" name="selection" />
            <span className="font-semibold ">Medium</span>
          </label>
          <label className="space-x-2">
            <input type="radio" name="selection" />
            <span className="font-semibold ">Large</span>
          </label>
        </div>
      </div>

      <div className="my-4 border-b border-b-gray-200">
        <h3 className="px-4 mb-1 font-semibold text-gray-900">Add Toppings</h3>
        <p className="flex items-center px-4 text-sm">Optional <span><GoDotFill className="w-2 mx-2" /></span> Select up to 3</p>

        <div className="flex flex-col my-6">
          <label className="flex items-center justify-between px-4 py-3 space-x-2 border-t border-t-gray-200">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="selection" />
              <span className="font-semibold ">Extra Cheese</span>
            </div>
            <span className="text-sm text-gray-500">+₦200</span>
          </label>

          <label className="flex items-center justify-between px-4 py-3 space-x-2 border-t border-t-gray-200">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="selection" />
              <span className="font-semibold ">Extra Chicken</span>
            </div>
            <span className="text-sm text-gray-500">+₦200</span>
          </label>

          <label className="flex items-center justify-between px-4 py-3 space-x-2 border-y border-y-gray-200">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="selection" />
              <span className="font-semibold ">Large</span>
            </div>
            <span className="text-sm text-gray-500">+₦200</span>
          </label>
        </div>
      </div>

      <div className="px-4 py-4 mb-10 border-b border-b-gray-200">
        <label className="block mb-2 text-sm font-medium text-gray-900">Leave a note</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="tell the restaurant your preference" />
      </div>

      <button className="flex items-center justify-between fixed bottom-0 left-0 right-0 w-[90%] px-4 py-3 mx-auto mb-4 text-white bg-black rounded-full">
        <span>Add to order</span>
        <span>$4,300</span>
      </button>
    </div>
  )
}
