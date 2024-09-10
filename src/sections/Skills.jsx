import React from 'react';
import PageTitle from '../components/PageTitle';
import { skills_data } from '../components/Data';
import SkillCont from '../components/SkillCont';


function Skills() {

    // Grouping skills by domain
    const groupSkillsByDomain = (skillsGroup) => {
        return skillsGroup.reduce((acc, skill) => {
        const { domain } = skill;
        if (!acc[domain]) {
            acc[domain] = [];
        }
        acc[domain].push(skill);
        return acc;
        }, {});
    };

    const groupedSkills = groupSkillsByDomain(skills_data);
  
  return (
    <div id='skills' className='max-w-[1024px] p-4 mx-auto py-20 lgx:py-4'>
        <PageTitle title="Skills" description="My Technical Knowledge and Expertise"/>

        <div className="container smx:w-[90vw] mx-auto py-8 grid grid-cols-2 mdx:grid-cols-1 gap-8 justify-center items-center">
          {Object.keys(groupedSkills).map((domain) => (
              <div key={domain} className="flex flex-col gap-4 h-[100%] py-10 hover:shadow-md hover:shadow-blue-500 dark:hover:shadow-secondary-dark  border-blue-300 border text-center rounded-xl">
                <h2 className="domain_title text-xl font-bold mb-4 dark:text-text-dark">{domain}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {groupedSkills[domain].map((skill, index) => (
                    <SkillCont key={index} skill_icon={skill.icon} skill_name={skill.name} />
                  ))}
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Skills