export default function CourseDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">
				Course Details: {params.slug}
			</h1>
			<p className="mt-4">Preview content for the course.</p>
		</div>
	);
}
