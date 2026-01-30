const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxboksem.com';

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
