
import 'dotenv/config';
import { useMemo, useState, useEffect } from 'react';
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import {AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import idl from "../solana/idl.json";
import * as anchor from "@project-serum/anchor";
import {Buffer} from "buffer";
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'

require('dotenv').config();



// get program ID
const APP_PROGRAM_ID = new PublicKey(idl.metadata.address.toString()); 

// get connections
const NETWORK = clusterApiUrl('devnet');
const CONNECTION = new Connection(NETWORK, "processed");

// to be used for "initUserInfo" and other functions.
const tweetAppKeypair = anchor.web3.Keypair.generate();
const publicKeyString = tweetAppKeypair.publicKey.toBase58();



export const fetchUsersTweet = async () =>{
        
  if (window.solana.isConnected){
    // @ts-ignore
    const walletProvider = new AnchorProvider(CONNECTION, window.solana, "processed");
    // @ts-ignore
    const appProgram = new Program(idl, APP_PROGRAM_ID, walletProvider);

    try{

      const init = async (walletProvider) => {
        
        const [userPda] = await findProgramAddressSync([utf8.encode('tweetuser'), walletProvider.wallet.publicKey.toBuffer()], APP_PROGRAM_ID)
    
        const all_tweet: any = await appProgram.account.tweet.all(walletProvider.wallet.publicKey);

        return all_tweet;
      };
      const result = init(walletProvider);
      
      return result;
  
    }
    catch(e){
      console.log("Error [fetchUsersTweet()] ====>>", e);
      // if error arise here
      return null;
    }

  }
  else{
    // if not wallet connected, return false;
    return null;
  }
}