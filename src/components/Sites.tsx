const Sites = () => {
  const dataSites = [
    {
      title: "What I Love Now",
      date: "2024",
    },
    {
      title: "Awesome Newsletters",
      date: "2023",
    },
    {
      title: "The Type Wunderkammer",
      date: "2022",
    },
  ];
  return (
    <main className="mt-14">
      <h1 className="font-mono text-xs">Sites</h1>
      <ul className="mt-4">
        {dataSites.map((item) => (
          <li className="flex justify-between items-center font-sans mb-5 ml-1">
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

export default Sites;
