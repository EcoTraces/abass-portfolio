"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";

export default function StudioPage() {
  const [config, setConfig] = useState<unknown>(null);

  useEffect(() => {
    let active = true;

    import("../../../../sanity.config")
      .then((module) => {
        if (active) {
          setConfig(module.default);
        }
      })
      .catch(() => {
        if (active) {
          setConfig(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!config) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">Loading Studio…</div>;
  }

  return <NextStudio config={config as any} />;
}
