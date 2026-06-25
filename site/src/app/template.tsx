'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

/**
 * Wraps each route's content. Next.js remounts this on navigation, so it gives
 * a soft enter transition between pages (e.g. Home <-> Projects).
 */
export default function Template({ children }: { children: ReactNode }) {
	const reduce = useReducedMotion();
	if (reduce) return <>{children}</>;
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: EASE_OUT }}
		>
			{children}
		</motion.div>
	);
}
