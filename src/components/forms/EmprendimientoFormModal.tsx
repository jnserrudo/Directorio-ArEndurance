import { useState } from 'react'
import { categorias } from '@/lib/emprendimientos'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Store,
  Send,
  User,
  Building2,
  Tag,
  FileText,
  MapPin,
  Phone,
  Instagram,
  Percent,
  Info,
  FolderOpen,
  Eye,
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react'

interface FormData {
  nombre: string
  empresa: string
  rubro: string
  descripcion: string
  direccion: string
  telefono: string
  instagram: string
  descuento: string
  otros: string
  categoria: string
}

const INITIAL_FORM: FormData = {
  nombre: '',
  empresa: '',
  rubro: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  instagram: '',
  descuento: '',
  otros: '',
  categoria: '',
}

const FIELD_CONFIG = [
  { key: 'nombre' as const, label: 'Tu nombre', icon: User, placeholder: 'Ej: María López', example: 'El nombre de la persona de contacto', required: true },
  { key: 'empresa' as const, label: 'Nombre del emprendimiento', icon: Building2, placeholder: 'Ej: FitLife Salta', example: 'El nombre comercial de tu negocio', required: true },
  { key: 'rubro' as const, label: 'Rubro / Actividad', icon: Tag, placeholder: 'Ej: Gimnasio funcional y entrenamiento personal', example: 'Qué hacés o qué vendés en pocas palabras', required: true },
  { key: 'descripcion' as const, label: 'Descripción completa', icon: FileText, placeholder: 'Ej: Entrenamiento funcional, cardio y fuerza. Entrenamientos personalizados...', example: 'Describí todo lo que ofrecés. Cuanto más completo, mejor.', required: true, textarea: true },
  { key: 'direccion' as const, label: 'Dirección (si tenés local)', icon: MapPin, placeholder: 'Ej: Av. Belgrano 1234, Salta. O dejalo vacío si no tenés', example: 'Si no tenés local físico, dejalo vacío', required: false },
  { key: 'telefono' as const, label: 'Teléfono de contacto', icon: Phone, placeholder: 'Ej: 3871234567 (sin 0 ni 15)', example: 'Número de WhatsApp para que te contacten', required: false },
  { key: 'instagram' as const, label: 'Instagram', icon: Instagram, placeholder: 'Ej: miemprendimiento (sin @)', example: 'Tu usuario de Instagram sin el arroba', required: false },
  { key: 'descuento' as const, label: 'Descuento para familia AR', icon: Percent, placeholder: 'Ej: 10% por ser familia AR en todos los productos', example: 'Qué descuento ofrecés a los miembros ArEndurance', required: false },
  { key: 'otros' as const, label: 'Información adicional', icon: Info, placeholder: 'Ej: Envíos a domicilio, horarios de atención...', example: 'Cualquier otra info útil: horarios, envíos, etc.', required: false, textarea: true },
]

const CATEGORIAS_SELECT = categorias.filter(c => c.id !== 'todos')

