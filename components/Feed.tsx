'use client'
import React, {useState, useEffect, Suspense, useMemo } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import TweetBox from './TweetBox'
import Tweet from './Tweet'
import 'dotenv/config';
import { useProgramData } from '@/context/context'
import { fetchUsersTweet } from '@/utils/solanaProgram'

function Feed() {
    const { getInitializeStatus, writeTweet, getTweetInfo, } = useProgramData();

    const [userInfo, setUserInfo] = useState<any>(undefined);
    const [getResult, setResult] = useState(false);
    const [getRefresh, setRefresh] = useState(false);
    
    
    
    const tweet_details = useMemo(() => {
        const tweet_details = [];

        const tweetData = async () =>{
            const result = await fetchUsersTweet();
            
            if(result === undefined){
                // pass
            }
            else{
                
                    try{
                        for(let i=0; i < result.length; i++){
                            //@ts-ignore
                            tweet_details.push(result[i].account); setResult(true);
                        }
                    }
                    catch(e){
                        // pass
                    }
    
            }
        }
        tweetData();

        return tweet_details;
    },[getInitializeStatus])

    

    
    return (
        <div className='col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide'>
            <div className='flex items-center justify-between'>
                <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
                <ArrowPathIcon className='h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 
                ease-out hover:rotate-180 active:scale-125' onClick={() => setRefresh(true)}/>      
            </div>

            {/* Tweeter Box*/}
            <div>
                <TweetBox/>
            </div>

            <div className=''>
                {
                    getResult ? (<Tweet post={tweet_details} check={getResult}/>) : (<div className='flex items-center justify-between p-10 font-thin italic'>** Please click refresh to view tweets.</div>)
                }

                {
                    getRefresh ? (getResult ? (<Tweet post={tweet_details} check={getResult}/>) : "" ) : ""
                }
            </div>
            
            <div>
                
            </div>
        </div>
    )
    }

export default Feed