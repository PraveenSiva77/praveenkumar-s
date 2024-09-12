import React from 'react';
import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { ProjectData } from '../components/Data';

function Projects() {
  return (
    <div id='projects' className='max-w-[1024px] mx-auto py-20'>
        <PageTitle title="Projects" description="Explore my diverse projects"/>

        <div className="grid grid-cols-3 gap-8 mdx:grid-cols-1 lgx:grid-cols-2 lgx:w-[90vw] mx-auto smx:gap-8 py-12 smx:py-8 justify-items-center">
            {ProjectData.map((project, index) => (
                <ProjectCard
                keyId={index}
                data={project}
                />
            ))}
        </div>
    </div>
  )
}

export default Projects