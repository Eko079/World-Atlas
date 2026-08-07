import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/navigation/SiteHeader";
import Footer from "@/components/navigation/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "World Atlas — Explore Nations",
    template: "%s — World Atlas"
  },
  description:
    "A cinematic interactive atlas. Explore countries through geography, culture, leadership, landmarks, cuisine and more.",
  keywords: ["world atlas", "indonesia", "nations", "geography", "culture"],
  openGraph: {
    title: "World Atlas",
    description:
      "A cinematic interactive atlas of the world's nations.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-ink text-paper antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("has-js")`
          }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.25em]"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
