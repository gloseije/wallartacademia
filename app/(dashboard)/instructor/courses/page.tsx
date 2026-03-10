import { Plus, Search } from "lucide-react";
import { InstructorCourseCard } from "@/components/dashboard/instructor-course-card";

export default function InstructorCoursesPage() {
	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold font-heading">
						Mes Cours
					</h1>
					<p className="text-muted-foreground mt-1">
						Créez et gérez vos contenus pédagogiques.
					</p>
				</div>
				<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-primary/10">
					<Plus size={18} />
					Créer un cours
				</button>
			</div>

			<div className="relative">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					size={18}
				/>
				<input
					type="text"
					placeholder="Rechercher parmi vos cours..."
					className="w-full max-w-md pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[
					{
						title: "Peinture à l'Huile pour Débutants",
						studentsCount: 124,
						rating: 4.8,
						lastUpdate: "12 Oct 2023",
						price: "49€",
						status: "Publié" as const,
					},
					{
						title: "Maîtriser l'Aquarelle Moderne",
						studentsCount: 85,
						rating: 4.9,
						lastUpdate: "05 Nov 2023",
						price: "35€",
						status: "Brouillon" as const,
					},
					{
						title: "Techniques de Dessin au Fusain",
						studentsCount: 210,
						rating: 4.7,
						lastUpdate: "20 Jan 2024",
						price: "59€",
						status: "Publié" as const,
					},
				].map((course, i) => (
					<InstructorCourseCard
						key={i}
						{...course}
						image=""
						instructor=""
						reviews={0}
						level="Débutant"
						duration=""
					/>
				))}
			</div>
		</div>
	);
}
