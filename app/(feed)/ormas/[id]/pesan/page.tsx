"use client";

import Sidebar from "./component/Sidebar";
import ChatWindow from "./component/ChatWindow";
import { useState } from "react";

export default function ChatPage() {
  const [idChat, setIdChat] = useState<string>("");

  return (
    <div className="fixed top-20 left-0 md:left-72 xl:left-80 flex h-[85vh] w-[800px] bg-zinc-100 dark:bg-zinc-900 rounded-xl">
      <Sidebar setIdChat={setIdChat} />
      <ChatWindow idChat={idChat} />
    </div>
  );
}