export function EmprendimientoFormModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [showPreview, setShowPreview] = useState(false)

  const updateField = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const isValid = form.nombre && form.empresa && form.rubro && form.descripcion && form.categoria

  const handleSubmit = () => {
    if (!isValid) return

    const nextId = Date.now().toString()
    const message = `*NUEVO EMPRENDIMIENTO - ArEndurance*

*Datos para agregar al directorio:*

*Nombre:* ${form.nombre}
*Empresa:* ${form.empresa}
*Rubro:* ${form.rubro}
*Descripcion:* ${form.descripcion}
*Direccion:* ${form.direccion || '(Sin direccion)'}
*Telefono:* ${form.telefono || '(Sin telefono)'}
*Instagram:* ${form.instagram || '(Sin Instagram)'}
*Descuento AR:* ${form.descuento || '(Sin descuento)'}
*Otros:* ${form.otros || '(Sin informacion adicional)'}
*Categoria:* ${CATEGORIAS_SELECT.find(c => c.id === form.categoria)?.label || form.categoria}

---

*Codigo para agregar:*

id: "${nextId}",
nombre: "${form.nombre}",
empresa: "${form.empresa}",
rubro: "${form.rubro}",
descripcion: "${form.descripcion}",
direccion: "${form.direccion}",
telefono: "${form.telefono}",
instagram: "${form.instagram}",
descuento: "${form.descuento}",
otros: "${form.otros}",
categoria: "${form.categoria}",

---

ArEndurance Team`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/5493874036870?text=${encoded}`, '_blank')
    setOpen(false)
    setForm(INITIAL_FORM)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-2xl max-h-[90vh] p-0 bg-white flex flex-col">
        {/* Header sticky con X fija */}
        <div className="sticky top-0 z-50 bg-white border-b-2 border-stone-100 p-4 sm:p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl text-[#1B4D4D]">
                <Store className="h-5 w-5 text-[#4A9B9B]" />
                Sumá tu emprendimiento
              </DialogTitle>
              <p className="text-sm text-stone-600 mt-1">
                Completá los datos y te enviamos la info por WhatsApp para agregarte al directorio.
              </p>
            </div>
            <DialogClose asChild>
              <button className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors text-stone-500 hover:text-stone-800">
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </button>
            </DialogClose>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto px-4 sm:px-6 py-2 space-y-5">
          {FIELD_CONFIG.map(({ key, label, icon: Icon, placeholder, example, required, textarea }) => (
            <div key={key}>
              <label className="flex items-center gap-2 text-sm font-bold text-[#1B4D4D] mb-2">
                <Icon className="h-4 w-4 text-[#4A9B9B]" />
                {label}
                {required && <span className="text-red-500">*</span>}
                {!required && <span className="text-stone-400 font-normal text-xs">(opcional)</span>}
              </label>
              {textarea ? (
                <Textarea
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[80px] border-2 border-stone-200 focus:border-[#4A9B9B] focus:ring-2 focus:ring-[#4A9B9B]/20 rounded-lg text-base resize-none placeholder:text-stone-400"
                />
              ) : (
                <Input
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                  className="h-12 border-2 border-stone-200 focus:border-[#4A9B9B] focus:ring-2 focus:ring-[#4A9B9B]/20 rounded-lg text-base placeholder:text-stone-400"
                />
              )}
              <p className="text-xs text-stone-500 mt-1.5 flex items-start gap-1">
                <Info className="h-3 w-3 shrink-0 mt-0.5" />
                {example}
              </p>
            </div>
          ))}

          {/* Categoría */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#1B4D4D] mb-2">
              <FolderOpen className="h-4 w-4 text-[#4A9B9B]" />
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              value={form.categoria}
              onChange={(e) => updateField('categoria', e.target.value)}
              className="w-full h-12 px-4 bg-white border-2 border-stone-200 focus:border-[#4A9B9B] focus:ring-2 focus:ring-[#4A9B9B]/20 rounded-lg text-base text-[#1B4D4D] font-medium appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234A9B9B' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
            >
              <option value="">Seleccioná una categoría...</option>
              {CATEGORIAS_SELECT.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <p className="text-xs text-stone-500 mt-1.5 flex items-start gap-1">
              <Info className="h-3 w-3 shrink-0 mt-0.5" />
              Elegí la categoría que mejor describe tu emprendimiento
            </p>
          </div>

          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#4A9B9B] hover:text-[#1B4D4D] transition-colors border-2 border-dashed border-stone-300 hover:border-[#4A9B9B] rounded-lg"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? 'Ocultar preview' : 'Ver cómo quedaría tu card'}
          </button>

          {/* Preview */}
          {showPreview && (
            <div className="bg-stone-50 rounded-xl border-2 border-stone-200 p-4">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Preview de tu card</p>
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 space-y-2">
                <p className="font-bold text-[#1B4D4D] text-lg">{form.empresa || 'Tu Empresa'}</p>
                <p className="text-sm text-stone-600">{form.rubro || 'Rubro de tu actividad'}</p>
                <p className="text-sm text-stone-700 leading-relaxed">{form.descripcion || 'Descripción de tu emprendimiento...'}</p>
                {form.descuento && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-md text-xs font-bold">
                    <Percent className="h-3 w-3" />
                    {form.descuento}
                  </div>
                )}
                {form.categoria && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#4A9B9B]/10 text-[#1B4D4D] rounded-md text-xs font-bold">
                    {CATEGORIAS_SELECT.find(c => c.id === form.categoria)?.label}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="sticky bottom-0 bg-white pt-2 pb-1 space-y-3">
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-2 border-stone-300 hover:border-stone-400 text-stone-700 font-semibold rounded-xl"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-[2] h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar por WhatsApp
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {!isValid && (
              <p className="text-center text-sm text-stone-500">
                Completá los campos obligatorios (*) para poder enviar
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#4A9B9B]/5 rounded-lg border border-[#4A9B9B]/20">
            <CheckCircle2 className="h-5 w-5 text-[#4A9B9B] shrink-0 mt-0.5" />
            <p className="text-sm text-stone-700 leading-relaxed">
              <strong>¿Qué pasa después?</strong> Al enviar, se abre WhatsApp con todos tus datos ya listos. Solo tenés que tocar "Enviar" y nosotros te agregamos al directorio.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
