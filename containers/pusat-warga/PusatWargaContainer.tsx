"use client";

import React, { useState } from "react";

import { PostInput, PostList } from "../post/section";
import { FeedSortDropdown } from "../post/section/components";
import { useSession } from "next-auth/react";

const HomeContainer = () => {
  const [sortOption, setSortOption] = useState("top");

  const { data: session, status } = useSession();

  console.log(session, status);

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
