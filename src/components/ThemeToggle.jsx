import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";


function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-accent-dark dark:bg-accent-light focus:outline-none fixed bottom-4 right-4 border-[1.5px] border-primary-light"
    >
      {isDarkMode ? <MdLightMode className='text-text-dark'/> : <MdNightlight/>}
    </button>
  );
}

export default ThemeToggle;
