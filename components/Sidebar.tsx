'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { HomeIcon, UserIcon, EllipsisHorizontalIcon, WalletIcon, BoltIcon, BoltSlashIcon } from '@heroicons/react/24/outline'
import SidebarRow from './SidebarRow'
import { connectWallet, disconnectWallet } from '@/utils/initWallet'

import { useProgramData } from '@/context/context'


function Sidebar() {
  // get all the variables/functions/events/any from the context provider
  const { InitializeUserInfo,getInitializeStatus,fetchUserInfo,getUserInfo, getUserPubkey} = useProgramData();


  const homeIcon = useCallback(() => <HomeIcon className="h-6 w-6"/>, [])
  const walletIcon = useCallback(() => <WalletIcon className="h-6 w-6"/>, [])
  const ellipseHorIcon = useCallback(() => <EllipsisHorizontalIcon className="h-6 w-6"/>, [])
  const boltIcon = useCallback(() => <BoltIcon className="h-6 w-6"/>, [])
  const boltSlashIcon = useCallback(() => <BoltSlashIcon className="h-6 w-6"/>, [])
  const userIcon = useCallback(() => <UserIcon className="h-6 w-6"/>, [])

  

  // UseState to determine the status of wallet
  const [walletkey, setWalletKey] = useState<any>(undefined);
  const [statusWallet, setWalletStatus] = useState<any>("Initialize");
  const [getProfile, setProfile] = useState(false);
  const [getIam, setIam] = useState("");

  // Function to disconnect wallet
  const dWallet = async () => {
    try{
      const disconnect = await disconnectWallet();

      if (disconnect != false){
        setWalletKey(disconnect);
      }
    }
    catch{}
    
    
  }


    // Function to disconnect wallet
    const cWallet = async () => {
        // Function to connect wallet
        try{
          const connect = await connectWallet();
  
          if (connect != false){
            setWalletKey(connect);
          }
        }
        catch{}
        
      
    }

    

    useMemo(()=>{

      if(getUserPubkey === undefined){
        // nothing here
      }
      else{
        const len = getUserPubkey.length;
        const name = getUserPubkey.slice(0, 3) + "***" + getUserPubkey.slice((len-3), len);
        setIam(name);
      }
      
      
    },[getUserPubkey])
  
    


  
  return (
    <div className='flex flex-col col-span-2 items-center px-4 md:items-start border-r'>
      <Image
        className="m-3"
        src="https://links.papareact.com/drq"
        width={40}
        height={40}
        alt="tweeter logo"
      />

      <SidebarRow Icon={homeIcon} title="Home"/>

      {/*
      <button  onClick={() => {setProfile(true)}}>
        <SidebarRow Icon={userIcon} title="Profile" />
      </button>
      */}

      <button onClick={ walletkey ? dWallet : cWallet } className={ walletkey ? 'text-twitter' : 'text-red-500'}>
        <SidebarRow Icon={walletIcon} title={walletkey ? "Disconnect Wallet" : "Connect Wallet"}/>
      </button>
      
      <button onClick={ () => { InitializeUserInfo(); } } 

        className={ walletkey ? (getInitializeStatus ? 'text-twitter' : 'text-gray-400') : 'text-gray-400'}  
        disabled = {walletkey ? false :true }>
        <SidebarRow Icon={walletkey ? (getInitializeStatus ? boltIcon: boltSlashIcon) : boltSlashIcon} title={ walletkey ? (getInitializeStatus ? "Online":"Initialize") : "Offline"}/>

      </button>

      <div className='py-20'>
        <SidebarRow Icon={userIcon} title={getIam == "" ? "I Am": getIam} /> 
      </div>
      


      
    </div>
  )
}

export default Sidebar