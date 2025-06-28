"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales } from "@/middleware";
import { TLang } from "@/app/types/language";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: TLang) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <ul>
        {locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale as TLang)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}