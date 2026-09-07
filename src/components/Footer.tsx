import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/zal-mark.svg" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
          <div className="text-xs font-semibold uppercase leading-5 tracking-[.2em]">
            Zal<br /><span className="text-white/35">Interactive</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-xs uppercase tracking-[.18em] text-white/30 sm:items-end">
          <a href="#top" className="transition hover:text-white">Return to the sky ↑</a>
          <p>© {new Date().getFullYear()} Zal Interactive · Stockholm</p>
        </div>
      </div>
    </footer>
  );
}
