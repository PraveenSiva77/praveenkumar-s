import React from 'react';

function Avatars({ avatarList }) { 
  return (
    <div className="flex p-2 -space-x-2 overflow-hidden">
      {avatarList.map((data, index) => (
        <img 
          key={index}
          alt={data.name}
          src={data.image} 
          className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-500"
        />
      ))}
    </div>
  );
}

export default Avatars;
