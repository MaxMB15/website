export default function Loading() {
	return (
		<div className="min-h-screen">
			{/* Hero placeholder */}
			<div className="relative flex h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-700 to-gray-900">
				<div className="skeleton h-12 w-64 rounded-lg opacity-40" />
				<div className="skeleton h-6 w-44 rounded opacity-40" />
			</div>
			{/* Section placeholder */}
			<div className="container mx-auto px-4 py-20">
				<div className="skeleton mx-auto mb-12 h-10 w-56 rounded-lg" />
				<div className="mx-auto max-w-3xl space-y-4">
					<div className="skeleton h-4 w-full rounded" />
					<div className="skeleton h-4 w-11/12 rounded" />
					<div className="skeleton h-4 w-10/12 rounded" />
				</div>
			</div>
		</div>
	);
}
