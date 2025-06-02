import { TPost } from "@/types/post";

export const DUMMY_POSTS: TPost[] = [
  {
    id: "19271297912912",
    author: {
      name: "Budi LinkedIn",
      avatar: "/images/avatar1.jpg",
      status: "Warga Jakarta",
      isFollowing: true,
      badge: "basic",
      username: "budi_linekd",
    },
    html: "<p>This is my first post using <strong>Tiptap</strong> editor! 🎉</p>",
    images: ["/images/sample3.jpg", "/images/sample2.jpg", "/images/sample3.jpg", "/images/sample2.jpg", "/images/sample3.jpg"],
    audience: "public",
    date: new Date(Date.now() - 1 * 60 * 1000).toISOString(), // 1 menit lalu
    isLiked: false,
    likeCount: 3,
    commentCount: 5,
    shareCount: 2,
    isSaved: false,
  },
  {
    id: "19271297912913",
    author: {
      name: "AnonUser",
      avatar: "/images/avatar2.jpg",
      status: "Warga Balikpapan",
      isFollowing: false,
      badge: "",
      username: "anonuser"
    },
    html: "<p>Posting anonymously to share something deep... 🫣</p>",
    images: [],
    video: "/videos/video-example.mp4",
    audience: "private",
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isLiked: true,
    likeCount: 1,
    commentCount: 1,
    shareCount: 0,
    isSaved: false,
  },
  {
    id: "19271297912914",
    author: {
      name: "Charlie",
      avatar: "/images/avatar2.jpg",
      status: "Warga Surabaya",
      isFollowing: true,
      badge: "admin",
      username: "charilie"
    },
    html: "",
    images: [],
    pdf: ["/images/sample3.jpg", "/images/sample2.jpg", "/images/sample3.jpg", "/images/sample2.jpg", "/images/sample3.jpg"],
    audience: "public",
    date: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isLiked: false,
    likeCount: 120,
    commentCount: 0,
    shareCount: 0,
    isSaved: false,
  },
  {
    id: "19271297912915",
    author: {
      name: "Dina Techie",
      avatar: "/images/avatar2.jpg",
      status: "Warga Bandung",
      isFollowing: false,
      badge: "premium",
      username: "dina_techie"
    },
    html: "<p>Lagi eksperimen pakai Docker dan Tiptap, seru banget! 🔧</p>",
    images: ["/images/sample1.jpg"],
    audience: "connections",
    date: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    isLiked: false,
    likeCount: 2,
    commentCount: 50,
    shareCount: 0,
    isSaved: true,
  }, {
    id: "19271297912916",
    author: {
      name: "Eko Programmer",
      avatar: "/images/avatar2.jpg",
      status: "Warga Jogja",
      isFollowing: true,
      badge: "presiden",
      username: "eko_programmer"
    },
    html: `
    <p>Ngoding sambil ngopi ☕ productive vibes!</p>
    <p>Hari ini gua lagi ngulik Next.js + Prisma buat backend dan ternyata seru juga! Kadang emang ngoding tuh perlu suasana yang mendukung, dan kopi itu semacam cheatcode buat produktivitas. 🚀</p>
    <p>Tapi jangan lupa, istirahat juga penting. Karena burnout itu nyata. Jadi, sempatin stretching, jalan-jalan sebentar, atau ngobrol sama warga sekitar. BTW, ada yang punya playlist favorit buat ngoding? 🎧</p>
    <p><strong>#DevLife #NgopiDulu #NgodingSantai</strong></p>
  `,
    images: [],
    audience: "public",
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isLiked: true,
    likeCount: 7,
    commentCount: 2,
    shareCount: 90,
    isSaved: true,
  },
  {
    id: "19271297912917",
    author: {
      name: "Salsa DevQueen",
      avatar: "/images/avatar2.jpg",
      status: "Warga Semarang",
      isFollowing: false,
      badge: "basic",
      username: "salsa_devqueen"
    },
    html: `
    <p><strong>Hari ini gua belajar banyak banget hal soal performance web, dan honestly... blown away! 💥</strong></p>
    <p>Salah satu hal paling penting yang sering diabaikan itu <em>lazy loading</em> dan <em>image optimization</em>. Banyak banget website yang lambat bukan karena backend-nya, tapi karena gambar HD 4K yang di-load langsung semua 🤯</p>
    <ul>
      <li>✅ Gunakan <code>loading="lazy"</code> untuk gambar</li>
      <li>✅ Pastikan ukuran gambar sesuai dengan container</li>
      <li>✅ Format gambar modern: <code>.webp</code></li>
    </ul>
    <p>Selain itu, gua juga explore tentang bagaimana cara membuat halaman tetap interaktif meskipun pakai server-side rendering. Salah satu pattern favorit gua: <a href="https://react.dev/learn/code-splitting" target="_blank">Code Splitting</a> + Dynamic Import! 💡</p>
    <p>Tapi yang paling gua suka hari ini adalah <strong>diskusi bareng warga dev lainnya di komentar 👇</strong> Banyak banget insight & pengalaman dari developer beda level — dari yang baru mulai sampai yang udah expert. Ini yang bikin komunitas digital kita jadi hidup dan sehat 🎯</p>
    <p>#WebDev #PerformanceMatters #NgodingBareng #WargaNegaraVirtual</p>
  `,
    images: ["/images/sample3.jpg", "/images/sample2.jpg"],
    audience: "public",
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isLiked: false,
    likeCount: 13,
    commentCount: 9,
    shareCount: 4,
    isSaved: false,
  }


  // Tambahan lainnya bisa kamu lanjutkan pakai pola yang sama:
  // new Date(Date.now() - X).toISOString()
];
