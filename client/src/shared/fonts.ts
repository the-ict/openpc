import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const Orbitron = localFont({
  src: [
    {
      path: "../../public/fonts/orbitron/Orbitron-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/orbitron/Orbitron-Black.ttf",
      weight: "900",
      style: "normal",
    }
  ],
  variable: "--font-orbitron",
});
