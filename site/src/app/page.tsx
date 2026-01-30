import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" role="main">
      <Hero />
      <AboutMe />
      <Experience />
      <Skills />
      <Research />
      <Projects />
      <Footer />
    </main>
  )
}

