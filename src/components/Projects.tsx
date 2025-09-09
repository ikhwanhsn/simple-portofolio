const Projects = () => {
  const dataProjects = [
    {
      title: "Crowdfunding dApps",
      date: "2025",
      link: "http://tabriiz.com/",
    },
    {
      title: "Nation Trading dApps",
      date: "2025",
      link: "https://bethenations.vercel.app/",
    },
    {
      title: "GoUMKM",
      date: "2024",
      link: "https://www.goumkm.store/",
    },
  ];
  return (
    <main className="mt-14">
      <h1 className="font-mono text-xs text-greyText">Projects</h1>
      <ul className="mt-4 font-medium">
        {dataProjects.map((item, index) => (
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

export default Projects;
