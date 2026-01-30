'use client';

import { useState, useEffect, useRef } from 'react';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from 'framer-motion';
import Image from 'next/image';
import FadeInText from './FadeInText';
import { heroImages, heroSubheaders } from '@/lib/hero';

const Hero = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const [currentSubheader, setCurrentSubheader] = useState(0);
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	useEffect(() => {
		const imageInterval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % heroImages.length);
		}, 5000);

		const subheaderInterval = setInterval(() => {
			setCurrentSubheader((prev) => (prev + 1) % heroSubheaders.length);
		}, 3000);

		return () => {
			clearInterval(imageInterval);
			clearInterval(subheaderInterval);
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative h-screen overflow-hidden"
		>
			<div className="absolute inset-0 -z-50">
				<AnimatePresence initial={false}>
					<motion.div
						key={currentImage}
						initial={{ opacity: 0, scale: 1 }}
						animate={{ opacity: 1, scale: 1.1 }}
						exit={{ opacity: 0, scale: 1.1 }}
						transition={{
							opacity: { duration: 1 },
							scale: { duration: 5, ease: 'linear' },
						}}
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
					>
						<Image
							src={heroImages[currentImage].src}
							alt={heroImages[currentImage].caption}
							fill
							className="object-cover"
							priority
							sizes="100vw"
						/>
					</motion.div>
				</AnimatePresence>
			</div>
			{/* Preload all images */}
			{heroImages.map((image, index) => (
				<div key={index} className="hidden">
					<Image
						src={image.src}
						alt={image.caption}
						fill
						priority
					/>
				</div>
			))}
			<motion.div
				className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
				style={{ opacity }}
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<div className="relative p-8 overflow-visible">
					<div
						className="absolute inset-0 min-w-[200%] min-h-[200%] -left-1/2 -top-1/2 blur-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_45%,transparent_75%)]"
						aria-hidden
					/>
					<div className="relative z-10">
						<FadeInText
							text="Max Boksem"
							className="text-6xl font-bold mb-4 text-white text-center"
						/>
						<AnimatePresence mode="wait">
							<motion.div
								key={currentSubheader}
								initial={{ x: 20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -20, opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<FadeInText
									text={heroSubheaders[currentSubheader]}
									className="text-2xl text-white text-center"
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentImage}
					className="absolute bottom-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					{heroImages[currentImage].caption}
				</motion.div>
			</AnimatePresence>
		</section>
	);
};

export default Hero;
