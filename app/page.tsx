import Image from 'next/image'
import TweetForm from '@/components/TweetForm'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'

/*
To avoid warning "parameter 'param' implicitly has 'any' type",
Add this to tsconfig.json:
  "compilerOptions": {
    "noImplicitAny": false,}
*/


export default function Home() {

  

  return (
    
    <>
    <div className='mx-auto max-h-screen overflow-hidden lg:max-w-6xl h-screen'>
      
      <main className='grid grid-cols-9'>
        {/* Sidebar*/}
        <Sidebar/>

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />
      </main>
      
    </div>

    </>
  )
}
