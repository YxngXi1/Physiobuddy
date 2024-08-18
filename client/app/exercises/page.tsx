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
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="my-4">
          <h2>{message}</h2>
        </div>
      <div className="w-full h-full flex flex-col justify-center text-center">
        <button onClick={toggleCamera} className="bg-blue-500 p-4 rounded-full">
          {cameraEnabled ? 'Disable Camera' : 'Enable Camera'}
        </button>
        <select 
          value={selectedExercise} 
          onChange={(e) => setSelectedExercise(e.target.value)} 
          className="bg-gray-200 p-2 rounded-full my-4"
        >
          <option value="exercise1">Exercise 1</option>
          <option value="exercise2">Exercise 2</option>
        </select>
        <button className='bg-blue-500 p-4' onClick={startRecording}>Start Exercise</button>
        
        <div className="h-full w-full flex flex-col justify-center items-center relative">
          <div className="h-4/6 w-4/6 absolute">
            {cameraEnabled && <Camera />}
          </div>
        </div>
      </div>
    </main>
  );
}