import Link from "next/link";
import React from "react";

interface CategoryCardProps {
	icon: React.ReactNode;
	title: string;
	count: string;
	href: string;
	color?: keyof typeof colorSchemes;
  }

  const colorSchemes = {
	amber: {
	  iconColor: "text-amber-600", // couleur de l'icône seule
	  badge: "bg-amber-50 text-amber-800 border-amber-200",
	  borderHover: "group-hover:border-amber-300",
	  dot: "bg-amber-400",
	},
	terracotta: {
	  iconColor: "text-orange-600",
	  badge: "bg-orange-50 text-orange-800 border-orange-200",
	  borderHover: "group-hover:border-orange-300",
	  dot: "bg-orange-400",
	},
	indigo: {
	  iconColor: "text-indigo-600",
	  badge: "bg-indigo-50 text-indigo-800 border-indigo-200",
	  borderHover: "group-hover:border-indigo-300",
	  dot: "bg-indigo-400",
	},
	teal: {
	  iconColor: "text-teal-600",
	  badge: "bg-teal-50 text-teal-800 border-teal-200",
	  borderHover: "group-hover:border-teal-300",
	  dot: "bg-teal-400",
	},
  };
  
export default function CategoryCard({
	icon,
	title,
	count,
	href,
	color = "amber",
  }: CategoryCardProps) {
	const scheme = colorSchemes[color];
  
	return (
	  <a
		href={href}
		className={`group relative block p-6 bg-white rounded-2xl border border-stone-200/70 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${scheme.borderHover}`}
	  >
  
		{/* Petit point décoratif */}
		<div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${scheme.dot} opacity-50`} />
  
		{/* Icône sans cercle, seulement colorée */}
		<div className={`relative z-10 mb-4 ${scheme.iconColor}`}>
		  {icon}
		</div>
  
		<h3 className="relative z-10 text-xl font-bold text-stone-800 mb-2">
		  {title}
		</h3>
  
		{/* Badge compteur */}
		<div
		  className={`relative z-10 inline-block px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${scheme.badge}`}
		>
		  {count}
		</div>
  
		{/* Effet de bordure discrète */}
		<div className="absolute inset-0 rounded-2xl border border-stone-300/30 pointer-events-none" />
	  </a>
	);
  }
