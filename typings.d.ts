

  interface UserInfoProps{
    name: string;
    email: string;
    walletAddress: any;
    tweetCount: any;
  }

  interface TweetForm{
    tweet: string,
  }

  interface TweetLikeForm{
    tweetid: string,
  }

interface TweetDetails{
  account: {
    creator: string;
    tweetId: string;
    message: string;
    likes: string;
  };
}

interface TweetPubkey{
  publicKey:string;
}




  