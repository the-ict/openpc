import { jaro } from "@/src/shared/fonts/fonts";
import Navbar from "@/src/widgets/navbar/ui";
import Footer from "@/src/widgets/footer/ui";
import type { Metadata } from "next";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenPC - Kompyuter yig'ish platformasi",
  description: "O'z orzungizdagi kompyuterni 3D rejimda yig'ing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={cn("h-full", "antialiased", jaro.className, jaro.style, jaro.variable)}
    >
      <body className={`min-h-full flex flex-col`}>
        <Providers>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};