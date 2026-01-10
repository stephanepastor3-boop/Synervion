import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/products/ProductCard';
import { products } from '../data/products';
import studiesData from '../data/studies.json';
import { Study } from '../types';

const studies = studiesData as Study[];

export function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === id);

    if (!product) {
        return <Navigate to="/404" replace />;
    }

    const relatedStudies = studies.filter(s => product.relatedStudyIds.includes(s.id));

    const handleQuickAdd = (product: any, option: any) => {
        // Reuse the contact page logic
        const params = new URLSearchParams({
            product: product.title,
            weight: option.weight,
            intent: 'order'
        });
        window.location.href = `/contact?${params.toString()}`;
    };

    // Schema for Product
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.gallery?.map(g => g.src) || [product.image],
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Synervion"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://www.synervion.com/product/${product.id}`,
            "priceCurrency": "USD",
            "price": product.price > 0 ? product.price : "0",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <div className="min-h-screen bg-[hsl(var(--synervion-bg-white))]">
            <SEO
                title={`${product.title} | Synervion Labs`}
                description={product.description}
                canonical={`https://www.synervion.com/product/${product.id}`}
                image={product.image}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            </Helmet>

            <Navigation />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* Header */}
                    <div className="mb-12 text-center md:text-left">
                        <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-2 block">
                            {product.category} Series
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4">
                            {product.title}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl">
                            {product.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left: THe Interactive Card */}
                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            <ProductCard
                                product={product}
                                relatedStudies={relatedStudies}
                                onQuickAdd={handleQuickAdd}
                            />
                        </div>

                        {/* Right: Detailed Specs & Story */}
                        <div className="space-y-12">

                            {/* Short Description */}
                            <div>
                                <h2 className="text-2xl font-bold font-display mb-4">Biological Mechanism</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {product.description}
                                    <br /><br />
                                    Our {product.title} is engineered using {product.tags.join(', ')} to ensure maximum bioavailability.
                                    The active compound, {product.activeCompound}, is standardized to {product.potency}, providing consistent
                                    efficacy for {product.category} applications.
                                </p>
                            </div>

                            {/* Metrics Grid */}
                            <div>
                                <h3 className="text-lg font-bold mb-6 font-display border-b pb-2">Technical Specifications</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.metrics.map((m, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block mb-1">
                                                {m.label}
                                            </span>
                                            <span className="text-slate-900 font-bold text-lg">
                                                {m.value}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                        <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block mb-1">
                                            Format
                                        </span>
                                        <span className="text-slate-900 font-bold text-lg">
                                            {product.formatLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Application list */}
                            <div>
                                <h3 className="text-lg font-bold mb-6 font-display border-b pb-2">Target Applications</h3>
                                <ul className="space-y-3">
                                    {product.applicationExamples?.map((app, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            {app}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
