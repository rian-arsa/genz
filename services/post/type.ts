export type LikeByPost = {
  isLiked: boolean
}

export type CommentPost = {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  userId: string
  postId: string
  isAnonymous: boolean
  user?: {
    id: string
    name: string
    profilePicture?: string | null
  }
}

export type CommentPostResponse = {
  comments: CommentPost[]
  hasMore: boolean
  nextCursor?: string | null
}

