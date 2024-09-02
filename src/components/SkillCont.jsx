import React from 'react'

function SkillCont({skill_icon, skill_name}) {
  return (
    <div className='w-max px-4 py-2 rounded-lg flex items-center justify-center gap-4 border-[1px] border-blue-500'>
        <div className="w-5 flex"> {skill_icon} </div>
        <p className="font-semibold text-base">{skill_name}</p>
    </div>
  )
}

export default SkillCont