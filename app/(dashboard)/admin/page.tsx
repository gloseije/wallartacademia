import { StatsCard } from "@/components/dashboard/stats-card";
import {
	Users,
	BookOpen,
	DollarSign,
	ShieldCheck,
	LayoutGrid,
	ArrowUpRight,
	Search,
} from "lucide-react";

export default function AdminDashboardPage() {
	return (
		<div className="space-y-10">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold font-heading text-zinc-900">
						Administration
					</h1>
					<p className="text-muted-foreground mt-2">
						Vue d&apos;ensemble du système et gestion globale.
					</p>
				</div>
				<div className="relative">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<input
						type="text"
						placeholder="Rechercher..."
						className="pl-10 pr-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
					/>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatsCard
					title="Utilisateurs"
					value="5,420"
					icon={Users}
					trend={{ value: 24, label: "croissance", isPositive: true }}
				/>
				<StatsCard
					title="Cours Totaux"
					value="124"
					icon={BookOpen}
					description="12 en attente de validation"
				/>
				<StatsCard
					title="Chiffre d'Affaires"
					value="42,850€"
					icon={DollarSign}
					trend={{
						value: 18,
						label: "vs mois dernier",
						isPositive: true,
					}}
				/>
				<StatsCard
					title="Sessions Actives"
					value="342"
					icon={ShieldCheck}
					description="Système stable"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Recent System Activity */}
				<div className="lg:col-span-2 space-y-4">
					<h3 className="text-xl font-bold font-heading">
						Activités récentes
					</h3>
					<div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden divide-y divide-zinc-100">
						{[
							{
								action: "Nouvel Instructeur",
								target: "Sophia Loren",
								time: "à l'instant",
								status: "Nouveau",
							},
							{
								action: "Cours publié",
								target: "Théorie des Couleurs",
								time: "il y a 45m",
								status: "Approuvé",
							},
							{
								action: "Signalement",
								target: "Commentaire inapproprié",
								time: "il y a 2h",
								status: "A traiter",
							},
							{
								action: "Nouveau Partenariat",
								target: "Ecole des Beaux Arts",
								time: "il y a 5h",
								status: "Actif",
							},
							{
								action: "Mise à jour système",
								target: "v2.4.0",
								time: "hier",
								status: "Terminé",
							},
						].map((activity, i) => (
							<div
								key={i}
								className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
							>
								<div className="flex items-center gap-4">
									<div className="w-2 h-2 rounded-full bg-primary" />
									<div>
										<p className="text-sm font-bold">
											{activity.action}
										</p>
										<p className="text-xs text-muted-foreground">
											{activity.target}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-6">
									<span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
										{activity.time}
									</span>
									<span
										className={`px-3 py-1 rounded-full text-[10px] font-bold ${
											activity.status === "A traiter"
												? "bg-amber-100 text-amber-600"
												: "bg-zinc-100 text-zinc-600"
										}`}
									>
										{activity.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Quick Actions / Stats Category */}
				<div className="space-y-6">
					<h3 className="text-xl font-bold font-heading">
						Raccourcis
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<button className="p-6 bg-zinc-900 text-white rounded-2xl hover:bg-zinc-800 transition-colors flex flex-col items-center gap-3">
							<LayoutGrid size={24} />
							<span className="text-xs font-bold uppercase tracking-tight">
								Vue App
							</span>
						</button>
						<button className="p-6 bg-primary/5 text-primary border border-primary/10 rounded-2xl hover:bg-primary/10 transition-colors flex flex-col items-center gap-3">
							<Users size={24} />
							<span className="text-xs font-bold uppercase tracking-tight">
								Utilisateurs
							</span>
						</button>
					</div>

					<div className="glass-card p-6 rounded-2xl border-zinc-200/50 space-y-4">
						<div className="flex items-center justify-between">
							<h4 className="font-bold">Top Catégories</h4>
							<ArrowUpRight size={16} className="text-zinc-400" />
						</div>
						<div className="space-y-4">
							{[
								{ name: "Peinture", value: 45 },
								{ name: "Sculpture", value: 28 },
								{ name: "Dessin", value: 65 },
							].map((cat) => (
								<div key={cat.name} className="space-y-1.5">
									<div className="flex justify-between text-xs">
										<span className="font-medium">
											{cat.name}
										</span>
										<span className="text-muted-foreground">
											{cat.value}%
										</span>
									</div>
									<div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-primary rounded-full transition-all duration-1000"
											style={{ width: `${cat.value}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
