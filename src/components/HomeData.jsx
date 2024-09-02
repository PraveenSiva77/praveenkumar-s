import React from 'react';
import './style.css';
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
    <div className='max-w-[1024px] mx-auto p-4 py-8 my-8 flex flex-col items-center gap-16 mdx:h-[100%] mdx:flex-col'>
        <div className="container flex items-center pt-20 pb-12 mdx:py-12 gap-16 mdx:gap-8 mdx:flex-col">
            {/* Social Media Icons */}
            <div className="icons_base text-xl flex flex-col gap-4 mdx:order-3 mdx:flex-row">
                {SocialIcons.map((data, index) => (
                    <a key={index} href={data.link} className="text-gray-700 hover:text-blue-500" target='_blank'>
                        {data.icon}
                    </a>
                ))}
            </div>


            {/* Profile Description */}
            <div className="description_base mdx:order-2 flex flex-col gap-12 items-start mdx:items-center">
                <div className='flex flex-col gap-2 items-start justify-center mdx:items-center w-full'>
                    <h1 className='profile_name smx:text-3xl mdx:4xl lgx:text-4xl text-5xl font-bold text-blue-600 xxsx:text-2xl'>{nameInfo}</h1>
                    <span className='profile_role relative text-2xl smx:text-xl font-normal xxsx:text-base text-gray-700 before:absolute before:content-none before:top-[55%] before:left-0 before:h-[1px] before:w-[50px] before:translate-x-[-50%] before:translate-y-[-50%] mdx:before:hidden ml-8 pl-8 mdx:ml-0 mdx:pl-0'>{roleInfo}</span>
                </div>
                <p className='profile_description text-gray-700 leading-relaxed xxsx:text-center'>{description1}</p>

                <CustomButton button_name="Say Hello!" button_icon={<RiSendPlaneFill/>} button_target="#contact"/>
            </div>

            {/* Profile Image */}
            <div className="profile_base">
                <img src={ProfileImage[0].image} alt={ProfileImage[0].name} className='profile_image outline outline-8 outline-blue-400 max-w-[350px] lgx:w-[300px] mdx:w-[250px] smx:w-[80vw] xxsx:w-[70vw]'/>
            </div>
        </div>
        <ScrollDownBtn goto="#about"/>
    </div>
  )
}

export default HomeData