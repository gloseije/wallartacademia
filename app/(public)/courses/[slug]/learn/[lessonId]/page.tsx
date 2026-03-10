export default function LessonPage({
	params,
}: {
	params: { courseId: string; lessonId: string };
}) {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold">Lesson {params.lessonId}</h1>
			<p>Course ID: {params.courseId}</p>
		</div>
	);
}
