// app/projects/ScavengerHunt/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Larrimore | AI Scavenger Hunt",
  description: "A fun quiz game where you use generative AI to solve challenges and answer questions",
};

export default function ScavengerHuntLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}