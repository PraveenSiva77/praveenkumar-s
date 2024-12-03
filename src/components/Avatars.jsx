import React from 'react';
import DummyAvatar from '../assets/DummyAvatar.webp';

function Avatars({ avatarList = [] }) { 
  if (!Array.isArray(avatarList)) {
    return null; 
  }

  return (
    <div className="flex p-2 pl-1 -space-x-2 overflow-hidden">
      {avatarList.length > 0 ? (
        avatarList.map((data, index) => (
          <img 
            key={index}
            alt={data.name}
            src={data.imageUrl || DummyAvatar} 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-500"
          />
        ))
      ) : (
        <span>No members available</span>
      )}
    </div>
  );
}

export default Avatars;
