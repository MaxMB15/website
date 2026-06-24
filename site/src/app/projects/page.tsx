import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Reveal } from '@/components/motion/Reveal';
import { getProjectsStructuredData } from '@/lib/structured-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxboksem.com';

export const metadata: Metadata = {
	title: 'Projects',
	description:
		'Portfolio projects by Max Boksem: software engineering, research, and side projects.',
	alternates: {
		canonical: `${baseUrl}/projects`,
	},
	openGraph: {
		title: 'Projects | Max Boksem',
		description:
			'Portfolio projects by Max Boksem: software engineering, research, and side projects.',
		url: `${baseUrl}/projects`,
	},
};

const ProjectsPage = () => {
	const structuredData = getProjectsStructuredData(projects);
	return (
		<div className="flex min-h-screen flex-col">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className="container mx-auto flex-1 px-4 pb-12 pt-24">
				<Reveal>
					<h1 className="text-4xl font-bold">All Projects</h1>
					<p className="mt-3 max-w-2xl text-gray-600">
						A selection of things I&apos;ve designed, built, and
						researched — from desktop apps to programming languages.
					</p>
				</Reveal>
				<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => (
						<ProjectCard
							key={project.title}
							project={project}
							index={index}
						/>
					))}
				</div>
				<div className="mt-12 text-center">
					<MagneticButton>
						<Button
							asChild
							variant="outline"
							className="border-[rgb(58,123,244)] text-[rgb(58,123,244)] hover:bg-[rgb(58,123,244)] hover:text-white"
						>
							<Link href="/">Back to Home</Link>
						</Button>
					</MagneticButton>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default ProjectsPage;
