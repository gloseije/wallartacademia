"use client";

import { useMemo, useRef, useState } from "react";
import CourseCard from "@/components/courses/course-card";
import {
	Search,
	X,
	ChevronLeft,
	ChevronRight,
	ArrowUpDown,
	Sparkles,
	TrendingUp,
	ArrowDownAZ,
	ArrowUpAZ,
	Star,
	LayoutGrid,
	List,
	Palette,
	Pencil,
	Monitor,
	Camera,
	Shapes,
	BookOpen,
	Layers,
} from "lucide-react";

const COURSES = [
	{
		id: 1,
		title: "Maîtriser l'Aquarelle Moderne",
		instructor: "Sarah Lumina",
		price: "49.99 $",
		rating: 4.9,
		reviews: 128,
		image: "/hero.png",
		level: "Débutant",
		duration: "12h 30m",
		category: "Peinture",
	},
	{
		id: 2,
		title: "Portrait Réaliste au Fusain",
		instructor: "Marc Antoine",
		price: "59.99 $",
		rating: 4.8,
		reviews: 85,
		image: "/hero.png",
		level: "Intermédiaire",
		duration: "15h 45m",
		category: "Dessin",
	},
	{
		id: 3,
		title: "Illustration Digitale Avancée",
		instructor: "Elena Design",
		price: "64.99 $",
		rating: 5.0,
		reviews: 210,
		image: "/hero.png",
		level: "Avancé",
		duration: "22h 10m",
		category: "Art Numérique",
	},
	{
		id: 4,
		title: "Photographie de Paysage",
		instructor: "Jean-Pierre Kabé",
		price: "45.00 $",
		rating: 4.7,
		reviews: 56,
		image: "/hero.png",
		level: "Débutant",
		duration: "8h 15m",
		category: "Photographie",
	},
	{
		id: 5,
		title: "Sculpture Contemporaine",
		instructor: "Marie-Louise",
		price: "75.00 $",
		rating: 4.9,
		reviews: 42,
		image: "/hero.png",
		level: "Avancé",
		duration: "30h 00m",
		category: "Sculpture",
	},
	{
		id: 6,
		title: "Théorie des Couleurs",
		instructor: "Prof. Artiste",
		price: "29.99 $",
		rating: 4.6,
		reviews: 320,
		image: "/hero.png",
		level: "Tous niveaux",
		duration: "5h 45m",
		category: "Théorie",
	},
] as const;

const CATEGORIES = [
	{ name: "Tous", icon: Layers },
	{ name: "Peinture", icon: Palette },
	{ name: "Dessin", icon: Pencil },
	{ name: "Art Numérique", icon: Monitor },
	{ name: "Photographie", icon: Camera },
	{ name: "Sculpture", icon: Shapes },
	{ name: "Théorie", icon: BookOpen },
] as const;

const SORT_OPTIONS = [
	{ label: "Nouveautés", value: "newest", icon: Sparkles },
	{ label: "Plus populaires", value: "popular", icon: TrendingUp },
	{ label: "Prix croissant", value: "price_asc", icon: ArrowUpAZ },
	{ label: "Prix décroissant", value: "price_desc", icon: ArrowDownAZ },
	{ label: "Note moyenne", value: "rating", icon: Star },
] as const;

