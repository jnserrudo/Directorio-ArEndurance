import { StatsSection } from './StatsSection'

export function HeroSection() {
  return (
    <>
      {/* Navbar sticky */}
      <section className="sticky top-0 z-50 bg-gradient-to-r from-[#1B4D4D] to-[#4A9B9B] shadow-xl border-b-4 border-[#16A34A]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <img
                src="/logo-arendurance.jpeg"
                alt="AR"
                width={45}
                height={45}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h1 className="text-lg md:text-xl font-black text-white leading-tight">
                  ArEndurance
                </h1>
                <p className="text-xs text-white/80">Directorio de Emprendimientos</p>
              </div>
            </div>

            {/* Stats visibles */}
            <div className="hidden md:flex items-center gap-3">
              <StatsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Introducción limpia */}
      <section className="bg-stone-50 border-b-2 border-stone-200">
        <div className="max-w-7xl mx-auto px-2 py-3">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D4D] leading-tight">
              Directorio de Emprendimientos
            </h2>
            <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Descubrí y apoyá los negocios locales de la familia <strong className="text-[#1B4D4D]">ArEndurance</strong> en Salta.
              Productos exclusivos y descuentos especiales para la comunidad.
            </p>
            {/* Stats mobile */}
            <div className="flex md:hidden items-center justify-center gap-2">
              <StatsSection />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
