import { useState, useMemo, useEffect, useCallback } from 'react'
import { emprendimientos } from '@/lib/emprendimientos'
import { CategoryFilter } from '@/components/shared/CategoryFilter'
import { SearchBar } from '@/components/shared/SearchBar'
import { EmprendimientoCard } from '@/components/cards/EmprendimientoCard'
import { Star, Percent, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'

export function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  
  // Carrusel 1 con autoplay manual
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  })
  
  // Carrusel 2 con autoplay manual
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  })
  
  const scrollPrev1 = useCallback(() => emblaApi1?.scrollPrev(), [emblaApi1])
  const scrollNext1 = useCallback(() => emblaApi1?.scrollNext(), [emblaApi1])
  const scrollPrev2 = useCallback(() => emblaApi2?.scrollPrev(), [emblaApi2])
  const scrollNext2 = useCallback(() => emblaApi2?.scrollNext(), [emblaApi2])
  
  // Autoplay para carrusel 1
  useEffect(() => {
    if (!emblaApi1) return
    
    const autoplay = setInterval(() => {
      emblaApi1.scrollNext()
    }, 4000)
    
    const stopAutoplay = () => clearInterval(autoplay)
    emblaApi1.on('pointerDown', stopAutoplay)
    
    return () => {
      clearInterval(autoplay)
      emblaApi1.off('pointerDown', stopAutoplay)
    }
  }, [emblaApi1])
  
  // Autoplay para carrusel 2
  useEffect(() => {
    if (!emblaApi2) return
    
    const autoplay = setInterval(() => {
      emblaApi2.scrollNext()
    }, 4500) // Diferente velocidad para variedad
    
    const stopAutoplay = () => clearInterval(autoplay)
    emblaApi2.on('pointerDown', stopAutoplay)
    
    return () => {
      clearInterval(autoplay)
      emblaApi2.off('pointerDown', stopAutoplay)
    }
  }, [emblaApi2])
  const debouncedSearch = useDebounce(searchQuery, 300)

  const counts = useMemo(() => {
    const categoryCounts: Record<string, number> = { total: emprendimientos.length }
    emprendimientos.forEach((e) => {
      categoryCounts[e.categoria] = (categoryCounts[e.categoria] || 0) + 1
    })
    return categoryCounts
  }, [])

  const filteredEmprendimientos = useMemo(() => {
    return emprendimientos.filter((e) => {
      const matchesCategory =
        selectedCategory === 'todos' || e.categoria === selectedCategory
      const matchesSearch =
        debouncedSearch === '' ||
        e.empresa.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.nombre.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.rubro.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.descripcion.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, debouncedSearch])

  const sortedEmprendimientos = useMemo(() => {
    return [...filteredEmprendimientos].sort((a, b) => {
      if (a.destacado && !b.destacado) return -1
      if (!a.destacado && b.destacado) return 1
      return a.empresa.localeCompare(b.empresa)
    })
  }, [filteredEmprendimientos])
  
  // Dividir en 2 mitades para los carruseles
  const midPoint = Math.ceil(sortedEmprendimientos.length / 2)
  const firstHalf = sortedEmprendimientos.slice(0, midPoint)
  const secondHalf = sortedEmprendimientos.slice(midPoint)

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 space-y-5">
        {/* Búsqueda y filtro en línea */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="w-full md:w-64">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              counts={counts}
            />
          </div>
        </div>
        
        {/* Contador y leyendas con mejor diseño */}
        <div className="bg-gradient-to-br from-stone-50 to-white rounded-xl border-2 border-stone-200 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-stone-200">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#4A9B9B] to-[#2A7B7B] rounded-lg shadow-md">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-black text-[#1B4D4D] leading-none">{sortedEmprendimientos.length}</p>
                <p className="text-xs text-stone-600 font-semibold">Emprendimientos</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-stone-300" />
            
            <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-50 to-amber-50 px-4 py-2 rounded-lg border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <Star className="h-5 w-5 fill-[#FFD700] text-[#FFD700] drop-shadow-sm" />
              <span className="text-sm font-bold text-amber-900">Destacados</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-2 rounded-lg border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <Percent className="h-5 w-5 text-[#16A34A] drop-shadow-sm" />
              <span className="text-sm font-bold text-green-900">Descuentos AR</span>
            </div>
          </div>
        </div>

        {/* 2 Carruseles para mobile, Grid para desktop */}
        {sortedEmprendimientos.length > 0 ? (
          <>
            {/* 2 Carruseles Mobile */}
            <div className="lg:hidden space-y-4">
              {/* Carrusel 1 */}
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef1}>
                  <div className="flex gap-3">
                    {firstHalf.map((emprendimiento) => (
                      <div
                        key={emprendimiento.id}
                        className="flex-[0_0_85%] min-w-0"
                      >
                        <EmprendimientoCard emprendimiento={emprendimiento} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-stone-200 hover:bg-white z-10"
                  onClick={scrollPrev1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-stone-200 hover:bg-white z-10"
                  onClick={scrollNext1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Carrusel 2 */}
              {secondHalf.length > 0 && (
                <div className="relative">
                  <div className="overflow-hidden" ref={emblaRef2}>
                    <div className="flex gap-3">
                      {secondHalf.map((emprendimiento) => (
                        <div
                          key={emprendimiento.id}
                          className="flex-[0_0_85%] min-w-0"
                        >
                          <EmprendimientoCard emprendimiento={emprendimiento} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-stone-200 hover:bg-white z-10"
                    onClick={scrollPrev2}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-stone-200 hover:bg-white z-10"
                    onClick={scrollNext2}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Grid Desktop */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {sortedEmprendimientos.map((emprendimiento, index) => (
                <div
                  key={emprendimiento.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <EmprendimientoCard emprendimiento={emprendimiento} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              No encontramos resultados
            </h3>
            <p className="text-muted-foreground text-lg">
              Probá con otra búsqueda o categoría
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
