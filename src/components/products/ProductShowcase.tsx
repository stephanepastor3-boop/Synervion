import { useState } from 'react';
import { products } from '../../data/products';
import studiesData from '../../data/studies.json';
import { ProductCard } from './ProductCard';
import { Study } from '../../types';
import { BrandBadge } from '../brand/BrandBadge';

const studies = studiesData as Study[];

export function ProductShowcase() {
    const [activeCategory, setActiveCategory] = useState<'all' | 'performance' | 'immunity' | 'cognition'>('all');

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    const handleQuickAdd = (product: any, option: any) => {
        // Prepare query params for contextual contact page
        const params = new URLSearchParams({
            product: product.title,
            weight: option.weight,
            intent: 'order'
        });

        // Redirect to Contact Page with context
        window.location.href = `/contact?${params.toString()}`;
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <BrandBadge variant="primary" className="mb-6 mx-auto">
                        Bio-Metric Solutions
                    </BrandBadge>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
                        Engineered for <span className="text-orange-600">Human Performance</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Select your biological objective. Our formulations are precision-engineered to optimize specific physiological pathways.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-2 mb-12 flex-wrap">
                    {['all', 'performance', 'immunity', 'cognition'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {filteredProducts.map(product => {
                        // Find related studies
                        const relatedStudies = studies.filter(s => product.relatedStudyIds.includes(s.id));

                        return (
                            <div key={product.id} id={product.id} className="w-full max-w-md mx-auto scroll-mt-32">
                                <ProductCard
                                    product={product}
                                    relatedStudies={relatedStudies}
                                    onQuickAdd={handleQuickAdd}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
