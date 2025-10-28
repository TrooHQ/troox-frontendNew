
import {
  // GoArrowDownRight,
  GoArrowRight,
  // GoArrowUpRight
} from 'react-icons/go'

interface Props {
  title: string;
  bgColor: string;
  data: any
}

export default function OverviewCard({ title, bgColor, data }: Props) {
  return (
    // #E0F2FE
    // #FFEFE3
    <div style={{ backgroundColor: bgColor }} className='w-full rounded-md' >
      <h3 className='w-full mx-4 my-2 text-base font-semibold text-gray-900 '>{title}</h3>
      <div style={{ border: `2px solid ${bgColor}` }} className='px-4 py-2 bg-white rounded-md '>
        <h3 className='text-2xl font-semibold'>{data ?? ""}</h3>

        <div className='flex items-center w-full gap-2 mt-4'>
          <GoArrowRight className='text-green-600 ' />
          <span className='text-sm font-medium '> 1.3% vs yesterday</span>
        </div>
      </div>
    </div>
  )
}


