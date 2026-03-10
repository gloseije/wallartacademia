import { Search, PlayCircle, Clock, Award } from "lucide-react";

export default function StudentCoursesPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold font-heading">
					Mon Apprentissage
				</h1>
				<p className="text-muted-foreground mt-1">
					Continuez vos cours pour développer vos talents.
				</p>
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{[
					{
						title: "Maîtriser la Peinture à l&apos;Huile",
						instructor: "Jean-Louis David",
						progress: 65,
						lessons: "12/20",
						timeLeft: "4h d&apos;apprentissage",
					},
					{
						title: "Introduction au Dessin Classique",
						instructor: "Sophie Martin",
						progress: 100,
						lessons: "15/15",
						timeLeft: "Terminé",
					},
				].map((course, i) => (
					<div
						key={i}
						className="bg-white border border-zinc-200/60 rounded-3xl overflow-hidden group hover:shadow-xl transition-all flex flex-col sm:flex-row shadow-sm"
					>
						<div className="w-full sm:w-48 aspect-video sm:aspect-square bg-zinc-100 relative shrink-0">
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
								<PlayCircle className="text-white h-12 w-12" />
							</div>
						</div>
						<div className="p-6 flex-1 flex flex-col justify-between">
							<div className="space-y-1">
								<h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight">
									{course.title.replace("&apos;", "'")}
								</h3>
								<p className="text-sm text-muted-foreground">
									Par {course.instructor}
								</p>
							</div>

							<div className="mt-6 space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between text-xs font-bold uppercase tracking-wider">
										<span className="text-primary">
											{course.progress}% complété
										</span>
										<span className="text-muted-foreground">
											{course.lessons} leçons
										</span>
									</div>
									<div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
										<div
											className={`h-full rounded-full transition-all duration-1000 ${
												course.progress === 100
													? "bg-emerald-500 w-full"
													: course.progress === 65
														? "bg-primary w-[65%]"
														: "bg-primary w-0"
											}`}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between pt-2">
									<div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
										{course.progress === 100 ? (
											<Award
												size={14}
												className="text-emerald-500"
											/>
										) : (
											<Clock size={14} />
										)}
										{course.timeLeft.replace("&apos;", "'")}
									</div>
									<button
										className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${
											course.progress === 100
												? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
												: "text-white bg-primary hover:bg-zinc-800"
										}`}
									>
										{course.progress === 100
											? "Voir Certificat"
											: "Continuer"}
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
