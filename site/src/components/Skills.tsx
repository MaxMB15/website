'use client';

import { motion } from 'framer-motion';
import {
	programmingLanguages,
	technologies,
	infraDevOps,
	tools,
	concepts,
	languages,
	normalizeSkill,
	formatLanguageLevel,
} from '@/lib/skills';
import type { LanguageItem, SkillItem } from '@/lib/skills';

const skillCategories = [
	{ title: 'Programming Languages', items: programmingLanguages, isLanguage: false },
	{ title: 'Technologies', items: technologies, isLanguage: false },
	{ title: 'Infra / DevOps / CI/CD', items: infraDevOps, isLanguage: false },
	{ title: 'Tools', items: tools, isLanguage: false },
	{ title: 'Concepts', items: concepts, isLanguage: false },
	{ title: 'Languages', items: languages, isLanguage: true },
];

const Skills = () => {
	return (
		<section id="skills" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">
					Skills
				</h2>
				<div className="max-w-4xl mx-auto space-y-10">
					{skillCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.4,
								delay: categoryIndex * 0.05,
							}}
						>
							<h3 className="text-lg font-semibold text-gray-800 mb-3">
								{category.title}
							</h3>
							<div className="flex flex-wrap gap-2">
								{category.isLanguage
									? (category.items as LanguageItem[]).map((item, index) => (
											<motion.span
												key={item.name}
												initial={{ opacity: 0, scale: 0.95 }}
												whileInView={{ opacity: 1, scale: 1 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.3,
													delay: categoryIndex * 0.05 + index * 0.02,
												}}
												className="inline-flex flex-col items-center gap-0.5 rounded-full bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200"
											>
												<span className="text-sm font-medium">{item.name}</span>
												<span className="text-xs text-gray-500">
													{formatLanguageLevel(item.level)}
												</span>
											</motion.span>
										))
									: (category.items as SkillItem[]).map((item, index) => {
											const { name, proficiency } = normalizeSkill(item);
											return (
												<motion.span
													key={name}
													initial={{ opacity: 0, scale: 0.95 }}
													whileInView={{ opacity: 1, scale: 1 }}
													viewport={{ once: true }}
													transition={{
														duration: 0.3,
														delay: categoryIndex * 0.05 + index * 0.02,
													}}
													className="inline-flex flex-col items-center gap-0.5 rounded-full bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200"
												>
													<span className="text-sm font-medium">{name}</span>
													{proficiency && (
														<span className="text-xs text-gray-500 capitalize">
															{proficiency}
														</span>
													)}
												</motion.span>
											);
										})}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
