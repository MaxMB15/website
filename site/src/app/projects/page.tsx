import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
	title: 'Projects',
	description:
		'Portfolio projects by Max Boksem: software engineering, research, and side projects.',
	openGraph: {
		title: 'Projects | Max Boksem',
		description:
			'Portfolio projects by Max Boksem: software engineering, research, and side projects.',
	},
};

const ProjectsPage = () => {
	return (
		<div className="container mx-auto px-4 pt-24 pb-12">
			<h1 className="text-4xl font-bold mb-8">All Projects</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project, index) => (
					<div
						key={index}
						className="border rounded-lg p-6 shadow-md"
					>
						<h2 className="text-xl font-semibold mb-2">
							{project.title}
						</h2>
						<p className="text-gray-600 mb-4">
							{project.description}
						</p>
						<Button
							asChild
							variant="outline"
							className="border-[rgb(58,123,244)] text-[rgb(58,123,244)] hover:bg-[rgb(58,123,244)] hover:text-white"
						>
							<Link href={project.href}>View Project</Link>
						</Button>
					</div>
				))}
			</div>
			<div className="mt-12 text-center">
				<Button
					asChild
					variant="outline"
					className="border-[rgb(58,123,244)] text-[rgb(58,123,244)] hover:bg-[rgb(58,123,244)] hover:text-white"
				>
					<Link href="/">Back to Home</Link>
				</Button>
			</div>
		</div>
	);
};
export default ProjectsPage;
