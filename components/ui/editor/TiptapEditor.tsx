"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content,
    autofocus: false,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm max-w-none min-h-[160px] p-4 outline-none text-gray-800 dark:text-white",
      },
    },
  });

  useEffect(() => {
    if (editor) editor.commands.setContent(content || "");
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="relative border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden bg-white dark:bg-[#1f1f1f]">
      {/* Toolbar */}
      <div className="flex gap-1 items-center p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2a2a2a]">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={<Bold size={16} />}
          label="Bold"
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<Italic size={16} />}
          label="Italic"
        />
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={<UnderlineIcon size={16} />}
          label="Underline"
        />
        <ToolbarButton
          active={editor.isActive("link")}
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          icon={<LinkIcon size={16} />}
          label="Link"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="bg-white dark:bg-[#1f1f1f]" />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  icon,
  label,
}: {
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition ${
        active
          ? "bg-gray-300 dark:bg-[#444] text-blue-600"
          : "text-gray-600 dark:text-gray-300"
      }`}>
      {icon}
    </button>
  );
}
