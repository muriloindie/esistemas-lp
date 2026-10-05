import type { ReactNode } from "react";

function S({ children, className = "icon" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconCode({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </S>
  );
}

export function IconMobile({ className }: { className?: string }) {
  return (
    <S className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M12 18h.01" />
    </S>
  );
}

export function IconLink({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </S>
  );
}

export function IconBolt({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </S>
  );
}

export function IconChart({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </S>
  );
}

export function IconPen({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </S>
  );
}

export function IconCpu({ className }: { className?: string }) {
  return (
    <S className={className}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </S>
  );
}

export function IconChat({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </S>
  );
}

export function IconDashboard({ className }: { className?: string }) {
  return (
    <S className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </S>
  );
}

export function IconPulse({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </S>
  );
}

export function IconCompass({ className }: { className?: string }) {
  return (
    <S className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </S>
  );
}

export function IconTruck({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </S>
  );
}

export function IconBroadcast({ className }: { className?: string }) {
  return (
    <S className={className}>
      <circle cx="12" cy="12" r="2" />
      <path d="M4.93 19.07C1.02 15.16 1.02 8.84 4.93 4.93" />
      <path d="M7.76 16.24c-2.34-2.34-2.34-6.14 0-8.49" />
      <path d="M16.24 7.76c2.34 2.34 2.34 6.14 0 8.49" />
      <path d="M19.07 4.93c3.91 3.91 3.91 10.23 0 14.14" />
    </S>
  );
}

export function IconShield({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </S>
  );
}

export function IconSpark({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M9.94 15.5a2 2 0 0 0-1.44-1.44l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0l1.58 6.13a2 2 0 0 0 1.44 1.44l6.13 1.58a.5.5 0 0 1 0 .96l-6.13 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" />
      <path d="M20 3v4M22 5h-4" />
    </S>
  );
}

export function IconLayers({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </S>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </S>
  );
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </S>
  );
}

export function IconClose({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </S>
  );
}

export function IconCheck({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M20 6 9 17l-5-5" />
    </S>
  );
}

export function IconLock({ className }: { className?: string }) {
  return (
    <S className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </S>
  );
}

export function IconDatabase({ className }: { className?: string }) {
  return (
    <S className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </S>
  );
}

export function IconTarget({ className }: { className?: string }) {
  return (
    <S className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </S>
  );
}

export function IconUsers({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </S>
  );
}

export function IconMap({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M14.1 5.55a2 2 0 0 0 1.79 0l3.66-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.56 2.27a2 2 0 0 1-1.78 0l-4.21-2.1a2 2 0 0 0-1.79 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.56-2.27a2 2 0 0 1 1.78 0z" />
      <path d="M15 5.76v15M9 3.24v15" />
    </S>
  );
}

export function IconRefresh({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </S>
  );
}

export function IconCheckCircle({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M21.8 10A10 10 0 1 1 17 3.34" />
      <path d="m9 11 3 3L22 4" />
    </S>
  );
}

export function IconPlay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "icon"} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function IconPin({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </S>
  );
}

export function IconCamera({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </S>
  );
}

export function IconEye({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.42 8.1 7.36 5 12 5s8.58 3.1 9.94 6.65a1 1 0 0 1 0 .7C20.58 15.9 16.64 19 12 19s-8.58-3.1-9.94-6.65Z" />
      <circle cx="12" cy="12" r="3" />
    </S>
  );
}

export function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "icon"} aria-hidden="true">
      <path d="M12 2.6l2.72 5.51 6.08.89-4.4 4.29 1.04 6.06L12 16.42l-5.44 2.93 1.04-6.06-4.4-4.29 6.08-.89z" />
    </svg>
  );
}

export function IconWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "icon"} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 0 16.48Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className ?? "icon"} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className ?? "icon"} aria-hidden="true">
      <path d="M14.5 21v-7.5h2.6l.4-3.2h-3V8.2c0-.9.3-1.5 1.6-1.5H17.6V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.5H8.6v3.2h2.6V21" />
    </svg>
  );
}

export function IconExternal({ className }: { className?: string }) {
  return (
    <S className={className}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </S>
  );
}

export function IconSignal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "icon"} aria-hidden="true">
      <rect x="2" y="15" width="3.4" height="5" rx="1" />
      <rect x="7.4" y="12" width="3.4" height="8" rx="1" />
      <rect x="12.8" y="8.5" width="3.4" height="11.5" rx="1" />
      <rect x="18.2" y="5" width="3.4" height="15" rx="1" />
    </svg>
  );
}

export function IconWifi({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className={className ?? "icon"} aria-hidden="true">
      <path d="M2.6 8.4a15 15 0 0 1 18.8 0" />
      <path d="M5.8 12.3a10 10 0 0 1 12.4 0" />
      <path d="M9.1 16.2a5 5 0 0 1 5.8 0" />
      <circle cx="12" cy="19.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBattery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 14" fill="none" className={className ?? "icon"} aria-hidden="true">
      <rect x="1" y="1" width="22" height="12" rx="3.4" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <rect x="3" y="3" width="17" height="8" rx="2" fill="currentColor" />
      <path d="M25 5v4a2.6 2.6 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
