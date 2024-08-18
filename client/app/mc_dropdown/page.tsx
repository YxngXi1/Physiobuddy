import React from 'react'
import DropDown from '@/components/dropdownMenu_mc'
import Navbar from '@/components/Navbar';
import Link from 'next/link'

const Page = () => {
  return (
    <div>
        <Navbar />
      <div className="p-5">
        <DropDown question="Which surgery are you trying to recover from?" options={[
          'Knee Replacement Surgery',
          'Others'
        ]} />

        <h1 className='pt-24'>Recommended Exercises:</h1>
        <DropDown question="Recommended Exercises:" options={[
          'Straight Leg Raises',
          'Ankle Pumps',
          'Bed-Supported Knee Bends'
        ]} />
      </div>
        <Link href='/dashboard'>
          <button className='bg-blue-500 rounded-full p-4'>next page</button>
        </Link>
    </div>
  )
}

export default Page;