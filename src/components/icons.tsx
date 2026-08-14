import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></IconBase>;
}
export function DownloadIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v2h14v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></IconBase>;
}
export function CheckIcon(props: IconProps) {
  return <IconBase {...props}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" /></IconBase>;
}
export function LockIcon(props: IconProps) {
  return <IconBase {...props}><rect height="10" rx="2" stroke="currentColor" strokeWidth="1.7" width="14" x="5" y="10" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></IconBase>;
}
export function SparklesIcon(props: IconProps) {
  return <IconBase {...props}><path d="m12 2 1.3 4.2L17.5 7.5l-4.2 1.3L12 13l-1.3-4.2-4.2-1.3 4.2-1.3L12 2Zm6 10 .8 2.7 2.7.8-2.7.8L18 19l-.8-2.7-2.7-.8 2.7-.8L18 12ZM6 14l.7 2.3L9 17l-2.3.7L6 20l-.7-2.3L3 17l2.3-.7L6 14Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" /></IconBase>;
}
export function FileIcon(props: IconProps) {
  return <IconBase {...props}><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="M14 3v5h4M10 13h5m-5 4h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></IconBase>;
}
export function CodeIcon(props: IconProps) {
  return <IconBase {...props}><path d="m9 6-6 6 6 6m6-12 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></IconBase>;
}
export function CommentIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 4h16v12H9l-5 4V4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></IconBase>;
}
export function ShieldIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="m8.8 12 2.1 2.1 4.4-4.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></IconBase>;
}
export function DatabaseIcon(props: IconProps) {
  return <IconBase {...props}><ellipse cx="12" cy="5.5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.7" /><path d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" strokeWidth="1.7" /></IconBase>;
}
export function KeyIcon(props: IconProps) {
  return <IconBase {...props}><circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.7" /><path d="m11 12 8-8m-3 3 2 2m-5 1 2 2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></IconBase>;
}
export function CardIcon(props: IconProps) {
  return <IconBase {...props}><rect height="15" rx="2" stroke="currentColor" strokeWidth="1.7" width="20" x="2" y="5" /><path d="M2 10h20M6 15h4" stroke="currentColor" strokeWidth="1.7" /></IconBase>;
}
export function ExternalIcon(props: IconProps) {
  return <IconBase {...props}><path d="M13 4h7v7m0-7-9 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /><path d="M18 13v6H5V6h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></IconBase>;
}
export function MenuIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></IconBase>;
}
export function XIcon(props: IconProps) {
  return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></IconBase>;
}
export function AppleIcon(props: IconProps) {
  return <IconBase {...props}><path d="M15.7 12.8c0-2 1.7-3 1.8-3.1a3.9 3.9 0 0 0-3.1-1.7c-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8a4.2 4.2 0 0 0-3.5 2.1c-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.7-1-2.7-3.3ZM13.5 6.6c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.8-1.2Z" fill="currentColor" /></IconBase>;
}
export function MonitorIcon(props: IconProps) {
  return <IconBase {...props}><rect height="13" rx="2" stroke="currentColor" strokeWidth="1.7" width="20" x="2" y="3" /><path d="M8 21h8m-4-5v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></IconBase>;
}
export function BoltIcon(props: IconProps) {
  return <IconBase {...props}><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></IconBase>;
}
