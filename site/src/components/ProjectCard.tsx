'use client';

import { useRef, type PointerEvent } from 'react';
import Image from 'next/image';
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import type { Project } from '@/lib/projects';

/**
 * Showcase project card: reveals on scroll, tilts toward the cursor in 3D, runs
 * a spotlight border, and zooms its image on hover. All motion is disabled when
 * the user prefers reduced motion.
 */
export function ProjectCard({
	project,
	index = 0,
}: {
	project: Project;
	index?: number;
}) {
	const reduce = useReducedMotion();
	const ref = useRef<HTMLAnchorElement>(null);
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), {
		stiffness: 150,
		damping: 15,
	});
	const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
		stiffness: 150,
		damping: 15,
	});

	const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
		if (reduce || e.pointerType !== 'mouse') return;
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const nx = (e.clientX - rect.left) / rect.width;
		const ny = (e.clientY - rect.top) / rect.height;
		px.set(nx);
		py.set(ny);
		el.style.setProperty('--mx', `${nx * 100}%`);
		el.style.setProperty('--my', `${ny * 100}%`);
	};

	const handleLeave = () => {
		px.set(0.5);
		py.set(0.5);
	};

	return (
		<motion.div
			initial={reduce ? false : { opacity: 0, y: 24 }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-60px' }}
			transition={{
				duration: 0.6,
				delay: (index % 3) * 0.08,
				ease: EASE_OUT,
			}}
			style={{ perspective: 1000 }}
			className="h-full"
		>
			<motion.a
				ref={ref}
				href={project.href}
				target="_blank"
				rel="noopener noreferrer"
				onPointerMove={handleMove}
				onPointerLeave={handleLeave}
				style={
					reduce
						? undefined
						: { rotateX, rotateY, transformStyle: 'preserve-3d' }
				}
				className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(58,123,244)] focus-visible:ring-offset-2"
			>
				<div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
					<Image
						src={project.image}
						alt={project.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				</div>
				<div className="flex flex-1 flex-col p-5">
					<div className="flex items-start justify-between gap-2">
						<h2 className="text-lg font-semibold text-gray-900">
							{project.title}
						</h2>
						<ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(58,123,244)]" />
					</div>
					<p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
						{project.description}
					</p>
					{project.tags && project.tags.length > 0 && (
						<ul className="mt-4 flex flex-wrap gap-1.5">
							{project.tags.map((tag) => (
								<li
									key={tag}
									className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-[rgb(58,123,244)]"
								>
									{tag}
								</li>
							))}
						</ul>
					)}
				</div>
			</motion.a>
		</motion.div>
	);
}
