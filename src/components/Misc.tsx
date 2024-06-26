const Misc = () => {
  const dataMisc = [
    {
      title: "Mentor at ADPList",
      date: "2022",
    },
    {
      title: "Writer for the UX Collective",
      date: "2020",
    },
  ];
  return (
    <main className="mt-12">
      <h1 className="font-mono text-xs text-greyText">Misc.</h1>
      <ul className="mt-4 font-medium">
        {dataMisc.map((item, index) => (
          <li
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

export default Misc;
