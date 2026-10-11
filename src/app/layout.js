import { Manrope } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "SMA Negeri 9 Semarang",
  description:
    "Website profil resmi SMA Negeri 9 Semarang untuk informasi sekolah, visi-misi, berita, dan kegiatan akademik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <div className="min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
