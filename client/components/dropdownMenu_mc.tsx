'use client'

import React, { useState } from 'react'
import { CaretDown, CaretRight } from "phosphor-react";

// const UpTriangle = ({ size }: { size: number }) => {
//     return <div style={{
//         width: 0,
//         height: 0,
//         borderLeft: `${size}px solid transparent`,
//         borderRight: `${size}px solid transparents`,
//         borderBottom: `${size}px solid black`
// }}>
//     </div>
// }

const RotatedCube = ({ size }: { size: number}) => {
    return <div style={{
        position: 'absolute',
        top: '-4px',
        left: '15px',
        transform: 'rotate(45deg)',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'white',
        borderLeft: `1px solid rgb(229, 231, 235)`,
        borderTop: `1px solid rgb(229, 231, 235)`,
}}>
    </div>
}

const DropDown = ({ options }: { options: string[]}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const showCaretDown = isExpanded;
    const showCaretRight = !isExpanded;
    
    return(
        <div className="relative">
            <button 
            onClick = {() => setIsExpanded(!isExpanded)}
            className="flex items-center rounded text-white px-2 py-1 hover:bg-gray-400 bg-gray-500">
                <div className="margin-right:1px">Select your surgery name</div>
            <div>
                {showCaretRight && <CaretRight size={16} />}
                {showCaretDown && <CaretDown size={16} />}
            </div>
            </button>
            {isExpanded &&
                <div className="absolute bg-white rounded border px-2 py-1 mt-2 w-100">
                    < RotatedCube size={7} />

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