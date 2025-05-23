// Projects.js

import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";

// Import Local Data
import { projectData, collaboratorsData } from "../components/Data";

function Projects() {
  const [projects, setProjects] = useState(projectData);
  const [collaborators, setCollaborators] = useState(collaboratorsData);

  // Limit the displayed projects to 5
  const limitedProjects = projects.slice(0, 5);

  return (
    <div id="projects" className="max-w-[1024px] mx-auto py-20">
      <PageTitle title="Projects" description="Explore my diverse projects" />

      <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">
        {/* Display 5 projects */}
        {limitedProjects.map((project, index) => (
          <ProjectCard
            key={index}
            data={project}
            collaborators={collaborators} // Pass collaborators data to ProjectCard
          />
        ))}
        {/* "View All Projects" card */}
        <Link
          to="/projectsinfo"
          className="w-full h-full flex justify-center items-center border border-accent-light hover:bg-primary-light/70 hover:text-text-dark hover:shadow-lg transition-all rounded-md p-4 text-center bg-gray-100"
        >
          <span className="text-lg font-semibold flex flex-col gap-4 items-center justify-center">
            <FaCode className="text-4xl mr-2" />
            View All Projects
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Projects;
