import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Mosaic app and marketing site handle data during the alpha.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell kicker="Policies" title="Privacy notice">
      <div className="mosaic-legal-callout"><strong>The short version</strong><p>Mosaic runs locally. The website uses aggregate, cookie-free analytics. Codex account credentials stay with Codex.</p></div>
      <h2>Mosaic desktop app</h2>
      <p>The alpha stores Plan metadata and generated artifacts on your Mac in Mosaic’s Application Support directory. The app uses local SQLite storage for metadata, file-based revision folders for Plan artifacts, and macOS Keychain references for supported credential state.</p>
      <p>Mosaic does not operate a Mosaic account service in this alpha. There is no Mosaic authentication, cloud Plan sync, advertising profile, or remote Plan database.</p>
      <h2>Codex connection</h2>
      <p>Mosaic connects to a compatible Codex CLI and its local app-server protocol. Sign-in is handled by Codex and ChatGPT. Mosaic does not store Codex account tokens, browser authorization URLs, login IDs, or raw credential values in Plan files, transcripts, manifests, previews, or logs.</p>
      <p>Your use of Codex remains governed by OpenAI’s applicable terms and privacy policies. Mosaic does not include Codex access.</p>
      <h2>Website analytics</h2>
      <p>This website uses Vercel Web Analytics to understand aggregate page views and basic site performance without using advertising cookies or creating personal profiles. Mosaic records aggregate events for opening the download disclosure and starting a download.</p>
      <p>Download events may include only non-personal product context such as the CTA location, Mosaic version, platform, and architecture. We do not intentionally collect names, email addresses, Plan content, Codex prompts, credential values, or cross-site identifiers.</p>
      <h2>Downloads and external links</h2>
      <p>Release assets are hosted in the public <a href="https://github.com/Mattxx10/mosaic-releases" rel="noreferrer" target="_blank">mosaic-releases GitHub repository</a>. When you follow a download or another external link, the destination provider may receive ordinary request information under its own policies.</p>
      <h2>Alpha changes</h2>
      <p>This notice may change as Mosaic adds project, collaboration, or hosted capabilities. A future capability that changes data handling will be documented before it becomes available.</p>
    </LegalShell>
  );
}
