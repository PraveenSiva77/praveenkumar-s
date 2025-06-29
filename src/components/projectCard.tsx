import React, { useState, useEffect } from "react";
import Avatar from "./avatar";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { FaRegCircleCheck } from "react-icons/fa6";
import { MdTimelapse } from "react-icons/md";

// --- Component Interfaces ---
export interface IProject {
    id: string;
    image: string;
    category: string;
    title: string;
    status: "Completed" | "In Progress";
    tags: string[];
    collaborators: { name: string; avatarUrl: string; github?: string; linkedin?: string }[];
    githubUrl?: string;
    liveUrl?: string;
    description?: string;
}

interface IProjectCardProps {
    project: IProject;
}

// --- Custom Hook for Responsive Design ---
const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return { isMobile };
};

// --- The Project Card Component ---
const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
    const { id, image, category, title, status, tags, collaborators, githubUrl, liveUrl, description } = project;
    const navigate = useNavigate();
    const { isMobile } = useResponsive();

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.closest("a") || 
            target.closest("[data-no-navigate]")
        ) {
            return;
        }
        navigate(`/project/${id}`);
    };

    const maxTags = isMobile ? 3 : tags.length;
    const avatarSize = isMobile ? 32 : 32;
    const maxAvatars = isMobile ? 3 : 4;
    const iconSize = isMobile ? 14 : 16;

    return (
        <div
            className="bg-gradient-to-r from-zinc-600/10 to-zinc-400/10 border border-indigo-500/20 rounded-xl sm:rounded-2xl p-2 shadow-lg flex flex-col h-full hover:border-indigo-500/40 hover:from-indigo-600/15 hover:to-purple-600/15 transition-all duration-300 cursor-pointer group w-full max-w-full"
            onClick={handleCardClick}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/project/${id}`);
                }
            }}
        >
            {/* Image Section */}
            <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl">
                <img 
                    src={image} 
                    alt={title} 
                    className="aspect-video rounded-lg sm:rounded-xl object-cover w-full h-40 sm:h-48 md:h-52 lg:h-48 xl:h-52 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />

                <span
                    className={`absolute top-1.5 right-1.5 flex items-center justify-center gap-1 text-xs px-2 py-1 rounded-full border flex-shrink-0 self-start whitespace-nowrap ${
                        status === "Completed"
                            ? "bg-zinc-900 text-zinc-300 border-zinc-500/30"
                            : "bg-zinc-300 text-zinc-800 border-zinc-500/30"
                    }`}
                >
                    {status === "Completed" ? (
                        <FaRegCircleCheck className="inline-block mr-1" />
                    ) : (
                        <MdTimelapse className="inline-block mr-1" />
                    )}
                    {status}
                </span>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-4 flex-1 min-h-0">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-0.5">
                        
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-1 leading-tight group-hover:text-indigo-100 transition-colors duration-200 break-words hyphens-auto">
                            {title}
                        </h3>
                        
                        <p className="text-xs px-2 py-1 rounded-full text-zinc-400 border border-zinc-400/50 flex-shrink-0 self-start whitespace-nowrap">
                            {category}
                        </p>
                    </div>
                </div>

                {/* Description */}
                {/* {description && (
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {description}
                    </p>
                )} */}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tags.slice(0, maxTags).map((tag) => (
                        <span 
                            key={tag} 
                            className="text-xs bg-zinc-700/50 text-zinc-300 px-2 sm:px-3 py-1 rounded-full border border-zinc-600/30 hover:bg-zinc-600/50 transition-colors duration-200 whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                    {isMobile && tags.length > maxTags && (
                        <span className="text-xs bg-zinc-600/30 text-zinc-400 px-2 py-1 rounded-full border border-zinc-600/30 whitespace-nowrap">
                            +{tags.length - maxTags}
                        </span>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Separator */}
                <div className="border-t border-indigo-500/20"></div>

                {/* Footer */}
                <div className="flex justify-between items-start sm:items-center gap-3 sm:gap-4 pt-2 mb-2">
                    {/* Collaborators */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {collaborators.length > 0 && (
                            <>
                                <Avatar
                                    list={collaborators.map(c => ({ src: c.avatarUrl, alt: c.name }))}
                                    size={avatarSize}
                                    max={maxAvatars}
                                />
                                <span className="text-xs text-zinc-400 truncate">
                                    {collaborators.length === 1 
                                        ? (isMobile ? '1 contrib.' : '1 contributor')
                                        : (isMobile ? `${collaborators.length} contrib.` : `${collaborators.length} contributors`)
                                    }
                                </span>
                            </>
                        )}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0" data-no-navigate>
                        {githubUrl && (
                            <a 
                                href={githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 sm:p-2.5 rounded-lg bg-zinc-700/30 text-zinc-400 hover:text-white hover:bg-zinc-600/40 border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-200 touch-manipulation active:scale-95" 
                                onClick={e => e.stopPropagation()}
                                aria-label="View GitHub repository"
                            >
                                <FaGithub size={iconSize} />
                            </a>
                        )}
                        {liveUrl && (
                            <a 
                                href={liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 sm:p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-200 touch-manipulation active:scale-95" 
                                onClick={e => e.stopPropagation()}
                                aria-label="View live demo"
                            >
                                <FiExternalLink size={iconSize} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;