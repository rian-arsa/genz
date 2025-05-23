import React from "react";

type PostHeaderProps = {
  post: {
    author: {
      name: string;
    };
    audience: string;
    date: string;
  };
  audienceIcons: { [key: string]: React.ReactNode };
};

const PostHeader: React.FC<PostHeaderProps> = ({ post, audienceIcons }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1 font-bold">
          {post.author.name}
          {true && (
            <span className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4">
                <path d="M22 12l-2.3-2 1-3-3-1-1-3-3 1-2-2-2 2-3-1-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3 3-1 2 2 2-2 3 1 1-3 3-1-1-3zM10 16l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 9l-7 7z" />
              </svg>
            </span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Warga Jakarta
          </span>
        </div>
      </div>

      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
        {audienceIcons[post.audience]}
        {post.date}
      </span>
    </div>
  );
};

export default PostHeader;
