export default function SectionHeader({
	title,
	subtitle,
	align = "center",
	noMargin = false,
  }: {
	title: string;
	subtitle: string;
	align?: "center" | "left";
	noMargin?: boolean;
  }) {
	return (
	  <div
		className={`relative max-w-3xl ${
		  align === "center" ? "mx-auto text-center" : "text-left"
		} ${noMargin ? "" : "mb-16"}`}
	  >
		{/* Éléments décoratifs de fond (très discrets) */}
		<div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
		<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10" />
  
		<h2 className="text-4xl pt-1 pb-0 md:text-5xl font-black mb-4 tracking-tight bg-linear-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent drop-shadow-sm">
		  {title}
		</h2>
  
		{/* Trait de pinceau personnalisé */}
		<div
		  className={`relative w-24 h-2 mb-6 ${
			align === "center" ? "mx-auto" : ""
		  }`}
		>
		  <svg
			className="absolute inset-0 w-full h-full"
			viewBox="0 0 100 10"
			preserveAspectRatio="none"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		  >
			<path
			  d="M0,5 Q20,0 40,5 T80,5 T100,5"
			  stroke="url(#gradient)"
			  strokeWidth="3"
			  fill="transparent"
			  strokeLinecap="round"
			/>
			<defs>
			  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stopColor="#f59e0b" /> {/* amber-500 */}
				<stop offset="100%" stopColor="#6366f1" /> {/* indigo-500 */}
			  </linearGradient>
			</defs>
		  </svg>
		</div>
  
		<p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
		  {subtitle}
		</p>
	  </div>
	);
  }