import React, {useState} from 'react';
import Avatars from './Avatars';
import { FaGithub } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";

// For Modal
import { Modal } from 'flowbite';
import { MdAccessTime } from "react-icons/md";


function ProjectCard({
    keyId, image, title, tags, duration, status, members,
    description, demoLink, githubLink, role
}) { 

    const tagArray = tags.split(',').map(tag => tag.trim());
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

    const [modalInstance, setModalInstance] = useState(null);

    const toggleModal = (isOpen) => {
        if (isOpen) {
            modalInstance.show();
        } else {
            modalInstance.hide();
        }
    }

    React.useEffect(() => {
        const modalElement = document.getElementById(`projectInfo-modal-${keyId}`);
        if (modalElement) {
            setModalInstance(new Modal(modalElement));
        }
    }, [keyId]);

  return (

    <>
        <div key={keyId} onClick={() => toggleModal(true)} class="max-w-sm xxsx:w-[100%] cursor-pointer bg-white p-2 border border-gray-300 rounded-2xl hover:shadow-md hover:shadow-blue-400 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='relative cursor-pointer'>
                <img class="rounded-xl aspect-video shadow border" src={image} alt={title} />
            </div>
            <div class="p-4 flex flex-col gap-2 items-start">
                <div className='w-full flex items-center justify-between pl-2 xxsx:flex-col'>
                    <div className='cursor-pointer text-start'>
                        <h1 class="w-[180px] smx:w-[200px] mdx:w-[250px] xxsx:text-center overflow-hidden text-ellipsis whitespace-nowrap mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">{title}</h1>
                    </div>
                    <span className={` top-2 right-2 px-3 py-1 text-[0.7rem] rounded-full text-white ${statusColor(status)}`}>{status}</span>
                </div>
                {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{duration}</p> */}

                <div className='w-full flex items-center justify-between pr-2 xxsx:flex-col xxsx:gap-3'>
                    <Avatars avatarList={members}/>
                    <div className='flex items-center justify-center gap-4'>
                        {githubLink && <a href={githubLink}>
                            <FaGithub className='text-xl text-gray-700 hover:text-blue-500 hover:scale-105'/>
                        </a>}
                        {demoLink && <a href={demoLink}>
                            <IoLinkSharp className='text-2xl text-gray-700 hover:text-blue-500 hover:scale-105'/>
                        </a>}
                    </div>

                </div>
            </div>
        </div>

        {/* Main modal */}
        <div
            id={`projectInfo-modal-${keyId}`}
            tabIndex="-1"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative p-8 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    {/* Modal header */}
                    <div className="relative flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div className='relative w-full'>
                            <img class="rounded-xl aspect-video w-full h-full  shadow border" src={image} alt={title} />
                            {/* Live Demo button, hidden by default */}
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-base font-medium rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                            >
                                {demoLink && <a href={demoLink} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full'>Live Demo</a>}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(false)}
                            className="absolute -top-4 -right-3 bg-white rounded-full text-gray-400 shadow-md hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-4 px-10 mdx:p-5 space-y-4 flex flex-col items-center gap-4">
                        <div className='w-full flex items-center justify-between xxsx:flex-col'>
                            <h1 className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                {title}
                            </h1>
                            <p className="text-base text-gray-500 flex items-center gap-2 justify-center"><MdAccessTime className='text-base' /> {duration}</p> 
                        </div>
                        <div>
                            <p className='text-gray-600'>{description}</p>
                        </div>
                        <div className="tag_base flex items-center justify-center flex-wrap gap-2">
                            {tagArray.map((tag, index) => (
                                <h2 key={index} className="inline-flexflex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {tag}
                                </h2>
                            ))}
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProjectCard;
