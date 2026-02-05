export type Proficiency = 'basic' | 'intermediate' | 'proficient' | 'expert';

export type LanguageLevel =
	| 'native'
	| 'professional'
	| 'spoken'
	| 'written'
	| 'intermediate'
	| 'basic';

export type SkillItem =
	| string
	| { name: string; proficiency?: Proficiency };

export type LanguageItem = { name: string; level: LanguageLevel };

const proficiencyOrder: Record<Proficiency, number> = {
	expert: 4,
	proficient: 3,
	intermediate: 2,
	basic: 1,
};

function sortByProficiency<T extends SkillItem>(items: T[]): T[] {
	return [...items].sort((a, b) => {
		const pa = normalizeSkill(a).proficiency;
		const pb = normalizeSkill(b).proficiency;
		const orderA = pa ? proficiencyOrder[pa] : 0;
		const orderB = pb ? proficiencyOrder[pb] : 0;
		return orderB - orderA;
	});
}

// Programming languages.
export const programmingLanguages: SkillItem[] = sortByProficiency([
	{ name: 'Rust', proficiency: 'intermediate' },
	{ name: 'TypeScript / JavaScript', proficiency: 'proficient' },
	{ name: 'Python', proficiency: 'expert' },
	{ name: 'Go', proficiency: 'intermediate' },
	{ name: 'C', proficiency: 'intermediate' },
	{ name: 'C++', proficiency: 'intermediate' },
	{ name: 'C#', proficiency: 'proficient' },
	{ name: 'Java', proficiency: 'expert' },
	{ name: 'HTML / CSS', proficiency: 'proficient' },
	{ name: 'PHP', proficiency: 'basic' },
	{ name: 'Swift', proficiency: 'intermediate' },
	{ name: 'x64 Assembly', proficiency: 'intermediate' },
	{ name: 'Bash', proficiency: 'proficient' },
]);

// Frameworks, runtimes, databases, app platforms (not infra/DevOps).
export const technologies: SkillItem[] = sortByProficiency([
	{ name: 'React', proficiency: 'proficient' },
	{ name: 'Tailwind', proficiency: 'intermediate' },
	{ name: 'Node.js', proficiency: 'proficient' },
	{ name: 'Express', proficiency: 'proficient' },
	{ name: 'Electron', proficiency: 'intermediate' },
	{ name: 'Unity', proficiency: 'intermediate' },
	{ name: 'SQL', proficiency: 'proficient' },
	{ name: 'MySQL', proficiency: 'proficient' },
	{ name: 'PostgreSQL', proficiency: 'proficient' },
	{ name: 'MongoDB', proficiency: 'proficient' },
	{ name: 'Kafka', proficiency: 'intermediate' },
]);

// Containers, cloud, IaC, CI/CD.
export const infraDevOps: SkillItem[] = sortByProficiency([
	{ name: 'Docker', proficiency: 'intermediate' },
	{ name: 'Kubernetes', proficiency: 'intermediate' },
	{ name: 'AWS', proficiency: 'intermediate' },
	{ name: 'Ansible', proficiency: 'intermediate' },
	{ name: 'Terraform', proficiency: 'basic' },
	{ name: 'GitHub Actions', proficiency: 'intermediate' },
	{ name: 'Jenkins', proficiency: 'proficient' },
]);

export const tools: SkillItem[] = sortByProficiency([
	{ name: 'Git', proficiency: 'proficient' },
	{ name: 'Unix', proficiency: 'proficient' },
	{ name: 'VSCode (Studio)', proficiency: 'proficient' },
	{ name: 'Cursor', proficiency: 'intermediate' },
	{ name: 'JetBrains IDEs', proficiency: 'proficient' },
]);

// Concepts.
export const concepts: SkillItem[] = sortByProficiency([
	{ name: 'REST APIs', proficiency: 'proficient' },
	{ name: 'RPC APIs', proficiency: 'proficient' },
	{ name: 'Microservices', proficiency: 'proficient' },
	{ name: 'Software Architecture', proficiency: 'expert' },
	{ name: 'Distributed Systems', proficiency: 'intermediate' },
	{ name: 'Algorithms & Data Structures', proficiency: 'expert' },
	{ name: 'Requirements Engineering', proficiency: 'proficient' },
	{ name: 'Verification & Testing', proficiency: 'proficient' },
	{ name: 'DevOps & CI/CD', proficiency: 'intermediate' },
	{ name: 'Agile / Software Process', proficiency: 'proficient' },
	{ name: 'Database Design', proficiency: 'proficient' },
	{ name: 'API Design', proficiency: 'proficient' },
	{ name: 'Performance Optimization', proficiency: 'proficient' },
	{ name: 'Machine Learning', proficiency: 'intermediate' },
	{ name: 'Computer Networks', proficiency: 'intermediate' },
	{ name: 'Cloud Computing', proficiency: 'intermediate' },
]);

// Spoken Languages.
export const languages: LanguageItem[] = [
	{ name: 'English', level: 'native' },
	{ name: 'Dutch', level: 'intermediate' },
	{ name: 'French', level: 'basic' },
];

export function normalizeSkill(item: SkillItem): { name: string; proficiency?: Proficiency } {
	return typeof item === 'string' ? { name: item } : { name: item.name, proficiency: item.proficiency };
}

export function formatLanguageLevel(level: LanguageLevel): string {
	const labels: Record<LanguageLevel, string> = {
		native: 'Native',
		spoken: 'Spoken',
		written: 'Written',
		professional: 'Professional',
		basic: 'Basic',
		intermediate: 'Intermediate',
	};
	return labels[level];
}
