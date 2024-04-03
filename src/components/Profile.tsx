import Image from "next/image";
import profile from "../../public/img/profile.jpg";

const Profile = () => {
  return (
    <main className="mt-10">
      <h1 className="font-mono text-xs text-greyText">Profile</h1>
      <p className="mt-3 font-medium">
        A full stack designer based in Glasgow but working remotely. A knowledge
        sponge, Notion wiz and master of auto layout. I craft sleek 0 to 1
        experiences that deliver maximum impact with bare essentials.
      </p>
      <p className="mt-2 font-medium">
        When I'm not staring at screens, I'm usually busy with Ashtanga yoga, my
        Frenchie and collecting notes.
      </p>
      <p className="mt-2 mb-10 font-medium">
        Latest portfolio of work available upon request.
      </p>
      <Card
        image={profile}
        title="Client Page 2.0"
        description="Empowering accounting partners to better manage their own clients and workflows"
      />
      <br />
      <Card
        image={profile}
        title="Partner Product Led Growth"
        description="Optimising costs from the partner funnel with productised flows. Request access"
      />
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
