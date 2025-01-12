"use client"
import envCfg from '@/app/config/env';
import { getDictionary } from '@/app/translations/dictionaries';
import { useAppSelector } from '@/app/lib/redux/store';
import getIpfsUrl from '@/app/utils/common-functions/getIpfsUrl';
import { usePostsMostRecentByFollowingLazyQuery, usePostsMostRecentLazyQuery, usePostsMostRecentQuery } from '@/app/utils/graphql-requests/generated/schema';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PlayerModal from '../../bars/bottom-nav/components/player-modal';
import { AudioLines, BadgePlus } from 'lucide-react';


const AvatarGrid = ({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) => {
  const user = useAppSelector(state => state.user.user);
  const [getmostRecent, { data: recentTracks, loading: mostRecentsLoading }] = usePostsMostRecentLazyQuery();
  const [getMostRecentByFollowing, { data: recentTracksByFollowing, loading: recentTracksByFollowingLoading }] = usePostsMostRecentByFollowingLazyQuery();

  const [showFollowing, setShowFollowing] = useState(true);
  const [showRecents, setShowRecents] = useState(true);
  const [urls, setUrls] = useState<string[]>([]);

  const handleShowFollowingToggle = () => {
    if (!showFollowing == true && user) {
      getMostRecentByFollowing({ variables: { user: user?._id as string } });
    }
    localStorage.setItem("showFollowingRightbar", JSON.stringify({data: !showFollowing}));
    setShowFollowing(!showFollowing);
  }

  const handleShowRecentsToggle = () => {
    if (!showRecents == true) {
      getmostRecent();
    }
    localStorage.setItem("showRecentsRightbar", JSON.stringify({data: !showRecents}));
    setShowRecents(!showRecents);
  }


  useEffect(() => {
    const inStorageF = localStorage.getItem("showFollowingRightbar");
    const inStorageR = localStorage.getItem("showRecentsRightbar");

    if (inStorageF && user) {
      const prop = JSON.parse(inStorageF).data;
      prop && getMostRecentByFollowing({ variables: { user: user?._id as string } });
      setShowFollowing(prop);
    }

    if (inStorageR) {
      const prop = JSON.parse(inStorageR).data;
      prop && getmostRecent();
      setShowRecents(prop);
    }
  }, [user]);

  useEffect(() => {

  }, [])


  return (
    <div className='bg-base-300 flex items-center justify-between flex-col gap-4 py-4 pb-1 rounded-2xl shadow-xl min-h-full text-base-content'>

      <div className='flex flex-col gap-3 items-center justify-between'>
        <div className="form-control">
          <label className="label cursor-pointer p-0 flex items-start justify-start">
            <input type="checkbox" className="toggle toggle-xs mr-1" checked={showFollowing} onChange={() => handleShowFollowingToggle()}/>
            <span className="label-text text-xs">{dictionary.common['avatar-grid']['recent-sub']}</span>
          </label>
        </div>
        {
          showFollowing ?
          <>
            {
              recentTracksByFollowingLoading
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
                {
                  (() => {
                    if (recentTracksByFollowing?.postsMostRecentByFollowing?.length) {
                      return recentTracksByFollowing?.postsMostRecentByFollowing && recentTracksByFollowing.postsMostRecentByFollowing.map((recentTrack, index) => (
                        <Link href={`/profile/${recentTrack.owner?._id}/1`} key={index}>
                          <Image src={recentTrack.owner?.avatar ? `${envCfg.serverBase}/files/${recentTrack.owner.avatar}` : '/assets/icons/logo_clear.png'} alt={`Avatar ${index}`} className="rounded-full h-14 w-14 shadow-2xl cursor-pointer border-[3px] border-[#21d4ce]" width={100} height={100}/>
                        </Link>
                      ))
                    } else {
                      return (
                        <div className='flex flex-col justify-center items-center gap-2'>
                          <Image src={'/assets/icons/logo_clear.png'} alt='logo-clear' width={35} height={35} className='rounded-full shadow-lg'/>
                          <p className='text-[10px] text-center px-2'>{'\\*-*/'}</p>
                        </div>
                      );
                    }
                  })()
                }
              </>
            }
          </>
          :
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src={'/assets/icons/logo_clear.png'} alt='logo-clear' width={35} height={35} className='rounded-full shadow-lg'/>
            <p className='text-[10px] text-center px-2'>{dictionary.common['avatar-grid']['recent-sub-hidden']}</p>
          </div>
        }
      
        <div className='divider my-0'></div>

        <div className="form-control">
          <label className="label cursor-pointer p-0 flex items-start justify-start">
            <input type="checkbox" className="toggle toggle-xs mr-1" checked={showRecents} onChange={() => handleShowRecentsToggle()}/>
            <span className="label-text text-xs">{dictionary.common['avatar-grid'].recent}</span>
          </label>
        </div>
        {
          showRecents ?
          <>
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
                {
                  (() => {
                    if (recentTracks?.postsMostRecent?.length) {
                      return recentTracks?.postsMostRecent && recentTracks.postsMostRecent.map((recentTrack, index) => (
                        <Link href={`/profile/${recentTrack.owner?._id}/1`} key={index}>
                          <Image src={recentTrack.owner?.avatar ? getIpfsUrl(recentTrack.owner.avatar) : `https://avatar.vercel.sh/${index}`} alt={`Avatar ${index}`} className="rounded-full h-14 w-14 shadow-2xl cursor-pointer border-[3px] border-[#21d4ce]" width={100} height={100}/>
                        </Link>
                      ))
                    } else {
                      return (
                        <div className='flex flex-col justify-center items-center gap-2'>
                          <Image src={'/assets/icons/logo_clear.png'} alt='logo-clear' width={35} height={35} className='rounded-full shadow-lg'/>
                          <p className='text-[10px] text-center px-2'>{'\\*-*/'}</p>
                        </div>
                      );
                    }
                  })()
                }
              </>
            }
          </>
          : 
          <div className='flex flex-col justify-center items-center gap-2'>
            <img src={'/assets/icons/logo_clear.png'} alt='logo-clear' width={35} height={35} className='rounded-full shadow-lg'/>
            <p className='text-[10px] text-center px-2'>{dictionary.common['avatar-grid']['recent-hidden']}</p>
          </div>
        }
      </div>
      

      <div className='flex flex-col gap-2 items-center justify-center p-2'>
        <Link href={"/profile/me/upload"} className='btn btn-ghost h-fit rounded-none p-2'>
            <BadgePlus/>
            <span className="text-sm">{dictionary?.bars["bottom-nav"]["new-post"]}</span>
        </Link>
        <PlayerModal
            dictionary={dictionary}
            button={
                <button className='btn btn-ghost h-fit rounded-none p-4'>
                    <AudioLines/>
                    <span className="text-sm">{dictionary?.bars["bottom-nav"].player}</span>
                </button>
            }
        />
      </div>
    </div>
  );
};

export default AvatarGrid;