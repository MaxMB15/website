'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { experiences } from '@/lib/experience';

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedExperiences = isExpanded ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Experience
        </h2>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence initial={false}>
            {displayedExperiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="mb-8 overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <CardTitle>{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-[rgb(58,123,244)]">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {exp.period}
                    </p>
                    <p>{exp.description}</p>
                  </CardContent>
                </Card>
                {index < displayedExperiences.length - 1 && (
                  <motion.div
                    className="flex justify-center my-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.3,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-0.5 h-8 bg-gradient-to-b from-[rgb(58,123,244)] to-transparent"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="group"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="ml-2 h-4 w-4 text-[rgb(58,123,244)] group-hover:translate-y-[-2px] transition-transform" />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown className="ml-2 h-4 w-4 text-[rgb(58,123,244)] group-hover:translate-y-[2px] transition-transform" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

