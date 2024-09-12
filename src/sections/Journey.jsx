import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import JourneyCard from '../components/JourneyCard';
import Filter from '../components/Filter';
import { JourneyData, JourneyType } from '../components/Data';

function Journey() {

    const [selectedItem, setSelectedItem] = useState(0);

    const handleSelect = (index) => {
        setSelectedItem(index);
    };

    const selectedFilterType = JourneyType[selectedItem].name;

    // Filter data based on the selected filter
    const filteredData = JourneyData.filter((data) => data.type === selectedFilterType);

    return (
        <div id='journey' className='max-w-[1024px] mx-auto py-24 mdx:py-4 lgx:py-4'>
            <PageTitle title="My Journey" description="How I've Evolved in My Career" />

            <div className="container mx-auto py-12">
                {/* Filter */}
                <Filter selectedItem={selectedItem} onSelect={handleSelect} filterList={JourneyType} />

                {/* Display content based on selected filter */}
                <div className="flex flex-col items-start smx:items-center smx:gap-4 mdx:w-[90%] w-max mx-auto py-6 mdx:gap-8">
                    {filteredData.map((data, index) => (
                        <JourneyCard
                            key={index}
                            image={data.image}
                            title={data.title}
                            role={data.role}
                            duration={data.duration}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Journey;
