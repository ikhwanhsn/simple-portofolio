const Misc = () => {
  const dataMisc = [
    {
      title: "Winner Espresso Hackathon",
      date: "2025",
      link: "https://dorahacks.io/hackathon/build-and-brew/winner",
    },
    {
      title: "Finalist Educhain Hackathon",
      date: "2025",
      link: "https://www.hackquest.io/hackathons/EDU-Chain-Semester-3",
    },
    {
      title: "Funded on PKM-PI Program",
      date: "2024",
      link: "https://wawasan.suaramerdeka.com/semarang/0813079170/perkenalkan-web-goumkm-buatan-usm-tim-pkm-usm-sosialisasi-ke-pelaku-umkm",
    },
  ];
  return (
    <main className="mt-12">
      <h1 className="font-mono text-xs text-greyText">Misc.</h1>
      <ul className="mt-4 font-medium">
        {dataMisc.map((item, index) => (
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

export default Misc;
