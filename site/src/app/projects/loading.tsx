export default function ProjectsLoading() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 pb-12 pt-24">
				<div className="skeleton mb-8 h-10 w-64 rounded-lg" />
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
						>
							<div className="skeleton aspect-[16/10] w-full" />
							<div className="space-y-3 p-5">
								<div className="skeleton h-5 w-2/3 rounded" />
								<div className="skeleton h-4 w-full rounded" />
								<div className="skeleton h-4 w-5/6 rounded" />
								<div className="flex gap-1.5 pt-1">
									<div className="skeleton h-6 w-16 rounded-full" />
									<div className="skeleton h-6 w-12 rounded-full" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
