'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	researchItems,
	publicationItems,
	interestItems,
} from '@/lib/research';
import type { PublicationType } from '@/lib/research';

const publicationTypeConfig: Record<
	PublicationType,
	{ label: string; className: string }
> = {
	thesis: {
		label: 'Thesis',
		className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
	},
	workshop: {
		label: 'Workshop',
		className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
	},
	paper: {
		label: 'Paper',
		className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
	},
};

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
							{publicationItems.map((item, index) => {
								const typeConfig = publicationTypeConfig[item.type];
								return (
									<Card key={index}>
										<CardHeader className="space-y-2">
											<span
												className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${typeConfig.className}`}
											>
												{typeConfig.label}
											</span>
											<CardTitle>{item.title}</CardTitle>
										</CardHeader>
										<CardContent className="space-y-4">
											<p className="whitespace-pre-line text-muted-foreground">
												{item.description}
											</p>
											{(item.doi || item.downloadUrl) && (
												<div className="flex flex-wrap gap-2">
													{item.doi && (
														<a
															href={`https://doi.org/${item.doi}`}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
														>
															View DOI
														</a>
													)}
													{item.downloadUrl && (
														<a
															href={item.downloadUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
														>
															Download PDF
														</a>
													)}
												</div>
											)}
										</CardContent>
									</Card>
								);
							})}
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
