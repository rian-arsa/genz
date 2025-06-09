"use client";

import React, { useState } from "react";

import { PostInput, PostList } from "../post/section";
import { FeedSortDropdown } from "../post/section/components";

const HomeContainer = () => {
  const [option, setOption] = useState("fyp");

  return (
    <>
      <PostInput />
      <FeedSortDropdown value={option} onChange={(val) => setOption(val)} />
      <PostList option={option} />
    </>
  );
};

export default HomeContainer;
