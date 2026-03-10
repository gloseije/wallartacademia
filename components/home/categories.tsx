import { Paintbrush, Shapes, Palette, Camera } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import CategoryCard from "@/components/home/category-card";

export default function CategoriesSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Taches de peinture abstraites */}
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
                <SectionHeader
                    title="Explorez nos catégories"
                    subtitle="Découvrez une multitude de disciplines artistiques enseignées par des experts."
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
                    <CategoryCard
                        icon={<Paintbrush className="w-6 h-6 md:w-8 md:h-8" />}
                        title="Peinture"
                        count="45+ ateliers"
                        href="/courses/painting"
                        color="amber"
                    />
                    <CategoryCard
                        icon={<Shapes className="w-6 h-6 md:w-8 md:h-8" />}
                        title="Dessin"
                        count="32+ ateliers"
                        href="/courses/drawing"
                        color="terracotta"
                    />
                    <CategoryCard
                        icon={<Palette className="w-6 h-6 md:w-8 md:h-8" />}
                        title="Art Numérique"
                        count="28+ ateliers"
                        href="/courses/digital"
                        color="indigo"
                    />
                    <CategoryCard
                        icon={<Camera className="w-6 h-6 md:w-8 md:h-8" />}
                        title="Photographie"
                        count="15+ ateliers"
                        href="/courses/photography"
                        color="teal"
                    />
                </div>
            </div>
        </section>
    );
}
