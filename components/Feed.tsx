'use client'
import React, {useState, useEffect} from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import TweetBox from './TweetBox'
import Tweet from './Tweet'
import 'dotenv/config';
import { fetchUserInfo } from '@/utils/solanaProgram'



function Feed() {
    const [wallet, setWalletConnected] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(undefined);

    useEffect(() => {
        setWalletConnected(window.solana.isConnected);
        const fetchDetails = async () => {
            const user_info = await fetchUserInfo(); // @ts-ignore
            setUserInfo(user_info); 
            }
        if(window.solana.isConnected){
            fetchDetails();
        }

      },[wallet]);
 
    
    
    

    return (
        <div className='col-span-7 lg:col-span-5 border-r-2'>
            <div className='flex items-center justify-between'>
                <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
                <ArrowPathIcon className='h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 
                ease-out hover:rotate-180 active:scale-125'/>        
            </div>

            {/* Tweeter Box*/}
            <div>
                <TweetBox/>
            </div>

            {/* Tweet Box*/}
            <div>
                {/* <Tweet post={userInfo}/> */}
                <Tweet post={userInfo}/>
            </div>
        </div>
    )
    }

export default Feed