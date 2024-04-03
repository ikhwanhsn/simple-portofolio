"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [localTime, setLocalTime] = useState("00:00am");
  useEffect(() => {
    const currentTime = new Date();
    const options = { timeZone: "Asia/Jakarta" };
    const timeString = currentTime.toLocaleString("en-GB", options);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}${
      hours >= 12 ? "pm" : "am"
    }`;
    setLocalTime(time);
  }, []);

  return (
    <footer className="mt-14 font-mono text-greyText text-xs mb-12">
      <hr />
      <p className="mt-5">Indonesia, {localTime}</p>
      <section className="flex justify-between mt-4">
        <p>© 2024 Ikhwanul Husna</p>
        <aside>
          <Link
            href="/colophon"
            className="hover:border-b hover:border-greyText"
          >
            Colophon
          </Link>
          <span className="mx-2">/</span>
          <Link href="/now" className="hover:border-b hover:border-greyText">
            Now
          </Link>
        </aside>
      </section>
    </footer>
  );
};

export default Footer;
