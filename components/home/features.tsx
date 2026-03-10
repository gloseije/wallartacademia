import { Award, Users, Zap } from "lucide-react";
import FeatureItem from "./feature-item";

export default function FeaturesSection() {
	return (
		<section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 rounded-full blur-[100px]" />
			</div>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-black mb-6">
						Pourquoi choisir wallart academia ?
					</h2>
					<p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
						Nous offrons une expérience d&apos;apprentissage conçue
						pour vous amener au sommet de votre art.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<FeatureItem
						icon={<Award className="w-10 h-10" />}
						title="Certificat d'Excellence"
						description="Obtenez une certification reconnue après chaque formation complétée avec succès."
					/>
					<FeatureItem
						icon={<Users className="w-10 h-10" />}
						title="Communauté Active"
						description="Échangez avec des milliers d'autres passionnés et recevez des avis sur vos œuvres."
					/>
					<FeatureItem
						icon={<Zap className="w-10 h-10" />}
						title="Accès Illimité"
						description="Apprenez à votre rythme avec un accès à vie à tous vos cours achetés."
					/>
				</div>
			</div>
		</section>
	);
}