type ViewMode = "grid" | "list";
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function CoursesExplorer() {
	const [selectedCategory, setSelectedCategory] = useState("Tous");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<SortValue>("newest");
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [prevFilteredLength, setPrevFilteredLength] = useState(0);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const searchRef = useRef<HTMLInputElement | null>(null);
	const itemsPerPage = 6;

	const filteredCourses = useMemo(() => {
		const filtered = COURSES.filter((course) => {
			const matchesCategory =
				selectedCategory === "Tous" ||
				course.category === selectedCategory;
			const lowercaseQuery = searchQuery.toLowerCase();
			const matchesSearch =
				course.title.toLowerCase().includes(lowercaseQuery) ||
				course.instructor.toLowerCase().includes(lowercaseQuery);
			return matchesCategory && matchesSearch;
		});

		switch (sortBy) {
			case "popular":
				filtered.sort((a, b) => b.reviews - a.reviews);
				break;
			case "price_asc":
				filtered.sort(
					(a, b) =>
						parseFloat(a.price.replace(" $", "")) -
						parseFloat(b.price.replace(" $", "")),
				);
				break;
			case "price_desc":
				filtered.sort(
					(a, b) =>
						parseFloat(b.price.replace(" $", "")) -
						parseFloat(a.price.replace(" $", "")),
				);
				break;
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating);
				break;
			default:
				filtered.sort((a, b) => b.id - a.id);
		}

		return filtered;
	}, [selectedCategory, searchQuery, sortBy]);

	const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
	const paginatedCourses = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredCourses.slice(start, start + itemsPerPage);
	}, [filteredCourses, currentPage]);

	if (filteredCourses.length !== prevFilteredLength) {
		setPrevFilteredLength(filteredCourses.length);
		setCurrentPage(1);
	}

	const hasActiveFilters = selectedCategory !== "Tous" || searchQuery !== "";

	const clearFilters = () => {
		setSelectedCategory("Tous");
		setSearchQuery("");
		setSortBy("newest");
	};

	const currentSortOption = SORT_OPTIONS.find((o) => o.value === sortBy);

	return (
		<>
			{/* HERO BANNER */}
			<section className="relative pt-48 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-[#faf7f2]">
				<div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10" />
				<div className="absolute top-1/3 left-1/4 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -z-10" />

				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-800 tracking-tight mb-6 leading-[1.08]">
							Explorez l&apos;univers
							<br />
							<span className="relative inline-block mt-1">
								<span className="relative z-10 bg-linear-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent">
									de l&apos;art
								</span>
								<svg
									className="absolute -bottom-2 left-0 w-full h-4 text-amber-500/40"
									viewBox="0 0 200 10"
									preserveAspectRatio="none"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0 5 Q30 0, 60 5 T120 5 T180 5"
										stroke="currentColor"
										strokeWidth="3"
										fill="transparent"
										strokeLinecap="round"
									/>
								</svg>
							</span>
						</h1>

						<p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
							Du classique au numérique, trouvez la formation qui
							éveillera votre créativité.
						</p>

						<div
							className={`relative max-w-xl mx-auto transition-all duration-300 ${
								isSearchFocused ? "scale-[1.02]" : ""
							}`}
						>
							<Search
								className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10 ${
									isSearchFocused
										? "text-stone-700"
										: "text-stone-400"
								}`}
							/>
							<input
								ref={searchRef}
								type="text"
								placeholder="Rechercher un cours, un artiste..."
								className="w-full pl-14 pr-14 py-5 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/30 focus:bg-white transition-all text-stone-800 placeholder:text-stone-400 font-medium text-base shadow-lg"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setIsSearchFocused(true)}
								onBlur={() => setIsSearchFocused(false)}
							/>
							{searchQuery && (
								<button
									onClick={() => {
										setSearchQuery("");
										searchRef.current?.focus();
									}}
									className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
									aria-label="Effacer la recherche"
								>
									<X className="w-4 h-4 text-stone-600" />
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* CATEGORY PILLS */}
			<section className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-none -mx-4 px-4">
						{CATEGORIES.map((cat) => {
							const Icon = cat.icon;
							return (
								<button
									key={cat.name}
									onClick={() =>
										setSelectedCategory(cat.name)
									}
									className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
										selectedCategory === cat.name
											? "bg-foreground text-background shadow-lg shadow-foreground/10 scale-105"
											: "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
									}`}
								>
									<Icon size={16} />
									{cat.name}
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* MAIN CONTENT */}
			<main className="grow py-12 font-sans">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-wrap items-center justify-between gap-4 mb-10">
						<div className="flex items-center gap-4">
							<p className="text-sm text-muted-foreground font-medium">
								<span className="text-foreground font-black text-2xl mr-1">
									{filteredCourses.length}
								</span>
								{filteredCourses.length > 1
									? "cours trouvés"
									: "cours trouvé"}
							</p>
							{hasActiveFilters && (
								<button
									onClick={clearFilters}
									className="group inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-xs font-black uppercase tracking-wider hover:bg-red-500/20 transition-colors"
								>
									<X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
									Réinit.
								</button>
							)}
						</div>

						<div className="flex items-center gap-3">
							<div className="hidden sm:flex items-center bg-secondary/80 rounded-xl p-1">
								<button
									onClick={() => setViewMode("grid")}
									className={`p-2.5 rounded-lg transition-all ${
										viewMode === "grid"
											? "bg-background shadow-sm text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
									title="Vue grille"
								>
									<LayoutGrid size={16} />
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`p-2.5 rounded-lg transition-all ${
										viewMode === "list"
											? "bg-background shadow-sm text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
									title="Vue liste"
								>
									<List size={16} />
								</button>
							</div>

							<div className="relative">
								<button
									onClick={() => setIsSortOpen(!isSortOpen)}
									className="inline-flex items-center gap-2.5 px-5 py-3 bg-secondary/80 hover:bg-secondary rounded-xl text-sm font-bold transition-all"
								>
									<ArrowUpDown size={15} />
									<span className="hidden sm:inline">
										{currentSortOption?.label}
									</span>
								</button>
								{isSortOpen && (
									<>
										<div
											className="fixed inset-0 z-10"
											onClick={() => setIsSortOpen(false)}
										/>
										<div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
											{SORT_OPTIONS.map((option) => {
												const Icon = option.icon;
												return (
													<button
														key={option.value}
														onClick={() => {
															setSortBy(
																option.value,
															);
															setIsSortOpen(
																false,
															);
														}}
														className={`w-full flex items-center gap-3 text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary/50 ${
															sortBy ===
															option.value
																? "text-foreground bg-secondary/30 font-bold"
																: "text-muted-foreground"
														}`}
													>
														<Icon
															size={16}
															className={
																sortBy ===
																option.value
																	? "text-primary"
																	: ""
															}
														/>
														{option.label}
														{sortBy ===
															option.value && (
															<span className="ml-auto w-2 h-2 rounded-full bg-foreground" />
														)}
													</button>
												);
											})}
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					{hasActiveFilters && (
						<div className="flex flex-wrap items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
							{selectedCategory !== "Tous" && (
								<span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-full text-sm font-bold">
									{(() => {
										const cat = CATEGORIES.find(
											(c) => c.name === selectedCategory,
										);
										if (!cat) return null;
										const Icon = cat.icon;
										return <Icon size={14} />;
									})()}{" "}
									{selectedCategory}
									<button
										title="Catégories"
										onClick={() =>
											setSelectedCategory("Tous")
										}
										className="ml-1 p-0.5 hover:bg-foreground/10 rounded-full transition-colors"
									>
										<X size={12} />
									</button>
								</span>
							)}
							{searchQuery && (
								<span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-full text-sm font-bold">
									<Search size={12} />
									&ldquo;{searchQuery}&rdquo;
									<button
										title="lancer une recherche"
										onClick={() => setSearchQuery("")}
										className="ml-1 p-0.5 hover:bg-foreground/10 rounded-full transition-colors"
									>
										<X size={12} />
									</button>
								</span>
							)}
						</div>
					)}

					{paginatedCourses.length > 0 ? (
						<>
							<div
								className={
									viewMode === "grid"
										? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
										: "flex flex-col gap-6"
								}
							>
								{paginatedCourses.map((course, index) => (
									<div
										key={course.id}
										className={`animate-fade-in-up [animation-fill-mode:both] ${
											[
												"delay-0",
												"[animation-delay:80ms]",
												"[animation-delay:160ms]",
												"[animation-delay:240ms]",
												"[animation-delay:320ms]",
												"[animation-delay:400ms]",
											][index] || "delay-500"
										}`}
									>
										<CourseCard {...course} />
									</div>
								))}
							</div>

							{totalPages > 1 && (
								<div className="mt-20 flex justify-center">
									<nav className="inline-flex items-center gap-1.5 p-2 bg-secondary/50 rounded-2xl">
										<button
											onClick={() =>
												setCurrentPage((p) =>
													Math.max(1, p - 1),
												)
											}
											disabled={currentPage === 1}
											className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-background transition-all disabled:opacity-20 disabled:cursor-not-allowed"
											aria-label="Page précédente"
										>
											<ChevronLeft className="w-5 h-5" />
										</button>

										{[
											...Array(Math.min(5, totalPages)),
										].map((_, i) => {
											let pageNum: number;
											if (totalPages <= 5) {
												pageNum = i + 1;
											} else if (currentPage <= 3) {
												pageNum = i + 1;
											} else if (
												currentPage >=
												totalPages - 2
											) {
												pageNum = totalPages - 4 + i;
											} else {
												pageNum = currentPage - 2 + i;
											}

											return (
												<button
													key={pageNum}
													onClick={() =>
														setCurrentPage(pageNum)
													}
													className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
														currentPage === pageNum
															? "bg-foreground text-background shadow-md"
															: "hover:bg-background text-muted-foreground hover:text-foreground"
													}`}
												>
													{pageNum}
												</button>
											);
										})}

										{totalPages > 5 &&
											currentPage < totalPages - 2 && (
												<span className="px-1 text-muted-foreground/50 text-sm">
													•••
												</span>
											)}

										{totalPages > 5 &&
											currentPage < totalPages - 2 && (
												<button
													onClick={() =>
														setCurrentPage(
															totalPages,
														)
													}
													className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-background text-muted-foreground hover:text-foreground font-bold text-sm"
												>
													{totalPages}
												</button>
											)}

										<button
											onClick={() =>
												setCurrentPage((p) =>
													Math.min(totalPages, p + 1),
												)
											}
											disabled={
												currentPage === totalPages
											}
											className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-background transition-all disabled:opacity-20 disabled:cursor-not-allowed"
											aria-label="Page suivante"
										>
											<ChevronRight className="w-5 h-5" />
										</button>
									</nav>
								</div>
							)}
						</>
					) : (
						<div className="py-24 flex flex-col items-center animate-fade-in">
							<div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center mb-6 rotate-6">
								<Search className="w-10 h-10 text-muted-foreground/40" />
							</div>
							<h3 className="text-2xl font-black mb-3 text-center">
								Aucun cours trouvé
							</h3>
							<p className="text-muted-foreground max-w-sm text-center mb-8 leading-relaxed">
								Essayez d&apos;ajuster vos filtres ou votre
								recherche pour trouver ce que vous cherchez.
							</p>
							<button
								onClick={clearFilters}
								className="px-8 py-4 bg-foreground text-background rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
							>
								Réinitialiser les filtres
							</button>
						</div>
					)}
				</div>
			</main>
		</>
	);
}
