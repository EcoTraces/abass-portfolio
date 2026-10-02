"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import * as SiIcons from "react-icons/si";
import {
  BrainCircuit,
  Cloud,
  CloudFog,
  Code2,
  Database,
  Eye,
  ImageIcon,
  MapPinned,
  MessageSquareMore,
  MonitorSmartphone,
  Rocket,
  Route,
  ServerCog,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TableProperties,
  CodeXml,
  Waypoints,
} from "lucide-react";
import type { SkillItem } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  siPython: SiIcons.SiPython,
  siDart: SiIcons.SiDart,
  siJavascript: SiIcons.SiJavascript,
  siTypescript: SiIcons.SiTypescript,
  Database,
  siReact: SiIcons.SiReact,
  siNextdotjs: SiIcons.SiNextdotjs,
  siTailwindcss: SiIcons.SiTailwindcss,
  Code2,
  siFlutter: SiIcons.SiFlutter,
  siKotlin: SiIcons.SiKotlin,
  MonitorSmartphone,
  Smartphone,
  siNodedotjs: SiIcons.SiNodedotjs,
  ServerCog,
  Rocket,
  Route,
  Cloud,
  siSupabase: SiIcons.SiSupabase,
  TableProperties,
  siFirebase: SiIcons.SiFirebase,
  ShieldCheck,
  MessageSquareMore,
  CloudFog,
  MapPinned,
  ImageIcon,
  siVercel: SiIcons.SiVercel,
  siPytorch: SiIcons.SiPytorch,
  Eye,
  BrainCircuit,
  Sparkles,
  siGit: SiIcons.SiGit,
  siGithub: SiIcons.SiGithub,
  siPostman: SiIcons.SiPostman,
  Shield,
  CodeXml,
  Waypoints,
};

function getIconComponent(iconKey?: string) {
  return iconMap[iconKey || "Code2"] || Code2;
}

export function SkillBadge({ skill }: { skill: SkillItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  const icon = useMemo(() => {
    if (skill.iconSource === "upload" && skill.iconImage && !imageFailed) {
      return (
        <div aria-hidden="true" className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center overflow-hidden rounded-sm">
          <Image
            src={skill.iconImage}
            alt={skill.iconImageAlt || `${skill.name} icon`}
            width={16}
            height={16}
            className="h-3.5 w-3.5 object-contain"
            onError={() => setImageFailed(true)}
          />
        </div>
      );
    }

    const Icon = getIconComponent(skill.iconKey);
    return (
      <span aria-hidden="true" className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-current" />
      </span>
    );
  }, [imageFailed, skill]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-line-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted transition-colors duration-200 hover:border-accent hover:text-accent",
      )}
    >
      {icon}
      <span>{skill.name}</span>
    </span>
  );
}
