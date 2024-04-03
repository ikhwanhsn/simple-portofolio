const Work = () => {
  const workList = [
    "Dead Simple Sites",
    "Pafolio",
    "Curated Design",
    "Read.cv",
    "Land-book",
    "Godly",
    "The Gallery",
    "Minimal Gallery",
    "Helvetica Poster",
    "Poster Jam",
    "Minimalny",
    "SuperHi Hall of Fame",
    "Fresh Fonts",
  ];
  return (
    <main className="py-5 px-6 bg-backgroundCard rounded-2xl mt-12">
      <h1 className="font-mono text-xs mb-3 text-greyText">
        Featured work (13)
      </h1>
      {workList.map((item, index) => (
        <span key={index}>
          <a
            href=""
            target="_blank"
            className="hover:text-greyText hover:border-b hover:border-greyText text-text font-medium"
          >
            {item}
          </a>
          {index < workList.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </main>
  );
};

export default Work;
