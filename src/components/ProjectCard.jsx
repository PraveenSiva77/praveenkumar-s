import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";
import Avatars from "./Avatars";

import DummyThumbLight from "../assets/Project/ProjectThumb-Light.png";
import DummyThumbDark from "../assets/Project/ProjectThumb-Dark.png";

function ProjectCard({ keyId, data, collaborators }) {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  // Get project members and collaborators based on the project data
  const projectMembers = data?.collaborators || [];
  const projectCollaborators = collaborators?.filter((collaborator) =>
    projectMembers.includes(collaborator.id)
  ) || [];

  return (
    <Link
      to={`/projectinfo/${keyId}`}
      state={{ project: data, collaborators: projectCollaborators }}
    >
      <div
        key={keyId}
        className="w-full bg-white dark:bg-gray-800 p-2 border dark:border-gray-700 rounded-2xl hover:shadow-md"
      >
        <div className="relative">
          <img
            className="rounded-xl aspect-video h-[180px] shadow"
            src={data.image || (theme === "dark" ? DummyThumbDark : DummyThumbLight)}
            alt={data.title}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h1 className="text-lg font-bold text-gray-700 dark:text-white">
            {data.title}
          </h1>
          <Avatars avatarList={projectCollaborators} />
          <div className="flex gap-4 mt-2">
            {data.githubLink && (
              <a href={data.githubLink}>
                <FaGithub className="text-xl hover:text-blue-500" />
              </a>
            )}
            {data.demoLink && (
              <a href={data.demoLink}>
                <HiOutlineExternalLink className="text-xl hover:text-blue-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
