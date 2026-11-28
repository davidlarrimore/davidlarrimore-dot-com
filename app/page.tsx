import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeHero from "./components/home/HomeHero";
import { BuiltSection, CareerSection, ClosingSection, FocusSection, ProofBand } from "./components/home/HomeSections";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";
import "./home.css";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: SITE_DESCRIPTION,
  path: "/",
});

// Persuade surface, Z-pattern ending on a call to action (docs/DESIGN-CHARTER.md, Phase 2).
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="home">
        <HomeHero />
        <ProofBand />
        <BuiltSection />
        <FocusSection />
        <CareerSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
