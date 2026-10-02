import { profile, socialLinks } from "@/data/profile";
import { getSiteSettings } from "@/lib/content";
import { isPlaceholder } from "@/lib/utils";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioFooter, PortfolioHeader } from "@/components/layout/PortfolioChrome";
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

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const socialPreviewImage = siteSettings.socialPreviewImage || profile.socialPreviewImage || "/images/social-preview.jpg";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} | MSc-seeking Computer Science Graduate`,
      template: `%s | ${profile.name}`,
    },
    description:
      "MSc-seeking Computer Science graduate from Njala University in Sierra Leone, focused on AI/ML, computer vision, cybersecurity, and sustainability-driven software engineering.",
    alternates: { canonical: siteUrl },
    keywords: [
      "MSc-seeking Computer Science graduate",
      "Software Engineer",
      "Computer Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Cybersecurity",
      "Sustainability",
      "Full-Stack Development",
      "Mobile Development",
      "Sierra Leone",
      profile.name,
    ],
    authors: [{ name: profile.name }],
    openGraph: {
      type: "website",
      title: `${profile.name} | MSc-seeking Computer Science Graduate`,
      description:
        "MSc-seeking Computer Science graduate from Njala University in Sierra Leone, focused on AI/ML, computer vision, cybersecurity, and sustainability-driven software engineering.",
      url: siteUrl,
      siteName: profile.name,
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} | MSc-seeking Computer Science Graduate`,
      description:
        "MSc-seeking Computer Science graduate from Njala University in Sierra Leone, focused on AI/ML, computer vision, cybersecurity, and sustainability-driven software engineering.",
      images: [socialPreviewImage],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();
  const heroProfileImage = siteSettings.profileImage || profile.profileImage;

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
        ...(heroProfileImage && !isPlaceholder(heroProfileImage)
          ? { image: new URL(heroProfileImage, siteUrl).toString() }
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
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-[#14171c]"
          >
            Skip to content
          </a>
          <Suspense fallback={null}>
            <PortfolioHeader />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <Suspense fallback={null}>
            <PortfolioFooter />
          </Suspense>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
