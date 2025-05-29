"use client";

import clsx from "clsx";

type Props = {
  sender: string; // "me" or username
  text: string;
  timestamp?: string;
};

const MessageBubble = ({ sender, text, timestamp = "10:12" }: Props) => {
  const isMe = sender === "me";

  return (
    <div
      className={clsx(
        "flex px-4 mb-1",
        isMe ? "justify-end" : "justify-start"
      )}>
      <div className="relative max-w-[80%] min-w-[50px] group">
        {/* Nama pengirim (kalau bukan kita) */}
        {!isMe && (
          <p className="text-xs text-pink-600 font-semibold mb-1 px-2 leading-none mt-2">
            {sender}
          </p>
        )}

        {/* Bubble */}
        <div
          className={clsx(
            "relative px-3 py-2 rounded-lg text-sm leading-relaxed break-words whitespace-pre-wrap",
            isMe
              ? "bg-pink-100 text-pink-900 rounded-br-none mt-2"
              : "bg-white text-[#111b21] rounded-bl-none"
          )}>
          <span className="block pr-10">{text}</span>

          {/* Timestamp */}
          <span className="absolute bottom-1 right-2 text-[11px] text-zinc-500 select-none">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
