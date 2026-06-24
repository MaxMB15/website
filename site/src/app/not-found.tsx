'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	const reduce = useReducedMotion();
	return (
		<main
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
			role="main"
		>
			{/* Soft brand glow behind the content */}
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(58,123,244,0.18),transparent_60%)] blur-2xl"
			/>
			<motion.p
				initial={reduce ? false : { opacity: 0, y: 16 }}
				animate={reduce ? undefined : { opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: EASE_OUT }}
				className="bg-gradient-to-b from-gray-900 to-[rgb(58,123,244)] bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-9xl"
			>
				404
			</motion.p>
			<motion.h1
				initial={reduce ? false : { opacity: 0, y: 16 }}
				animate={reduce ? undefined : { opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
				className="mt-4 text-2xl font-semibold text-gray-900"
			>
				This page wandered off.
			</motion.h1>
			<motion.p
				initial={reduce ? false : { opacity: 0, y: 16 }}
				animate={reduce ? undefined : { opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT }}
				className="mt-3 max-w-md text-gray-600"
			>
				The link may be broken or the page may have moved. Let&apos;s get
				you back on track.
			</motion.p>
			<motion.div
				initial={reduce ? false : { opacity: 0, y: 16 }}
				animate={reduce ? undefined : { opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT }}
				className="mt-8 flex flex-wrap items-center justify-center gap-4"
			>
				<MagneticButton>
					<Button
						asChild
						className="bg-[rgb(58,123,244)] text-white hover:bg-[rgb(48,108,224)]"
					>
						<Link href="/">Back to Home</Link>
					</Button>
				</MagneticButton>
				<MagneticButton>
					<Button
						asChild
						variant="outline"
						className="border-[rgb(58,123,244)] text-[rgb(58,123,244)] hover:bg-[rgb(58,123,244)] hover:text-white"
					>
						<Link href="/projects">View Projects</Link>
					</Button>
				</MagneticButton>
			</motion.div>
		</main>
	);
}
