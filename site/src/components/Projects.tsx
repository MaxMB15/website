'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { projects } from '@/lib/projects'
import { Reveal } from '@/components/motion/Reveal'

const Projects = () => {
  return (
    <section id="projects" className="section-angle-top py-20 bg-white">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12">
          <h2 className="text-4xl font-bold text-center">Projects</h2>
        </Reveal>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 py-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full focus-visible:outline-none"
                >
                  <Card className="h-full overflow-hidden border-gray-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgb(58,123,244)]/40 group-hover:shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-[rgb(58,123,244)]">
                    <CardContent className="p-0">
                      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-center font-semibold transition-colors group-hover:text-[rgb(58,123,244)]">
                          {project.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-[rgb(58,123,244)] text-[rgb(58,123,244)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(58,123,244)] hover:text-white hover:shadow-md"
          >
            <Link href="/projects">More Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Projects
