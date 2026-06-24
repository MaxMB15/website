'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { fadeUp, staggerContainer, EASE_OUT } from '@/lib/motion';

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	once?: boolean;
}

/** Fades + lifts its children into view the first time they're scrolled into view. */
export function Reveal({
	children,
	className,
	delay = 0,
	y = 24,
	once = true,
}: RevealProps) {
	const reduce = useReducedMotion();
	if (reduce) return <div className={className}>{children}</div>;
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once, margin: '-60px' }}
			transition={{ duration: 0.6, delay, ease: EASE_OUT }}
		>
			{children}
		</motion.div>
	);
}

interface GroupProps {
	children: ReactNode;
	className?: string;
	once?: boolean;
}

/** Container that staggers the reveal of its <RevealItem> children. */
export function RevealGroup({ children, className, once = true }: GroupProps) {
	const reduce = useReducedMotion();
	if (reduce) return <div className={className}>{children}</div>;
	return (
		<motion.div
			className={className}
			variants={staggerContainer}
			initial="hidden"
			whileInView="show"
			viewport={{ once, margin: '-60px' }}
		>
			{children}
		</motion.div>
	);
}

interface ItemProps {
	children: ReactNode;
	className?: string;
	variants?: Variants;
}

export function RevealItem({
	children,
	className,
	variants = fadeUp,
}: ItemProps) {
	const reduce = useReducedMotion();
	if (reduce) return <div className={className}>{children}</div>;
	return (
		<motion.div className={className} variants={variants}>
			{children}
		</motion.div>
	);
}
