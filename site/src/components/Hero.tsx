'use client';

import { useState, useEffect, useRef } from 'react';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
	useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import FadeInText from './FadeInText';
import { heroImages, heroSubheaders } from '@/lib/hero';

/** Minimal blur placeholder for LCP hero image (no white flash). */
const HERO_BLUR_DATA_URL =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ALnZ2drbW6QwQRxRIMKiKFUD4AqjSlK/9k=';

const Hero = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const [currentSubheader, setCurrentSubheader] = useState(0);
	const [heroImageReady, setHeroImageReady] = useState(false);
	const [nextImageLoaded, setNextImageLoaded] = useState(false);
	const nextImageLoadedRef = useRef(false);
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
	const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
	const textY = useTransform(scrollYProgress, [0, 1], [0, -24]);

	nextImageLoadedRef.current = nextImageLoaded;

	// Only advance when the next image has loaded (keeps mobile from showing blank/buffering)
	useEffect(() => {
		const imageInterval = setInterval(() => {
			if (!nextImageLoadedRef.current) return;
			setNextImageLoaded(false);
			setCurrentImage((prev) => (prev + 1) % heroImages.length);
		}, 5000);
		return () => clearInterval(imageInterval);
	}, []);

	useEffect(() => {
		const subheaderInterval = setInterval(() => {
			setCurrentSubheader((prev) => (prev + 1) % heroSubheaders.length);
		}, 3000);
		return () => clearInterval(subheaderInterval);
	}, []);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative min-h-[112vh] -mt-[12vh] pt-[12vh] overflow-hidden"
		>
			{/* Placeholder until first hero image has loaded (avoids buffering flash). */}
			{!heroImageReady && (
				<div
					className="absolute inset-0 z-20 bg-gradient-to-b from-gray-700 to-gray-900"
					aria-hidden
				/>
			)}
			<div className="absolute inset-0 z-0">
				{/* Preload next image so it's ready when the carousel advances */}
				<div
					className="absolute inset-0 z-0 opacity-0 pointer-events-none"
					aria-hidden
				>
					<Image
						src={heroImages[(currentImage + 1) % heroImages.length].src}
						alt=""
						fill
						className="object-cover"
						sizes="100vw"
						onLoad={() => {
							setNextImageLoaded(true);
						}}
					/>
				</div>
				<AnimatePresence initial={false}>
					<motion.div
						key={currentImage}
						className="absolute inset-0 z-[1]"
						initial={{ opacity: 0, scale: 1 }}
						animate={{
							opacity: 1,
							scale:
								currentImage === 0 && !heroImageReady ? 1 : 1.1,
						}}
						exit={{ opacity: 0, scale: 1.1 }}
						transition={{
							opacity: { duration: 1 },
							scale: { duration: 5, ease: 'linear' },
						}}
					>
						<Image
							src={heroImages[currentImage].src}
							alt={heroImages[currentImage].caption}
							fill
							className="object-cover"
							priority={currentImage === 0}
							sizes="100vw"
							placeholder={currentImage === 0 ? 'blur' : 'empty'}
							blurDataURL={currentImage === 0 ? HERO_BLUR_DATA_URL : undefined}
							onLoad={currentImage === 0 ? () => setHeroImageReady(true) : undefined}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
			<motion.div
				className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-white pointer-events-none"
				style={{ opacity }}
			/>
			<div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
				<motion.div
					className="relative p-8 overflow-visible pointer-events-auto"
					style={{ opacity: textOpacity, scale: textScale, y: textY }}
				>
					<div
						className="absolute inset-0 min-w-[200%] min-h-[200%] -left-1/2 -top-1/2 blur-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_45%,transparent_75%)]"
						aria-hidden
					/>
					<div className="relative z-10">
						<FadeInText
							text="Max Boksem"
							className="hero-title font-bold mb-4 text-white text-center"
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
									className="hero-subtitle text-white text-center"
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
			<motion.div
				className="absolute bottom-4 right-4 z-10"
				style={{ opacity: textOpacity, scale: textScale, y: textY }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={currentImage}
						className="bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						{heroImages[currentImage].caption}
					</motion.div>
				</AnimatePresence>
			</motion.div>
			{/* Scroll cue: animated mouse that fades out as you scroll past the hero. */}
			<motion.div
				className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 pointer-events-none"
				style={{ opacity: textOpacity }}
				aria-hidden
			>
				<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/70 p-1.5">
					<motion.span
						className="block h-2 w-1 rounded-full bg-white/90"
						animate={
							reduceMotion ? undefined : { opacity: [0.9, 0.3, 0.9] }
						}
						transition={{
							duration: 2.4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
