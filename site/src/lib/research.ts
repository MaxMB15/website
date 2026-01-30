export const researchItems = [
	{
		title: 'Exploratory Programming Environments',
		description:
			'Exploratory programming has many advantages that are not utilized in current programming norms. I want to investigate how we can incorporate exploratory programming in the current interface of IDEs or perhaps create a new programming environment with this as a backbone. I explore how we can use graph-based programming environments to support exploratory programming.',
	},
	{
		title: 'Programming Languages for Distributed Systems',
		description: 'Independent systems that have to maintain communication and coordination with each other are a growing area of interest. There are many different real world applications of this, such as autonomous vehicles, distributed databases, and more. I\'m interested in how languages and execution models can support distributed and concurrent systems, from declarative logic and reactive rules to parallel execution.',
	},
];

export type PublicationType = 'workshop' | 'thesis' | 'paper';

export interface PublicationItem {
	type: PublicationType;
	title: string;
	description: string;
	doi?: string;
	downloadUrl?: string;
}

export const publicationItems: PublicationItem[] = [
	{
		type: 'paper',
		title:
			'Bridging Incremental Programming and Complex Software Development in Modern Programming Environments',
		description:
			'Presented at PAINT part of SPLASH in 2024, Pasadena, California, USA\nPublished to ACM.',
		doi: '10.1145/3689488.3689991',
		downloadUrl: 'https://dl.acm.org/doi/pdf/10.1145/3689488.3689991',
	},
	{
		type: 'thesis',
		title:
			'Bridging Incremental Programming and Complex Software Development in Modern Programming Environments',
		description:
			'Thesis Defense as part of UvA Masters in Software Engineering.\nPublished to UvA digital library.',
		downloadUrl: 'https://scripties.uba.uva.nl/search?id=record_55728',
	},
	{
		type: 'paper',
		title:
			'Exploration and Complexity Management in Graph-based Programming Environments',
		description:
			'Presented at the Programming Experience part of <Programming> in 2025, Prague, Czechia.\nPublished to OASIcs by Dagstuhl Publishing.',
		doi: '10.4230/OASIcs.Programming.2025.6',
		downloadUrl: 'https://drops.dagstuhl.de/storage/01oasics/oasics-vol134-programming2025/OASIcs.Programming.2025.6/OASIcs.Programming.2025.6.pdf',
	},
];

export const interestItems = [
	{
		title: 'Programming Environments/Languages',
		description:
			'Exploring how different programming environments, DSLs, and compilers can effect user behavior and productivity.',
	},
	{
		title: 'System / Software Architecture',
		description:
			'Designing for the current requirements and the future requirements is important to get the most enjoyable to develop and performant project outcome. Many overlook the design step, however, I argue that setting time aside to really think about or put on paper (maybe using UML) the system design will save the developer lot more time in the future and reduce technical debt.',
	},
	{
		title: 'Performance Optimization',
		description:
			'Trying to get systems and applications to perform as performant and efficient as possible. Ask yourself, "how much throughput can we really get?" The answer to this question is often not obvious, and it is a fun challenge to find out.',
	},
	{
		title: 'Full-stack Development',
		description:
			'Technology and Software changes so fast. This ideal is exemplified in full-stack development. I love putting together the puzzle of front end and back end to provide the best user experience, most performant, and durable system.',
	},
	{
		title: 'Autonomous systems',
		description:
			'Learning is a fundamental skill that allowed humanity to thrive and adapt. Allowing a system (potentially using AI agents) to learn and adapt through unknown scenarios I believe is a huge field in software engineering and only going to grow with the advents of AI. ',
	},
	{
		title: 'Embedded Systems, Robotics, and Intelligent systems',
		description:
			'A UI on a screen is nice, but going into the real-world and making your code come to life is a real enjoyable experience. Exploring how to create everyday devices that interact with you instead of the otherway around is a lot of fun to make. From low level embedded systems to high level intelligent software systems, there is a lot to explore.',
	},
];
