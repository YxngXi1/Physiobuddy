'use client'

import React, { useState } from 'react'

const DropDown = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    return(
        <div>
            <button 
            onClick = {() => setIsExpanded(true)}
            className="rounded text-white px-2 py-1 hover:bg-gray-400 bg-gray-500">Select your surgery name
            </button>
            {isExpanded &&
                <div className="bg-white rounded border px-2 py-1">Panel</div>
            }
        </div>
    );
    
};

export default DropDown;