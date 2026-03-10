import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="py-8 border-t border-border/50">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-2">
						<Image
							src="/wallartacademia.PNG"
							alt="logo"
							width={6004}
							height={3501}
							className="w-24"
						/>
					</div>
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} wallartacademia. Conçu avec
						passion.
					</p>
					<div className="flex gap-4">
						<Link
							href="/terms"
							className="text-xs text-muted-foreground hover:text-primary transition-colors"
						>
							Mentions légales
						</Link>
						<Link
							href="/privacy"
							className="text-xs text-muted-foreground hover:text-primary transition-colors"
						>
							Confidentialité
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
