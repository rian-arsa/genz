import { TComment } from "@/containers/home/section/PostComment";

export const DUMMY_COMMENTS: TComment[] = [
  {
    id: 1,
    text: "Wah, ini postingannya bener-bener relate banget 😭",
    author: "Ayu",
    replies: [
      {
        id: 101,
        text: "Iya banget, gue juga ngalamin hal yang sama!",
        author: "Rian",
        liked: true,
      },
      {
        id: 102,
        text: "Cerita kamu bikin aku terharu. Stay strong ya!",
        author: "Citra",
        liked: false,
      },
    ],
  },
  {
    id: 2,
    text: "Lucu banget sih ini 😆🤣",
    author: "Dimas",
    replies: [
      {
        id: 103,
        text: "Fix komedian negara virtual kita nih",
        author: "Lulu",
        liked: true,
      },
    ],
  },
  {
    id: 3,
    text: "Ada yang tahu ini kejadian di mana?",
    author: "Nina",
    replies: [],
  },
  {
    id: 4,
    text: "Komen dulu biar bisa liat update-nya 😅",
    author: "Raka",
  },
];
