export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="text-violet-400 text-sm font-medium tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-white/50 mt-4 text-lg">
            Interested in collaborating, joining our team, or just want to say
            hi? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-white/40 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm text-white/40 mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
            />
          </div>
          <button className="w-full px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-violet-600/25">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
