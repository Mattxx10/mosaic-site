import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { SiteHeader } from "./site-header";

export function LegalShell({
  title,
  kicker,
  updated = "August 13, 2026",
  children,
}: {
  title: string;
  kicker: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mosaic-site">
      <SiteHeader />
      <main className="mosaic-legal">
        <div className="mosaic-container mosaic-legal-inner">
          <aside className="mosaic-legal-aside">
            <Link href="/"><span aria-hidden="true">←</span> Back to Mosaic</Link>
            <p>Mosaic is a local-first alpha for AI-first developers. Review this information before downloading or using the app.</p>
          </aside>
          <article className="mosaic-legal-article">
            <p className="mosaic-kicker">{kicker}</p>
            <h1>{title}</h1>
            <p className="mosaic-legal-updated">Last updated {updated}</p>
            {children}
            <p style={{ marginTop: 48 }}><Link href="/">Return to Mosaic <ArrowRightIcon size={14} /></Link></p>
          </article>
        </div>
      </main>
    </div>
  );
}
