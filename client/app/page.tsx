'use client'

import Image from "next/image";
import React, {useEffect, useState} from 'react';

export default function Home() {

  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState<any[]>([]);
 

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
    .then((response) => response.json())
    .then((data) => {

      setMessage(data.message);
      setPeople(data.people);

      console.log(data)
    })
  }, [])

  return (
    <main>
      <div>
        {message}
      </div>  
      {people.map((person: any, index: any) => (
        <div key={index}>{person}</div>
      ))}
    </main>
  );
}
