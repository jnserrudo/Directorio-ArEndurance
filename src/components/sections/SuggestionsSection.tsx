import { camposSugeridos } from '@/lib/emprendimientos'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, CheckCircle2, Plus } from 'lucide-react'

export function SuggestionsSection() {
  return (
    <section className="py-8 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="bg-white border border-stone-200 shadow-sm overflow-hidden">
          <CardHeader className="text-center pb-4 pt-5 bg-white border-b border-stone-200">
            <Badge className="w-fit mx-auto bg-[#4A9B9B]/10 text-[#1B4D4D] mb-3 px-3 py-1 border-0 text-xs font-semibold">
              <Lightbulb className="h-3 w-3 mr-1.5" />
              Para Emprendedores
            </Badge>
            <CardTitle className="text-xl md:text-2xl text-[#1B4D4D] font-bold">
              Mejorá tu Perfil
            </CardTitle>
            <p className="text-stone-600 mt-2 text-sm max-w-2xl mx-auto">
              Agregá estos datos para que tu emprendimiento destaque más
            </p>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 gap-3">
              {camposSugeridos.map((sugerencia, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-stone-50 border border-stone-200 hover:border-[#4A9B9B] transition-all text-center"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-[#4A9B9B]/10 rounded-lg shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-[#4A9B9B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B4D4D] mb-1 text-xs">
                      {sugerencia.campo}
                    </p>
                    <p className="text-[10px] text-stone-600 leading-snug">
                      {sugerencia.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-[#4A9B9B]/5 rounded-lg border border-[#4A9B9B]/20">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-[#1B4D4D] rounded-lg shrink-0">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1B4D4D] mb-1 text-base">
                    ¿Querés sumar tu emprendimiento?
                  </p>
                  <p className="text-sm text-stone-600">
                    Contactanos y te agregamos al directorio de la familia ArEndurance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
