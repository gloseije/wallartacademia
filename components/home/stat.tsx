export default function Stat({
	value,
	label,
}: {
	value: string;
	label: string;
}) {
	return (
		<div className="group cursor-default">
			<div className="text-2xl font-bold group-hover:text-primary transition-colors">
				{value}
			</div>
			<div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
				{label}
			</div>
		</div>
	);
}
