'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'

const Home: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/mc_dropdown');
  };

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Recently had surgery and want to get back to your routine without emptying your wallet?</h1>
        <h2 className="text-2xl font-bold mb-4 text-teal-800">Discover affordable, personalized recovery with us!</h2>
        <p className="text-lg mb-4 w-3/4">Post-surgery physiotherapy can cost up to $2,500 with limited in-person support. Our online physiotherapy service offers a cost-effective and accessible solution, providing personalized care and reminders at a fraction of the price. With 2.4 billion people needing rehab globally and significant gaps in access, we deliver essential support to help you recover efficiently and affordably, reducing complications and getting you back to your routine faster.</p>
        <button 
            onClick={handleRedirect}
            style={{
                backgroundColor: '#246A73', 
                color: '#F3DFC1'
            }}
            className="px-4 py-2 rounded hover:bg-teal-700">Learn more</button>
      </div>
    </main>
  );
}

export default Home
