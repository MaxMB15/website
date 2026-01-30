'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	researchItems,
	publicationItems,
	interestItems,
} from '@/lib/research';

const Research = () => {
	return (
		<section id="research" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">
					Research / Publications / Interests
				</h2>
				<Tabs defaultValue="publications" className="max-w-4xl mx-auto">
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
