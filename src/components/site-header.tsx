"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DownloadTrigger } from "./download";
import { DownloadIcon, MenuIcon, XIcon } from "./icons";

const navItems = [
  ["Product", "#product"],
  ["Alpha", "#alpha"],
  ["Why opinionated", "#opinionated"],
  ["Roadmap", "#roadmap"],
  ["Download", "#download"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="mosaic-header">
      <div className="mosaic-header-inner">
        <Link aria-label="Mosaic home" className="mosaic-brand" href="/">
          <Image alt="" height={40} priority src="/brand/mosaic-mark.svg" width={40} />
          <span>Mosaic</span>
        </Link>
        <nav aria-label="Primary navigation" className={open ? "mosaic-nav is-open" : "mosaic-nav"}>
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <DownloadTrigger className="mosaic-button mosaic-button-primary mosaic-nav-cta" location="navigation">
            <DownloadIcon size={17} /> Download for macOS
          </DownloadTrigger>
        </nav>
        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="mosaic-menu-button"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}
