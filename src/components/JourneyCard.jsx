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
                    <div class="w-full rounded-lg border border-blue-400 grow p-4 px-8 smx:px-4 group-hover:shadow-md group-hover:shadow-secondary-dark">
                        {/* Heading */}
                        <h3 class="flex gap-x-1.5 text-xl md:text-2xl font-semibold text-gray-800 dark:text-text-dark">
                            {role}
                        </h3>
                        {/* Sub-Title */}
                        <p class="mt-1 text-sm text-gray-600 dark:text-primary-light">
                            {title}
                        </p>
                        <button type="button" class="mt-2 -ms-1 p-1 px-2 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none">
                            <img class="shrink-0 size-4 rounded-full" src={image} alt={title}/>
                            Praveenkumar S
                        </button>
                    </div>
                </div> 
            </div>
    </>
  )
}

export default JourneyCard;
