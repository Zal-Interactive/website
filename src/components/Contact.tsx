export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-y border-white/10 bg-[#0b0b10] px-6 py-28 md:px-10 md:py-40">
      <div className="feather-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Open a dialogue</p>
          <h2 className="display-face mt-8 text-6xl leading-[.9] tracking-[-.05em] md:text-8xl">
            Let’s make<br /><em className="text-violet-300">something rare.</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-8 text-white/45">
            Partnerships, opportunities, and thoughtful hellos are always welcome.
          </p>
          <a href="mailto:hello@zalinteractive.com" className="mt-12 inline-block border-b border-violet-400 pb-2 text-sm font-semibold uppercase tracking-[.16em] text-white transition hover:text-violet-300">
            hello@zalinteractive.com
          </a>
        </div>

        <form className="border-t border-white/15 pt-8" action="mailto:hello@zalinteractive.com" method="post" encType="text/plain">
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">Your name</span>
              <input name="name" required autoComplete="name" placeholder="Name" className="mt-3 w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-violet-400" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">Your email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="Email address" className="mt-3 w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-violet-400" />
            </label>
          </div>
          <label className="mt-10 block">
            <span className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">What’s on your mind?</span>
            <textarea name="message" rows={5} required placeholder="Tell us a little about it…" className="mt-3 w-full resize-none border-0 border-b border-white/15 bg-transparent px-0 py-4 text-base leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-violet-400" />
          </label>
          <button type="submit" className="group mt-10 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[.18em] text-white">
            Send message
            <span className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-lg transition group-hover:-translate-y-1 group-hover:bg-violet-500" aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
