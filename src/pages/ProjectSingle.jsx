import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { MdAccessTime } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ThemeContext } from '../context/ThemeContext';

// Dummy Thumbnail
import DummyThumbLight from '../assets/Project/ProjectThumb-Light.png';
import DummyThumbDark from '../assets/Project/ProjectThumb-Dark.png';

function ProjectSingle() {

  const {theme} = useContext(ThemeContext);

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
    <div className="bg-background-light dark:bg-background-dark">
      <main className="grid min-h-full place-items-center px-6 py-16 sm:py-8 lg:px-8">
        <div className='sticky top-0 left-0 right-0 z-50 py-4 mb-6 flex flex-col items-center justify-center w-full bg-background-light dark:bg-background-dark'>
          <h1 className="mb-2 text-xl mdx:text-base mdx:text-center font-bold tracking-tight text-background-dark dark:text-text-dark sm:text-3xl">
            {data.title}
          </h1>

          <span className={`top-2 right-2 px-4 py-[0.1rem] text-xs mdx:text-xs rounded-full text-white ${statusColor(data.status)}`}>{data.status}</span>
        </div>

        <div className='relative w-6/12 mdx:w-full'>
            <img class="rounded-xl aspect-video w-full h-full  shadow border" src={data.image ? data.image : (theme === 'dark' ? DummyThumbDark : DummyThumbLight)} alt={`${data.title} Thumbnail`} />
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
          <p className="mt-6 w-6/12 mdx:w-full text-base mdx:text-sm leading-7 text-text-light">
            {data.description}
          </p>
        </div>

        {/* Contributors */}
        <div className='mt-12 w-4/6'>
          <h1 className='text-xl dark:text-text-dark font-semibold text-center rounded-full underline py-1'>Contributors </h1>

          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            {membersList.map((member, index) => (
              <div key={index} className='flex items-center justify-start gap-4 text-center rounded-lg bg-accent-light pl-4 pr-6 py-2'>
                <img src={member.image} alt={member.name} className='w-10 h-10 rounded-full ring-offset-2 ring-2 ring-primary-light'/>

                <div className='flex flex-col'>
                  <h1 className='text-start font-bold'>{member.name}</h1>
                  <p className='text-start text-text-light text-sm'>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className='mt-12 w-4/6'>
          <h1 className='text-xl dark:text-text-dark font-semibold text-center rounded-full underline py-1'>Tags </h1>

          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            {tagArray.map((tag, index) => (
                <h2 key={index} className="flex items-center justify-center rounded-md dark:text-teal-50 bg-accent-light dark:bg-accent-dark px-2 py-1 text-sm font-medium text-primary-light ring-1 ring-inset ring-primary-light/10">
                  {tag}
                </h2>
            ))}
          </div>
        </div>
      </main>

      <ThemeToggle/>
    </div>
  )
}

export default ProjectSingle