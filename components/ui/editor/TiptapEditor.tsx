"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Smile,
  Quote,
} from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import FloatingLinkInput from "./FloatingLinkInput";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const hasLoaded = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
      }),
      Underline,
      Blockquote,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder:
          "💬 Drama, gosip, atau kisah cinta segitiga? Kita dengerin kok... ATAU kalau mau cerita tapi gak mau diketahui siapa kamu, juga gapapa kok. Anonim aja 😎",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-zinc-400 before:pointer-events-none before:absolute before:top-4 before:left-4",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[200px] max-h-[300px] overflow-y-auto px-4 py-4 text-base font-normal bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none scroll-smooth prose dark:prose-invert prose-a:text-blue-600 prose-a:underline prose-p:mb-6",
        placeholder:
          "Tulis rahasia negara, drama kantor, atau gosip tetangga di sini... 😏🔥",
      },
      handleKeyDown(view, event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          const { state, dispatch } = view;
          const { $from } = state.selection;
          const parentText = $from.parent.textContent || "";
          const isEmpty = parentText.trim() === "";

          if (isEmpty) {
            // Double enter → split to new paragraph
            view.dispatch(state.tr.split($from.pos));
          } else {
            // Single enter → insert <br>
            const br = state.schema.nodes.hardBreak.create();
            dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
          }

          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && !hasLoaded.current) {
      editor.commands.setContent(content || "");
      hasLoaded.current = true;
    }
  }, [editor]);

  useEffect(() => {
    if (editor && editor.isEmpty) {
      editor.commands.setContent("<p></p>");
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md transition-all overflow-visible">
      <EditorContent editor={editor} className="rounded-t-xl" />

      <div className="sticky bottom-0 left-0 flex gap-2 rounded-b-xl bg-white/90 dark:bg-zinc-800/90 px-4 py-2 backdrop-blur-md shadow-inner border-t border-zinc-200 dark:border-zinc-700 z-10">
        <FloatingBtn
          icon={<Bold size={14} />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <FloatingBtn
          icon={<Italic size={14} />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <FloatingBtn
          icon={<UnderlineIcon size={14} />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <FloatingBtn
          icon={<LinkIcon size={14} />}
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href || "";
            setLinkUrl(previousUrl);
            setShowLinkInput(true);
          }}
          active={editor.isActive("link")}
        />
        <FloatingBtn
          icon={<Quote size={14} />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        />
        <FloatingBtn
          icon={<Smile size={14} />}
          onClick={() => setShowEmoji(!showEmoji)}
          active={showEmoji}
        />
      </div>

      {showLinkInput && (
        <FloatingLinkInput
          url={linkUrl}
          onChange={setLinkUrl}
          onCancel={() => {
            setShowLinkInput(false);
            setLinkUrl("");
          }}
          onSave={() => {
            const url = linkUrl.trim();

            if (url === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              if (editor.state.selection.empty) {
                editor
                  .chain()
                  .focus()
                  .insertContent(`<a href="${url}">${url}</a>`)
                  .run();
              } else {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }

            setShowLinkInput(false);
          }}
          className="bottom-16 left-3"
        />
      )}

      {showEmoji && (
        <div className="fixed bottom-24 left-6 z-[9999]">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              editor.chain().focus().insertContent(emoji.native).run();
              setShowEmoji(false);
            }}
            theme="auto"
          />
        </div>
      )}
    </div>
  );
}

function FloatingBtn({
  icon,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-full transition hover:bg-zinc-200 dark:hover:bg-zinc-700 ${
        active
          ? "bg-zinc-300 dark:bg-zinc-600 text-blue-600"
          : "text-zinc-600 dark:text-zinc-300"
      }`}>
      {icon}
    </button>
  );
}
