import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Misc from "@/components/Misc";
import Play from "@/components/Play";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import FunProject from "@/components/FunProject";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="mt-12">
      <Header />
      <Profile />
      <Experience />
      <Projects />
      <Misc />
      <Skills />
      <FunProject />
      <Contact />
      {/* <Play /> */}
      <Footer />
    </main>
  );
}
