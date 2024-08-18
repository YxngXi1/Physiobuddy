'use client'

import Image from "next/image";
import React, {useEffect, useState} from 'react';
import Camera from '@/components/Camera'

export default function Home() {

  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState<any[]>([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
 

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
    .then((response) => response.json())
    .then((data) => {

      setMessage(data.message);
      setPeople(data.people);

      console.log(data)
    })
  }, [])

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  }

  const startRecording = () => {
    fetch('http://localhost:8080/start_recording', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <main>
      <div>
        {message}
      </div>  
      {people.map((person: any, index: any) => (
        <div key={index}>{person}</div>
      ))}
      <button onClick={toggleCamera} className="flex bg-blue-500 p-4 rounded-full">
        {cameraEnabled ? 'Disable Camera' : 'Enable Camera'}
      </button>
      <div className="h-2/6 w-2/6">
        {cameraEnabled && <Camera />}
      </div>
      <button className='bg-blue-500 p-4' onClick={startRecording}>start recording</button>
    </main>
  );
}
