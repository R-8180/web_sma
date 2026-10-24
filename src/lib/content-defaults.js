import { missionItems, newsItems, schoolDetails } from "../data";

export const defaultSiteContent = {
  brand: {
    name: "SMA Negeri 9 Semarang",
    shortName: "SMA NEGERI 9",
    locationLabel: "SEMARANG",
    logo: "/SMAN_9_Semarang_logo.jpg",
  },
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Profil", href: "/about" },
    { label: "Berita", href: "/berita" },
    { label: "Kontak", href: "#kontak" },
  ],
  home: {
    heroImage: "/sma9.jpg",
    heroImageAlt: "Gedung SMA Negeri 9 Semarang di Banyumanik",
    heroEyebrow: "Sekolah negeri di Banyumanik",
    heroTitle: "SMA Negeri 9 Semarang",
    heroDescription: "Tempat belajar, bertumbuh, dan merawat lingkungan bersama.",
    welcomeImage: "/kepala_sekolah.jpeg",
    welcomeImageAlt: "Kepala SMA Negeri 9 Semarang",
    welcomeLabel: "Sambutan Kepala Sekolah",
    welcomeTitle: "Assalamualaikum warahmatullahi wabarakatuh,",
    welcomeParagraphs: [
      "Puji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat dan karunia-Nya sehingga website SMA Negeri 9 Semarang ini dapat hadir sebagai sarana informasi dan komunikasi bagi seluruh warga sekolah dan masyarakat.",
      "Website ini kami hadirkan sebagai bentuk komitmen dalam memanfaatkan perkembangan teknologi informasi untuk mendukung kemajuan pendidikan. Melalui platform ini, kami berupaya menyediakan informasi yang dibutuhkan siswa, guru, orang tua, dan masyarakat luas.",
      "Kami menyadari bahwa dalam era digital, keterbukaan informasi dan kemudahan akses menjadi kebutuhan penting. Oleh karena itu, website ini diharapkan menjadi media yang efektif, informatif, dan inspiratif bagi semua pihak.",
      "Besar harapan kami, website ini dapat menjadi jembatan komunikasi yang baik antara sekolah dengan keluarga besar SMA Negeri 9 Semarang.",
    ],
    welcomeClosing: "Wassalamualaikum warahmatullahi wabarakatuh,",
    welcomeSignoff: "Hormat kami,",
    principalTitle: "Kepala SMA Negeri 9 Semarang",
    principalName: "Rr. Tri Widiyastuti, S.Pd.",
    principalNip: "NIP. 19701231 199702 2 003",
    profileEyebrow: "Profil sekolah",
    profileTitle: "SMA Negeri 9 Semarang",
    profileDescription:
      "Sekolah menengah atas negeri yang menumbuhkan semangat belajar, membangun akhlak mulia, serta menanamkan kepedulian terhadap lingkungan dan sesama.",
    profileLinkLabel: "Profil sekolah",
    newsLinkLabel: "Berita sekolah",
    visionLabel: "Visi",
    vision:
      "Terwujudnya SMA Negeri 9 Semarang yang aman dan nyaman bagi seluruh komponen sekolah untuk meningkatkan ketaqwaan, hubungan sosial, pengetahuan, keterampilan, kepedulian berbudaya, pencegahan terhadap pencemaran dan kerusakan, serta pelestarian lingkungan.",
    newsEyebrow: "Dari sekolah",
    newsTitle: "Kabar dan kegiatan",
    allNewsLabel: "Semua berita",
  },
  about: {
    image: "/sma9.jpg",
    imageAlt: "Gedung SMA Negeri 9 Semarang di Banyumanik",
    imageCaption: "Gedung SMA Negeri 9 Semarang.",
    title: "Mengenal SMA Negeri 9 Semarang",
    introduction:
      "SMA Negeri 9 Semarang adalah sekolah menengah negeri di Kelurahan Padangsari, Kecamatan Banyumanik, Kota Semarang.",
    historyTitle: "Sejarah singkat",
    historyParagraphs: [
      "SMA Negeri 9 Semarang didirikan pada tahun pelajaran 1981/1982 berdasarkan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 0219/O/1981 tanggal 14 Juli 1981 tentang pembukaan sekolah baru.",
      "Pada awal berdirinya, sekolah diampu oleh 15 orang guru dengan R. Soemarman sebagai kepala sekolah pertama. Selanjutnya, setelah pembangunan enam ruang kelas baru di Jl. Cemara Raya selesai pada 1 Februari 1982, kegiatan belajar mengajar dipindahkan ke gedung sekolah yang baru.",
    ],
    identityTitle: "Identitas sekolah",
    identityLabels: {
      name: "Nama sekolah",
      npsn: "NPSN",
      address: "Alamat",
      phone: "Telepon",
      email: "Email",
    },
    schoolDetails,
    visionTitle: "Visi dan misi",
    vision:
      "Terwujudnya SMA Negeri 9 Semarang yang aman dan nyaman bagi seluruh komponen sekolah untuk meningkatkan ketaqwaan, hubungan sosial, pengetahuan, keterampilan, kepedulian berbudaya, pencegahan terhadap pencemaran dan kerusakan, serta pelestarian lingkungan.",
    missionItems,
  },
  news: {
    title: "Berita sekolah",
    description: "Informasi kegiatan, pembelajaran, dan kehidupan sekolah.",
    backLabel: "Kembali ke berita",
    imageCaption: "Foto ilustrasi.",
  },
  footer: {
    npsn: schoolDetails.npsn,
    description:
      "Sekolah menengah negeri di Kelurahan Padangsari, Kecamatan Banyumanik, Kota Semarang.",
    contactTitle: "Kontak",
    locationTitle: "Lokasi",
    socialTitle: "Sosial media",
    address: "Jl. Cemara Raya, Banyumanik, Semarang",
    phone: "(024) 7472812",
    email: "sman09semarang@gmail.com",
    mapEmbedUrl:
      "https://www.google.com/maps?ll=-7.071196,110.423282&z=13&t=m&hl=id&gl=ID&mapclient=embed&cid=7301604671334218619&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps?ll=-7.071196,110.423282&z=13&t=m&hl=id&gl=ID&mapclient=embed&cid=7301604671334218619",
    mapButtonLabel: "Buka di Maps",
    socialLinks: [
      { label: "YouTube", href: "https://www.youtube.com/channel/UCb9MVgaSq7JJ0binRRfXZ5A" },
      { label: "Instagram", href: "https://www.instagram.com/sman9semarang/" },
      { label: "Twitter", href: "https://twitter.com/sman9semarang" },
    ],
    copyright: "© 2026 SMA Negeri 9 Semarang. Semua hak dilindungi.",
  },
};

export const defaultNewsItems = newsItems;
