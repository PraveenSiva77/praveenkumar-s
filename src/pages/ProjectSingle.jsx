import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { MdAccessTime } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ThemeContext } from '../context/ThemeContext';
import { IoIosArrowBack } from "react-icons/io";
import GotoButton from '../components/GotoButton';

// Dummy Thumbnail
import DummyThumbLight from '../assets/Project/ProjectThumb-Light.png';
import DummyThumbDark from '../assets/Project/ProjectThumb-Dark.png';
import { Helmet } from 'react-helmet';

function ProjectSingle() {

  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const location = useLocation();
  const {project: data} = location.state;

  const membersList = data.members;
  const tagArray = data.tags.split(',').map(tag => tag.trim());

  // The statusColor function
  const statusColor = (status) => {
    switch(status) {
        case "Completed":
            return 'bg-green-500';
        case "Working":
            return 'bg-blue-500';
        case "Waiting":
            return 'bg-red-500';
        default:
            return 'bg-gray-500'; // Default color if status doesn't match any case
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://PraveenSiva77.github.io/praveenkumar-s/projectinfo/:keyId" />
        <title>Project {data.title} | Praveenkumar S | AI & Web Developer Portfolio</title>
        <meta name="description" content="Explore the portfolio of Praveenkumar S, an AI and Web Developer passionate about solving complex problems using technology." />
        <meta property="og:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
        <meta property="og:description" content="Explore projects and learn more about Praveenkumar S, an expert in AI and Web Development." />
        <meta property="og:url" content="https://PraveenSiva77.github.io/praveenkumar-s/projectinfo/:keyId" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="%PUBLIC_URL%/Praveenkumar-S-Profile.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
        <meta name="twitter:description" content="Explore AI, Machine Learning, and Web Development projects from Praveenkumar S." />
        <meta name="twitter:image" content="%PUBLIC_URL%/Praveenkumar-S-Profile.jpg" />
        <meta name="keywords" content="AI Developer, Web Developer, Praveenkumar S, Machine Learning, Portfolio" />
        <meta name="author" content="Praveenkumar S" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="bg-background-light dark:bg-background-dark">
        <main className="grid min-h-full place-items-center">
        <div className='sticky top-0 left-0 right-0 z-50 py-2 p-8 flex items-center justify-center w-full bg-background-light dark:bg-background-dark'>
          <GotoButton value="-1"/>
          <p className='flex items-center justify-center flex-col w-full font-bold text-xl dark:text-primary-light'>{data.title}</p>
        </div>

          <div className='relative w-6/12 mdx:w-full mt-4'>
              <img class="rounded-xl aspect-video w-full h-full shadow border" src={data.image ? data.image : (theme === 'dark' ? DummyThumbDark : DummyThumbLight)} alt={`${data.title} Thumbnail`} />
          </div>
        
          {/* Link Buttons */}
          <div className="mt-10 flex mdx:flex-col mdx:gap-6 items-center justify-center gap-x-6">
            {data.githubLink && 
              <a
                href={data.githubLink}
                className="flex items-center justify-center gap-2 rounded-md cursor-pointer bg-transparent px-3.5 py-2.5 text-sm font-semibold text-primary-light border border-primary-light shadow-sm hover:shadow-md hover:shadow-primary-light/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                View Code <FaGithub/>
              </a>
            }

            {data.demoLink && 
              <a
                href={data.demoLink}
                className="flex items-center justify-center gap-2 rounded-md cursor-pointer bg-primary-light px-3.5 py-2.5 text-sm font-semibold text-text-dark shadow-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-primary-light/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Live Demo <HiOutlineExternalLink/>
              </a>
            }

          </div>

          {/* Duration */}
          <p className='dark:text-text-dark flex items-center justify-center gap-2 mt-8'><MdAccessTime/> {data.duration}</p>

          {/* Description */}
          <div className="text-center flex flex-col items-center">
            <p className="mt-6 w-6/12 mdx:w-full text-base mdx:text-sm leading-7 tracking-wide text-text-light dark:text-accent-light">
              {data.description}
            </p>
          </div>

          {/* Contributors */}
          <div className='mt-12 w-4/6 smx:w-4/6 xsx:w-full'>
            <h1 className='text-xl dark:text-text-dark font-semibold text-center rounded-full underline py-1'>Contributors </h1>

            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              {membersList.map((member, index) => (
                <div key={index} className='flex items-center justify-start smx:w-full gap-4 text-center rounded-lg bg-accent-light dark:bg-transparent dark:border dark:border-dashed dark:border-primary-light pl-4 pr-6 py-2'>
                  <img src={member.image} alt={member.name} className='w-10 h-10 rounded-full ring-offset-2 dark:ring-offset-0 ring-1 ring-primary-light dark:bg-transparent'/>

                  <div className='flex flex-col'>
                    <h1 className='text-start font-semibold mdx:text-sm smx:text-xs dark:text-text-dark'>{member.name}</h1>
                    <p className='text-start text-text-light text-sm smx:text-xs dark:text-secondary-dark'>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className='mt-12 w-4/6 mb-12'>
            <h1 className='text-xl dark:text-text-dark font-semibold text-center rounded-full underline py-1'>Tags </h1>

            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              {tagArray.map((tag, index) => (
                  <h2 key={index} className="flex items-center justify-center rounded-md dark:text-teal-50 bg-accent-light dark:bg-transparent px-2 py-1 text-sm font-medium text-primary-light ring-1 ring-inset ring-primary-light/50">
                    {tag}
                  </h2>
              ))}
            </div>
          </div>
        </main>

        <ThemeToggle/>
      </div>
    </>
  )
}

export default ProjectSingle