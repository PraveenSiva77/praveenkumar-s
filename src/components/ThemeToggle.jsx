import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-background-dark dark:bg-background-light focus:outline-none fixed bottom-4 right-4 border-[1.5px] border-primary-light"
    >
      {theme === 'dark' ? (
        <MdLightMode className=''/>
      ) : (
        <MdDarkMode className='text-text-dark'/>
      )}
    </button>
  );
}

export default ThemeToggle;
