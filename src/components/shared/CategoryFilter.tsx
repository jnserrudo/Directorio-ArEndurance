import { categorias } from '@/lib/emprendimientos'
import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown, Filter } from 'lucide-react'

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
  counts: Record<string, number>
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  const selectedCategory = categorias.find(cat => cat.id === selected)
  const selectedCount = selected === 'todos' ? counts.total : counts[selected] || 0

  return (
    <Select.Root value={selected} onValueChange={onSelect}>
      <Select.Trigger className="w-full h-12 px-4 bg-white border-2 border-stone-200 hover:border-[#4A9B9B] focus:border-[#4A9B9B] focus:ring-2 focus:ring-[#4A9B9B]/20 rounded-lg text-base font-semibold text-[#1B4D4D] cursor-pointer hover:shadow-md focus:shadow-md transition-all shadow-sm touch-manipulation flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-[#4A9B9B] shrink-0" />
          <Select.Value>
            {selectedCategory?.label} ({selectedCount})
          </Select.Value>
        </div>
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-[#4A9B9B]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white rounded-lg shadow-2xl border-2 border-stone-200 overflow-hidden z-50 w-[var(--radix-select-trigger-width)]">
          <Select.Viewport className="p-1">
            {categorias.map((cat) => {
              const catCount = cat.id === 'todos' ? counts.total : counts[cat.id] || 0
              return (
                <Select.Item
                  key={cat.id}
                  value={cat.id}
                  className="relative flex items-center justify-between px-8 py-3 rounded-md text-base text-[#1B4D4D] cursor-pointer outline-none select-none hover:bg-[#4A9B9B]/10 focus:bg-[#4A9B9B]/10 data-[state=checked]:bg-[#4A9B9B]/20 data-[state=checked]:font-bold transition-colors"
                >
                  <Select.ItemText>
                    <span className="font-medium">{cat.label}</span>
                    <span className="ml-2 text-sm text-stone-500">({catCount})</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2">
                    <Check className="h-5 w-5 text-[#4A9B9B]" />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
