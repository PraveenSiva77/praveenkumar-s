import React, {useState, useContext} from 'react';
import Avatars from './Avatars';
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

// Dummy Thumbnail
import DummyThumbLight from '../assets/Project/ProjectThumb-Light.png';
import DummyThumbDark from '../assets/Project/ProjectThumb-Dark.png';

function ProjectCard({keyId, data, collaborators}) { 
    const {theme} = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(true);

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
                return 'bg-gray-500'; // Default color
        }
    };

    const projectMembers = data?.members || [];
    const projectCollaborators = collaborators?.filter(collaborator => 
        projectMembers.includes(collaborator.id)
    ) || [];

    return (
        <Link to={`/projectinfo/${keyId}`} state={{ project: data, collaborators: projectCollaborators }}>
            <div key={keyId} className="xxsx:w-[100%] w-full cursor-pointer bg-white dark:bg-transparent p-2 border dark:border-[1.5px] border-gray-300 rounded-2xl hover:shadow-md hover:shadow-primary-light/70 shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='relative cursor-pointer'>
                    {/* Image with lazy loading */}
                    <img 
                        className="rounded-xl aspect-video h-[180px] shadow" 
                        src={data.imageUrl ? data.imageUrl : (theme === 'dark' ? DummyThumbDark : DummyThumbLight)} 
                        alt={data.title} 
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center height-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
                        </div>
                    )}
                </div>
                <div className="p-4 pb-0 flex flex-col gap-2 items-start">
                    <div className='w-full flex items-center justify-between pl-2 xxsx:flex-col'>
                        <div className='cursor-pointer text-start'>
                            <h1 className="w-[180px] smx:w-[200px] mdx:w-[250px] xxsx:text-center overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold tracking-tight text-gray-700 dark:text-white">
                                {data.title}
                            </h1>
                        </div>
                        <span className={`top-2 right-2 px-3 py-1 text-[0.7rem] rounded-full text-white ${statusColor(data.status)}`}>
                            {data.status}
                        </span>
                    </div>

                    <div className='w-full flex items-center justify-between pr-2 xxsx:flex-col xxsx:gap-3'>
                        <Avatars avatarList={projectCollaborators} />
                        <div className='flex items-center justify-center gap-4 text-gray-700 dark:text-text-dark'>
                            {data.githubLink && (
                                <a href={data.githubLink}>
                                    <FaGithub className='text-xl hover:text-blue-500 hover:scale-105'/>
                                </a>
                            )}
                            {data.demoLink && (
                                <a href={data.demoLink}>
                                    <HiOutlineExternalLink className='text-2xl hover:text-blue-500 hover:scale-105'/>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;
