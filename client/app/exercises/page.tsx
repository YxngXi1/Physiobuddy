'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Camera from '@/components/Camera'

export default function Home() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [message, setMessage] = useState('Connecting to server...');
  const [selectedExercise, setSelectedExercise] = useState('exercise1');

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  }

  const startRecording = () => {
    fetch('http://localhost:8080/start_recording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exercise: selectedExercise })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/home')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-y-4">
      <div className="mt-4">
          <h2 className="text-sm">{message}</h2>
        </div>
      <div className="w-full h-full flex flex-col justify-center text-center gap-y-4">
        <p className="text-xl font-semibold">Select the exercise you want to do today, and then simply geeeet READY!</p>
        <div className="flex w-full justify-center items-center gap-x-4 gap-y-4">
          <select 
            value={selectedExercise} 
            onChange={(e) => setSelectedExercise(e.target.value)} 
            className="bg-gray-200 p-2 rounded-full"
          >
            <option value="exercise1">Bed Supported Knee Bend</option>
            <option value="exercise2">Sitting Supported Knee Bend</option>
          </select>
          <button className='bg-blue-500 p-4 text-whites' onClick={startRecording}>Start Exercise</button>
        </div>  
        
        <div className="h-full w-full flex flex-col justify-start items-center relative">
          <div className="h-4/6 w-4/6 absolute">
            <Camera />
          </div>
        </div>
      </div>
    </main>
  );
}
