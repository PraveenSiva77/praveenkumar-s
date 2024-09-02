import React from 'react';
import './style.css';

function JourneyCard({ image, title, role, duration }) {
  return (

    <>
{/* TimeLine Base */}
<div className='pt-1 my-2 w-full mdx:max-w-full'>
                {/* Timeline Date */}
                <div class="ps-2 my-2 first:mt-0">
                    <h3 class="text-xs font-medium uppercase text-gray-500">
                    {duration}
                    </h3>
                </div>
                {/* Container */}
                <div class="pr-8 mdx:pr-0 flex gap-x-3 relative group">
                    {/* Timeline Circle */}
                    <a class="absolute inset-0 z-[1]" href=""></a>
                    
                    {/* Timeline Line */}
                    <div class="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                        <div class="relative z-10 size-7 flex justify-center items-center">
                            <div class="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-blue-600"></div>
                        </div>
                    </div>

                    {/* Timeline Content */}
                    <div class="w-full rounded-lg border border-blue-400 grow p-4 px-8 smx:px-4 group-hover:shadow-md group-hover:shadow-blue-300">
                        {/* Heading */}
                        <h3 class="flex gap-x-1.5 text-xl md:text-2xl font-semibold text-gray-800">
                            {role}
                        </h3>
                        {/* Sub-Title */}
                        <p class="mt-1 text-sm text-gray-600">
                            {title}
                        </p>
                        <button type="button" class="mt-2 -ms-1 p-1 px-2 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none">
                            <img class="shrink-0 size-4 rounded-full" src={image} alt={title}/>
                            Praveenkumar S
                        </button>
                    </div>

                </div> 
                
            </div>


      {/* <div className="journey_card_base relative w-max smx:w-[90vw] flex mdx:flex-col items-center mdx:text-center p-4 gap-8 mdx:gap-0 mdx:px-4 mdx:py-6 mdx:border-[1px] mdx:border-blue-500 mdx:rounded-lg before:bg-blue-500 mdx:before:hidden">
          <div className="relative flex items-center justify-center p-1 rounded-full border-[1.5px] border-blue-500">
              <img className='w-12 rounded-full border-[1px] border-blue-500' src={image} alt={title} />
          </div>
          <div className="flex flex-col items-start mdx:text-center mdx:items-center px-4 py-6 min-w-[350px] mdx:min-w-[90vw]">
              <h1 className='text-2xl smx:text-base text-gray-700 font-semibold'>{role}</h1>
              <h2 className='text-base text-gray-400'>{title}</h2>
              <p className='text-base text-gray-400'>{duration}</p>
          </div>
      </div> */}
    </>
  )
}

export default JourneyCard;
