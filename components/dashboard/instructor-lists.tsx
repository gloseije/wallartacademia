import { MoreVertical } from "lucide-react";

interface CourseListProps {
	items: {
		title: string;
		users: number;
		price: string;
		status: string;
	}[];
}

export function InstructorCourseList({ items }: CourseListProps) {
	return (
		<div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden">
			<table className="w-full text-left">
				<thead className="bg-zinc-50 border-b border-zinc-200/60 font-semibold text-sm text-zinc-600">
					<tr>
						<th className="px-6 py-4">Cours</th>
						<th className="px-6 py-4">Étudiants</th>
						<th className="px-6 py-4">Prix</th>
						<th className="px-6 py-4 text-right">Action</th>
					</tr>
				</thead>
				<tbody className="text-sm divide-y divide-zinc-100">
					{items.map((item, i) => (
						<tr
							key={i}
							className="hover:bg-zinc-50/50 transition-colors"
						>
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-zinc-100 rounded-lg" />
									<span className="font-bold">
										{item.title}
									</span>
								</div>
							</td>
							<td className="px-6 py-4 font-medium">
								{item.users}
							</td>
							<td className="px-6 py-4 font-bold text-primary">
								{item.price}
							</td>
							<td className="px-6 py-4 text-right">
								<button
									title="Action"
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
	);
}

export function RecentEnrollmentsList({
	enrollments,
}: {
	enrollments: { name: string; course: string; time: string }[];
}) {
	return (
		<div className="glass-card p-6 rounded-2xl border-zinc-200/50 space-y-6">
			{enrollments.map((enroll, i) => (
				<div key={i} className="flex gap-4">
					<div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center font-bold text-xs text-primary border border-primary/10">
						{enroll.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</div>
					<div>
						<p className="text-sm font-bold">{enroll.name}</p>
						<p className="text-xs text-muted-foreground">
							Inscrit à :{" "}
							<span className="text-zinc-700 font-medium">
								{enroll.course}
							</span>
						</p>
						<p className="text-[10px] text-muted-foreground mt-1">
							{enroll.time}
						</p>
					</div>
				</div>
			))}
			<button className="w-full py-3 border border-zinc-200 rounded-xl text-sm font-bold hover:bg-zinc-50 transition-colors">
				Voir toutes les inscriptions
			</button>
		</div>
	);
}
