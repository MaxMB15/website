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

const images = [
	{
		src: '/images/frontpage/beaver-lake.jpg',
		caption: 'Beaver Lake, Montréal, QC, Canada',
	},
	{ src: '/images/frontpage/cuba-alley.jpg', caption: 'Alley, Havana, Cuba' },
	{
		src: '/images/frontpage/cuba-city-view.jpg',
		caption: 'City View, Havana, Cuba',
	},
	{
		src: '/images/frontpage/lake-union.jpg',
		caption: 'Lake Union, Seattle, WA, USA',
	},
	{
		src: '/images/frontpage/mcgill-snow-mct.jpg',
		caption: 'McGill Snow, Montréal, QC, Canada',
	},
];

const subheaders = [
	'Software Engineer',
	'Developer',
	'Researcher',
	'Coder',
	'Programmer',
	'Tech Enthusiast',
	'Full-stack Developer',
	'Web Developer',
	'Backend Developer',
	'Frontend Developer',
	'Software Developer',
	'Computer Scientist',
	'Software Designer',
	'Software Consultant',
	'Software Specialist',
	'DevOps Engineer',
	'UI/UX Designer',
];

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
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, 5000);

		const subheaderInterval = setInterval(() => {
			setCurrentSubheader((prev) => (prev + 1) % subheaders.length);
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
							src={images[currentImage].src}
							alt={`Background ${currentImage + 1}`}
							layout="fill"
							objectFit="cover"
							priority
						/>
					</motion.div>
				</AnimatePresence>
			</div>
			{/* Preload all images */}
			{images.map((image, index) => (
				<div key={index} className="hidden">
					<Image
						src={image.src}
						alt={`Preload ${index + 1}`}
						layout="fill"
						priority
					/>
				</div>
			))}
			<motion.div
				className="absolute inset-0 bg-white"
				style={{ opacity }}
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<div className="relative p-8 rounded-lg overflow-hidden">
					<div className="absolute inset-0 bg-black opacity-50 blur-xl"></div>
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
									text={subheaders[currentSubheader]}
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
					className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					{images[currentImage].caption}
				</motion.div>
			</AnimatePresence>
		</section>
	);
};

export default Hero;
