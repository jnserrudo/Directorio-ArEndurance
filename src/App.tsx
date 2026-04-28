import { HeroSection } from '@/components/sections/HeroSection'
import { DirectorySection } from '@/components/sections/DirectorySection'
import { SuggestionsSection } from '@/components/sections/SuggestionsSection'
import { Footer } from '@/components/layout/Footer'

function App() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DirectorySection />
      <SuggestionsSection />
      <Footer />
    </main>
  )
}

export default App
