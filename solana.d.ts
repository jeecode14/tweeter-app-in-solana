// solana.d.ts
declare global {
    interface Window {
      solana: {
        isPhantom: boolean;
        // Add other properties and methods as needed
        connect;
        disconnect;
        publicKey;
        isConnected: boolean;
      };
    }
  }
  
export {};
  