import { ArrowRight, BookOpen, Tag } from 'lucide-react';
import { articles } from '../data/articles';
import { BrandBadge } from './brand/BrandBadge';

export function FeaturedArticles() {
    // Select specific high-value articles to feature (Pillar + 2 specific clusters)
    // Select specific high-value articles to feature (Prioritize New SEO + Pillar)
    // Force HMR Update
    const featuredSlugs = [
        'keeda-jadi-price-india',
        'cordyceps-manufacturer-india',
        'cordyceps-militaris-benefits',
        'cordyceps-for-high-altitude-training',
        'creator-first-product-launch-guide'
    ];

    // Fallback to first 6 if specific ones not found
    const displayArticles = articles.filter(a => featuredSlugs.includes(a.slug));
    // If fewer than 6 found, just fill with others.
    const finalArticles = [
        ...displayArticles,
        ...articles.filter(a => !featuredSlugs.includes(a.slug))
    ].slice(0, 6);

    return (
        <section id="articles" className="py-20 sm:py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--synervion-primary-500)) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
                <header className="text-center mb-12 lg:mb-16">
                    <BrandBadge variant="secondary" className="mb-4">
                        Expert Guides
                    </BrandBadge>
                    <h2 className="mb-4 text-[28px] sm:text-[40px] font-heading font-bold leading-tight text-foreground">
                        Wellness <span className="text-primary">Insights</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
                        Deep dives into the science of Cordyceps, performance protocols, and health optimization strategies.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {finalArticles.map((article) => (
                        <a
                            key={article.slug}
                            href={`/${article.slug}`}
                            className="group flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                        >
                            {/* Image Placeholder - In real app, use article.ogImage or map to local assets */}
                            <div className="h-48 bg-secondary/30 relative overflow-hidden">
                                {article.ogImage ? (
                                    <img
                                        src={article.ogImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                                        <BookOpen size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary rounded-full shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow p-6 sm:p-8">
                                <h3 className="text-xl font-heading font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                    {article.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Tag size={14} />
                                        <span>{article.category}</span>
                                    </div>
                                    <span className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                                        Read Guide <ArrowRight size={16} className="ml-1" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
