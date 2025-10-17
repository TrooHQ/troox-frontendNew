import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'

export default function LayoutComponent({ children }: { children: React.ReactNode }) {


  return (
    <div className='w-full'>
      <TopBar />
      <div className='grid w-full grid-cols-6'>
        <div className='w-full h-screen col-span-1 '>
          <SideBar />
        </div>
        <div className='w-full h-screen col-span-5 overflow-y-scroll border-l border-l-gray-300'>
          <div className='w-full p-4 border-b border-b-gray-300'>
            <h3 className='mb-2 text-xl font-semibold'>Title</h3>
            <p className='text-sm '>this is the page description</p>
          </div>
          <div className='p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
