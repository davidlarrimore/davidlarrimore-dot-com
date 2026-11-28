"use client";

import Link from "next/link";
import { ComponentProps } from "react";
import { event } from "@/lib/gtag";

type TrackedLinkProps = ComponentProps<typeof Link> & { trackLabel: string };

/** A Next.js link that reports a GA click event. Keeps analytics out of server components. */
export default function TrackedLink({ trackLabel, onClick, ...rest }: TrackedLinkProps) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        event({ action: "click", category: "engagement", label: trackLabel });
        onClick?.(e);
      }}
    />
  );
}
