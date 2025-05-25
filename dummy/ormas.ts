export interface Organization {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  description: string;
  members: number;
  popular: boolean;
  verified: boolean; // Added verified property
}

export const DUMMY_ORMAS: Organization[] = [
  {
    id: "1",
    name: "Komunitas Peduli Sampah",
    category: "Lingkungan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mengajak masyarakat untuk aktif menjaga kebersihan lingkungan.",
    members: 1200,
    popular: true,
    verified: true // Example value
  },
  {
    id: "2",
    name: "Forum Literasi Indonesia",
    category: "Pendidikan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mendorong minat baca dan budaya literasi di seluruh nusantara.",
    members: 800,
    popular: false,
    verified: false // Example value
  },
  {
    id: "3",
    name: "Komunitas Teknologi Pemuda",
    category: "Teknologi",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Memberdayakan anak muda melalui inovasi dan pelatihan digital.",
    members: 1500,
    popular: true,
    verified: true // Example value
  },
  {
    id: "4",
    name: "Komunitas Seni Budaya",
    category: "Seni & Budaya",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Melestarikan seni tradisional dan budaya lokal melalui berbagai kegiatan.",
    members: 600,
    popular: false,
    verified: false // Example value
  },
  {
    id: "5",
    name: "Relawan Kemanusiaan",
    category: "Kemanusiaan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Berkontribusi dalam penanggulangan bencana dan bantuan kemanusiaan.",
    members: 2000,
    popular: true,
    verified: true // Example value
  },
  {
    id: "6",
    name: "Komunitas Olahraga Sehat",
    category: "Olahraga",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mendorong gaya hidup sehat melalui berbagai kegiatan olahraga.",
    members: 900,
    popular: false,
    verified: false // Example value
  },
  {
    id: "7",
    name: "Komunitas Pecinta Alam",
    category: "Lingkungan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mengajak masyarakat untuk mencintai dan menjaga kelestarian alam.",
    members: 500,
    popular: true,
    verified: true // Example value
  },
  {
    id: "8",
    name: "Forum Startup Indonesia",
    category: "Teknologi",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mendukung pertumbuhan startup melalui kolaborasi dan inovasi.",
    members: 700,
    popular: true,
    verified: true // Example value
  },
  {
    id: "9",
    name: "Komunitas Musik Nusantara",
    category: "Seni & Budaya",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Mengembangkan bakat musik lokal dan memperkenalkan musik tradisional.",
    members: 800,
    popular: false,
    verified: false // Example value
  },
  {
    id: "10",
    name: "Relawan Pendidikan Anak",
    category: "Pendidikan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Membantu anak-anak kurang mampu mendapatkan akses pendidikan yang layak.",
    members: 1000,
    popular: true,
    verified: true // Example value
  },
  {
    id: "11",
    name: "Komunitas Penggiat Kesehatan",
    category: "Kesehatan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Meningkatkan kesadaran masyarakat tentang pentingnya kesehatan.",
    members: 500,
    popular: false,
    verified: false // Example value
  },
  {
    id: "12",
    name: "Komunitas Pecinta Buku",
    category: "Pendidikan",
    logoUrl: "/images/organisasi.jpeg",
    description:
      "Membangun Organisasi pembaca untuk berbagi ilmu dan pengalaman.",
    members: 300,
    popular: true,
    verified: true // Example value
  }
];
