import React from 'react';
import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { ProjectData } from '../components/Data';

// Dummy Images
import projectImage from '../assets/Project/project_image.png';

function Projects() {
  return (
    <div id='projects' className='max-w-[1024px] mx-auto py-20'>
        <PageTitle title="Projects" description="Explore my diverse projects"/>

        <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">

            {ProjectData.map((project, index) => (
                <ProjectCard
                keyId={index}
                image={project.image ? project.image : projectImage}
                title={project.title}
                tags={project.tags}
                duration={project.duration}
                status={project.status}
                members={project.members}
                description={project.description}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
                role={project.role}
                />
            ))}
        </div>
    </div>
  )
}

export default Projects