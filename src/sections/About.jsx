import React from 'react'
import PageTitle from '../components/PageTitle'
import { ProfileInfo, ProfileImage, ResumeLink } from '../components/Data'
import AboutInfoCard from '../components/AboutInfoCard'

import { BiAward, BiBriefcase, BiSupport } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import CustomButton from '../components/CustomButton';

function About() {

    const description2 = ProfileInfo.find(info => info.title === "Description 2") ?.info;


  return (
    <div id='about' className='max-w-[1024px] mx-auto py-20 p-4 mdx:py-4 lgx:py-4'>
        <PageTitle title="About" description="Who I am and What I Do?"/>
        <div className='container mx-auto my-4 py-12 flex lgx:flex-col smx:text-center items-center justify-center gap-20'>
            <img src={ProfileImage[0].image} alt={ProfileImage[0].name} className='max-w-[100%] w-[350px] mdx:w-[250px] smx:w-[80vw] rounded-md' />

            <div className='flex flex-col gap-8 items-center'>
                <div className="about_info grid grid-cols-3 smx:grid-cols-1 gap-4">
                    <AboutInfoCard title="Experience" icon={<BiAward/>} info="3 Years"/>
                    <AboutInfoCard title="Projects" icon={<BiBriefcase/>} info="7+"/>
                    <AboutInfoCard title="Support" icon={<BiSupport/>} info="24/7"/>
                </div>

                <p className='about_description text-gray-700 dark:text-text-dark font-normal leading-relaxed'>
                    {description2}
                </p>

                <CustomButton button_name="Download CV" button_target={ResumeLink[0].image} button_download={ResumeLink[0].name + `.pdf`} button_icon={<IoDocumentText/>}/>
            </div>
        </div>
    </div>
  )
}

export default About