'use client'

import Navbar from '@/components/Navbar';
import React, { useEffect, useRef } from 'react';

const Feedback: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Any side effects related to the video can be handled here
    if (videoRef.current) {
      console.log('Video element is ready');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-2xl font-bold mb-4 text-teal-800">Feedback</h2>
        <p className="text-lg mb-4 w-3/4">
          Great job at doing the exercises! We hope you feel your muscles to be in a more relaxed state now.
          Now, let's take a look at how you did...
        </p>
        <p>Extending your legs a little bit, and slowing down will help minimize injury and continue helpng you on your journey to recovery!</p>
      </div>
    </div>
  );
}

export default Feedback;
