import React from 'react'
import DropDown from '@/components/dropdownMenu_mc'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="p-12">
        <DropDown options={[
            'Knee Replacement Surgery',
            'Others'
        ]}/>
        <Link href='/dashboard'>
          <button className='bg-blue-500 rounded-full p-4'>next page</button>
        </Link>
    </div>
  )
}

export default Page;