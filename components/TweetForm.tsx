'use client'

import React, { useState } from "react";


const TweetForm = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("Sending tweet: " + tweet);
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={tweet} onChange={(e) => setTweet(e.target.value)} />
      <button>Send Tweet</button>
    </form>
  );
};

export default TweetForm;