import { useState } from 'react'
import { Emprendimiento } from '@/lib/emprendimientos'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Star,
  Percent,
  MessageCircle,
  MapPin,
  Instagram,
  Eye,
} from 'lucide-react'

interface EmprendimientoCardProps {
  emprendimiento: Emprendimiento
}

export function EmprendimientoCard({ emprendimiento }: EmprendimientoCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const {
    nombre,
    empresa,
    rubro,
    descripcion,
    direccion,
    telefono,
    instagram,
    descuento,
    otros,
    destacado,
  } = emprendimiento

  const whatsappLink = telefono
    ? `https://wa.me/549${telefono.replace(/\D/g, '')}`
    : null
  const instagramLink = instagram
    ? `https://instagram.com/${instagram}`
    : null

  return (
    <>
    <Card className="group relative flex flex-col h-full overflow-hidden bg-white border-2 border-stone-200 hover:border-[#4A9B9B] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Barra de color superior */}
      <div className={`h-1.5 ${destacado ? 'bg-[#FFD700]' : descuento ? 'bg-[#16A34A]' : 'bg-[#4A9B9B]'}`} />
      
      {/* Content principal */}
      <div className="flex-1 flex flex-col p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-8 bg-[#4A9B9B] rounded-full shrink-0" />
              <span className="text-[10px] font-bold text-[#4A9B9B] uppercase tracking-wider">{rubro}</span>
            </div>
            <h3 className="font-black text-lg text-[#1B4D4D] leading-tight mb-1 group-hover:text-[#4A9B9B] transition-colors">
              {empresa}
            </h3>
            <p className="text-xs text-stone-600 font-medium">{nombre}</p>
          </div>
          
          {/* Badges flotantes */}
          <div className="flex flex-col gap-1.5 shrink-0">
            {destacado && (
              <div className="bg-[#FFD700] rounded-full p-2 shadow-md">
                <Star className="h-4 w-4 fill-white text-white" />
              </div>
            )}
            {descuento && (
              <div className="bg-[#16A34A] rounded-full p-2 shadow-md">
                <Percent className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Descripción completa visible */}
        <div className="mb-3">
          <p className="text-sm text-stone-600 leading-relaxed">
            {descripcion}
          </p>
        </div>

        {/* Descuento destacado */}
        {descuento && (
          <div className="mb-3 p-3 bg-green-50 border-l-4 border-[#16A34A] rounded-r-lg">
            <div className="flex items-start gap-2">
              <Percent className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <p className="text-sm text-[#16A34A] font-semibold leading-snug">
                {descuento}
              </p>
            </div>
          </div>
        )}

        {/* Info visible - Texto completo */}
        <div className="space-y-2.5 mb-3 flex-1">
          {direccion && (
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="flex items-center justify-center w-8 h-8 bg-[#4A9B9B] rounded-lg shrink-0">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700 leading-relaxed">{direccion}</p>
              </div>
            </div>
          )}
          {otros && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2.5">
                <div className="bg-amber-500 p-1.5 rounded-md shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-amber-900 leading-relaxed">
                  {otros}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Botones estandarizados - siempre 3 botones del mismo tamaño */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          {/* Botón 1: WhatsApp */}
          {whatsappLink ? (
            <Button
              asChild
              size="icon"
              className="h-11 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-sm hover:shadow-md transition-all"
              title="Contactar por WhatsApp"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          ) : (
            <Button
              size="icon"
              disabled
              className="h-11 w-full bg-stone-100 text-stone-400 cursor-not-allowed"
              title="WhatsApp no disponible"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          )}
          
          {/* Botón 2: Instagram */}
          {instagramLink ? (
            <Button
              asChild
              size="icon"
              className="h-11 w-full bg-[#E4405F] hover:bg-[#D62E4F] text-white shadow-sm hover:shadow-md transition-all"
              title="Ver Instagram"
            >
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          ) : (
            <Button
              size="icon"
              disabled
              className="h-11 w-full bg-stone-100 text-stone-400 cursor-not-allowed"
              title="Instagram no disponible"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          )}
          
          {/* Botón 3: Ver más */}
          <Button
            size="icon"
            onClick={() => setShowDetails(true)}
            className="h-11 w-full bg-[#1B4D4D] hover:bg-[#4A9B9B] text-white shadow-sm hover:shadow-md transition-all"
            title="Ver más información"
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>

    {/* Modal con información completa */}
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b-2 border-stone-100 pb-4">
          <div className="flex gap-2 mb-3">
            {destacado && (
              <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white text-sm font-bold">
                <Star className="h-4 w-4 mr-1.5 fill-current" />
                Destacado
              </Badge>
            )}
            {descuento && (
              <Badge className="bg-gradient-to-r from-[#16A34A] to-[#10B981] text-white text-sm font-bold">
                <Percent className="h-4 w-4 mr-1.5" />
                Descuento AR
              </Badge>
            )}
          </div>
          <DialogTitle className="text-3xl font-black text-[#1B4D4D] mb-2">{empresa}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {nombre} • {rubro}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Descripción completa */}
          <div>
            <h4 className="font-semibold text-sm text-[#1B4D4D] mb-2">Descripción</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{descripcion}</p>
          </div>

          {/* Descuento */}
          {descuento && (
            <div className="bg-gradient-to-br from-[#16A34A]/10 to-[#16A34A]/5 border border-[#16A34A]/30 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-[#16A34A] mb-2 flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Descuento Exclusivo AR
              </h4>
              <p className="text-sm text-[#16A34A]">{descuento}</p>
            </div>
          )}

          {/* Información de contacto */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#1B4D4D]">Contacto</h4>
            {telefono && (
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-[#25D366]/10 rounded-full p-2">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                </div>
                <span className="font-medium">{telefono}</span>
              </div>
            )}
            {direccion && (
              <div className="flex items-start gap-3 text-sm">
                <div className="bg-[#4A9B9B]/10 rounded-full p-2">
                  <MapPin className="h-4 w-4 text-[#4A9B9B]" />
                </div>
                <span className="text-muted-foreground">{direccion}</span>
              </div>
            )}
            {instagram && (
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-[#E4405F]/10 rounded-full p-2">
                  <Instagram className="h-4 w-4 text-[#E4405F]" />
                </div>
                <span className="font-medium">@{instagram}</span>
              </div>
            )}
          </div>

          {/* Información adicional */}
          {otros && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-[#1B4D4D] mb-2">Información adicional</h4>
              <p className="text-sm text-muted-foreground italic">{otros}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2">
            {whatsappLink && (
              <Button
                asChild
                className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar por WhatsApp
                </a>
              </Button>
            )}
            {instagramLink && (
              <Button
                asChild
                variant="outline"
                className="flex-1 border-[#E4405F] text-[#E4405F] hover:bg-[#E4405F] hover:text-white"
              >
                <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mr-2" />
                  Ver Instagram
                </a>
              </Button>
            )}
            {!whatsappLink && !instagramLink && telefono && (
              <Button
                asChild
                className="flex-1 bg-[#1B4D4D] hover:bg-[#4A9B9B] text-white"
              >
                <a href={`tel:${telefono}`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Llamar ahora
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
