import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import manifest from "../../../public/docs/manifest.json";

export const metadata: Metadata = {
  title: "Unity Packages | Zal Interactive",
  description: "Documentation and sample guides for Zal Interactive’s Unity packages.",
};

export default function UnityPackages() {
  return (
    <>
      <Navbar overlay={false} />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:px-10 md:pt-24">
        <p className="text-xs font-medium uppercase tracking-[.22em] text-[var(--amber)]">Tools for your next project</p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">Unity Packages</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--silver)]">Explore our Unity tools, read the documentation, and get started with practical sample guides.</p>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {manifest.packages.map((pkg) => (
            <li key={pkg.id}>
              <a href={pkg.url} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[.025] p-7 transition hover:border-[var(--violet)]/60 hover:bg-[var(--violet)]/[.07]">
                <h2 className="text-xl font-medium tracking-tight">{pkg.title}</h2>
                <p className="mt-3 break-all font-mono text-xs leading-6 text-[var(--silver)]">{pkg.id}</p>
                <p className="mt-5 text-sm text-[var(--silver)]">{pkg.samples.length > 0 ? `Documentation · ${pkg.samples.length} sample guides` : "Documentation & quick start"}</p>
                <span className="mt-9 text-sm font-medium text-[var(--lilac)]">View documentation <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
