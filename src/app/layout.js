import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nitin Dua",
  description: "Business Growth Consultant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-blue-50 via-white to-blue-100`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(191, 219, 254, 0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(191, 219, 254, 0.2), transparent 40%)",
        }}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
