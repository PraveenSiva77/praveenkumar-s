import React from 'react';
import './style.css';
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { SocialIcons, ProfileImage } from './Data';
import ScrollDownBtn from './ScrollDownBtn';
import CustomButton from './CustomButton';
import { ProfileInfo } from './Data';


function HomeData() {

    // Extract specific profile information
    const nameInfo = ProfileInfo.find(info => info.title === "Name")?.info;
    const roleInfo = ProfileInfo.find(info => info.title === "Role")?.info;
    const description1 = ProfileInfo.find(info => info.title === "Description 1")?.info;


  return (
    <div id='home' className='h-[90vh] mdx:h-full dark:bg-gray-900 max-w-[1024px] mx-auto p-4 py-12 my-8 flex flex-col items-center gap-16 mdx:flex-col'>
        <div className="container flex items-center py-20 mdx:py-12 gap-16 mdx:gap-8 mdx:flex-col">
            {/* Social Media Icons */}
            <div className="icons_base text-xl flex flex-col gap-4 mdx:order-3 mdx:flex-row">
                {SocialIcons.map((data, index) => (
                    <a key={index} href={data.link} className="text-gray-700 dark:text-text-dark dark:hover:text-primary-light hover:text-blue-500" target='_blank'>
                        {data.icon}
                    </a>
                ))}
            </div>


            {/* Profile Description */}
            <div className="description_base mdx:order-2 flex flex-col gap-12 items-start mdx:items-center">
                <div className='flex flex-col gap-2 items-start mdx:items-center'>
                    <h1 className='profile_name smx:text-3xl mdx:4xl lgx:text-4xl text-5xl font-bold text-primary-light'>{nameInfo}</h1>
                    <span className='profile_role ml-1 mdx:ml-0 text-2xl smx:text-xl font-normal text-gray-700 dark:text-text-dark'>{roleInfo}</span>
                </div>
                <p className='profile_description mdx:text-center text-gray-700 dark:text-text-dark leading-relaxed'>{description1}</p>

                <CustomButton button_name="Say Hello!" button_icon={<RiSendPlaneFill/>} button_target="#contact"/>
            </div>

            {/* Profile Image */}
            <div className="profile_base">
                <img src={ProfileImage[0].image} alt={ProfileImage[0].name} className='profile_image max-w-[350px] lgx:w-[300px] mdx:w-[250px] smx:w-[80vw] border-indigo-500 border-[0.5rem]'/>
            </div>
        </div>
    </div>
  )
}

export default HomeData