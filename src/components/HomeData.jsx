import React, { useState, useEffect } from 'react';
import './style.css';
import { RiSendPlaneFill } from "react-icons/ri";
import CustomButton from './CustomButton';
import ProfilePic from '../assets/Praveenkumar-S-Profile.webp';
import { ProfileInfo } from './Data';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';

// Firebase setup
import {ref, onValue } from "firebase/database";
import { db } from "../firebase";

function HomeData() {

    const platformIcons = {
        whatsapp: <FaWhatsapp />,
        linkedin: <FaLinkedin />,
        instagram: <FaInstagram />,
        github: <FaGithub />
    };

    const [profile, setProfile] = useState({
        name: '',
        description: '',
        role: '',
        socialMedia: {
          whatsapp: '',
          linkedin: '',
          instagram: '',
          github: ''
        },
        imageUrl: ''
      });
    
      useEffect(() => {
        const profileRef = ref(db, 'profiles/profileID');
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setProfile(data);
          }
        });
      }, []);

    // Extract specific profile information
    const nameInfo = ProfileInfo.find(info => info.title === "Name")?.info;
    const roleInfo = ProfileInfo.find(info => info.title === "Role")?.info;
    const description = ProfileInfo.find(info => info.title === "Description 1")?.info;


  return (
    <div id='home' className='h-[90vh] mdx:h-full dark:bg-gray-900 max-w-[1024px] mx-auto p-4 py-12 my-8 flex flex-col items-center gap-16 mdx:flex-col'>

        {/* <ProfileDisplay /> */}

        <div className="container flex items-center py-20 mdx:py-12 gap-16 mdx:gap-8 mdx:flex-col">
            {/* Social Media Icons */}
            <div className="icons_base text-xl flex flex-col gap-4 mdx:order-3 mdx:flex-row">
                {Object.entries(profile.socialMedia).map(([platform, link]) => (
                    <a 
                    key={platform} 
                    href={link} 
                    className="text-gray-700 dark:text-text-dark dark:hover:text-primary-light hover:text-blue-500" 
                    target='_blank' 
                    rel='noopener noreferrer'
                    >
                    {platformIcons[platform] || platform}
                    </a>
                ))}
            </div>


            {/* Profile Description */}
            <div className="description_base mdx:order-2 flex flex-col gap-12 items-start mdx:items-center">
                <div className='flex flex-col gap-2 items-start mdx:items-center'>
                    <h1 
                    className='profile_name smx:text-3xl mdx:4xl lgx:text-4xl text-5xl font-bold text-primary-light'
                    >
                        {profile.name ? profile.name : nameInfo}
                    </h1>
                    <span 
                    className='profile_role ml-1 mdx:ml-0 text-2xl smx:text-xl font-normal text-gray-700 dark:text-text-dark'
                    >
                        {profile.role ? profile.role : roleInfo}
                    </span>
                </div>
                <p 
                className='profile_description mdx:text-center text-gray-700 dark:text-text-dark leading-relaxed'
                >
                    {profile.description ? profile.description : description}
                </p>

                <Link
                    to="contact"
                    className="cursor-pointer px-8 py-4 flex items-center justify-between gap-2 dark:border-2 dark:border-primary-light dark:bg-transparent dark:hover:bg-primary-light text-white bg-gray-700 hover:bg-blue-700 font-bold w-max rounded-xl"
                >
                  Say Hello!
                  <RiSendPlaneFill/>
                </Link>
            </div>

            {/* Profile Image */}
            <div className="profile_base">
                <img 
                src={profile.imageUrl ? profile.imageUrl : ProfilePic}
                alt={`${profile.name}'s profile`}
                className='profile_image max-w-[350px] max-h-[350px] lgx:w-[300px] lgx:h-[300px] mdx:w-[250px] mdx:h-[250px] smx:w-[80vw] smx:h-[80vw] aspect-square border-indigo-500 border-[0.5rem]'/>
            </div>
        </div>
        
    </div>
  )
}

export default HomeData