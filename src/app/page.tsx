import Image from "next/image";
import Link from "next/link";
import { DownloadTrigger } from "@/components/download";
import {
  AppleIcon,
  ArrowRightIcon,
  BoltIcon,
  CardIcon,
  CheckIcon,
  CodeIcon,
  CommentIcon,
  DatabaseIcon,
  ExternalIcon,
  FileIcon,
  KeyIcon,
  LockIcon,
  MonitorIcon,
  ShieldIcon,
  SparklesIcon,
} from "@/components/icons";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SiteHeader } from "@/components/site-header";
import { formatFileSize, getReleaseManifest } from "@/lib/release";

const lifecycle = [
  { step: "01", title: "Plan", description: "Requirements, architecture, test logic, and interactive designs.", status: "Available in alpha" },
  { step: "02", title: "Build", description: "Approved specs, isolated agents, worktrees, and traceable changes.", status: "Coming soon" },
  { step: "03", title: "Ship", description: "Verification, pull requests, staging, and guarded releases.", status: "Coming soon" },
  { step: "04", title: "Scale", description: "Environment contracts, providers, observability, and migrations.", status: "Coming soon" },
  { step: "05", title: "Operate", description: "Attention, incidents, rollback, and portfolio health.", status: "Coming soon" },
];

const alphaFeatures = [
  { icon: SparklesIcon, title: "Codex planning chat", copy: "Live work indicators, explicit approvals, interruption, retry, and Plan-scoped threads." },
  { icon: FileIcon, title: "Durable documentation", copy: "Brief, Requirements, Architecture, UX, Test Scenarios, Delivery Plan, and custom documents." },
  { icon: CodeIcon, title: "Working HTML designs", copy: "Self-contained interactive screens with realistic sample data—not static image generations." },
  { icon: CommentIcon, title: "Review in context", copy: "Comment on document anchors or select individual design elements for precise feedback." },
  { icon: ShieldIcon, title: "Guarded revisions", copy: "Candidate previews, diffs, validation, immutable approvals, and revision history." },
  { icon: BoltIcon, title: "Controls that fit the task", copy: "Choose from supported Codex models, effort levels, and service speeds before each turn." },
];

const principles = [
  ["Durable specifications", "Keep product intent outside disposable chat context and preserve reviewed decisions."],
  ["Human-reviewed test logic", "Agree on observable outcomes before an implementation agent starts changing code."],
  ["Known workspace boundaries", "Give every agent a canonical monorepo, explicit ownership, and reusable patterns."],
  ["Provider contracts", "Describe environments and integrations as repeatable contracts instead of one-off setup."],
  ["Evidence-backed delivery", "Tie verification, generated artifacts, migrations, and releases back to the approved intent."],
  ["Portfolio consistency", "Apply the same engineering system across every app without rebuilding the process each time."],
];

const faqs = [
  ["What works in the alpha?", "Plan Studio is the only enabled product workspace. You can create Plans, work with Codex, generate and review documents and interactive HTML designs, comment, validate candidates, and approve immutable revisions. Projects, implementation, deployment, and provider writes are not enabled."],
  ["Is Mosaic free?", "Mosaic 0.1.0-alpha.1 is free for personal and internal commercial evaluation under the Alpha Evaluation License. Mosaic may introduce paid offerings later, but this alpha has no Mosaic subscription fee."],
  ["Does Mosaic include Codex?", "No. Mosaic connects to a compatible Codex CLI running on your Mac. You need Codex access through an eligible ChatGPT plan; any Codex usage remains subject to that plan’s terms and limits."],
  ["Where is Plan data stored?", "Plan metadata and artifacts stay on your Mac in Mosaic’s Application Support directory. Mosaic uses local SQLite storage, sandboxed previews, and macOS Keychain references for credentials."],
  ["Why is the macOS build unsigned?", "This is an early independent alpha and has not yet completed Apple signing and notarization. The download flow discloses this clearly, publishes a SHA-256 checksum, and documents Apple’s standard Control-click Open path without asking you to disable Gatekeeper."],
  ["How does Mosaic differ from Claude Design?", "Mosaic is a local planning workspace built around durable artifact revisions, selectable Codex models, review gates, and an eventual spec-driven development lifecycle. Claude Design is Anthropic’s separate design experiment. Mosaic is not affiliated with Anthropic."],
  ["When are Projects and Windows coming?", "Both are active roadmap targets, but Mosaic is not publishing promised dates yet. The alpha intentionally keeps those areas locked until their full safety and review workflows are ready."],
];

