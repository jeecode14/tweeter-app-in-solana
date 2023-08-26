'use client'
import React ,{useEffect, useMemo, useState} from 'react'
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetSearchResult from './TweetSearchResult';
import { useProgramData } from '@/context/context';
import { fetchUsersTweet } from '@/utils/solanaProgram'


function Widgets() {
  // getThisUserPubKey, getUserPubkey
  const { getInitializeStatus, getThisUserPubKey, getUserPubkey, getTweetLikeUpdate} = useProgramData();

  const [userInfo, setUserInfo] = useState<any>(undefined);
  const [getResult_2, setResult2] = useState(false);
  const [getRefresh_2, setRefresh2] = useState(false);
  //const [] = false;
  

  useEffect(()=>{
      // do nothing
      
      if (getInitializeStatus){
          getThisUserPubKey();
      }
      return () => {
          setRefresh2(false);
          setResult2(false);
      }
      
  },[getInitializeStatus, getThisUserPubKey, getTweetLikeUpdate]);

  
  const tweet_details = useMemo(() => { 
      const tweet_detail = [];
      const tweet_pubkey = [];

      
      const tweetData = async () =>{
          
  
          const result = await fetchUsersTweet();
          
          if(result != undefined){
              // pass
              if (getInitializeStatus && (getUserPubkey != undefined)){
      
                  try{
                      for(let i=0; i < result.length; i++){
  
                          if(result[i].account.creator === getUserPubkey){
                              //@ts-ignore
                              tweet_detail.push(result[i].account); 
                              //@ts-ignore
                              tweet_pubkey.push(result[i].publicKey);
                              setResult2(true);

                          }
                          
                      }
                  }
                  catch(e){
                      // pass
                  }
              }
              
  
          }
          
      }
      tweetData();

      return [tweet_detail, tweet_pubkey];
  },[getUserPubkey, getTweetLikeUpdate]);



  return (
    <div className='mt-2 px-2 col-span-2 hidden lg:inline'>
      <div className='text-gray-400 flex space-x-2 cursor-pointer'>
        <ArrowPathIcon className='h-5 w-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125' 
          onClick={() => setRefresh2(true)}/>   
        <p>Refresh for your latest tweets</p>
      </div>
        <div className='mt-2 flex items-center space-x-2'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400'/>
            <input type="text" placeholder='Search tweets'
            className='flex-1 outline-none bg-transparent' />
        </div>

        <div className='max-h-screen overflow-scroll scrollbar-hide'>
                {
                    getInitializeStatus ? (<TweetSearchResult post={tweet_details[0]} postKey={tweet_details[1]} check={getResult_2}/>) : 

                    (
                      getResult_2 ? ( <TweetSearchResult post={tweet_details[0]} postKey={tweet_details[1]} check={getResult_2}/> ) : (

                        getRefresh_2 ? <TweetSearchResult post={tweet_details[0]} postKey={tweet_details[1]} check={getResult_2}/> :
                        <div className='flex items-center justify-between p-10 font-thin italic'>
                        ** When online, please click refresh to view tweets.
                    </div>
                      ))
                }


        </div>
        
    </div>
  )
}

export default Widgets