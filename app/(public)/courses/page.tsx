import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { CoursesExplorer } from "@/components/courses/courses-explorer";

export default function CoursesPage() {
	return (
		<div className="relative min-h-screen bg-background overflow-hidden">
			<Header />
			<CoursesExplorer />
			<Footer />
		</div>
	);
}
