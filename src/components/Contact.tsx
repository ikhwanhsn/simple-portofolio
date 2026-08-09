import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { profile } from "@/data/profile";

const Contact = () => {
  const socials = [
    {
      id: "email",
      href: `mailto:${profile.contact.email}`,
      icon: <MdOutlineEmail size={18} />,
      label: "Email",
    },
    {
      id: "telegram",
      href: profile.contact.telegram,
      icon: <FaTelegramPlane size={18} />,
      label: "Telegram",
    },
    {
      id: "x",
      href: profile.contact.x,
      icon: <FaXTwitter size={16} />,
      label: "X",
    },
    {
      id: "instagram",
      href: profile.contact.instagram,
      icon: <FaInstagram size={18} />,
      label: "Instagram",
    },
    {
      id: "linkedin",
      href: profile.contact.linkedin,
      icon: <FaLinkedinIn size={18} />,
      label: "LinkedIn",
    },
  ];

  return (
    <section className="mt-6 flex gap-3 flex-wrap" aria-label="Contact">
      {socials.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.id === "email" ? undefined : "_blank"}
          rel={item.id === "email" ? undefined : "noopener noreferrer"}
          aria-label={item.label}
          className="inline-block"
        >
          <aside className="p-3 text-icon rounded-full bg-backgroundCard hover:text-text hover:bg-cardHover">
            {item.icon}
          </aside>
        </a>
      ))}
    </section>
  );
};

export default Contact;
