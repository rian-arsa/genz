"use client";

interface SendPostButtonsProps {
  disabled?: boolean;
  loading?: boolean;
  onPost: () => void;
  onPostAnonymous: () => void;
}

export default function SendPostButtons({
  disabled = false,
  loading = false,
  onPost,
  onPostAnonymous,
}: SendPostButtonsProps) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      {/* Post as Anonymous */}
      <button
        type="button"
        onClick={onPostAnonymous}
        disabled={disabled || loading}
        className={`px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition ${
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        }`}>
        {loading ? "Posting..." : "Post Anonymously"}
      </button>

      {/* Post with Identity */}
      <button
        type="button"
        onClick={onPost}
        disabled={disabled || loading}
        className={`px-5 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition ${
          (disabled || loading) && "opacity-50 cursor-not-allowed"
        }`}>
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
