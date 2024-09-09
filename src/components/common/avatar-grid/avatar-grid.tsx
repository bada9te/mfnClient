"use client"
import envCfg from '@/config/env';
import { usePostsMostRecentQuery } from '@/utils/graphql-requests/generated/schema';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const AvatarGrid = () => {
  const { data: recentTracks, loading } = usePostsMostRecentQuery();

  return (
    <>
      {
        loading
        ?
        <>
          <div className='skeleton w-14 h-14 rounded-full'></div>
          <div className='skeleton w-14 h-14 rounded-full'></div>
          <div className='skeleton w-14 h-14 rounded-full'></div>
          <div className='skeleton w-14 h-14 rounded-full'></div>
          <div className='skeleton w-14 h-14 rounded-full'></div>
        </>
        :
        <>
          {recentTracks?.postsMostRecent && recentTracks.postsMostRecent.map((recentTrack, index) => (
            <Link href={`/profile/${recentTrack.owner._id}/1`} key={index}>
              <Image src={recentTrack.owner.avatar ? `${envCfg.serverBase}/files/${recentTrack.owner.avatar}` : '/assets/icons/logo_clear.png'} alt={`Avatar ${index}`} className="rounded-full h-14 w-14 shadow-2xl cursor-pointer border-[3px] border-[#21d4ce]" width={100} height={100}/>
            </Link>
          ))}
        </>
      }
    </>
  );
};

export default AvatarGrid;