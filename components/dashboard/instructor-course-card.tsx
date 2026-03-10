"use client";

import { CourseCardProps } from "@/types";
import {
	Users,
	Star,
	Calendar,
	MoreVertical,
	Edit,
	Eye,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface InstructorCourseCardProps extends Omit<CourseCardProps, "id"> {
	status: "Publié" | "Brouillon" | "Archivé";
	studentsCount: number;
	lastUpdate: string;
}

export function InstructorCourseCard({
	title,
	price,
	rating,
	image,
	status,
	studentsCount,
	lastUpdate,
}: InstructorCourseCardProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-zinc-200/50 transition-all">
			<div className="aspect-video bg-zinc-100 relative">
				{image ? (
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
						{/* Placeholder image si non fournie */}
						Aperçu du cours
					</div>
				)}
				<div className="absolute top-3 right-3">
					<span
						className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
							status === "Publié"
								? "bg-emerald-500 text-white shadow-sm"
								: status === "Brouillon"
									? "bg-amber-100 text-amber-700 font-bold"
									: "bg-zinc-200 text-zinc-600"
						}`}
					>
						{status}
					</span>
				</div>
			</div>

			<div className="p-5 flex-1 flex flex-col gap-4">
				<div>
					<h3
						className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1"
						title={title}
					>
						{title}
					</h3>
					<div className="flex items-center gap-4 mt-2">
						<div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
							<Users size={14} className="text-zinc-400" />
							{studentsCount} élèves
						</div>
						<div className="flex items-center gap-1 text-xs font-medium text-amber-500">
							<Star size={14} className="fill-current" />
							{rating.toFixed(1)}
						</div>
					</div>
				</div>

				<div className="mt-auto pt-4 border-t flex items-center justify-between">
					<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
						<Calendar size={12} />
						{lastUpdate}
					</div>
					<div className="flex items-center gap-2">
						<span className="font-bold text-primary">{price}</span>

						<div className="relative">
							<button
								title="Options"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								onBlur={() =>
									setTimeout(() => setIsMenuOpen(false), 200)
								}
								className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors"
							>
								<MoreVertical size={16} />
							</button>

							{isMenuOpen && (
								<div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl shadow-black/5 border border-zinc-100 py-1 z-10 animate-fade-in-up">
									<Link
										href="#"
										className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-primary transition-colors"
									>
										<Edit size={14} /> Modifier
									</Link>
									<Link
										href="#"
										className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-primary transition-colors"
									>
										<Eye size={14} /> Aperçu
									</Link>
									<div className="h-px bg-zinc-100 my-1" />
									<button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
										<Trash2 size={14} /> Supprimer
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
