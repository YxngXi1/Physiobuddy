import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-y-12'>
      <h1 className='text-3xl font-semibold'>These are the exercises you may be performing today!</h1>
      <div className='w-full flex justify-evenly border'>
        <Image
          src='/exercise1.png'
          height={500}
          width={500}
          alt='exercise1'
          />
        <Image
        src='/exercise2.png'
        height={500}
        width={500}
        alt='exercise2'
          />
      </div>
      <Link href='/exercises'>
          <button className='bg-blue-500 rounded-full p-4 text-white'>Start Your Workout</button>
      </Link>
    </div>
  )
}

export default page
