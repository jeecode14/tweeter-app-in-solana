import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useProgramData } from '@/context/context'

type Props={
    post: TweetDetails[];
    postKey: any;
    check: boolean;
}

function TweetSearchResult({post, postKey, check}: Props) {

    
  return (
    <div>
    {
        check ? (

            
                post.reverse().map((data, index) => (

                    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100 w-full' key={new Date().getTime() + (index+1*1)}>
                        <div className='text-gray-700'>
                        {data.message}
                        </div>

                        <div className='mt-5 flex justify-between'>
                                            
                            <div className='flex items-center space-x-3 text-gray-400'>
                                
                                <HeartIcon className='h-5 w-5'/>
                                <p>{data.likes}</p>
                                

                            </div>

                            <div className='flex items-center space-x-3 text-gray-400'>
                                <p></p>
                            </div>

                            <div className='flex items-center space-x-3 text-gray-400'>
                                <p></p>
                            </div>

                        </div>
                    </div>

                ))
            
            
        ) :

        (
        <div className='flex flex-col space-x-3 border-y p-5 border-gray-100 w-full' key={new Date().getTime() + 12345}>
            <div className='text-gray-700'>
                Loading tweets ...
            </div>
        </div>
        )
    }
    </div>
    
  )
}

export default TweetSearchResult