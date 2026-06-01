import { Space_Grotesk } from "next/font/google";
import { Solitreo } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const solitreo = Solitreo({
  variable: "--font-solitreo",
  subsets: ["latin"],
  weight: "400",
});