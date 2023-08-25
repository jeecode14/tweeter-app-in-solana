'use client'

import 'dotenv/config';
import { useMemo, useState, useEffect, createContext, useContext } from 'react';
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import {AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import idl from "../solana/idl.json";
import * as anchor from "@project-serum/anchor";
import {Buffer} from "buffer";
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { ProgramDataContext } from '@/context/context'

// 1. Install: npm install --save-dev @types/chai
// 2. Add to tsconfig.json => "types": ["@types/chai"]
import { expect, assert } from 'chai';


//const {SystemProgram} = web3;
//window.Buffer = Buffer;


// get program ID
const APP_PROGRAM_ID = new PublicKey(idl.metadata.address.toString()); 

// get connections
const NETWORK = clusterApiUrl('devnet');
const CONNECTION = new Connection(NETWORK, "processed");

// to be used for "initUserInfo" and other functions.
const AppKeypair = anchor.web3.Keypair.generate();
const AppPublicKeyString = AppKeypair.publicKey.toBase58();



//console.log("USER SEED: ", process.env.REACT_APP_USER_SEED);
//console.log(idl);

let xyz = 0;

function GetProgramData ({children}) {
    const [ifRenderTweetOnce, setRenderTweetOnce] = useState(false);
    const [getInitializeStatus, setInitialize] = useState(false);
    const [getUserInfo, setUserInfo] = useState(undefined);
    const [getTweetInfo, setTweet] = useState(undefined);

    const testInfo = () => {
      console.log("Increment:", xyz);
      xyz +=1;
    }

    const keyGenerate = () =>{
      // to be used for "initUserInfo" and other functions.
      const tweetAppKeypair = anchor.web3.Keypair.generate();
      const PublicKeyString = tweetAppKeypair.publicKey.toBase58();
      return PublicKeyString
    }

    const InitializeUserInfo = () => {

        if (window.solana) {
          // @ts-ignore
          const walletProvider = new AnchorProvider(CONNECTION, window.solana, "processed");
          const WalletPublicKey = new PublicKey(walletProvider.wallet.publicKey);
          // @ts-ignore
          const appProgram = new Program(idl, APP_PROGRAM_ID, walletProvider);
      
          try{
      
            const init = async (walletProvider) => {
              
              const [userPda] = await findProgramAddressSync([utf8.encode('tweetuser'), walletProvider.wallet.publicKey.toBuffer()], APP_PROGRAM_ID)
              
              try{
                const useraddress_signature = await appProgram.methods.initializeUserInfo()
                    .accounts({
                      userInfo: userPda,
                      authority: walletProvider?.wallet.publicKey,
                      systemProgram: SystemProgram.programId,
                    })
                    .rpc();
          
                //console.log("User Address Signature => ", useraddress_signature);
                setInitialize(true);
                
              }
              catch(e){
                console.log("user init is canceled");
                setInitialize(true);
              }
              
            };
            init(walletProvider);

            setInitialize(false);
            // getting ready to connect online
        
          }
          catch(e){
            setInitialize(false);
            //return {status:false, message:e, report:"Offline"};
          }
        
        }
      
        else{
          setInitialize(false);
          //return {status:false, message:"No Phantom wallet", report:"Offline"};
        }
        
    }
      
      
      
      const fetchUserInfo = async () =>{
      
        if (window.solana.isConnected){
          // @ts-ignore
          const walletProvider = new AnchorProvider(CONNECTION, window.solana, "processed");
          const WalletPublicKey = new PublicKey(walletProvider.wallet.publicKey);
          // @ts-ignore
          const appProgram = new Program(idl, APP_PROGRAM_ID, walletProvider);
      
          try{
      
            const init = async (walletProvider) => {
              
              const [userPda] = await findProgramAddressSync([utf8.encode('tweetuser'), walletProvider.wallet.publicKey.toBuffer()], APP_PROGRAM_ID)
          
              const user_info: any = await appProgram.account.userInfo.fetch(userPda);
              setUserInfo(user_info);
              
            };
            init(walletProvider);
            
        
          }
          catch(e){
            // if error arise here
            setUserInfo(undefined);
          }
      
        }
        else{
          // if not wallet connected, return false;
          setUserInfo(undefined);
        }
      }
      
      
      
      const writeTweet = async (tweet_message) => {
        const {tweet} = JSON.parse(tweet_message);
        
        if (window.solana.isConnected){
          // @ts-ignore
          const walletProvider = new AnchorProvider(CONNECTION, window.solana, "processed");
          const WalletPublicKey = new PublicKey(walletProvider.wallet.publicKey);
          // @ts-ignore
          const appProgram = new Program(idl, APP_PROGRAM_ID, walletProvider);
      
          try{
      
            const init = async (walletProvider) => {
              
              const tweetPublicKey = keyGenerate(); // this is a string publickey

              const [userPda] = await findProgramAddressSync([utf8.encode('tweetuser'), walletProvider.wallet.publicKey.toBuffer()], APP_PROGRAM_ID)
              const user_info: any = await appProgram.account.userInfo.fetch(userPda);

              const {name, email, walletAddress, tweetCount} = user_info; 
              const [tweetPda] = await findProgramAddressSync([utf8.encode('tweetinsolana'), walletProvider.wallet.publicKey.toBuffer(), userPda.toBuffer(), Uint8Array.from([tweetCount])], APP_PROGRAM_ID)
              
              
              try{
                // Set Instruction method : writeTweet() => message, tweet_id, user_public_key

                const tweet_address: any = await appProgram.methods.writeTweet(tweet, tweetPublicKey, userPda.toBase58())
                    .accounts({
                      tweeter: tweetPda,
                      userInfo: userPda,
                      authority: walletProvider?.wallet.publicKey,
                      systemProgram: SystemProgram.programId,
                    })
                    .rpc();
          
                setTweet(tweet_address);
              }
              catch(e){
                console.log("Sending tweet error: ",e);
                setTweet(undefined);
              }
              
            };
            init(walletProvider);
            
        
          }
          catch(e){
            // if error arise here
            setTweet(undefined);
          }
      
        }
        else{
          // if not wallet connected, return false;
          setTweet(undefined);
        }
      }




      const addTweetLike = async (data) => {
        const tweetPubKey = data;

        if (window.solana.isConnected){
          // @ts-ignore
          const walletProvider = new AnchorProvider(CONNECTION, window.solana, "processed");
        
          // @ts-ignore
          const appProgram = new Program(idl, APP_PROGRAM_ID, walletProvider);
      
          try{
      
            const init = async (walletProvider) => {
              
              const tweetlikeNewPublicKey = keyGenerate(); // this is a string publickey

              const [userPda] = await findProgramAddressSync([utf8.encode('tweetuser'), walletProvider.wallet.publicKey.toBuffer()], APP_PROGRAM_ID)
              
              const tweet_info: any = await appProgram.account.tweet.fetch(new PublicKey(tweetPubKey));
              const {message, likes, creator, tweetId} = tweet_info; 
              
              const [tweetPda] = await findProgramAddressSync([new PublicKey(tweetId).toBuffer(), Uint8Array.from([likes])], APP_PROGRAM_ID)
              
              try{
                // Set Instruction method : writeTweet() => message, tweet_id, user_public_key

                const tweet_address: any = await appProgram.methods.likeTweet(userPda.toBase58(), tweetId)
                    .accounts({
                      newTweetlike: tweetPda,
                      tweetAccount: new PublicKey(tweetPubKey),
                      authority: walletProvider?.wallet.publicKey,
                      systemProgram: SystemProgram.programId,
                    })
                    .rpc();
          
                
              }
              catch(e){
                console.log("Sending tweet error: ",e);
                
              }
              
            };
            init(walletProvider);
            
        
          }
          catch(e){
            // if error arise here
            
          }
      
        }
        else{
          // if not wallet connected, return false;
          
        }
      }
      

      
      


  return (
    
    <ProgramDataContext.Provider value={{
        InitializeUserInfo,
        getInitializeStatus,
        fetchUserInfo,
        getUserInfo,
        writeTweet,
        getTweetInfo,
        setRenderTweetOnce,
        ifRenderTweetOnce,
        addTweetLike,
        
    }}
    >
        
        {children}
        {/* By adding {children} here, it activates sub-components as child components listed below:*/}
        {/* Sidebar*/}   
        {/* Feed */}
        {/* Widgets */}

    </ProgramDataContext.Provider>
  )
}

export default GetProgramData