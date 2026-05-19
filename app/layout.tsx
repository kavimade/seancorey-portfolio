import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Preloader } from "@/components/ui/preloader";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sean Corey — Web Designer for Brands Making a Difference",
  description:
    "Senior web designer with 20 years of experience — specializing in wellness brands, yoga studios, coaches, and mission-driven founders worldwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sean Corey — Web Designer for Brands Making a Difference",
    description:
      "Senior web designer with 20 years of experience — specializing in wellness brands, yoga studios, coaches, and mission-driven founders worldwide.",
    type: "website",
    url: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp", sizes: "512x512" },
      { url: "/favicon.png",  type: "image/png",  sizes: "512x512" },
      { url: "/favicon.ico",  sizes: "any" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sean Corey",
      jobTitle: "Web Designer",
      description: "Senior web designer with 20 years of experience — specializing in wellness brands, yoga studios, coaches, and mission-driven founders worldwide.",
      url: SITE_URL,
      email: "mailto:sean@seancorey.net",
      image: `${SITE_URL}/headshot.webp`,
      knowsAbout: [
        "Web Design", "Brand Identity", "WordPress Development",
        "Squarespace", "E-commerce", "UI Design", "AI-assisted design workflow"
      ],
      sameAs: [
        "https://seancoreyoga.com",
        "https://insighttimer.com/seancorey",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sean Corey — Web Designer for Brands Making a Difference",
      description: "Senior web designer with 20 years of experience — specializing in wellness brands, yoga studios, coaches, and mission-driven founders worldwide.",
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Preloader />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
