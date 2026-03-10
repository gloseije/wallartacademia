import { StatsCard } from "@/components/dashboard/stats-card";
import {
	BookOpen,
	Clock,
	Trophy,
	ChevronRight,
	PlayCircle,
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="text-3xl font-bold font-heading text-zinc-900">
					Bienvenue, Jean !
				</h1>
				<p className="text-muted-foreground mt-2">
					Ravi de vous revoir. Voici un aperçu de votre progression.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatsCard
					title="Cours suivis"
					value="4"
					icon={BookOpen}
					description="2 en cours, 2 terminés"
				/>
				<StatsCard
					title="Heures d'apprentissage"
					value="12h 45m"
					icon={Clock}
					trend={{
						value: 15,
						label: "cette semaine",
						isPositive: true,
					}}
				/>
				<StatsCard
					title="Certificats"
					value="2"
					icon={Trophy}
					description="Bravo pour vos progrès !"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Recent Course */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold font-heading">
							Reprendre la lecture
						</h3>
						<Link
							href="/student/my-courses"
							className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
						>
							Voir tout <ChevronRight size={14} />
						</Link>
					</div>

					<div className="glass-card rounded-2xl overflow-hidden group border-zinc-200/50">
						<div className="aspect-video bg-zinc-100 relative overflow-hidden">
							<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
							<div className="absolute bottom-4 left-4 right-4 text-white">
								<h4 className="font-bold text-lg">
									Maîtriser la Peinture à l&#39;Huile
								</h4>
								<p className="text-white/80 text-sm">
									Module 3 : Les mélanges de couleurs
								</p>
							</div>
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
									<PlayCircle className="text-white h-10 w-10 fill-white/20" />
								</div>
							</div>
						</div>
						<div className="p-5 space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground font-medium">
										Progression
									</span>
									<span className="font-bold">65%</span>
								</div>
								<div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-primary rounded-full"
										style={{ width: "65%" }}
									/>
								</div>
							</div>
							<button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors">
								Continuer le cours
							</button>
						</div>
					</div>
				</div>

				{/* Recommended / New */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold font-heading">
							Recommandé pour vous
						</h3>
					</div>

					<div className="space-y-4">
						{[
							{
								title: "L'art du Portrait à l'Aquarelle",
								instructor: "Elena Rose",
								duration: "8h 30m",
								price: "49€",
							},
							{
								title: "Composition Moderne et Design",
								instructor: "Marc Lefebvre",
								duration: "5h 15m",
								price: "35€",
							},
							{
								title: "Techniques de Dessin au Fusain",
								instructor: "Sophie Martin",
								duration: "12h 00m",
								price: "59€",
							},
						].map((course, i) => (
							<div
								key={i}
								className="glass-card p-4 rounded-2xl flex gap-4 items-center group cursor-pointer hover:border-primary/20 transition-colors border-zinc-200/50"
							>
								<div className="w-20 h-20 bg-zinc-100 rounded-xl shrink-0 overflow-hidden">
									<div className="w-full h-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
								</div>
								<div className="flex-1 min-w-0">
									<h4 className="font-bold truncate group-hover:text-primary transition-colors">
										{course.title}
									</h4>
									<p className="text-xs text-muted-foreground mt-1">
										Par {course.instructor} •{" "}
										{course.duration}
									</p>
									<p className="text-sm font-bold mt-1 text-primary">
										{course.price}
									</p>
								</div>
								<ChevronRight
									className="text-muted-foreground group-hover:text-primary"
									size={18}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
