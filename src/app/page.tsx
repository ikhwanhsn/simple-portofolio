import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Misc from "@/components/Misc";
import Play from "@/components/Play";
import Profile from "@/components/Profile";
import Sites from "@/components/Sites";
import Work from "@/components/Work";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <main className="mt-12">
      <Header />
      <Profile />
      <Misc />
      <Sites />
      <Writing />
      <Work />
      <Contact />
      <Play />
      <Footer />
    </main>
  );
}
