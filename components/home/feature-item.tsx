import React from "react";

export default function FeatureItem({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="group text-center md:text-left space-y-6">
			<div className="inline-flex p-5 bg-white/10 backdrop-blur-sm rounded-4xl text-white shadow-xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
				{icon}
			</div>
			<h3 className="text-2xl font-bold tracking-tight">{title}</h3>
			<p className="text-lg text-primary-foreground/60 leading-relaxed font-medium">
				{description}
			</p>
		</div>
	);
}
