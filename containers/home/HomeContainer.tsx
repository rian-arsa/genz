"use client";

import React from "react";
import PostList from "./section/PostList";
import PostInputBox from "./section/PostInput";

const HomeContainer = () => {
  return (
    <>
      <PostInputBox />
      <PostList />
    </>
  );
};

export default HomeContainer;
