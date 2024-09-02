import React from 'react';

function Filter({ selectedItem, onSelect, filterList }) {
    return (
        <div className="flex justify-center gap-4 mb-8">
            {filterList.map((item, index) => (
                <button
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg smx:px-6 ${
                        selectedItem === index
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => onSelect(index)}
                >
                    {item.icon}
                    <span className='smx:hidden'>{item.name}</span>
                </button>
            ))}
        </div>
    );
}

export default Filter;
