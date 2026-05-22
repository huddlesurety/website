import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Navigation />
      <main className="container-x border-x">
        <Hero />
        <Introduction />
        <Features />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
