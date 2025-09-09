"use client";

const Skills = () => {
  const dataSkills = [
    {
      title: "Next.js, Typescript",
      date: "Frontend",
      url: ["https://nextjs.org/", "https://www.typescriptlang.org/"],
    },
    {
      title: "Redux, Zustand, Wagmi, Rainbowkit, Ethers",
      date: "Others",
      url: [
        "https://redux.js.org/",
        "https://zustand-demo.pmnd.rs/",
        "https://wagmi.sh/",
        "https://www.rainbowkit.com/",
        "https://docs.ethers.org/",
      ],
    },
  ];

  function openLinks(urls: any) {
    urls.forEach((url: any) => {
      window.open(url, "_blank");
    });
  }

  return (
    <main className="mt-14">
      <h1 className="font-mono text-xs text-greyText">Tech Stack</h1>
      <ul className="mt-4 font-medium">
        {dataSkills.map((item, index) => (
          <li
            onClick={() => openLinks(item.url)}
            className="flex justify-between items-center font-sans mb-5 ml-1"
            key={index}
          >
            <section className="group">
              <span className="cursor-pointer hover:text-greyText hover:border-b hover:border-greyText">
                {item.title}
              </span>
              <span className="ml-1 opacity-0 group-hover:opacity-100 text-greyText">
                ↗
              </span>
            </section>
            <p>{item.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Skills;
