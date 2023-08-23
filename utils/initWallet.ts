import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import {AnchorProvider, Program, web3 } from "@project-serum/anchor";
import idl from "../solana/idl.json";
import * as anchor from "@project-serum/anchor";
import {Buffer} from "buffer";

// 1. Install: npm install --save-dev @types/chai
// 2. Add to tsconfig.json => "types": ["@types/chai"]
import { expect, assert } from 'chai';

const {SystemProgram} = web3;
//window.Buffer = Buffer;


export const connectWallet = async () => {
    
    const {solana} = window;
 
    if(solana){
      try{
        const response = await solana.connect();

        return response;
      }
      catch (e){
        console.log("Error", e);
      } 
    }
    else{
      console.log("Please install phantom wallet.");
    }

    return false;
  }

  // Function to disconnect wallet
export  const disconnectWallet = async () => {
    console.log(idl.metadata.address.toString());
    const {solana} = window;
 
    if(solana){
      try{
        const response = await solana.disconnect();
        console.log("Disconnected.", response);

        return response;
      }
      catch (e){
        console.log("Error", e);
      } 
    }
    else{
      console.log("Please install phantom wallet.");
    }

    return false;
  }
