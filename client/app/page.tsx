'use client'

import Image from "next/image";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'

const Home: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/mc_dropdown'); 
  };

  return(
    <div>
      <Navbar/>
      <h1>Have you had a surgery recently?</h1>
      <p>Look no further! We have got you covered with our online physio therapy. We offer affordable prices and personalization which will keep track of your exercises and health!</p>
    <button onClick={handleRedirect}>Learn More</button>
    </div>
  )
}

export default Home
