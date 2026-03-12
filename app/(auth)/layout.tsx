import Image from "next/image";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4">
			{/* Fond décoratif */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
			<div className="absolute top-20 right-0 -z-10 h-72 w-72 bg-primary/5 blur-[100px] rounded-full animate-pulse-slow" />
			<div className="absolute bottom-20 left-0 -z-10 h-72 w-72 bg-secondary/10 blur-[100px] rounded-full animate-pulse-slow object-delay-1000" />

			<div className="w-full max-w-lg animate-fade-in-up">
				<div className="glass-card rounded-[2.5rem] p-4 sm:p-8 md:p-12 my-0 lg:my-6 shadow-2xl border border-black/10 shadow-primary/5">
					<Image
						src="/logo-wallart.png"
						alt="Logo"
						width={100}
						height={100}
						className="mx-auto mb-4 size-16"
					/>
					{children}
				</div>
			</div>
		</div>
	);
}
