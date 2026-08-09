import { profile } from "@/data/profile";

const collabMailto = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
  "Let's build together",
)}&body=${encodeURIComponent(
  "Hi Ikhwan,\n\nI'd like to collaborate on...",
)}`;

const Profile = () => {
  const [syra, s3labs] = profile.roles;

  return (
    <section className="mt-10">
      <h2 className="font-mono text-xs text-greyText">Profile</h2>
      <p className="mt-3 font-medium text-justify">{profile.summary[0]}</p>
      <p className="mt-2 font-medium text-justify">
        <a
          href={syra.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-b hover:text-greyText hover:border-greyText"
        >
          {syra.org}
        </a>{" "}
        {syra.description}
      </p>
      <p className="mt-2 font-medium text-justify">
        <a
          href={s3labs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-b hover:text-greyText hover:border-greyText"
        >
          {s3labs.org}
        </a>{" "}
        {s3labs.description}
      </p>
      <p className="mt-2 font-medium">{profile.summary[1]}</p>

      <a
        href={collabMailto}
        className="mt-6 mb-10 flex items-start gap-3 w-full font-mono text-greyText px-4 py-3 bg-backgroundCard text-xs rounded-lg transition-colors duration-200 hover:bg-cardHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
      >
        <span
          className="mt-0.5 relative inline-flex size-1.5 shrink-0 rounded-full bg-highlight"
          aria-hidden
        >
          <span className="absolute inset-0 rounded-full bg-highlight animate-status-pulse" />
        </span>
        <span className="leading-relaxed">
          Open to contribute and build together. I can help with agents →
        </span>
      </a>
    </section>
  );
};

export default Profile;
