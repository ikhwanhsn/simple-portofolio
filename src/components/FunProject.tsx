const FunProject = () => {
  const funProjectList = [
    {
      title: "BPM University",
      url: "https://bpm-usm.vercel.app/",
    },
    {
      title: "Vocab Verse",
      url: "https://vocab-verse.vercel.app/",
    },
    {
      title: "Real Estate",
      url: "https://real-estate-id.netlify.app/",
    },
    {
      title: "CryptoGuard",
      url: "https://cryptoguard-ai.vercel.app/",
    },
    {
      title: "NFT Marketplace",
      url: "https://nft-sites.netlify.app/",
    },
    {
      title: "Digital Calculator",
      url: "https://digitalcalc.netlify.app/",
    },
    {
      title: "Cake Store",
      url: "https://aivora-sample-cake.vercel.app/",
    },
    {
      title: "SaaS",
      url: "https://aivora-sample-digital.vercel.app/",
    },
    {
      title: "Hotel Booking",
      url: "https://aivora-sample-hotel.vercel.app/",
    },
    {
      title: "Laundry App",
      url: "https://aivora-sample-laundry.vercel.app/",
    },
    {
      title: "Showroom",
      url: "https://aivora-sample-car.vercel.app/",
    },
    {
      title: "Clinic",
      url: "https://aivora-sample-clinic.vercel.app/",
    },
  ];
  return (
    <main className="py-5 px-6 bg-backgroundCard rounded-2xl mt-12">
      <h1 className="font-mono text-xs mb-3 text-greyText">
        Fun Projects ({funProjectList.length})
      </h1>
      {funProjectList.map((item, index) => (
        <span key={index}>
          <a
            href={item.url}
            target="_blank"
            className="hover:text-greyText hover:border-b hover:border-greyText text-text font-medium"
          >
            {item.title}
          </a>
          {index < funProjectList.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </main>
  );
};

export default FunProject;
