'use client'
import React, {useState, useEffect, Suspense, useMemo, use } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import TweetBox from './TweetBox'
import Tweet from './Tweet'
import 'dotenv/config';
import { useProgramData } from '@/context/context'
import { fetchUsersTweet } from '@/utils/solanaProgram'

// revalidate this page every 1 minute (60 seconds)
//export const revalidate = 30;

function Feed() {
    const { getInitializeStatus, getThisUserPubKey, getUserPubkey, getTweetLikeUpdate} = useProgramData();

    const [userInfo, setUserInfo] = useState<any>(undefined);
    const [getResult, setResult] = useState(false);
    const [getRefresh, setRefresh] = useState(false);
    //const [] = false;
    

    useEffect(()=>{
        // do nothing
        
        if (getInitializeStatus){
            getThisUserPubKey();
        }
        return () => {
            setRefresh(false);
            setResult(false);
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
    
                            if(result[i].account.creator != getUserPubkey){
                                //@ts-ignore
                                tweet_detail.push(result[i].account); 
                                //@ts-ignore
                                tweet_pubkey.push(result[i].publicKey);
                                setResult(true);
 
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
    },[getUserPubkey, getTweetLikeUpdate])
    

    
    
    
    
    
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
                    getResult ? <Tweet post={tweet_details[0]} postKey={tweet_details[1]} check={getResult}/> : 
                    (
                        getRefresh ? (
                            <Tweet post={tweet_details[0]} postKey={tweet_details[1]} check={getResult}/>
                        ) : (
                            <div className='flex items-center justify-between p-10 font-thin italic'>
                                ** When online, please click refresh to view tweets. You can view all the tweets here except yours. 
                                This is because you are not allowed to like your own tweets.
                            </div>
                        )
                    )
                }
                
            </div>
            
            <div>
                
            </div>
        </div>
    )
    }

export default Feed