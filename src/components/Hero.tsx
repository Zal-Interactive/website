import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative grid min-h-dvh place-items-center overflow-hidden px-6 py-28">
      <div className="absolute left-1/2 top-1/2 h-[min(78vw,42rem)] w-[min(78vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.06]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[min(58vw,31rem)] w-[min(58vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--violet)]/[.07] blur-3xl" aria-hidden="true" />
      <span className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[.055] to-transparent" aria-hidden="true" />
      <span className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/[.055] to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <Image
          src="/zal-mark.svg"
          alt="Zal Interactive"
          width={460}
          height={460}
          priority
          className="arrive h-auto w-[min(66vw,25rem)] drop-shadow-[0_30px_70px_rgba(121,87,232,.18)]"
        />
        <div className="arrive arrive-late mt-8">
          <h1 className="text-[clamp(1.8rem,4vw,3.15rem)] font-medium tracking-[-.035em] text-[var(--ivory)]">
            Zal Interactive
          </h1>
          <p className="mt-3 text-sm tracking-[.08em] text-[var(--silver)] md:text-base">
            Independent game studio · Stockholm
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 h-1.5 w-1.5 rounded-full bg-[var(--amber)] md:bottom-8 md:left-10" aria-hidden="true" />
      <p className="absolute bottom-6 right-6 text-[.65rem] uppercase tracking-[.2em] text-white/25 md:bottom-8 md:right-10">
        © {new Date().getFullYear()}
      </p>
    </section>
  );
}
