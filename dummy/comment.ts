import { TComment } from "@/containers/post/section/PostComment";

export const DUMMY_COMMENTS: TComment[] = [
  {
    id: "12121982912891",
    text: "Wah, ini postingannya bener-bener relate banget 😭",
    author: "Ayu",
    liked: false,
    likeCount: 2,
    replyCount: 2,
    replies: [
      {
        id: "101",
        text: "Iya banget, gue juga ngalamin hal yang sama!",
        author: "Rian",
        liked: true,
        likeCount: 1,
      },
      {
        id: "102",
        text: "Cerita kamu bikin aku terharu. Stay strong ya!",
        author: "Citra",
        liked: false,
        likeCount: 0,
      },
    ],
  },
  {
    id: "9128128912912",
    text: "Lucu banget sih ini 😆🤣",
    author: "Dimas",
    liked: true,
    likeCount: 5,
    replyCount: 1,
    replies: [
      {
        id: "103",
        text: "Fix komedian negara virtual kita nih",
        author: "Lulu",
        liked: true,
        likeCount: 1,
      },
    ],
  },
  {
    id: "1029182912891",
    text: "Ada yang tahu ini kejadian di mana?",
    author: "Nina",
    liked: false,
    likeCount: 0,
    replyCount: 0,
    replies: [],
  },
  {
    id: "1912918291289",
    text: "Komen dulu biar bisa liat update-nya 😅",
    author: "Raka",
    liked: false,
    likeCount: 0,
    replyCount: 0,
    replies: [],
  },
];
