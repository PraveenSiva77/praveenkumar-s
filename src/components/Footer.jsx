import React, { useState, useEffect } from 'react';
import Footer_Logo from '../assets/Logo_2.svg';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { SocialIcons } from './Data';

function Footer() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });
    }, []);
  
    const handleInstallClick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      }
    };
  

    return (
        <footer className="mx-auto bg-[#ffffff96] dark:bg-accent-light rounded-t-xl border-t border-gray-500">
            <div className="py-8 flex flex-col items-center">
                <img src={Footer_Logo} alt="Praveenkumar S Logo" className="w-20 h-20 justify-self-center mb-4" />
                <h1 className='mb-8'>
                    <a href="#" className="text-3xl font-bold text-center cursor-pointer tracking-wider text-gray-700 hover:text-blue-500">Praveen Siva</a>
                </h1>

                <ul className="flex justify-center gap-6 mb-8 smx:flex-col smx:items-center">
                    <li>
                        <a href="#about" className="text-gray-700 hover:text-blue-500">Home</a>
                    </li>
                    <li>
                        <a href="#services" className="text-gray-700 hover:text-blue-500">Services</a>
                    </li>
                    <li>
                        <a href="#journey" className="text-gray-700 hover:text-blue-500">Journey</a>
                    </li>
                    <li>
                        <a href="#projects" className="text-gray-700 hover:text-blue-500">Projects</a>
                    </li>
                </ul>

                <div className="flex justify-center gap-5">

                    {SocialIcons.map((item, index) => (
                        <a href={item.link} className="bg-gray-800 text-white text-xl p-2 rounded-lg inline-flex hover:bg-blue-500" target='_blank' rel="noopener noreferrer">
                            {item.icon}
                        </a>
                    ))}

                    {deferredPrompt && 
                        <button
                            onClick={handleInstallClick} 
                            className="bg-gray-900 cursor-pointer text-white text-xl p-2 rounded-lg inline-flex hover:bg-blue-500"
                            aria-label="Install App"
                        >
                            <IoMdDownload />
                        </button>
                    }
                </div>

                <span className="block mt-16 text-gray-800 text-center text-base">
                    &#169;2024 Designed & Developed by <a href="#" className='font-semibold hover:text-blue-500 cursor-pointer'>Praveen Siva</a>. All rights reserved
                </span>
            </div>
        </footer>
    );
}

export default Footer;
