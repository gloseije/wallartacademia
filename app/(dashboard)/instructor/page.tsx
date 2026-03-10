import { StatsCard } from "@/components/dashboard/stats-card";
import {
	InstructorCourseList,
	RecentEnrollmentsList,
} from "@/components/dashboard/instructor-lists";
import { Users, BookOpen, CreditCard, BarChart3, Plus } from "lucide-react";
import Link from "next/link";

export default function InstructorDashboardPage() {
	return (
		<div className="space-y-10">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold font-heading text-zinc-900">
						Espace Instructeur
					</h1>
					<p className="text-muted-foreground mt-2">
						Gérez vos cours et suivez les performances de vos
						élèves.
					</p>
				</div>
				<button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-primary/10">
					<Plus size={20} />
					Nouveau Cours
				</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatsCard
					title="Total Étudiants"
					value="1,284"
					icon={Users}
					trend={{ value: 12, label: "ce mois", isPositive: true }}
				/>
				<StatsCard
					title="Cours Actifs"
					value="8"
					icon={BookOpen}
					description="Tous publiés"
				/>
				<StatsCard
					title="Revenus Mensuels"
					value="3,450€"
					icon={CreditCard}
					trend={{
						value: 8.5,
						label: "vs mois dernier",
						isPositive: true,
					}}
				/>
				<StatsCard
					title="Note Moyenne"
					value="4.8/5"
					icon={BarChart3}
					description="Sur 450 avis"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* My Courses List */}
				<div className="lg:col-span-2 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold font-heading">
							Vos cours récents
						</h3>
						<Link
							href="/instructor/courses"
							className="text-sm font-medium text-primary hover:underline"
						>
							Gérer tout
						</Link>
					</div>

					<InstructorCourseList
						items={[
							{
								title: "Peinture à l'Huile Pro",
								users: 154,
								price: "89€",
								status: "Publié",
							},
							{
								title: "Dessin Anatomique",
								users: 89,
								price: "59€",
								status: "Publié",
							},
							{
								title: "Aquarelle Créative",
								users: 210,
								price: "45€",
								status: "Publié",
							},
						]}
					/>
				</div>

				{/* Recent Enrollments */}
				<div className="space-y-4">
					<h3 className="text-xl font-bold font-heading">
						Dernières inscriptions
					</h3>
					<RecentEnrollmentsList
						enrollments={[
							{
								name: "Sacha Dupont",
								course: "Peinture à l'Huile",
								time: "il y a 2h",
							},
							{
								name: "Marie Curie",
								course: "Aquarelle Créative",
								time: "il y a 5h",
							},
							{
								name: "Picasso Junior",
								course: "Dessin Anatomique",
								time: "il y a 1j",
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
