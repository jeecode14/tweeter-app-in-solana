import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'

type Props={
    post: UserInfo;
}


function Tweet({post}: Props) {
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
        <div className='flex space-x-3'>
            <div>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-bold'>User</p>
                    <p className='text-gray-500'>@addr-ndfbvkvkewoqweurxzvbufi</p>
                </div>

                <p className='pt-1'>Tweet messages here...</p>
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

export default Tweet