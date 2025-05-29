"use client";

import React, { useState } from "react";

import { PostInput, PostList } from "../post/section";
import { FeedSortDropdown } from "../post/section/components";

const HomeContainer = () => {
  const [sortOption, setSortOption] = useState("top");

  return (
    <>
      <PostInput />
      <FeedSortDropdown
        value={sortOption}
        onChange={(val) => setSortOption(val)}
      />
      <PostList />
    </>
  );
};

export default HomeContainer;
