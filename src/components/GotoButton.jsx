import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function GotoButton({value}) {

    const navigate = useNavigate();

    const navigateHandle = (val) => {
        navigate(parseInt(val, 10));
    };

  return (
    <div 
    onClick={() => navigateHandle(value)}
    className='border border-text-light dark:text-text-dark hover:border-primary-light hover:text-primary-light dark:hover:text-primary-light px-3 py-1 rounded-full'>
        <span 
        className='cursor-pointer flex items-center justify-center w-max gap-1'>
        <IoIosArrowBack className='smx:border mt-[1px] smx:rounded-full smx:text-2xl smx:hover:bg-primary-light'/> 
        <span className='text-base smx:hidden mr-1'>Back</span>
        </span>
    </div>
  )
}

export default GotoButton