export default async function Home() {
  const release = await getReleaseManifest();
  const fileSize = formatFileSize(release.fileSize);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mosaic",
    description: "A local agentic planning studio for durable product documents and interactive designs.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS 13 or later on Apple Silicon",
    softwareVersion: release.version,
    downloadUrl: release.downloadUrl,
    releaseNotes: release.releaseNotesUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="mosaic-site">
      <SiteHeader />
      <main>
        <section className="mosaic-hero" id="top">
          <div aria-hidden="true" className="mosaic-hero-grid" />
          <div aria-hidden="true" className="mosaic-tiles">
            <i /><i /><i /><i /><i /><i />
          </div>
          <div className="mosaic-container mosaic-hero-copy">
            <div className="mosaic-eyebrow"><span className="mosaic-status-dot" /> Free macOS alpha <i /> Powered by Codex</div>
            <h1>Plan, build, ship, and scale through one agentic workspace.</h1>
            <p className="mosaic-hero-lede">
              Mosaic gives AI-first developers a local, opinionated system for turning product
              intent into durable specifications, working designs, verified implementation, and
              guarded releases. <strong>Plan Studio is available today;</strong> the complete lifecycle is coming next.
            </p>
            <div className="mosaic-hero-actions">
              <DownloadTrigger location="hero"><AppleIcon /> Download Mosaic Alpha</DownloadTrigger>
              <a className="mosaic-button mosaic-button-secondary" href="#alpha">Explore Plan Studio <ArrowRightIcon /></a>
            </div>
            <p className="mosaic-compatibility">Apple Silicon <span>·</span> macOS 13+ <span>·</span> Free alpha <span>·</span> Codex access required</p>
          </div>
          <div className="mosaic-container mosaic-hero-product">
            <div className="mosaic-window mosaic-hero-window">
              <div className="mosaic-window-bar"><i /><i /><i /><span>Mosaic · Plan Studio</span><em>Local</em></div>
              <picture>
                <source srcSet="/product/design-workspace.avif" type="image/avif" />
                <source srcSet="/product/design-workspace.webp" type="image/webp" />
                <img alt="Mosaic Plan Studio showing a Codex planning chat, documents, and an interactive product design" height="1502" fetchPriority="high" src="/product/design-workspace.webp" width="2400" />
              </picture>
              <div aria-hidden="true" className="mosaic-window-status"><span /> Codex connected</div>
            </div>
          </div>
          <div className="mosaic-container mosaic-proof-strip" aria-label="Alpha product properties">
            <div><ShieldIcon /><span>Local-first artifacts</span></div>
            <div><SparklesIcon /><span>Built around Codex</span></div>
            <div><MonitorIcon /><span>Working prototypes</span></div>
            <div><CheckIcon /><span>Review before acceptance</span></div>
          </div>
        </section>

        <section className="mosaic-section mosaic-product-section" id="product">
          <div className="mosaic-container">
            <div className="mosaic-section-heading mosaic-section-heading-wide">
              <p className="mosaic-kicker">The product goal</p>
              <h2>One app. One system of context. Fewer handoffs.</h2>
              <p>
                Agentic development is fragmented across chat windows, design tools, terminals,
                specifications, repositories, CI, providers, and deployment dashboards. Mosaic is
                the place those decisions become a continuous, reviewable system.
              </p>
            </div>
            <ol className="mosaic-lifecycle">
              {lifecycle.map((item, index) => (
                <li className={index === 0 ? "is-available" : ""} key={item.title}>
                  <div className="mosaic-lifecycle-top"><span>{item.step}</span>{index === 0 ? <SparklesIcon /> : <LockIcon />}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <strong>{item.status}</strong>
                  {index < lifecycle.length - 1 && <ArrowRightIcon className="mosaic-lifecycle-arrow" />}
                </li>
              ))}
            </ol>
            <div className="mosaic-context-flow">
              <div><span>Product intent</span><small>what and why</small></div>
              <ArrowRightIcon />
              <div><span>Approved context</span><small>documents + designs</small></div>
              <ArrowRightIcon />
              <div><span>Verified change</span><small>evidence + gates</small></div>
              <ArrowRightIcon />
              <div><span>Portfolio memory</span><small>repeatable patterns</small></div>
            </div>
          </div>
        </section>

        <section className="mosaic-section mosaic-alpha-section" id="alpha">
          <div className="mosaic-container">
            <div className="mosaic-section-heading">
              <div className="mosaic-live-badge"><span /> Available now</div>
              <p className="mosaic-kicker">Mosaic Alpha · Plan Studio</p>
              <h2>Go from a rough idea to reviewed product context.</h2>
              <p>
                Plan with an agent, inspect every artifact it changes, experience the design as a
                working local prototype, and freeze approved revisions for reuse later.
              </p>
            </div>
            <div className="mosaic-feature-grid">
              {alphaFeatures.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <div className="mosaic-feature-icon"><Icon /></div>
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
            <div className="mosaic-boundary-note">
              <LockIcon />
              <div><strong>A deliberately focused alpha.</strong><span>Project creation, repository implementation, deployment, and provider writes are not enabled yet.</span></div>
            </div>
            <ScreenshotGallery />
          </div>
        </section>

        <section className="mosaic-section mosaic-cost-section" id="cost">
          <div className="mosaic-container mosaic-split">
            <div className="mosaic-section-heading">
              <p className="mosaic-kicker">A cost-conscious alternative</p>
              <h2>Make your agentic design budget go further.</h2>
              <p className="mosaic-emphasis">Mosaic Alpha is free and powered by the Codex access you already use.</p>
              <p>
                Mosaic preserves accepted artifacts locally, resumes Plan-scoped threads, and lets
                you choose lower-usage supported Codex models and effort levels when a frontier model is unnecessary.
              </p>
              <blockquote>
                “In our internal alpha use, Mosaic has consumed materially less of our available
                agent usage than comparable Claude Design prototype sessions.”
              </blockquote>
            </div>
            <div className="mosaic-comparison" aria-label="Mosaic Alpha and Claude Design comparison">
              <article className="is-featured">
                <div className="mosaic-comparison-title"><Image alt="" height={34} src="/brand/mosaic-mark.svg" width={34} /><span>Mosaic Alpha<small>Local planning workspace</small></span></div>
                <strong>$0</strong><span className="mosaic-price-note">Mosaic subscription</span>
                <ul><li><CheckIcon /> Codex access required</li><li><CheckIcon /> Selectable supported models</li><li><CheckIcon /> Accepted artifacts stored locally</li><li><CheckIcon /> Immutable reviewed revisions</li></ul>
              </article>
              <article>
                <div className="mosaic-comparison-title mosaic-comparison-letter"><i>C</i><span>Claude Design<small>Anthropic Labs experiment</small></span></div>
                <strong>Paid plan</strong><span className="mosaic-price-note">Pro starts at $20/month in the US</span>
                <ul><li><span>—</span> Pro, Max, Team, or Enterprise</li><li><span>—</span> Consumes that plan’s usage limits</li><li><span>—</span> Separate product and workflow</li><li><span>—</span> Availability may change</li></ul>
              </article>
              <p className="mosaic-comparison-footnote">
                Usage varies by model, effort, prompt, and artifact size. Mosaic does not include
                Codex access and is not affiliated with Anthropic. Pricing checked August 13, 2026.
              </p>
              <div className="mosaic-fact-links">
                <a href="https://www.anthropic.com/news/claude-design-anthropic-labs" rel="noreferrer" target="_blank">Claude Design availability <ExternalIcon /></a>
                <a href="https://support.anthropic.com/en/articles/8325610-how-much-does-claude-pro-cost" rel="noreferrer" target="_blank">Claude Pro pricing <ExternalIcon /></a>
                <a href="https://openai.com/index/introducing-upgrades-to-codex/" rel="noreferrer" target="_blank">Codex availability <ExternalIcon /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="mosaic-section mosaic-opinionated-section" id="opinionated">
          <div className="mosaic-container">
            <div className="mosaic-section-heading mosaic-section-heading-wide">
              <p className="mosaic-kicker">Why opinionated</p>
              <h2>Agents work better when the system has opinions.</h2>
              <p>
                Conventions reduce ambiguity. They keep every agent from inventing a different
                architecture, workflow, or release process—and turn ad-hoc code generation into a
                consistent engineering system.
              </p>
            </div>
            <div className="mosaic-principles">
              {principles.map(([title, copy], index) => (
                <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
              ))}
            </div>
            <div className="mosaic-control-plane">
              <div className="mosaic-control-orbit"><span>Intent</span><span>Agents</span><span>Code</span><span>Evidence</span><div><Image alt="" height={76} src="/brand/mosaic-mark.svg" width={76} /><strong>Mosaic</strong><small>Control plane</small></div></div>
              <div><p className="mosaic-kicker">Consistency compounds</p><h3>One development system across an entire product portfolio.</h3><p>Mosaic’s long-term value is not another agent chat. It is a shared operating model that lets every product inherit the same durable context, boundaries, verification, and release discipline.</p></div>
            </div>
          </div>
        </section>

        <section className="mosaic-section mosaic-roadmap-section" id="roadmap">
          <div className="mosaic-container">
            <div className="mosaic-section-heading mosaic-section-heading-wide">
              <p className="mosaic-kicker">Coming soon</p>
              <h2>Plan Studio is the first tessera.</h2>
              <p>The roadmap connects planning to development, delivery, environments, and operations. These are direction targets—not promised dates.</p>
            </div>
            <div className="mosaic-roadmap-grid">
              <article><span className="mosaic-coming"><LockIcon /> Coming soon</span><div className="mosaic-roadmap-icon"><CodeIcon /></div><p className="mosaic-kicker">Project development</p><h3>Turn approved context into governed changes.</h3><ul><li>Plan handoff and new-project wizard</li><li>Repository planning skills and spec gates</li><li>Parallel worktrees and agent scheduling</li><li>Changes, checks, and draft pull requests</li><li>Portfolio Attention and Activity</li></ul></article>
              <article><span className="mosaic-coming"><LockIcon /> Coming soon</span><div className="mosaic-roadmap-icon"><ShieldIcon /></div><p className="mosaic-kicker">Shipping + operations</p><h3>Move verified work with explicit control.</h3><ul><li>Staging and production environments</li><li>GitHub delivery and guarded releases</li><li>Rollback and incident workflows</li><li>Provider action plans and approvals</li><li>Observability and portfolio health</li></ul></article>
            </div>
            <div className="mosaic-provider-catalog">
              <div className="mosaic-provider-intro"><span className="mosaic-coming"><LockIcon /> Roadmap target</span><p className="mosaic-kicker">Bolt-on provider catalog</p><h3>Choose a capability. Let an agent wire the contract.</h3><p>Agent-guided installation, environment configuration, verification, and approval-gated writes—without turning every integration into a bespoke project.</p></div>
              <div className="mosaic-provider-groups">
                <article><div><DatabaseIcon /><span><strong>Databases</strong><small>Data + migrations</small></span></div><p><b>First:</b> Supabase / Postgres</p><div><span>Neon</span><span>PlanetScale</span><span>Turso</span></div></article>
                <article><div><KeyIcon /><span><strong>Authentication</strong><small>Identity + access</small></span></div><p><b>Targets:</b> Supabase Auth</p><div><span>Clerk</span><span>Auth0</span><span>Better Auth</span></div></article>
                <article><div><CardIcon /><span><strong>Payments</strong><small>Billing + revenue</small></span></div><p><b>First:</b> Stripe</p><div><span>Paddle</span><span>Lemon Squeezy</span></div></article>
              </div>
            </div>
          </div>
        </section>

        <section className="mosaic-section mosaic-download-section" id="download">
          <div aria-hidden="true" className="mosaic-download-glow" />
          <div className="mosaic-container">
            <div className="mosaic-section-heading mosaic-section-heading-wide">
              <p className="mosaic-kicker">Download Mosaic</p>
              <h2>Start with Plan Studio.</h2>
              <p>Grow into the complete agentic lifecycle as Mosaic’s guarded project capabilities arrive.</p>
            </div>
            <div className="mosaic-download-grid">
              <article className="mosaic-download-card is-available">
                <div className="mosaic-download-card-top"><div className="mosaic-platform-icon"><AppleIcon size={34} /></div><span className="mosaic-live-badge"><span /> Available now</span></div>
                <h3>Mosaic for macOS</h3><p>Plan locally on an Apple Silicon Mac with your compatible Codex access.</p>
                <dl className="mosaic-release-facts"><div><dt>Version</dt><dd>{release.version}</dd></div><div><dt>Architecture</dt><dd>Apple Silicon</dd></div><div><dt>Requires</dt><dd>macOS {release.minimumOS}+</dd></div><div><dt>Download</dt><dd>{fileSize}</dd></div></dl>
                <div className="mosaic-checksum-compact"><span>SHA-256</span><code>{release.sha256}</code></div>
                <DownloadTrigger className="mosaic-button mosaic-button-primary mosaic-button-wide" location="download-card"><AppleIcon /> Download unsigned alpha</DownloadTrigger>
                <p className="mosaic-card-note">Unsigned and not notarized. You’ll review installation guidance before the download starts.</p>
              </article>
              <article className="mosaic-download-card is-locked">
                <div className="mosaic-download-card-top"><div className="mosaic-platform-icon"><span className="mosaic-windows-mark"><i /><i /><i /><i /></span></div><span className="mosaic-coming"><LockIcon /> Coming soon</span></div>
                <h3>Mosaic for Windows</h3><p>The Windows build will follow after the macOS Plan Studio alpha is stable.</p>
                <dl className="mosaic-release-facts"><div><dt>Version</dt><dd>—</dd></div><div><dt>Architecture</dt><dd>x64 / arm64</dd></div><div><dt>Availability</dt><dd>Not announced</dd></div><div><dt>Status</dt><dd>Roadmap</dd></div></dl>
                <button aria-disabled="true" className="mosaic-button mosaic-button-disabled mosaic-button-wide" disabled type="button"><LockIcon /> Windows coming soon</button>
                <p className="mosaic-card-note">No waitlist or email collection. Watch the public release channel for updates.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mosaic-section mosaic-faq-section" id="faq">
          <div className="mosaic-container mosaic-faq-layout">
            <div className="mosaic-section-heading"><p className="mosaic-kicker">FAQ</p><h2>Useful context before you begin.</h2><p>Early software deserves plain answers. If something is missing, check the release notes before installing.</p></div>
            <div className="mosaic-faq-list">
              {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="mosaic-footer">
        <div className="mosaic-container mosaic-footer-main">
          <div><Link className="mosaic-brand" href="/"><Image alt="" height={38} src="/brand/mosaic-mark.svg" width={38} /><span>Mosaic</span></Link><p>A local, opinionated workspace for the agentic product lifecycle.</p></div>
          <div><strong>Alpha</strong><Link href="/release-notes">Release notes</Link><Link href="/installation">Installation help</Link><a href="#alpha">Plan Studio</a></div>
          <div><strong>Policies</strong><Link href="/privacy">Privacy</Link><Link href="/license">Alpha license</Link><a href="https://github.com/Mattxx10/mosaic-releases" rel="noreferrer" target="_blank">Public releases <ExternalIcon /></a></div>
          <div><strong>Product</strong><a href="#product">Lifecycle</a><a href="#opinionated">Why opinionated</a><a href="#roadmap">Roadmap</a></div>
        </div>
        <div className="mosaic-container mosaic-footer-bottom"><span>© 2026 Mosaic. Built for AI-first developers.</span><span>Plan locally. Review deliberately. Ship when ready.</span></div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
