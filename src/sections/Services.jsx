import React, {useState} from 'react'
import PageTitle from '../components/PageTitle'
import ServiceCard from '../components/ServiceCard'
import { ServicesData } from '../components/Data'


function Services() {

  return (
    <div id='services' className='max-w-[1024px] p-4 mx-auto py-20 lgx:py-4'> 
        {/* Page Title */}
        <PageTitle title="Services" description="The Services I Provide" />
        
        {/* Page Content */}
        <div className="grid grid-cols-3 smx:grid-cols-1 smx:gap-8 py-12 smx:py-8 justify-items-center">
            {ServicesData.map((data, index) => (
                <ServiceCard keyId={index} service_name={data.title} service_icon={data.icon} service_description={data.description} key_points={data.points}/>
            ))}
        </div>


    </div>
  )
}

export default Services