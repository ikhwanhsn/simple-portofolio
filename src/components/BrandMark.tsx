"use client";

import Image from "next/image";
import { useContext } from "react";
import brandMark from "../../public/img/brand-mark-sm.png";
import brandMarkLight from "../../public/img/brand-mark-light-sm.png";
import { ThemeContext } from "@/components/ThemeProvider";

type BrandMarkProps = {
  className?: string;
  title?: string;
  /** Force light mark (for dark UI surfaces like Dev Mode) */
  variant?: "auto" | "dark" | "light";
};

const BrandMark = ({
  className = "size-5",
  title = "Ikhwanul Husna",
  variant = "auto",
}: BrandMarkProps) => {
  const decorative = !title;
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx?.theme ?? "light";

  const resolved =
    variant === "auto" ? (theme === "dark" ? "light" : "dark") : variant;
  const src = resolved === "light" ? brandMarkLight : brandMark;

  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="40px"
        className="object-contain"
        priority={false}
      />
    </span>
  );
};

export default BrandMark;
