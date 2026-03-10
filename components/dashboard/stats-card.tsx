import { LucideIcon } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon: LucideIcon;
	trend?: {
		value: number;
		label: string;
		isPositive: boolean;
	};
}

export function StatsCard({
	title,
	value,
	description,
	icon: Icon,
	trend,
}: StatsCardProps) {
	return (
		<div className="glass-card p-6 rounded-2xl flex flex-col gap-2 transition-all hover:shadow-lg border-white/10">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
					{title}
				</span>
				<div className="p-2 bg-primary/5 rounded-xl">
					<Icon className="h-5 w-5 text-primary" />
				</div>
			</div>
			<div className="flex flex-col">
				<span className="text-2xl font-bold font-heading">{value}</span>
				{trend && (
					<div className="flex items-center gap-1 mt-1">
						<span
							className={`text-xs font-semibold ${
								trend.isPositive
									? "text-emerald-500"
									: "text-rose-500"
							}`}
						>
							{trend.isPositive ? "+" : "-"}
							{trend.value}%
						</span>
						<span className="text-xs text-muted-foreground">
							{trend.label}
						</span>
					</div>
				)}
				{description && !trend && (
					<span className="text-xs text-muted-foreground mt-1">
						{description}
					</span>
				)}
			</div>
		</div>
	);
}
