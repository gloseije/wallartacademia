import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../ui/section-header";
import CourseCard from "../courses/course-card";

export default function PopularCoursesSection() {
	return (
		<section className="py-24 bg-gray-50/30">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
					<SectionHeader
						title="Cours Populaires"
						subtitle="Les formations les plus appréciées par notre communauté d'artistes."
						align="left"
						noMargin
					/>
					<Link
						href="/courses"
						className="group flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all underline underline-offset-8 decoration-primary/30"
					>
						Voir tous les cours
						<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<CourseCard
						id="1"
						title="Maîtriser l'Aquarelle Moderne"
						instructor="Sarah Lumina"
						price="49.99 $"
						rating={4.9}
						reviews={128}
						image="/hero.png"
						level="Débutant"
						duration="12h 30m"
					/>
					<CourseCard
						id="2"
						title="Portrait Réaliste au Fusain"
						instructor="Marc Antoine"
						price="59.99 $"
						rating={4.8}
						reviews={85}
						image="/hero.png"
						level="Intermédiaire"
						duration="15h 45m"
					/>
					<CourseCard
						id="3"
						title="Illustration Digitale Avancée"
						instructor="Elena Design"
						price="64.99 $"
						rating={5.0}
						reviews={210}
						image="/hero.png"
						level="Avancé"
						duration="22h 10m"
					/>
				</div>
			</div>
		</section>
	);
}
