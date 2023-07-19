import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import {SessionProvider} from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixel Art",
  description: "create pixel art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar/> */}
        {children}</body>
    </html>
  );
}
