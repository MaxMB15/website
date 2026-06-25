import type { Project } from '@/lib/projects';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxboksem.com';

/** ItemList of projects for the /projects page (rich results / SEO). */
export function getProjectsStructuredData(projects: Project[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Projects by Max Boksem',
		itemListElement: projects.map((project, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'SoftwareSourceCode',
				name: project.title,
				description: project.description,
				codeRepository: project.href,
				image: `${baseUrl}${project.image}`,
				...(project.tags
					? { keywords: project.tags.join(', ') }
					: {}),
				author: { '@type': 'Person', name: 'Max Boksem' },
			},
		})),
	};
}

export function getPersonStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Max Boksem',
		url: baseUrl,
		description: 'Software Engineer, Developer, Researcher',
		sameAs: [
			'https://www.linkedin.com/in/maxboksem',
			'https://github.com/maxboksem',
		],
	};
}
