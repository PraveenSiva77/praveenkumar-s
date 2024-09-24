import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { ProjectData } from '../components/Data';
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { Helmet } from 'react-helmet'
import GotoButton from '../components/GotoButton';

// Firebase setup
import {ref, onValue } from "firebase/database";
import { db } from "../firebase";


function ProjectsInfo() {
  
  const [projects, setProjects] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  
  // Fetch Projects
  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProjects(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
      }
    });
  }, []);
  
  // Fetch Collaborators
  useEffect(() => {
    const collaboratorsRef = ref(db, 'collaborators');
    onValue(collaboratorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCollaborators(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
  });

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
    
      <div className='max-w-[1024px] mx-auto py-20'>

        <div className='fixed top-0 left-0 right-0 z-50 py-2 p-8 flex items-center justify-center w-full bg-background-light dark:bg-background-dark'>
          <GotoButton value="-1"/>
          <p className='flex items-center justify-center flex-col w-full font-bold text-xl dark:text-primary-light'>My Projects</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">
          {/* Display All projects */}
          {projects.map((project, index) => (
            <ProjectCard
              keyId={index}
              data={project}
              collaborators={collaborators}
            />
          ))}
        </div>
      </div>
        
      <ThemeToggle/>
    </>
  )
}

export default ProjectsInfo