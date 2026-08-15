import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
