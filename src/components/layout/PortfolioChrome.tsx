"use client";

import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

function isStudioPath(pathname: string | null) {
  return pathname === "/studio" || Boolean(pathname?.startsWith("/studio/"));
}

export function PortfolioHeader() {
  const pathname = usePathname();

  if (isStudioPath(pathname)) {
    return null;
  }

  return <Navbar />;
}

export function PortfolioFooter() {
  const pathname = usePathname();

  if (isStudioPath(pathname)) {
    return null;
  }

  return (
    <>
      <Footer />
      <BackToTop />
    </>
  );
}
