import Image from "next/image";
import profile from "../../public/img/profile.jpg";

const Header = () => {
  return (
    <header>
      <section className="flex gap-5 items-center">
        <Image
          src={profile}
          alt="profile"
          width={60}
          height={60}
          className="rounded-full"
        />
        <aside className="font-medium">
          <h1>Ikhwanul Husna</h1>
          <p>
            Fullstack Developer @{" "}
            <a
              href="http://smartweb3.my.id"
              target="_blank"
              className="hover:border-b hover:text-greyText hover:border-greyText"
            >
              SmartWeb3
            </a>
          </p>
        </aside>
      </section>
      <section className="mt-12 font-mono text-greyText px-4 py-2 bg-backgroundCard text-xs rounded-lg w-fit transition-opacity ease-in duration-500">
        <p>
          2 weeks ago ⎯{" "}
          <a href="" className="hover:border-b border-greyText">
            On day 15 of 100 days of headstands →
          </a>
        </p>
      </section>
    </header>
  );
};

export default Header;
