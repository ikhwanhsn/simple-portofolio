import Header from "@/components/Header";
import Misc from "@/components/Misc";
import Profile from "@/components/Profile";
import Sites from "@/components/Sites";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <main className="mt-12">
      <Header />
      <Profile />
      <Misc />
      <Sites />
      <Writing />
    </main>
  );
}
