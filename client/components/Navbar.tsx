'use client'

import React from 'react';

const Navbar = () => {

  return(
    <div>
      <nav className="w-full bg-gray-800 px-6 py-3">
    <div className="flex justify-between items-center">
        <a href="/" className="text-2xl font-bold" style={{ color: '#F3DFC1' }}>MyWebsite</a>
        <img src="/streaks_icon.png" alt="logo" width="80"/>
        <a href="#" className="text-gray-800 hover:text-blue-600" style={{ color: '#F3DFC1' }}>Streak: 9 days ✅</a>
        <div className="hidden md:flex items-center space-x-4">
            <a href="/dashboard" className="text-gray-800 hover:text-blue-600" style={{ color: '#F3DFC1' }}>Dashboard</a>
        </div>
        <div className="md:hidden flex items-center">
            <button className="text-gray-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>

    </div>
  )
}

export default Navbar;
