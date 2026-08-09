"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const DevMode = dynamic(() => import("@/components/DevMode"), { ssr: false });

const placeFromTimeZone = (timeZone: string) => {
  const segment = timeZone.split("/").pop() ?? timeZone;
  return segment.replace(/_/g, " ");
};

const countryFromCode = (code: string) => {
  try {
    return (
      new Intl.DisplayNames(undefined, { type: "region" }).of(code) ?? code
    );
  } catch {
    return code;
  }
};

/** Fallback when IP lookup is blocked — common IANA zones → ISO country */
const TIMEZONE_COUNTRY: Record<string, string> = {
  "Asia/Jakarta": "ID",
  "Asia/Makassar": "ID",
  "Asia/Jayapura": "ID",
  "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Bangkok": "TH",
  "Asia/Manila": "PH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Taipei": "TW",
  "Asia/Kolkata": "IN",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Pacific/Auckland": "NZ",
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Amsterdam": "NL",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Moscow": "RU",
  "Europe/Istanbul": "TR",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Sao_Paulo": "BR",
  "America/Mexico_City": "MX",
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Africa/Johannesburg": "ZA",
};

const Footer = () => {
  const [country, setCountry] = useState("Local");
  const [localTime, setLocalTime] = useState("--:--");
  const [devOpen, setDevOpen] = useState(false);

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fallbackCountry = TIMEZONE_COUNTRY[timeZone]
      ? countryFromCode(TIMEZONE_COUNTRY[timeZone])
      : placeFromTimeZone(timeZone);

    setCountry(fallbackCountry);

    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });

    const updateTime = () => {
      setLocalTime(formatter.format(new Date()).toLowerCase().replace(/\s/g, ""));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <footer className="mt-14 font-mono text-greyText text-xs mb-12">
        <hr className="border-outline" />
        <div className="mt-5 flex items-center justify-between gap-3">
          <p>
            {country}, {localTime}
          </p>
          <p className="inline-flex items-center gap-1.5 text-right">
            <BrandMark className="size-4 shrink-0" title="" />
            <span>Built by one human + agents</span>
          </p>
        </div>
        <section className="flex justify-between mt-4">
          <p>© 2026 Ikhwanul Husna</p>
          <aside className="flex items-center gap-2">
            <Link
              href="/now"
              className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              Now
            </Link>
            <span aria-hidden>/</span>
            <button
              type="button"
              onClick={() => setDevOpen(true)}
              className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              aria-haspopup="dialog"
              aria-expanded={devOpen}
            >
              Dev Mode
            </button>
          </aside>
        </section>
      </footer>

      {devOpen ? (
        <DevMode open={devOpen} onClose={() => setDevOpen(false)} />
      ) : null}
    </>
  );
};

export default Footer;
