import React, {useEffect, useState} from 'react'
import PageTitle from '../components/PageTitle'
import { ProfileInfo, ProfileImage, ResumeLink } from '../components/Data'
import AboutInfoCard from '../components/AboutInfoCard'

import { BiAward, BiBriefcase, BiSupport } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import CustomButton from '../components/CustomButton';

// Firebase setup
import {ref, onValue } from "firebase/database";
import { db } from "../firebase";

function About() {

    useEffect(() => {
        const profileRef = ref(db, 'about/aboutID'); 
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setProfile(data);
          }
        });

        const nameRef = ref(db, 'profiles/profileID');
        onValue(nameRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMyName(data);
          }
        });
    }, []);

    const [myName, setMyName] = useState('Praveenkumar S - Profile');

    const [profile, setProfile] = useState({
        imageUrl: '',
        experienceYear: '',
        totalProjects: '',
        availabilityStatus: '',
        description: '',
        resumeLink: ''
      });

    const description = ProfileInfo.find(info => info.title === "Description 2") ?.info;

  return (

        <div id='about' className='max-w-[1024px] mx-auto py-24 p-4 mdx:py-4 lgx:py-4'>
            <PageTitle title="About" description="Who I am and What I Do?"/>
            <div className='container mx-auto my-4 py-12 flex lgx:flex-col smx:text-center items-center justify-center gap-20'>
                <img 
                src={profile.imageUrl !== '' ? profile.imageUrl : ProfileImage[0].image} 
                alt={`${myName.name}'s profile`}
                className='max-w-[100%] w-[350px] mdx:w-[250px] smx:w-[80vw] rounded-md' />

                <div className='flex flex-col gap-8 items-center'>
                    <div className="about_info grid grid-cols-3 smx:grid-cols-1 gap-4">
                        <AboutInfoCard title="Experience" icon={<BiAward/>} info={`${profile.experienceYear} Years`}/>
                        <AboutInfoCard title="Projects" icon={<BiBriefcase/>} info={profile.totalProjects}/>
                        <AboutInfoCard title="Support" icon={<BiSupport/>} info={profile.availabilityStatus}/>
                    </div>

                    <p className='about_description text-gray-700 dark:text-text-dark font-normal leading-relaxed'>
                        {profile.description ? profile.description : description}
                    </p>

                    <CustomButton 
                    button_name="Download CV" 
                    button_target={profile.resumeLink ? profile.resumeLink : ResumeLink[0].name} 
                    button_icon={<IoDocumentText/>}/>
                </div>
            </div>
        </div>

  )
}

export default About