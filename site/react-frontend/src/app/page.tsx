import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <Experience />
      <Research />
      <Projects />
      <Footer />
    </main>
  )
}

