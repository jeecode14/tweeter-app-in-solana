'use client'

import React, { useState } from 'react'

function TweetBox() {
    const [input, setInput] = useState<string>("");


  return (
    <div className='flex space-x-2 p-5'>
        <div className='flex flex-1 items-center pl-2'>
            <form action="" className='flex flex-1 flex-col'>
                <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                type="text" placeholder="What's on your mind?" 
                    className='bg-transparent h-24 w-full text-xl outline-none placeholder:text-xl'/>
                <div className='flex items-center'>
                    <div className='flex flex-1 spaxe-x-2 text-gray-500 text-sm'>
                        <p>* Each tweet cost of 0.06353 SOL</p>
                    </div>
                <button disabled={!input} className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Tweet</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TweetBox