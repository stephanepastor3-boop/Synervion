import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Article } from '../data/articles';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScienceCTA } from './ScienceCTA';
import { Calendar, Clock, Share2, ChevronRight, User } from 'lucide-react';
import { TableOfContents } from './ui/table-of-contents';
import { Link } from 'react-router-dom';

interface ArticleTemplateProps {
    article: Article;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article.slug]);

    // Use article dates or fallback to defaults
    const datePublished = article.datePublished || article.factCheck?.datePublished || '2025-01-01';
    const dateModified = article.dateModified || new Date().toISOString().split('T')[0];
    const ogImage = article.ogImage || 'https://www.synervion.com/assets/hero-cordyceps-macro-B95TAOQ7.png';
    const authorName = article.author?.name || 'Synervion Science Team';

    const schemas: any[] = [
        // Article Schema
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.description,
            "author": {
                "@type": article.author ? "Person" : "Organization",
                "name": authorName,
                ...(article.author && { "jobTitle": article.author.role })
            },
            "publisher": {
                "@type": "Organization",
                "name": "Synervion",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.synervion.com/logo-favicon-180x180.png"
                }
            },
            "datePublished": datePublished,
            "dateModified": dateModified,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.synervion.com/${article.slug}`
            },
            "url": `https://www.synervion.com/${article.slug}`,
            "image": ogImage
        },
        // BreadcrumbList Schema
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.synervion.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Guides",
                    "item": `https://www.synervion.com/#articles`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": article.title
                }
            ]
        },
        // FAQPage Schema
        {
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
        }
    ];

    if (article.factCheck) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FactCheck",
            "claimReviewed": article.factCheck.claim,
            "itemReviewed": {
                "@type": "Claim",
                "author": {
                    "@type": "Organization",
                    "name": article.factCheck.author
                },
                "datePublished": article.factCheck.datePublished,
                "appearance": [
                    {
                        "@type": "CreativeWork",
                        "url": `https://www.synervion.com/${article.slug}`
                    }
                ]
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "alternateName": "True"
            }
        });
    }

    if (article.howTo) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": article.howTo.name,
            "step": article.howTo.step.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.name,
                "text": step.text,
                ...(step.image && { "image": step.image })
            }))
        });
    }

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>{article.title} | Synervion</title>
                <meta name="description" content={article.description} />
                <meta name="keywords" content={article.keywords.join(', ')} />
                <link rel="canonical" href={`https://www.synervion.com/${article.slug}`} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.synervion.com/${article.slug}`} />
                <meta property="og:image" content={ogImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.description} />
                <meta name="twitter:image" content={ogImage} />
                {schemas.map((schema, index) => (
                    <script key={index} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))}
            </Helmet>

            <Navigation />

            <main className="pt-20">
                {/* Immersive Hero Header */}
                <div className="relative w-full bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
                    {/* Background Image / Gradient */}
                    <div className="absolute inset-0 z-0">
                        {/* Fallback pattern or actual image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 z-10" />
                        <img
                            src={ogImage}
                            alt=""
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                    </div>

                    <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="max-w-4xl">
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-2 text-sm text-slate-300 mb-6 font-medium">
                                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight size={14} />
                                <Link to="/#articles" className="hover:text-white transition-colors">Guides</Link>
                                <ChevronRight size={14} />
                                <span className="text-orange-400">{article.category}</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-md">
                                {article.title}
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-100 leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
                                {article.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-200">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-orange-400" />
                                    <span>{authorName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-orange-400" />
                                    <span>{new Date(datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-orange-400" />
                                    <span>{Math.ceil(article.content.length / 1500)} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Article Content (8 cols) */}
                        <div className="lg:col-span-8">

                            {/* Article Body */}
                            <article className="prose prose-lg prose-slate max-w-none 
                                prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 
                                prose-p:text-slate-600 prose-p:leading-relaxed 
                                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900 prose-strong:font-semibold
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-orange-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
                                prose-li:text-slate-600 prose-li:marker:text-primary
                                prose-img:rounded-xl prose-img:shadow-lg
                            ">
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </article>

                            {/* FAQ Section */}
                            <section className="mt-16 pt-12 border-t border-border">
                                <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {article.faq.map((item, index) => (
                                        <div key={index} className="border border-border rounded-xl p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                            <h3 className="font-semibold text-foreground mb-2 pr-8">{item.question}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <ScienceCTA />
                        </div>

                        {/* Right Column: Sidebar (4 cols) */}
                        <aside className="lg:col-span-4 space-y-8">

                            {/* Author Card */}
                            {article.author && (
                                <div className="rounded-2xl border border-border p-6 bg-slate-50/50">
                                    <div className="flex items-center gap-4 mb-4">
                                        {article.author.image ? (
                                            <img
                                                src={article.author.image}
                                                alt={article.author.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {article.author.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-bold text-slate-900">{article.author.name}</div>
                                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{article.author.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {article.author.bio}
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-border text-slate-500 hover:text-primary hover:border-primary transition-colors">
                                            <Share2 size={14} />
                                        </button>
                                        {/* Add LinkedIn/Twitter links if available in data */}
                                    </div>
                                </div>
                            )}

                            {/* Sidebar - Sticky Container */}
                            <div className="sticky top-24 space-y-8">
                                <TableOfContents />

                                {/* Product Card */}
                                <div className="rounded-2xl bg-slate-900 text-white p-6 overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                    <h3 className="text-xl font-bold font-heading mb-2 relative z-10">Power Your Performance</h3>
                                    <p className="text-slate-300 text-sm mb-6 relative z-10">
                                        Experience the pure, lab-grown Cordyceps Militaris used in this research.
                                    </p>
                                    <Link
                                        to="/#products"
                                        className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-orange-500/25 relative z-10"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
