"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [localTime, setLocalTime] = useState("00:00am");
  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const options = { timeZone: "Asia/Jakarta" };
      const jakartaTime = new Date(
        currentTime.toLocaleString("en-US", options)
      );

      const hours = jakartaTime.getHours();
      const minutes = jakartaTime.getMinutes();
      const time = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? "0" + minutes : minutes
      }${hours >= 12 ? "pm" : "am"}`;

      setLocalTime(time);
    };

    updateTime(); // run immediately once
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <footer className="mt-14 font-mono text-greyText text-xs mb-12">
      <hr />
      <p className="mt-5">Indonesia, {localTime}</p>
      <section className="flex justify-between mt-4">
        <p>© 2025 Ikhwanul Husna</p>
        <aside>
          <a href="#" className="hover:border-b hover:border-greyText">
            Dev Mode
          </a>
          {/* <span className="mx-2">/</span>
          <Link href="/now" className="hover:border-b hover:border-greyText">
            Now
          </Link> */}
        </aside>
      </section>
    </footer>
  );
};

export default Footer;
