import Image from "next/image";
import Link from "next/link";
import { Palette, Brush } from "lucide-react";

export default function HeroSection() {
  return (
    <main className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#faf7f2]">
      {/* Texture de fond (toile) - visible sur tous */}
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMjBhMjAgMjAgMCAwIDEgMjAgMjAgMjAgMjAgMCAwIDEtNDAgMCAyMCAyMCAwIDAgMSAyMC0yMHoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] repeat opacity-30" />

      {/* Traits de pinceau abstraits - cachés sur mobile */}
      <div className="hidden md:block absolute top-20 left-0 -z-20 h-96 w-96 rotate-12 bg-amber-200/30 blur-3xl rounded-full" />
      <div className="hidden md:block absolute bottom-40 right-0 -z-20 h-80 w-80 -rotate-12 bg-indigo-200/30 blur-3xl rounded-full" />
      <div className="hidden md:block absolute top-1/2 left-1/4 -z-20 h-64 w-64 bg-rose-200/20 blur-2xl rounded-full" />

      {/* Éclaboussures - cachées sur mobile */}
      <div className="hidden md:block absolute top-10 right-20 -z-20 h-40 w-40 border-4 border-amber-300/30 rounded-full blur-sm" />
      <div className="hidden md:block absolute bottom-20 left-20 -z-20 h-32 w-32 border-2 border-indigo-300/30 rounded-full blur" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Colonne texte */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Badge palette */}
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-stone-200/80 text-stone-700 ring-1 ring-inset ring-stone-400/30 shadow-md backdrop-blur-sm">
              <Palette className="w-4 h-4 mr-2" />
              L&apos;atelier numérique
            </div>

            {/* Titre avec effet pinceau - suppression du inline-block */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Apprenez l&apos;Art <br />
              <span className="relative whitespace-nowrap">
                en toute simplicité
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 text-amber-500/70"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5 C 30 0, 70 10, 100 5 C 130 0, 170 10, 200 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-stone-600 leading-relaxed">
              Explorez les techniques des grands maîtres, expérimentez avec les
              outils modernes et laissez parler votre créativité.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/courses"
                className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-stone-800 text-stone-100 rounded-2xl font-semibold text-base md:text-lg shadow-xl shadow-stone-900/30 transition-all hover:bg-stone-700 hover:shadow-2xl hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Commencer le voyage</span>
                <span className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/gallery"
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/50 backdrop-blur-sm rounded-2xl font-semibold text-base md:text-lg text-stone-700 transition-all hover:bg-white/70 hover:scale-105 active:scale-95 border border-stone-300/50 shadow-lg"
              >
                Voir la galerie
              </Link>
            </div>
          </div>

          {/* Colonne image (le tableau) */}
          <div className="relative lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            {/* Cadre rustique adaptatif */}
            <div className="hidden lg:block absolute -inset-3 bg-stone-300/60 rounded-[2.5rem] blur-sm" />
            <div className="hidden lg:block absolute -inset-1 bg-stone-100 rounded-[2.5rem] shadow-2xl" />

            <div className="relative w-full max-w-lg lg:max-w-none group">
              <Image
                src="/hero.png"
                alt="Artiste en pleine création dans son atelier"
                width={800}
                height={1000}
                className="relative rounded-3xl md:rounded-[2.5rem] object-cover h-full w-full shadow-inner border-4 border-stone-200"
                priority
              />

              {/* Étiquette "Atelier du moment" repositionnée pour mobile */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-amber-100/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg border border-amber-300 rotate-2 md:rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-1 md:gap-2">
                  <Brush className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-700" />
                  <span className="text-xs md:text-sm font-medium text-amber-800">
                    Atelier du moment
                  </span>
                </div>
              </div>

              {/* Petite touche de peinture */}
              <div className="absolute -bottom-2 -left-2 w-12 h-12 md:w-16 md:h-16 bg-amber-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}