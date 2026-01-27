import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const projects = [
	{
		title: 'Incremental Graph Code (IGC)',
		description:
			'An exploratory programming environment that tries to balance typical IDEs and IPEs',
		image: '',
	},
	{
		title: 'CL0',
		description: 'A distributed, event-based programming language.',
		image: '',
	},
	{
		title: 'Attendunce',
		description: 'An attendance tracking app build with cloud infra.',
		image: '',
	},
	{
		title: 'Mood.AI',
		description:
			'A journal app using sentimental analysis to predict moods.',
		image: '',
	},
	{
		title: 'DrawMyThing',
		description:
			'A remake of the classic game to guess what others are drawing.',
		image: '',
	},
];

const ProjectsPage = () => {
	return (
		<div className="container mx-auto px-4 py-12">
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
						<Button asChild>
							<Link href="#">View Project</Link>
						</Button>
					</div>
				))}
			</div>
			<div className="mt-12 text-center">
				<Button asChild>
					<Link href="/">Back to Home</Link>
				</Button>
			</div>
		</div>
	);
};
export default ProjectsPage;
