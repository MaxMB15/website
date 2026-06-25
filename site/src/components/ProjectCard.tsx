'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import type { Project } from '@/lib/projects';

/**
 * Project card: reveals gently on scroll, then a restrained hover (slight lift,
 * accent border, soft image zoom). No cursor-tracking or 3D tilt — clean and
 * minimal. Motion is disabled when the user prefers reduced motion.
 */
export function ProjectCard({
	project,
	index = 0,
}: {
	project: Project;
	index?: number;
}) {
	const reduce = useReducedMotion();

	return (
		<motion.a
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
			initial={reduce ? false : { opacity: 0, y: 12 }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-60px' }}
			transition={{
				duration: 0.5,
				delay: (index % 3) * 0.08,
				ease: EASE_OUT,
			}}
			className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[rgb(58,123,244)]/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(58,123,244)] focus-visible:ring-offset-2"
		>
			<div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
				<Image
					src={project.image}
					alt={project.title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
				/>
			</div>
			<div className="flex flex-1 flex-col p-5">
				<div className="flex items-start justify-between gap-2">
					<h2 className="text-lg font-semibold text-gray-900">
						{project.title}
					</h2>
					<ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-colors duration-300 group-hover:text-[rgb(58,123,244)]" />
				</div>
				<p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
					{project.description}
				</p>
				{project.tags && project.tags.length > 0 && (
					<ul className="mt-4 flex flex-wrap gap-1.5">
						{project.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
							>
								{tag}
							</li>
						))}
					</ul>
				)}
			</div>
		</motion.a>
	);
}
