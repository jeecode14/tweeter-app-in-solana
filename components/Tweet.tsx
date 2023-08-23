'use client'
import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
//import { publicKey } from '@project-serum/anchor/dist/cjs/utils';


type Props={
    post: TweetDetails[];
    check: boolean;
}


function Tweet({post, check}: Props) {
    const date = new Date();
    //console.log("Tweet rendered ==>", post);
    // @ts-ignore
    //console.log(check);
    
  return (
    
    <div>
        { 
            check ? 
                ( 
                    post.reverse().map((data, index) => (
                        <div className='flex flex-col space-x-3 border-y p-5 border-gray-100' key={new Date().getTime() + (index+1)}>
                            <div className='flex space-x-3'>
                                <div>
                                    <div className='flex items-center space-x-1'>
                                        <p className='mr-1 font-bold'>Tweeted by </p>
                                        <p className='text-gray-500'>@{data.creator}</p>
                                    </div>
                
                                    <p className='pt-1'>{data.message}</p>
                                </div>
                            </div>
                            
                            <div className='mt-5 flex justify-between'>
                            
                                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                                    <HeartIcon className='h-5 w-5'/><p>{data.likes}</p> 
                                </div>
                
                                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                                    <p></p>
                                </div>
                
                                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                                    <p></p>
                                </div>
                
                            </div>
                        
                        </div>
                    ))
                )
                :
                (
                    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100' key={new Date().getTime() + 100001}>
                        
                    <div className='flex space-x-3'>
                        <div>
                            <div className='flex items-center space-x-1'>
                                <p className='mr-1 font-bold'>User</p>
                                <p className='text-gray-500'>@owner-****</p>
                            </div>
        
                            <p className='pt-1'></p>
                        </div>
                    </div>
                    
                    <div className='mt-5 flex justify-between'>
                    
                        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                            <HeartIcon className='h-5 w-5'/><p>0</p> 
                        </div>
        
                        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                            <p></p>
                        </div>
        
                        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                            <p></p>
                        </div>
        
                    </div>
                </div>
                )
            
        }
        
    </div>
  )
}

export default Tweet