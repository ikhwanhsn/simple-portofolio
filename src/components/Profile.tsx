import Image from "next/image";
import profile from "../../public/img/profile.jpg";

const Profile = () => {
  return (
    <main className="mt-10">
      <h1 className="font-mono text-xs text-greyText">Profile</h1>
      <p className="mt-3 font-medium text-justify">
        22-year-old Frontend Developer from Indonesia, working remotely. I
        thrive on learning fast, building smart, and turning ideas into sleek
        0-to-1 products that deliver impact with minimal overhead. A Notion
        tinkerer, auto-layout enthusiast, and endless learner at heart.
      </p>
      <p className="mt-2 font-medium text-justify">
        When I’m not coding, I’m usually busy managing my own business and
        exploring ways to build systems that scale.
      </p>
      <p className="mt-2 mb-10 font-medium">
        Latest portfolio of work available upon request.
      </p>
      {/* <Card
        image={profile}
        title="Client Page 2.0"
        description="Empowering accounting partners to better manage their own clients and workflows"
      />
      <br />
      <Card
        image={profile}
        title="Partner Product Led Growth"
        description="Optimising costs from the partner funnel with productised flows. Request access"
      /> */}
    </main>
  );
};

export default Profile;

type CardProps = {
  image: any;
  title: string;
  description: string;
};

const Card = ({ image, title, description }: CardProps) => {
  return (
    <section className="flex gap-5 p-5 bg-backgroundCard rounded-2xl">
      <Image
        src={image}
        alt={title}
        width={60}
        height={60}
        className="rounded-xl"
      />
      <aside>
        <h3 className="font-mono text-greyText text-xs">{title}</h3>
        <p className="font-medium">{description}</p>
      </aside>
    </section>
  );
};
