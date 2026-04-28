import { emprendimientos } from '@/lib/emprendimientos'
import { Users, Store, Percent, Heart } from 'lucide-react'

export function StatsSection() {

  const totalEmprendimientos = emprendimientos.length
  const conDescuento = emprendimientos.filter((e) => e.descuento).length
  const categorias = new Set(emprendimientos.map((e) => e.categoria)).size

  const stats = [
    {
      icon: Store,
      value: totalEmprendimientos,
      label: 'Emprendimientos',
      color: '#4A9B9B',
    },
    {
      icon: Percent,
      value: conDescuento,
      label: 'Con descuentos AR',
      color: '#16A34A',
    },
    {
      icon: Users,
      value: categorias,
      label: 'Categorías',
      color: '#F7DC6F',
    },
    {
      icon: Heart,
      value: '100%',
      label: 'Familia AR',
      color: '#EAB308',
    },
  ]

  return (
    <>
      {stats.slice(0, 2).map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm"
          style={{ backgroundColor: stat.color }}
        >
          <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-md">
            <stat.icon className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-black text-white leading-none">{stat.value}</span>
            <span className="text-[10px] font-semibold text-white uppercase tracking-wide">{stat.label}</span>
          </div>
        </div>
      ))}
    </>
  )
}
