"use client";

import { Paperclip, Send, Smile } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

const ChatInput = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    console.log("Kirim:", trimmed); // ⬅️ Kirim ke sistem chat lo nanti
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText) {
      setText((prev) => prev + pastedText);
    }
  };

  return (
    <div className="flex gap-3 px-4 py-3 bg-[#f0f2f5] items-center">
      <TextareaAutosize
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxRows={5}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoFocus
        spellCheck={false}
        placeholder="Type a message"
        className="flex-1 resize-none p-3 rounded-md bg-white text-sm outline-none text-[#111b21] leading-snug"
      />

      <Send
        className="text-[#54656f] w-6 h-6 cursor-pointer"
        onClick={handleSend}
      />
    </div>
  );
};

export default ChatInput;
