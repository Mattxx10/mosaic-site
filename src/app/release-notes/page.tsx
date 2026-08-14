import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { formatFileSize, getReleaseManifest } from "@/lib/release";

export const metadata: Metadata = {
  title: "Release Notes",
  description: "Release notes and known limitations for the Mosaic Plan Studio alpha.",
  alternates: { canonical: "/release-notes" },
};

export default async function ReleaseNotesPage() {
  const release = await getReleaseManifest();
  return (
    <LegalShell kicker="Alpha release notes" title={`Mosaic ${release.version}`}>
      <div className="mosaic-legal-callout"><strong>Plan-only public alpha</strong><p>This release makes Plan Studio available for local agentic product planning. All project-development and delivery capabilities remain visibly locked.</p></div>
      <h2>What’s available</h2>
      <ul><li>A searchable Plan library with editable, approved, duplicated, archived, and revisioned Plans.</li><li>Plan-scoped Codex chat with live work activity, model/effort/speed selection, interruption, retry, and approvals.</li><li>Standard Brief, Requirements, Architecture, UX, Test Scenarios, and Delivery Plan documents, plus custom Markdown documents.</li><li>Self-contained interactive HTML designs with sample data and sandboxed previews.</li><li>Document comments and element-level design comments.</li><li>Candidate diffs, validation, acceptance or discard, and immutable approved revisions.</li><li>Local SQLite metadata, Application Support artifact storage, and macOS Keychain-backed credential references.</li></ul>
      <h2>Not enabled</h2>
      <p>Projects, repository cloning, implementation agents, worktrees, pull requests, provider configuration, staging, production, releases, incidents, Attention, Activity, Plan handoff, and Windows support are not part of this alpha.</p>
      <h2>Download details</h2>
      <ul><li>Platform: {release.platform}</li><li>Architecture: {release.architecture} / Apple Silicon</li><li>Minimum OS: macOS {release.minimumOS}</li><li>Size: {formatFileSize(release.fileSize)} ({release.fileSize.toLocaleString("en-US")} bytes)</li><li>Signed and notarized: No</li></ul>
      <p>SHA-256:</p><code className="mosaic-legal-code">{release.sha256}</code>
      <h2>Known limitations</h2>
      <ul><li>The app requires Apple’s Control-click Open flow on first launch.</li><li>Codex availability, compatible models, and usage limits depend on the connected Codex installation and eligible ChatGPT access.</li><li>Generated Plan artifacts are still alpha output and require human review.</li><li>No Mosaic cloud backup or cross-device synchronization is provided.</li></ul>
      <p>View the immutable tag and release files in the <a href={release.releaseNotesUrl} rel="noreferrer" target="_blank">public releases repository</a>.</p>
    </LegalShell>
  );
}
