import Image from "next/image";

export default function Navbar({ overlay = true }: { overlay?: boolean }) {
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0" : "relative"} z-20`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6 md:px-10 md:py-8">
        <a href="/" className="flex items-center gap-3" aria-label="Zal Interactive home">
          <Image src="/zal-mark.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" priority />
          <span className="text-xs font-semibold uppercase tracking-[.22em] text-[var(--ivory)]">
            Zal Interactive
          </span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <a href="/unity-packages" className="border-b border-[var(--amber)]/60 pb-1 text-xs font-medium uppercase tracking-[.18em] text-[var(--silver)] transition hover:text-[var(--ivory)]">
            Unity Packages
          </a>
          <a href="mailto:hello@zalinteractive.com" className="border-b border-[var(--amber)]/60 pb-1 text-xs font-medium uppercase tracking-[.18em] text-[var(--silver)] transition hover:text-[var(--ivory)]">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
