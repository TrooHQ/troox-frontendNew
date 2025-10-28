import React from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'

export default function LayoutComponent({ children, title, description }: { children: React.ReactNode, title?: string, description?: string }) {


  return (
    <div className='w-full'>
      <TopBar />
      <div className='grid w-full grid-cols-6'>
        <div className='w-full min-h-screen col-span-1 '>
          <SideBar />
        </div>
        <div className='w-full min-h-screen col-span-5 border-l border-l-gray-100'>
          <div className='w-full h-screen overflow-y-scroll'>
            <div className='w-full p-4 border-b border-b-gray-100'>
              <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
              <p className='text-sm '>{description}</p>
            </div>
            <div className='p-4'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
