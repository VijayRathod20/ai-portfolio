import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { ChatWidget } from "@/components/chat/chat-widget";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { PageLoader } from "@/components/ui/page-loader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <ScrollToTop />
    </>
  );
}
