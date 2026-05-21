export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-lg font-bold tracking-tight mb-1">
            <span className="text-violet-400">Zal</span>{" "}
            <span className="text-white/90">Interactive</span>
          </div>
          <p className="text-sm text-white/30">
            Crafting immersive worlds, one pixel at a time.
          </p>
        </div>

        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Zal Interactive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
