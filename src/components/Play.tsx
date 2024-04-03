import Image from "next/image";
import profile from "../../public/img/profile.jpg";

const Play = () => {
  return (
    <main className="mt-16">
      <h1 className="font-mono text-xs text-greyText">Last played</h1>
      <section className="flex gap-3 mt-5 items-center">
        <Image
          src={profile}
          alt="play"
          width={50}
          height={50}
          className="rounded-md"
        />
        <aside>
          <a
            href=""
            target="_blank"
            className="hover:border-b hover:text-greyText hover:border-greyText"
          >
            Nighthawk
          </a>
          <p className="text-greyText">Re : um</p>
        </aside>
      </section>
    </main>
  );
};

export default Play;
