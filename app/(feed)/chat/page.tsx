"use client";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  return (
    <div className="fixed top-20 left-4 flex h-[85vh] w-full max-w-[70vw] bg-zinc-100 dark:bg-zinc-900 overflow-scroll rounded-xl">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
