import PostDetailClient from "@/containers/post/PostContainer";

interface PostDetailPageProps {
  params: { id: string };
}

export const metadata = {
  title: "Post Detail | Negara Gen Z",
  description: "View and interact with individual posts on Negara Gen Z",
  openGraph: {
    title: "Post Detail | Negara Gen Z",
    description: "View and interact with individual posts on Negara Gen Z",
    type: "article",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Negara Gen Z Post Detail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Detail | Negara Gen Z",
    description: "View and interact with individual posts on Negara Gen Z",
    images: ["/og-image.jpg"],
  },
};

export default async function Page({ params }: PostDetailPageProps) {
  const { id } = await params;
  return <PostDetailClient id={parseInt(id)} />;
}
