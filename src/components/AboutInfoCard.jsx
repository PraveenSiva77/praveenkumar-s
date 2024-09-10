import React from 'react'

function AboutInfoCard({title, icon, info}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-4 w-[150px] smx:w-[90vw] bg-white dark:bg-transparent rounded-lg border-[1px] border-gray-300">
        <span className='text-2xl dark:text-primary-light'>{icon}</span>
        <h1 className="text-base font-semibold text-accent-dark dark:text-text-dark">{title}</h1>
        <span className="text-text-light dark:text-accent-light text-base">
            {info}
        </span>
    </div>
  )
}

export default AboutInfoCard