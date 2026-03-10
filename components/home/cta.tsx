import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#faf7f2]">
      {/* Texture de fond (toile) */}
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMjBhMjAgMjAgMCAwIDEgMjAgMjAgMjAgMjAgMCAwIDEtNDAgMCAyMCAyMCAwIDAgMSAyMC0yMHoiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] repeat" />

      {/* Taches de peinture abstraites */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-12 md:p-16 border border-stone-200/70 shadow-2xl text-center">
          {/* Petit badge */}
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-stone-200/80 text-stone-700 ring-1 ring-inset ring-stone-400/30 shadow-md backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Rejoignez l&apos;atelier
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-balance mb-4">
            Prêt à libérer votre{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-linear-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent">
                créativité
              </span>
              {/* Trait de pinceau sous le mot */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 text-amber-500/40"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 Q30 0, 60 5 T120 5 T180 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            ?
          </h2>

          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Rejoignez des milliers d’artistes amateurs et confirmés. Accédez à tous les cours, échangez avec la communauté et développez votre talent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-stone-800 text-stone-100 rounded-2xl font-semibold text-lg shadow-xl shadow-stone-900/30 transition-all hover:bg-stone-700 hover:shadow-2xl hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/courses"
              className="px-8 py-4 text-lg font-semibold text-stone-700 hover:text-stone-900 transition-colors border-2 border-stone-300/50 rounded-2xl hover:border-stone-400/70 bg-white/30 backdrop-blur-sm"
            >
              Explorer les ateliers
            </Link>
          </div>

          {/* Petits arguments (facultatifs) */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Accès à vie aux cours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Certificat inclus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Communauté active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}