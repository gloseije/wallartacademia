import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import HeroSection from "@/components/home/hero";
import CategoriesSection from "@/components/home/categories";
import PopularCoursesSection from "@/components/home/popular-courses";
import FeaturesSection from "@/components/home/features";
import CTASection from "@/components/home/cta";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-background overflow-hidden">
			<Header />
			<HeroSection />
			<CategoriesSection />
			<PopularCoursesSection />
			<FeaturesSection />
			<CTASection />
			<Footer />
		</div>
	);
}
