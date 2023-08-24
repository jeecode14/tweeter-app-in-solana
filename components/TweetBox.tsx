'use client'

import React, { useState, useEffect } from 'react'
import {useForm, SubmitHandler} from "react-hook-form"
import { useProgramData } from '@/context/context'


function TweetBox() {
    const {fetchUserInfo,getUserInfo, writeTweet, getTweetInfo, } = useProgramData();

    const [input, setInput] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors}, } = useForm<TweetForm>();

    const onSubmit: SubmitHandler<TweetForm> = async(data) => {

        /* set true to disable submit button */
        setInput("");

        await writeTweet(JSON.stringify(data));

        

    };

    



  return (
    <div className='flex space-x-2 p-5'>
        <div className='flex flex-1 items-center pl-2'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col'>
                <input 
                {...register("tweet")}
                value={input}
                onChange={e => setInput(e.target.value)}
                type="text" placeholder="What's on your mind?" 
                    className='bg-transparent h-24 w-full text-xl outline-none placeholder:text-xl'/>
                <div className='flex items-center'>
                    <div className='flex flex-1 spaxe-x-2 text-gray-500 text-sm'>
                        <p>* Each tweet cost of a fraction of SOL</p>
                    </div>
                <button disabled={!input} className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Tweet</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TweetBox