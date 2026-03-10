import Image from "next/image";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";
import { CourseCardProps } from "@/types";

export default function CourseCard({
	title,
	instructor,
	price,
	rating,
	reviews,
	image,
	level,
	duration,
	href = "#",
}: CourseCardProps) {
	return (
		<div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-zinc-200/50 transition-all">
			{/* Image container */}
			<div className="aspect-video bg-zinc-100 relative overflow-hidden">
				{image ? (
					<Image
						src={image}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
						Aperçu du cours
					</div>
				)}

				{/* Badge niveau */}
				<div className="absolute top-3 right-3">
					<span
						className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
							level === "Débutant"
								? "bg-emerald-500 text-white shadow-sm"
								: level === "Intermédiaire"
									? "bg-amber-500 text-white shadow-sm"
									: level === "Avancé"
										? "bg-rose-500 text-white shadow-sm"
										: "bg-blue-500 text-white shadow-sm"
						}`}
					>
						{level}
					</span>
				</div>
			</div>

			{/* Contenu */}
			<div className="p-5 flex-1 flex flex-col gap-4">
				<div>
					<Link href={href} className="group/title">
						<h3
							className="font-bold text-lg group-hover/title:text-primary transition-colors line-clamp-2"
							title={title}
						>
							{title}
						</h3>
					</Link>
					<p className="text-sm text-muted-foreground mt-1 line-clamp-1">
						Par{" "}
						<span className="font-medium text-foreground">
							{instructor}
						</span>
					</p>

					<div className="flex items-center gap-4 mt-3">
						<div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
							<Clock size={14} className="text-zinc-400" />
							{duration}
						</div>
						<div className="flex items-center gap-1 text-xs font-medium text-amber-500">
							<Star size={14} className="fill-current" />
							{rating.toFixed(1)}{" "}
							<span className="text-zinc-400 font-normal">
								({reviews})
							</span>
						</div>
					</div>
				</div>

				{/* Prix et bouton */}
				<div className="mt-auto pt-4 border-t flex items-center justify-between">
					<div className="font-bold text-lg text-primary">
						{price}
					</div>
					<Link
						href={href}
						className="flex items-center gap-1 text-sm font-bold text-zinc-600 hover:text-primary transition-colors"
					>
						Découvrir <ArrowRight size={16} />
					</Link>
				</div>
			</div>
		</div>
	);
}
