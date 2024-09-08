import React from 'react';

const NUM_AVATARS = 25;

const generateRandomAvatars = () => {
  return Array.from({ length: NUM_AVATARS }, (_, index) => {
    return `https://avatar.vercel.sh/jack`; 
  });
};

const AvatarGrid = () => {
  const avatars = generateRandomAvatars();

  return (
    <>
        {avatars.map((avatarUrl, index) => (
        <div key={index} className="rounded-full min-h-14 w-14 bg-white flex items-center justify-center">
            <img src={avatarUrl} alt={`Avatar ${index}`} className="rounded-full h-14 w-14 object-cover" />
        </div>
        ))}
    </>
  );
};

export default AvatarGrid;