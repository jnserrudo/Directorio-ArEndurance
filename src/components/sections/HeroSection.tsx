import { StatsSection } from './StatsSection'
import { Store, ArrowDown } from 'lucide-react'

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('sumar-emprendimiento')?.scrollIntoView({ behavior: 'smooth' })
  }

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

            {/* Botón ancla desktop */}
            <button
              onClick={scrollToForm}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-lg font-semibold text-sm transition-all border border-white/20 hover:border-white/40"
            >
              <Store className="h-4 w-4" />
              Sumar mi emprendimiento
              <ArrowDown className="h-3 w-3" />
            </button>

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

            {/* Botón ancla mobile */}
            <button
              onClick={scrollToForm}
              className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1B4D4D] hover:bg-[#2A6B6B] text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 mt-2"
            >
              <Store className="h-4 w-4" />
              ¿Tenés un emprendimiento? Sumalo acá
              <ArrowDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
