import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-36">
      <div className="feather-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-52 top-10 h-[44rem] w-[44rem] rounded-full bg-violet-700/10 blur-[130px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-11rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow hero-reveal">Independent game studio</p>
          <h1 className="display-face hero-reveal hero-reveal-delay mt-7 text-[clamp(4.1rem,9vw,8.6rem)] font-normal leading-[.78] tracking-[-.065em]">
            Worlds worth
            <span className="mt-3 block italic text-violet-300">remembering.</span>
          </h1>
          <div className="hero-reveal hero-reveal-late mt-10 flex max-w-2xl flex-col gap-8 border-l border-violet-400/45 pl-6 sm:flex-row sm:items-end sm:justify-between md:pl-8">
            <p className="max-w-md text-base leading-7 text-white/55 md:text-lg">
              Zal Interactive creates expressive games shaped by bold ideas,
              enduring stories, and the thrill of discovering somewhere new.
            </p>
            <a href="#contact" className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[.16em] text-white">
              Begin a conversation
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition group-hover:border-violet-400 group-hover:bg-violet-500">
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:-mr-8">
          <div className="absolute inset-[9%] rounded-full border border-white/10" />
          <div className="absolute inset-[18%] rounded-full border border-violet-400/20" />
          <span className="absolute left-[7%] top-1/2 h-px w-[86%] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="absolute left-1/2 top-[7%] h-[86%] w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <Image src="/zal-mark.svg" alt="Zal Interactive emblem" fill priority className="mark-drift object-contain p-[13%] drop-shadow-[0_28px_65px_rgba(124,58,237,.22)]" />
          <p className="absolute bottom-[5%] right-[3%] text-right text-[.63rem] font-medium uppercase leading-5 tracking-[.28em] text-white/35">
            Raised by legend<br />built for what comes next
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between border-t border-white/10 pt-5 text-[.65rem] uppercase tracking-[.24em] text-white/30">
        <span>Stockholm · Sweden</span>
        <span>Scroll to discover</span>
      </div>
    </section>
  );
}
