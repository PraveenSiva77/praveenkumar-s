import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { projectData, collaboratorsData } from '../components/Data';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Helmet } from 'react-helmet';
import GotoButton from '../components/GotoButton';

function ProjectsInfo() {
  const [projects, setProjects] = useState(projectData); 
  const [collaboratorsList, setCollaborators] = useState(collaboratorsData);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the page loads
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://PraveenSiva77.github.io/praveenkumar-s/projectsinfo" />
        <title>My Projects | Praveenkumar S | AI & Web Developer Portfolio</title>
        <meta name="description" content="Explore the portfolio of Praveenkumar S, an AI and Web Developer passionate about solving complex problems using technology." />
        <meta property="og:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
        <meta property="og:description" content="Explore projects and learn more about Praveenkumar S, an expert in AI and Web Development." />
        <meta property="og:url" content="https://PraveenSiva77.github.io/praveenkumar-s/projectsinfo" />
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

      <div className="max-w-[1024px] mx-auto py-20">
        {/* Sticky Header */}
        <div className="fixed w-full top-0 left-0 right-0 z-50 py-2 px-8 flex items-center justify-between bg-background-light dark:bg-background-dark">
          <GotoButton value="-1" />
          <p className="flex items-center justify-center flex-col w-full font-bold text-xl dark:text-primary-light absolute left-[50%] translate-x-[-50%]">
            My Projects
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} data={project} collaborators={collaboratorsList} />
          ))}
        </div>
      </div>

      <ThemeToggle />
    </>
  );
}

export default ProjectsInfo;
