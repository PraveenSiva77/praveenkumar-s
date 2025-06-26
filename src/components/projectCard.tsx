import React from "react";
import Avatar from "./avatar";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

// --- The Project Card Component ---
const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
    const { id, image, category, title, status, tags, collaborators, githubUrl, liveUrl } = project;
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking on action icons
        const target = e.target as HTMLElement;
        if (
            target.closest("a") // If the click is on a link, don't navigate
        ) {
            return;
        }
        navigate(`/project/${id}`);
    };

    return (
        <div
            className="bg-zinc-800/30 rounded-2xl shadow-lg border border-zinc-700 flex flex-col hover:border-indigo-500/50 transition-colors duration-300 cursor-pointer"
            onClick={handleCardClick}
            tabIndex={0}
            role="button"
        >
            {/* Top Section */}
            <div className="mb-4 flex justify-center p-2">
                <img 
                    src={image} 
                    alt={title} 
                    className="aspect-video rounded-xl object-cover w-full max-h-48"
                />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2 px-5 pb-4 flex-1">
                <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold uppercase text-indigo-400">{category}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
                        </div>
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                status === "Completed"
                                    ? "bg-green-900/70 text-green-300"
                                    : "bg-yellow-900/70 text-yellow-300"
                            }`}
                        >
                            {status}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                            <span key={tag} className="text-xs bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Description */}
                    {/* {description && (
                        <p className="text-zinc-400 text-sm mt-3 line-clamp-3">{description}</p>
                    )} */}
                </div>

                {/* Separator */}
                <hr className="my-4 border-zinc-700" />

                <div className="flex justify-between items-center">
                    {/* Collaborators */}
                    <Avatar
                        list={collaborators.map(c => ({ src: c.avatarUrl, alt: c.name }))}
                        size={36}
                        max={5}
                    />

                    {/* Action Icons */}
                    <div className="flex items-center gap-4 text-zinc-400">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" onClick={e => e.stopPropagation()}>
                                <FaGithub size={20} />
                            </a>
                        )}
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white" onClick={e => e.stopPropagation()}>
                                <FiExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;