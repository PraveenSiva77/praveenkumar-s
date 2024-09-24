import React from 'react';

function CustomButton({button_name, button_icon, button_target, button_download}) {
  return (

    <a href={button_target} download={button_download} 
    className="cursor-pointer px-8 py-4 flex items-center justify-between gap-2 dark:border-2 dark:border-primary-light dark:bg-transparent dark:hover:bg-primary-light text-white bg-gray-700 hover:bg-blue-700 font-bold w-max rounded-xl"
    >
        {button_name}

        {button_icon}
    </a>
  )
}

export default CustomButton