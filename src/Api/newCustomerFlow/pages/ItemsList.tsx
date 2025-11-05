

// business identifier and branch id are requried for fetch the appropriate menu list item
// https://troox-backend-new.onrender.com/api/business/getBusinessDetails/?business_identifier=6729de3ac6a9cd9c11abdcbf
// https://troox-backend-new.onrender.com/api/menu/getAllMenuItem/?business_identifier=6729de3ac6a9cd9c11abdcbf&branch=6729de3ac6a9cd9c11abdccd

// import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa6"
import { TiWaves } from "react-icons/ti"
import { RxShare2 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
export default function ItemsList() {

  const [activeTab, setActiveTab] = useState("all");


  return (
    <div className="w-full min-h-screen">

      <div className='relative w-full h-64 mb-12'>
        <img
          src='/bg-banner.png'
          alt='bg-banner'
          className='object-cover object-center w-full h-64 mb-10'
        />

        <div className="absolute flex items-center gap-2 top-2 right-2">
          <RxShare2 className="p-1 text-2xl bg-gray-200 rounded-full bottom-2 right-2" />
          <IoSearchOutline className="p-1 text-2xl bg-gray-200 rounded-full bottom-2 right-2" />
        </div>
        {/*  */}
        <div className="absolute z-10 rounded-full shadow-md p-1 bg-white -bottom-7 left-4 size-16 flex items-center justify-center overflow-hidden ">
          <TiWaves className="w-full h-full rounded-full text-orange-400 bg-orange-200 " />
        </div>
      </div>

      {/* <div className=""> */}
      <div className="px-4">
        <h2 className="text-base font-semibold text-gray-900">Mama’s Kitchen</h2>
        <p className="my-2 text-xs text-gray-700">Serving the fastest, freshest meals in the area. We specialize in quality food made to-order...</p>

        <p className="flex items-center gap-2 my-2 text-xs text-gray-700"><span>Opens 8AM - 8PM</span> <span className="flex items-center gap-2"> <FaStar className="fill-orange-500" /> 4.5</span></p>
      </div>


      <div className="flex items-center gap-4 px-4 my-4 overflow-x-auto whitespace-nowrap">
        <span
          onClick={() => setActiveTab("all")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-600 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "all" ? "border-b-blue-600" : ""}`}>All items</span>
        <span
          onClick={() => setActiveTab("popular")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "popular" ? "border-b-blue-600" : ""}`}>Popular</span>
        <span
          onClick={() => setActiveTab("soup")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "soup" ? "border-b-blue-600" : ""}`}>Soups</span>
        <span
          onClick={() => setActiveTab("rice")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "rice" ? "border-b-blue-600" : ""}`}>Rice</span>
        <span
          onClick={() => setActiveTab("pasta")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "pasta" ? "border-b-blue-600" : ""}`}>Pasta</span>
        <span
          onClick={() => setActiveTab("local")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "local" ? "border-b-blue-600" : ""}`}>Local</span>
        <span
          onClick={() => setActiveTab("international")}
          className={`px-2 py-3 border-b-2 text-xs text-gray-700 hover:text-blue-600 border-b-transparent hover:border-b-blue-600 ${activeTab === "international" ? "border-b-blue-600" : ""}`}>International</span>
      </div>
      <div className="w-full py-1 bg-gray-200">
        <h3 className="p-4 text-sm font-semibold text-gray-900">Menu Category</h3>
      </div>
      <div className="mt-4 ">

        {Array.from({ length: 10 }).map((_, index) => (
          <ItemCard key={index} />
        ))}
      </div>

    </div>
    // </div>
  )
}




const ItemCard = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 px-4 py-3 my-3 border-b border-b-gray-200 h-fit">

      <div className="col-span-2" >
        <h4 className="text-base font-semibold text-gray-900">Menu Item</h4>
        <p className="my-2 text-sm text-gray-700">Classic Italian pizza with fresh mozzarella, aromatic basil</p>
        <p className="text-sm font-semibold text-gtay-900">₦1,000</p>
      </div>

      <div className="relative w-full col-span-1">
        <img
          src='/bg-banner.png'
          alt='bg-banner'
          className='object-cover object-center w-full h-full overflow-hidden rounded-lg'
        />
        <FiPlus className="absolute bg-gray-200 rounded-full bottom-2 right-2" />
      </div>
    </div >
  )
}