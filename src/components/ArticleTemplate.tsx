import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Article } from '../data/articles';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ArticleTemplateProps {
    article: Article;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article.slug]);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>{article.title} | Synervion</title>
                <meta name="description" content={article.description} />
                <meta name="keywords" content={article.keywords.join(', ')} />
                <link rel="canonical" href={`https://www.synervion.com/${article.slug}`} />

                {/* Open Graph */}
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.synervion.com/${article.slug}`} />

                {/* Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <Navigation />

            <main className="pt-24 pb-16">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            {article.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {article.description}
                        </p>
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* FAQ Section */}
                    <section className="mt-16 pt-16 border-t border-slate-200">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {article.faq.map((item, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0" />
                                        {item.question}
                                    </h3>
                                    <p className="text-slate-600 ml-9">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Experience the Difference?
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                Join thousands of athletes and biohackers optimizing their performance with Synervion Cordyceps Militaris.
                            </p>
                            <a
                                href="/#products"
                                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105"
                            >
                                Shop Synervion Cordyceps
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
