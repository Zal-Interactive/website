const principles = [
  {
    number: "01",
    title: "Strange beginnings",
    body: "We follow ideas with a pulse—especially the ones that do not fit neatly anywhere else.",
  },
  {
    number: "02",
    title: "Earned wonder",
    body: "Every world, mechanic, and moment should reward curiosity and respect the player’s attention.",
  },
  {
    number: "03",
    title: "Enduring craft",
    body: "We make with care, test with honesty, and keep refining until the experience feels inevitable.",
  },
];

export default function Studio() {
  return (
    <>
      <section id="studio" className="relative overflow-hidden border-t border-white/10 px-6 py-28 md:px-10 md:py-40">
        <div className="absolute -left-60 top-1/4 h-[35rem] w-[35rem] rounded-full bg-violet-800/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Our namesake</p>
            <p className="mt-8 max-w-xs text-sm leading-6 text-white/35">
              Zal was born unlike anyone before him. The Simurgh saw possibility
              where others saw difference—and raised him above the ordinary.
            </p>
          </div>

          <div>
            <h2 className="display-face max-w-4xl text-5xl leading-[.95] tracking-[-.045em] text-[#f4f0e8] md:text-7xl lg:text-[5.5rem]">
              We believe the unusual is often where
              <em className="text-violet-300"> the unforgettable begins.</em>
            </h2>
            <div className="mt-16 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <p className="text-lg leading-8 text-white/60">
                Our name carries an old story of courage, transformation, and
                the wisdom to nurture what the world has not seen before.
              </p>
              <p className="text-lg leading-8 text-white/60">
                That spirit guides our games: distinct in voice, generous in
                imagination, and built to stay with players after the screen
                goes dark.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="px-6 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between border-b border-white/10 pb-7">
            <p className="eyebrow">How we work</p>
            <p className="hidden text-xs uppercase tracking-[.22em] text-white/25 sm:block">The Zal standard</p>
          </div>
          <div className="grid md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.number} className="group border-b border-white/10 py-10 md:min-h-[22rem] md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="text-xs font-semibold tracking-[.2em] text-violet-400">{item.number}</span>
                <h3 className="display-face mt-20 text-4xl tracking-[-.03em] md:mt-28">{item.title}</h3>
                <p className="mt-5 max-w-sm leading-7 text-white/45">{item.body}</p>
                <div className="mt-8 h-px w-8 bg-violet-400 transition-all duration-500 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
