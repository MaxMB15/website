'use client';

import { useRef, type ReactNode, type PointerEvent } from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useReducedMotion,
} from 'framer-motion';

interface MagneticButtonProps {
	children: ReactNode;
	className?: string;
	/** How strongly the element is pulled toward the cursor (0–1). */
	strength?: number;
}

/** Gently pulls its content toward the cursor on hover (mouse pointers only). */
export function MagneticButton({
	children,
	className,
	strength = 0.4,
}: MagneticButtonProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
	const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

	if (reduce) return <div className={className}>{children}</div>;

	const handleMove = (e: PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== 'mouse') return;
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
		y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
	};

	const reset = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			className={className}
			style={{ x: sx, y: sy, display: 'inline-block' }}
			onPointerMove={handleMove}
			onPointerLeave={reset}
		>
			{children}
		</motion.div>
	);
}
