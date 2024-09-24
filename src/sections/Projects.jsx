import React,{useState, useEffect} from 'react';
import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { FaCode } from "react-icons/fa";

// Firebase setup
import {ref, onValue } from "firebase/database";
import { db } from "../firebase";

function Projects() {

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

  // Limit the displayed projects to 5
  const limitedProjects = projects.slice(0, 5);

  return (
    <div id='projects' className='max-w-[1024px] mx-auto py-20'>
      <PageTitle title="Projects" description="Explore my diverse projects" />

      <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">
        {/* Display 5 projects */}
        {limitedProjects.map((project, index) => (
          <ProjectCard
            keyId={index}
            data={project}
            collaborators={collaborators}
          />
        ))}
        {/* "View All Projects" card */}
        <Link
          to="/projectsinfo"
          className="w-full h-full flex justify-center items-center border border-accent-light hover:bg-primary-light/70 hover:text-text-dark hover:shadow-lg transition-all rounded-md p-4 text-center bg-gray-100"
        >
          <span 
            className="text-lg font-semibold flex flex-col gap-4 items-center justify-center">
              <FaCode className='text-4xl mr-2'/>
              View All Projects
            </span>
        </Link>
      </div>
    </div>
  );
}

export default Projects;
