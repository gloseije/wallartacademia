import {
	Search,
	Filter,
	MoreVertical,
	UserPlus,
	Mail,
	Shield,
} from "lucide-react";

export default function UsersAdminPage() {
	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold font-heading">
						Utilisateurs
					</h1>
					<p className="text-muted-foreground mt-1">
						Gérez les comptes et les permissions de la plateforme.
					</p>
				</div>
				<button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-all">
					<UserPlus size={18} />
					Inviter un utilisateur
				</button>
			</div>

			<div className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<input
						type="text"
						placeholder="Rechercher par nom ou email..."
						className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all"
					/>
				</div>
				<button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-zinc-50 transition-colors bg-white font-medium">
					<Filter size={18} />
					Filtres
				</button>
			</div>

			<div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm">
				<table className="w-full text-left">
					<thead className="bg-zinc-50 border-b border-zinc-200/60 font-semibold text-sm text-zinc-600">
						<tr>
							<th className="px-6 py-4">Utilisateur</th>
							<th className="px-6 py-4">Rôle</th>
							<th className="px-6 py-4">Statut</th>
							<th className="px-6 py-4">Dernière connexion</th>
							<th className="px-6 py-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-zinc-100">
						{[
							{
								name: "Jean Dupont",
								email: "jean.dupont@example.com",
								role: "Étudiant",
								status: "Actif",
								lastSeen: "Il y a 2h",
							},
							{
								name: "Alice Martin",
								email: "a.martin@academy.art",
								role: "Instructeur",
								status: "Actif",
								lastSeen: "Hier",
							},
							{
								name: "Robert Fox",
								email: "robert@design.com",
								role: "Étudiant",
								status: "Inactif",
								lastSeen: "Il y a 1 sem.",
							},
							{
								name: "Admin Wallart",
								email: "admin@wallart.fr",
								role: "Admin",
								status: "Actif",
								lastSeen: "Maintenant",
							},
						].map((user, i) => (
							<tr
								key={i}
								className="hover:bg-zinc-50/50 transition-colors"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-xs text-zinc-500">
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</div>
										<div>
											<p className="font-bold">
												{user.name}
											</p>
											<p className="text-xs text-muted-foreground flex items-center gap-1">
												<Mail size={10} /> {user.email}
											</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span
										className={`flex items-center gap-1.5 font-medium ${
											user.role === "Admin"
												? "text-primary"
												: "text-zinc-600"
										}`}
									>
										{user.role === "Admin" && (
											<Shield size={12} />
										)}
										{user.role}
									</span>
								</td>
								<td className="px-6 py-4">
									<span
										className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
											user.status === "Actif"
												? "bg-emerald-50 text-emerald-600 border border-emerald-100"
												: "bg-zinc-50 text-zinc-500 border border-zinc-100"
										}`}
									>
										{user.status}
									</span>
								</td>
								<td className="px-6 py-4 text-muted-foreground">
									{user.lastSeen}
								</td>
								<td className="px-6 py-4 text-right">
									<button
										title="Options"
										className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400"
									>
										<MoreVertical size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
