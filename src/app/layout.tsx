import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile, socialLinks } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.headline,
      description: profile.positioning,
      sameAs: socialLinks
        .filter((link) => link.icon !== "mail" && !isPlaceholder(link.href))
        .map((link) => link.href),
      ...(profile.profileImage && !isPlaceholder(profile.profileImage)
        ? { image: new URL(profile.profileImage, siteUrl).toString() }
        : {}),
    },
    {
      "@type": "CreativeWork",
      name: `${profile.name} Portfolio`,
      description: profile.positioning,
      url: siteUrl,
      author: {
        "@type": "Person",
        name: profile.name,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.positioning,
  alternates: { canonical: siteUrl },
  keywords: [
    "Software Engineer",
    "Computer Science",
    "Artificial Intelligence",
    "Full-Stack Development",
    "Mobile Development",
    "Sierra Leone",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.positioning,
    url: siteUrl,
    siteName: profile.name,
    images: ["/images/social-preview.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.positioning,
    images: ["/images/social-preview.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-[#14171c]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
