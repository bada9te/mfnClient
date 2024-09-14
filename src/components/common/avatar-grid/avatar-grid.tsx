"use client"
import envCfg from '@/config/env';
import { usePostsMostRecentQuery } from '@/utils/graphql-requests/generated/schema';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const AvatarGrid = () => {
  const { data: recentTracks, loading: mostRecentsLoading } = usePostsMostRecentQuery();

  const [showFollowing, setShowFollowing] = useState(true);
  const [showRecents, setShowRecents] = useState(true);

  const handleShowFollowingToggle = () => {
    localStorage.setItem("showFollowingRightbar", JSON.stringify({data: !showFollowing}));
    setShowFollowing(!showFollowing);
  }

  const handleShowRecentsToggle = () => {
    localStorage.setItem("showRecentsRightbar", JSON.stringify({data: !showRecents}));
    setShowRecents(!showRecents);
  }


  useEffect(() => {
    const inStorageF = localStorage.getItem("showFollowingRightbar");
    const inStorageR = localStorage.getItem("showRecentsRightbar");

    if (inStorageF) {
      setShowFollowing(JSON.parse(inStorageF).data);
    }

    if (inStorageR) {
      setShowFollowing(JSON.parse(inStorageR).data);
    }
  }, []);

  return (
    <div className='bg-base-300 glass flex items-center justify-start flex-col gap-4 py-4 pb-6 rounded-2xl shadow-xl min-h-[calc(100vh-175px)]'>
      <div className="form-control">
        <label className="label cursor-pointer p-0 flex items-start justify-start">
          <input type="checkbox" className="toggle toggle-xs mr-1" checked={showFollowing} onChange={() => handleShowFollowingToggle()}/>
          <span className="label-text text-xs">Following</span>
        </label>
      </div>
      {
        mostRecentsLoading
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
          <div className='h-14 w-14 rounded-full border-[2px] border-dashed border-gray-200 flex items-center justify-center hover:bg-base-100 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
            </svg>
          </div>
          {recentTracks?.postsMostRecent && recentTracks.postsMostRecent.map((recentTrack, index) => (
            <Link href={`/profile/${recentTrack.owner._id}/1`} key={index}>
              <Image src={recentTrack.owner.avatar ? `${envCfg.serverBase}/files/${recentTrack.owner.avatar}` : '/assets/icons/logo_clear.png'} alt={`Avatar ${index}`} className="rounded-full h-14 w-14 shadow-2xl cursor-pointer border-[3px] border-[#21d4ce]" width={100} height={100}/>
            </Link>
          ))}
        </>
      }
    
      
      <div className='divider my-1'></div>
      <div className="form-control">
        <label className="label cursor-pointer p-0 flex items-start justify-start">
          <input type="checkbox" className="toggle toggle-xs mr-1" checked={showRecents} onChange={() => handleShowRecentsToggle()}/>
          <span className="label-text text-xs">Recents</span>
        </label>
      </div>
      {
        mostRecentsLoading
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
    </div>
  );
};

export default AvatarGrid;