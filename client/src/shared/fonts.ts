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
    },
    {
      path: "../../public/fonts/orbitron/Orbitron-ExtraBold.ttf",
      style: "extrabold",
      weight: "1000"
    },
    {
      path: "../../public/fonts/orbitron/Orbitron-Medium.ttf",
      weight: "1100",
      style: "medium",
    },
    {
      path: "../../public/fonts/orbitron/Orbitron-Regular.ttf",
      weight: "1200",
      style: "regular"
    }
  ],
  variable: "--font-orbitron",
});