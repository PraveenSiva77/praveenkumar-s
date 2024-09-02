import React from 'react'

function PageTitle({title, description}) {
  return (
    <div className='flex flex-col items-center smx:text-center'>
        <h1 className="text-4xl xsx:text-xl text-gray-400 font-bold">{title}</h1>
        <h2 className="tracking-wide text-gray-700">{description}</h2>
    </div>
  )
}

export default PageTitle