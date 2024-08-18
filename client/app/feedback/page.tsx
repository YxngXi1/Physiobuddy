'use client'

import Navbar from '@/components/Navbar';
import React from 'react';

const Feedback: React.FC = () => {

  return(
    <div>
      <Navbar />
      <div >
      <h2 className="text-2xl font-bold mb-4 text-teal-800">Feedback</h2>
        <p className="text-lg mb-4 w-3/4">Great job at doing the exercises! We hope you feel your muscles to be in a more relaxed state now
        By looking at your exercise and analyzing how you were doing</p>
      <p>Feedback will be added here</p>
      </div>
    </div>
  )
}

export default Feedback
