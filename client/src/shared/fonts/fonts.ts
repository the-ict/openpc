import { Space_Grotesk } from "next/font/google";
import { Solitreo } from "next/font/google";
import { Inter } from "next/font/google";
import { Jaro } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const solitreo = Solitreo({
  variable: "--font-solitreo",
  subsets: ["latin"],
  weight: "400",
});

export const jaro = Jaro({
  variable: "--font-jaro",
  subsets: ['latin'],
  weight: "400",
});