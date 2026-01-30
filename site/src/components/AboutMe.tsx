'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutMe = () => {
	return (
		<section id="about" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">
					About Me
				</h2>
				<div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden"
					>
						<Image
							src="/images/me/me.webp"
							alt="Max Boksem"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<p className="text-lg text-gray-700">
							Hello! I'm Max Boksem, a passionate photographer,
							developer, and researcher. With a keen eye for
							detail and a love for innovation, I strive to
							capture the world's beauty through my lens while
							pushing the boundaries of technology through my
							work.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
