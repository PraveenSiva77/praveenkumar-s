import React from 'react';
import { BiMouse } from "react-icons/bi";

function ScrollDownBtn({goto}) {
  return (
    <div className='cursor-pointer hover:text-blue-500'> 
        <a href={goto}>
            <span href={goto} className='flex items-center justify-between gap-2 text-base mdx:hidden'><BiMouse className='text-xl'/> ScrollDown </span>
        </a>
    </div>
  )
}

export default ScrollDownBtn