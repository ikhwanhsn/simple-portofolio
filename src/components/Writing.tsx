const Writing = () => {
  const dataSites = [
    {
      title: "Shipping 'fast'",
      date: "17.02.2024",
    },
    {
      title: "The Flâneur approach to design",
      date: "22.03.2020",
    },
  ];
  return (
    <main className="mt-14">
      <h1 className="font-mono text-xs">Writing</h1>
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

export default Writing;
