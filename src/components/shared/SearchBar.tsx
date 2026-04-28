import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors">
        <Search className={`h-5 w-5 transition-colors ${value ? 'text-[#4A9B9B]' : 'text-stone-400 group-hover:text-[#4A9B9B]'}`} />
      </div>
      <Input
        type="text"
        placeholder="Buscar emprendimientos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-12 h-12 bg-white border-2 border-stone-200 hover:border-stone-300 focus:border-[#4A9B9B] focus:ring-2 focus:ring-[#4A9B9B]/20 rounded-lg text-base font-medium shadow-sm hover:shadow-md focus:shadow-md transition-all placeholder:text-stone-400 touch-manipulation"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-stone-400 hover:text-white hover:bg-[#4A9B9B] rounded-full transition-all"
          onClick={() => onChange('')}
          title="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
