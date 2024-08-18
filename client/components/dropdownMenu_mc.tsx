'use client'

import React, { useState } from 'react'
// import { Horse, Heart, Cube } from "phosphor-react";

const DropDown = ({ options }: { options: string[]}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    return(
        <div>
            <button 
            onClick = {() => setIsExpanded(true)}
            className="rounded text-white px-2 py-1 hover:bg-gray-400 bg-gray-500">Select your surgery name
            </button>
            {isExpanded &&
                <div className="bg-white rounded border px-2 py-1">
                    <ul>
                        {options.map(option => (
                            <li 
                                className = "hover:bg-blue-400 hover:text-white px-2 py-1 cursor-pointer"
                                key={option}
                            >
                                    {option}
                            </li>
                        ))}
                    </ul>
                </div>
    
            }
        </div>
    );
    
};

export default DropDown;