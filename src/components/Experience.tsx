const Experience = () => {
  const dataExperience = [
    {
      title: "Wecash",
      date: "2025",
      link: "https://wecash.ai/",
    },
    {
      title: "Tabriiz",
      date: "2025",
      link: "https://tabriiz.com/",
    },
    {
      title: "Nova Capital",
      date: "2024",
      link: "#",
    },
    {
      title: "Dry Code",
      date: "2023",
      link: "#",
    },
  ];
  return (
    <main className="mt-12">
      <h1 className="font-mono text-xs text-greyText">Experience</h1>
      <ul className="mt-4 font-medium">
        {dataExperience.map((item, index) => (
          <a
            href={item.link}
            target="_blank"
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
          </a>
        ))}
      </ul>
    </main>
  );
};

export default Experience;
