export interface Project {
	title: string;
	description: string;
	image: string;
	href: string;
	/** Tech stack chips shown on the project card. */
	tags?: string[];
}

export const projects: Project[] = [
	{
		title: 'MaxLango',
		description:
			'A cross-platform, offline-first language-learning app with spaced repetition, built on Tauri 2 and a pure-Rust kernel.',
		image: '/images/projects/maxlango.webp',
		href: 'https://github.com/MaxMB15/MaxLango',
		tags: ['Tauri', 'Rust', 'React', 'TypeScript'],
	},
	{
		title: 'MaxVideoPlayer',
		description:
			'A cross-platform IPTV player built with Tauri 2, React, and libmpv, with hardware-accelerated playback and M3U, Xtream Codes, and EPG support.',
		image: '/images/projects/maxvideoplayer.webp',
		href: 'https://github.com/MaxMB15/MaxVideoPlayer',
		tags: ['Tauri', 'Rust', 'React', 'libmpv', 'TypeScript'],
	},
	{
		title: 'Incremental Graph Code (IGC)',
		description:
			'An exploratory programming environment that tries to balance typical IDEs and IPEs',
		image: '/images/projects/igc.webp',
		href: 'https://github.com/incremental-graph-code/igc/tree/dev/IncrGraph',
		tags: ['TypeScript', 'React', 'Electron', 'Python', 'Incremental Programming'],
	},
	{
		title: 'CL0',
		description: 'A distributed, event-based programming language.',
		image: '/images/projects/cl0.webp',
		href: 'https://github.com/uva-cci/CL0',
		tags: ['Rust', 'Compilers', 'Programming Languages'],
	},
	{
		title: 'Attendunce',
		description: 'An attendance tracking app build with cloud infra.',
		image: '/images/projects/attendunce.webp',
		href: 'https://github.com/orgs/DevOps-Cloud-Team5/repositories',
		tags: ['React', 'Django', 'AWS', 'Terraform'],
	},
	{
		title: 'Tablut AI Agent',
		description:
			'My entry for class competition for the best AI agent for the board game Tablut.',
		image: '/images/projects/tablut.webp',
		href: 'https://github.com/MaxMB15/Tablut',
		tags: ['Java', 'AI'],
	},
	{
		title: 'Mood.AI',
		description:
			'A journal app using sentimental analysis to predict moods.',
		image: '/images/projects/moodai.webp',
		href: 'https://github.com/MaxMB15/mood.ai',
		tags: ['Python', 'Swift', 'AI'],
	},
	{
		title: 'DrawMyThing',
		description:
			'A remake of the classic game to guess what others are drawing.',
		image: '/images/projects/drawmything.webp',
		href: 'https://github.com/MaxMB15/DrawMyThing/tree/master',
		tags: ['Java', 'Networking'],
	},
];
