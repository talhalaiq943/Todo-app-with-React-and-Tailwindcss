import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-500 text-white items-center'>
        <div className="logo ">
            <span className='font-bold  flex items-center text-2xl ml-3 cursor-pointer transition-all hover:scale-105'>iTask</span>
        </div>
    <ul className='flex gap-4 mx-5 my-2'>
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all  duration-100'>Your Tasks</li>
    </ul>
    </nav>
  )
}

export default Navbar
