'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const researchItems = [
	{
		title: 'Exploratory Programming Environments',
		description:
			'Exploratory programming has many advantages that are not utilized in current programming norms. I want to investigate how we can incorporate exploratory programming in the current interface of IDEs or perhaps create a new programming environment with this as a backbone.',
	},
	{
		title: 'Programming Languages for Distributed Systems',
		description:
			'',
	},
    
];

const publicationItems = [
	{
		title: '(Paper) Bridging Incremental Programming and Complex Software Development in Modern Programming Environments',
		description: 'Presented at Paint part of <> in 2024, Pasadena, California, USA\nPublished to ACM.',
	},
    {
		title: '(Thesis) Bridging Incremental Programming and Complex Software Development in Modern Programming Environments',
		description: 'Thesis Defense as part of UvA Masters in Software Engineering.\nPublished to UvA digital library.',
	},
	{
		title: '(Paper) Exploration and Complexity Management in Graph-based Programming Environments',
		description: 'Presented at the Programming Experience part of <Programming> in 2025, Prague, Czechia.\nPreprint.',
	},
];

const interestItems = [
	{
		title: 'Programming Environments/Languages',
		description: 'Exploring how different programming environments, DSLs, and compilers can effect user behavior and productivity.',
	},
	{
		title: 'System / Software Architecture',
		description:
			'Designing for the current requirements and the future requirements is important to get the most enjoyable to develop and performant project outcome. Many overlook the design step, however, I argue that setting time aside to really think about or put on paper (maybe using UML) the system design will save the developer lot more time in the future and reduce technical debt.',
	},
	{
		title: 'Performance Optimization',
		description:
			'Trying to get systems and applications to perform as performant and efficient as possible. Ask yourself, "how much throughput can we get?"',
	},
    {
		title: 'Full-stack Development',
		description:
			'Technology and Software changes so fast. This ideal is exemplified in full-stack development. I love putting together the puzzle of front end and back end to provide the best user experience, most performant, and durable system.',
	},
    {
		title: 'Autonomous systems',
		description:
			'Learning is a fundamental skill that allowed humanity to thrive and adapt. Allowing a system (potentially using AI/ML) to learn and adapt through unknown scenarios I believe will be a huge field in software.',
	},
    {
		title: 'Embedded Systems, Robotics, and Intelligent systems',
		description:
			'A UI on a screen is nice, but going into the real-world and making your code come to life is a real enjoyable experience. Exploring how to create everyday devices that interact with you instead of the otherway around is a lot of fun to make.',
	},
];

const Research = () => {
	return (
		<section id="research" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">
					Research / Publications / Interests
				</h2>
				<Tabs defaultValue="research" className="max-w-4xl mx-auto">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="research">Research</TabsTrigger>
						<TabsTrigger value="publications">
							Publications
						</TabsTrigger>
						<TabsTrigger value="interests">Interests</TabsTrigger>
					</TabsList>
					<TabsContent value="research">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
						>
							{researchItems.map((item, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle>{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p>{item.description}</p>
									</CardContent>
								</Card>
							))}
						</motion.div>
					</TabsContent>
					<TabsContent value="publications">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
						>
							{publicationItems.map((item, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle>{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p>{item.description}</p>
									</CardContent>
								</Card>
							))}
						</motion.div>
					</TabsContent>
					<TabsContent value="interests">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
						>
							{interestItems.map((item, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle>{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p>{item.description}</p>
									</CardContent>
								</Card>
							))}
						</motion.div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default Research;
