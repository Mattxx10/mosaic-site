import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { getReleaseManifest } from "@/lib/release";

export const metadata: Metadata = {
  title: "Installation Help",
  description: "Install the unsigned Mosaic macOS alpha safely on an Apple Silicon Mac.",
  alternates: { canonical: "/installation" },
};

export default async function InstallationPage() {
  const release = await getReleaseManifest();
  return (
    <LegalShell kicker="Alpha support" title="Install Mosaic on macOS">
      <div className="mosaic-legal-callout"><strong>Compatibility</strong><p>Mosaic {release.version} requires Apple Silicon and macOS {release.minimumOS} or later. The alpha is unsigned and not notarized.</p></div>
      <h2>1. Download and verify</h2>
      <p>Use the Download for macOS button on this site. The disclosure shows the exact version, architecture, file size, and checksum before opening the immutable GitHub release asset.</p>
      <p>For an optional Terminal verification, run the command below from the folder containing the downloaded DMG. The output must match the published SHA-256 exactly.</p>
      <code className="mosaic-legal-code">shasum -a 256 {release.assetName}</code>
      <code className="mosaic-legal-code" style={{ marginTop: 8 }}>{release.sha256}</code>
      <h2>2. Move Mosaic to Applications</h2>
      <ol><li>Open <strong>{release.assetName}</strong>.</li><li>Drag Mosaic into the Applications folder.</li><li>Eject the Mosaic disk image.</li></ol>
      <h2>3. Open the unsigned alpha</h2>
      <ol><li>Open Finder and choose Applications.</li><li>Control-click Mosaic, then choose <strong>Open</strong>.</li><li>Review Apple’s warning and choose <strong>Open</strong> again.</li></ol>
      <p>This is Apple’s standard one-app exception for software you explicitly trust. Do not disable Gatekeeper and do not run commands that strip macOS security attributes.</p>
      <h2>4. Connect Codex</h2>
      <p>Mosaic needs compatible Codex access for agentic Plan turns. On first launch, Mosaic detects the Codex CLI. If it is missing or you are signed out, the in-app setup wizard can install the compatible user-scoped CLI without administrator access and open browser-based ChatGPT sign-in.</p>
      <h2>Known alpha limitations</h2>
      <ul><li>Plan Studio is the only enabled product workspace.</li><li>Projects, implementation, deployment, Attention, Activity, and provider writes are locked.</li><li>The build is not signed or notarized.</li><li>Windows is not available.</li><li>Keep backups of important Plan exports and generated artifacts.</li></ul>
      <p>For version-specific details, read the <a href="/release-notes">release notes</a> or inspect the <a href={release.releaseNotesUrl}>public GitHub release</a>.</p>
    </LegalShell>
  );
}
