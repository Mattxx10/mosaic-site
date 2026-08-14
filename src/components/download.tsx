"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef } from "react";
import type { ReleaseManifest } from "@/lib/release";
import { AppleIcon, DownloadIcon, XIcon } from "./icons";

const downloadEventName = "mosaic:open-download";

export function DownloadTrigger({
  children,
  className = "mosaic-button mosaic-button-primary",
  location,
}: {
  children: React.ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <button
      className={className}
      data-testid={`download-trigger-${location}`}
      onClick={() => {
        track("download_disclosure_opened", { location });
        window.dispatchEvent(new CustomEvent(downloadEventName));
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export function DownloadDialog({
  release,
  fileSize,
}: {
  release: ReleaseManifest;
  fileSize: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => dialogRef.current?.showModal();
    window.addEventListener(downloadEventName, open);
    return () => window.removeEventListener(downloadEventName, open);
  }, []);

  return (
    <dialog
      aria-labelledby="download-dialog-title"
      className="mosaic-download-dialog"
      data-testid="download-dialog"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      ref={dialogRef}
    >
      <div className="mosaic-dialog-surface">
        <button
          aria-label="Close download details"
          className="mosaic-icon-button mosaic-dialog-close"
          onClick={() => dialogRef.current?.close()}
          type="button"
        >
          <XIcon />
        </button>
        <div className="mosaic-dialog-mark"><AppleIcon size={27} /></div>
        <p className="mosaic-kicker">Before you download</p>
        <h2 id="download-dialog-title">This alpha is unsigned.</h2>
        <p>
          Mosaic {release.version} is not signed or notarized yet. macOS will ask you to confirm
          that you trust the app the first time you open it.
        </p>
        <dl className="mosaic-release-facts mosaic-release-facts-dialog">
          <div><dt>Architecture</dt><dd>Apple Silicon</dd></div>
          <div><dt>Download</dt><dd>{fileSize}</dd></div>
          <div><dt>Requires</dt><dd>macOS {release.minimumOS}+</dd></div>
          <div><dt>Version</dt><dd>{release.version}</dd></div>
        </dl>
        <div className="mosaic-install-mini">
          <span>1</span><p>Download the DMG and drag Mosaic to Applications.</p>
          <span>2</span><p>In Applications, Control-click Mosaic and choose <strong>Open</strong>.</p>
          <span>3</span><p>Review the macOS warning, then choose <strong>Open</strong> again.</p>
        </div>
        <div className="mosaic-checksum-block">
          <span>SHA-256</span>
          <code>{release.sha256}</code>
        </div>
        <p className="mosaic-dialog-note">
          Never disable Gatekeeper. By downloading, you accept the Mosaic Alpha Evaluation License.
        </p>
        <div className="mosaic-dialog-actions">
          <button className="mosaic-button mosaic-button-secondary" onClick={() => dialogRef.current?.close()} type="button">
            Cancel
          </button>
          <a
            className="mosaic-button mosaic-button-primary"
            data-testid="download-confirm"
            href={release.downloadUrl}
            onClick={() => {
              track("download_started", {
                version: release.version,
                platform: release.platform,
                architecture: release.architecture,
              });
              dialogRef.current?.close();
            }}
          >
            <DownloadIcon /> I understand — download
          </a>
        </div>
      </div>
    </dialog>
  );
}
