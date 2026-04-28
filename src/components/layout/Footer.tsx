import { Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-[#1B4D4D] text-white py-6 border-t-2 border-[#4A9B9B]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo-arendurance.jpeg"
              alt="ArEndurance Team"
              width={48}
              height={48}
              className="rounded-lg shadow-md"
            />
            <div>
              <p className="font-bold text-base">ArEndurance Team</p>
              <p className="text-xs text-white/70">Salta, Argentina</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/80">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            <span>por <span className="font-semibold text-white">JNSIX</span></span>
          </div>

          <Button
            asChild
            size="sm"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          >
            <a href="https://wa.me/5493875145165" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Contactar</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
