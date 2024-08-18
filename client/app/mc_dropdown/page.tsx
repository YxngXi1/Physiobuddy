import React from 'react'
import DropDown from '@/components/dropdownMenu_mc'
import Navbar from '@/components/Navbar';
import Link from 'next/link'

const Page = () => {
  return (
    <div>
        <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center gap-y-4">
        <select 
          className="bg-gray-200 p-2 rounded-full my-4"
        >
          <option value="1">Choose Options</option>
          <option value="2">Knee Replacement Surgery</option>
          <option value="3">Others</option>
        </select>
        <Link href='/dashboard'>
          <button className='bg-blue-500 rounded-full p-4 text-white'>Submit</button>
        </Link>
      </div>
    </div>
  )
}

export default Page;
