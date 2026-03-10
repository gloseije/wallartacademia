export default function EditCoursePage({ params }: { params: { id: string } }) {
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Edit Course {params.id}</h1>
			{/* Course editing form */}
		</div>
	);
}
