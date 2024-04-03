import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import cv from "../../public/img/cv.png";
import Image from "next/image";

const Contact = () => {
  const contactList = ["email", "instagram", "github", "linkedin", "cv"];
  return (
    <main>
      <h1 className="font-mono text-xs text-greyText mt-12 mb-7">Contact</h1>
      <section className="flex gap-3">
        {contactList.map((item, index) => (
          <section key={index}>
            <a
              href={
                item === "email"
                  ? "mailto:ikhwanulhusna111@gmail.com"
                  : item === "instagram"
                  ? "https://www.instagram.com/ikhwanulhusna/"
                  : item === "github"
                  ? "https://github.com/ikhwanulhusna"
                  : item === "linkedin"
                  ? "https://www.linkedin.com/in/ikhwanulhusna/"
                  : item === "cv"
                  ? "https://drive.google.com/file/d/1kL5yQk0m7F6fFb4gkQlLb8p5JG8wQl4a/view?usp=sharing"
                  : ""
              }
              target="_blank"
              className="inline-block"
            >
              <aside className="p-3 text-slate-700 rounded-full bg-backgroundCard hover:text-text hover:bg-cardHover group">
                {item === "email" && <MdOutlineEmail size={18} />}
                {item === "instagram" && <FaInstagram size={18} />}
                {item === "github" && <FaGithub size={18} />}
                {item === "linkedin" && <FaLinkedinIn size={18} />}
                {item === "cv" && (
                  <Image
                    src={cv}
                    alt="cv"
                    width={18}
                    height={18}
                    className="opacity-80 group-hover:opacity-100"
                  />
                )}
              </aside>
            </a>
          </section>
        ))}
      </section>
    </main>
  );
};

export default Contact;
