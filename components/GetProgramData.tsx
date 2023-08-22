
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
const tweetAppKeypair = anchor.web3.Keypair.generate();
const publicKeyString = tweetAppKeypair.publicKey.toBase58();
console.log("publicKey String:", publicKeyString);
console.log("USER SEED: ", process.env.REACT_APP_USER_SEED);
console.log(idl);

const BlogContext = createContext(undefined);
export const useGetProgramData = () => {
    const context = useContext(BlogContext);
    if (!context) {
      throw new Error("Parent must be wrapped inside PostsProvider");
    }
  
    return context;
  };

function GetProgramData () {


    const [getInitialize, setInitialize] = useState(false);


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
          
                console.log("User Address Signature => ", useraddress_signature);
              }
              catch(e){
                console.log("user init is canceled");
              }
              
            }
        
            init(walletProvider);
            
            return {status:true, message:"Ready for solana transaction", report:"Online"};
        
          }
          catch(e){
            return {status:false, message:e, report:"Offline"};
          }
        
        }
      
        else{
          return {status:false, message:"No Phantom wallet", report:"Offline"};
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
          
              const user_info = await appProgram.account.userInfo.fetch(userPda);
              console.log("fetch:", user_info);
              return user_info;
            }
            
        
            const user_info = init(walletProvider);
            return user_info;
        
          }
          catch(e){
            return false;
          }
      
        }
        else{
          // if not wallet connected, return false;
          return false;
        }
      }
      
      
      
      const writeTweet = async () => {
        
          // setup connections
        const network = clusterApiUrl('devnet');
        const connection = new Connection(network, "processed");
        
        // @ts-ignore
        const provider = new AnchorProvider(connection, window.solana, "processed");
      
        const programId = new PublicKey(idl.metadata.address.toString()); 
      
        // @ts-ignore
        const program = new Program(idl, programId, provider);
      
        // @ts-ignore
        const response = await solana.connect();
        const userWalletKey = response.publicKey.toString();
        
        
        try{
          
          
          const progHash = await program.rpc.writeTweet("tweet message",publicKeyString,userWalletKey,{
              accounts: {
                tweet: tweetAppKeypair.publicKey,
              },
              signers: [],
            });
      
          console.log("Program Hash => ", progHash);
      
          let tweet = await program.account.tweet.fetch(tweetAppKeypair.publicKey);
          expect(tweet.likes).to.equal(0);
          expect(tweet.message).to.equal('');
      
        }
        catch(e){
          console.log("Error", e);
        }
      
      
        return 0;
      }
      


  return (
    <BlogContext.Provider>
        value={{
            InitializeUserInfo,
            
        }}
    </BlogContext.Provider>
  )
}

export default GetProgramData