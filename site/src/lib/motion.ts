import type { Variants } from 'framer-motion';

/** Soft ease-out used across reveals and page transitions for a cohesive feel. */
export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

/** Single element: fade + small lift into place (kept subtle). */
export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 12 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: EASE_OUT },
	},
};

/** Container that staggers the reveal of its children. */
export const staggerContainer: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.04 },
	},
};
