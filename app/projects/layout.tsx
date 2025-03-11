// app/projects/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Larrimore | Projects",
  description: "Explore David Larrimore's technical projects and professional work",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}