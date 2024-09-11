import React, { useState } from 'react';
import SP_Logo from '../assets/Logo_2.svg';
import LogoBase from '../assets/Logo_Base.svg';
import { HeaderData, LetsTalk} from './Data';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        setIsMenuOpen(false); // Close the menu after clicking a menu item
    };

    return (
      <nav className="bg-background-light dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-accent-light dark:border-accent-dark">
        <div className="max-w-[1024px] flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={LogoBase} className="w-10" alt="SP Logo" />
            <span className="self-center text-2xl xsx:hidden font-bold whitespace-nowrap text-text-light hover:text-primary-light dark:text-text-dark">
              Praveen Siva
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a
              href={LetsTalk.to}
              className="text-text-dark bg-blue-600 xsx:hidden hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
            >
              {LetsTalk.name}
            </a>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <ThemeToggle /> {/* Using ThemeToggle component */}
          <div
            className={`items-center justify-between mdx:justify-center ${
              isMenuOpen ? "flex" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col gap-6 p-4 md:p-0 mt-4 font-medium text-center md:flex-row md:mt-0">
              {HeaderData.map((link, index) => (
                <li key={index} className="">
                  <a
                    href={link.to}
                    className="py-2 px-6 ml-0 text-text-light mdx:hover:bg-blue-100 hover:text-blue-500 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-text-dark dark:hover:text-primary-light"
                    onClick={handleMenuItemClick}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Header;
