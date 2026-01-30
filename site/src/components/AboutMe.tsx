'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const INTRO = `Hello! I'm Max Boksem, a software engineer and researcher. I grew up around the tech scene in Seattle, Washington, USA. Since I was a kid I've been captivated by how technology works under the hood.

That led me to take every tech class my high school offered, plus summer programming courses at nearby universities.`;

const REST = `After high school I moved to Montréal to study Computer Science at McGill University—working on everything from AI and robotics to web dev and databases.

After graduating I joined Cisco in Ottawa, Canada, as a software engineer. I dove into the industry there, learning from experienced engineers and working on network security and microservices that keep day-to-day operations running.

After over 3 years at Cisco I wanted to learn even more, so I moved to the Netherlands to study Software Engineering at the University of Amsterdam. There I got properly exposed to the research side of the field.

I finished my master's at UvA last year and I'm now working on my own research projects, partly with research groups at the university.

Outside of work I'm into running, football (soccer), tennis, building things, traveling the world, and photography.`;

const AboutMe = () => {
	const [expanded, setExpanded] = useState(false);

	return (
		<section id="about" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">
					About Me
				</h2>
				{/* On desktop: float lives inside the text block so line boxes wrap beside and below the image */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="max-w-5xl mx-auto text-lg text-gray-700 after:block after:clear-both after:content-['']"
				>
					<div className="about-me-flow">
						<div
							className="relative aspect-square w-full max-w-md mx-auto md:mx-0 md:mr-8 mb-6 rounded-2xl overflow-hidden about-me-float"
							style={{ shapeOutside: 'margin-box' } as React.CSSProperties}
						>
							<Image
								src="/images/me/me.webp"
								alt="Max Boksem"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 20rem"
							/>
						</div>
						<span
							id="about-expandable"
							className="about-me-text whitespace-pre-line"
						>
							{INTRO}
							{expanded ? `\n\n${REST}` : ''}
						</span>
					</div>
					<div className="flex justify-center mt-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setExpanded((e) => !e)}
							aria-expanded={expanded}
							aria-controls="about-expandable"
						>
							{expanded ? 'Read less' : 'Read more'}
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutMe;
