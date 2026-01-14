import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { studies } from '../components/ExploreResearch';
import { StudyDetails } from '../components/research/StudyDetails';
import { ShareButtons } from '../components/ShareButtons';
import { Navigation } from '../components/Navigation';

export function StudyPage() {
    const { id } = useParams();
    const study = studies.find(s => s.id === Number(id));

    if (!study) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
                <Helmet>
                    <title>Study Not Found | Synervion Research</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">Study Not Found</h1>
                <Link
                    to="/"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to Research
                </Link>
            </div >
        );
    }

    // Enhanced meta description with key findings
    const enhancedDescription = study.summary
        ? `${study.title}: ${study.summary.substring(0, 150)}... Read the full scientific research.`
        : `Scientific research on Cordyceps: ${study.title}. Peer-reviewed study with key findings and methodology.`;

    // Schema markup for structured data
    const schemas = [
        // ScholarlyArticle Schema
        {
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "headline": study.title,
            "description": study.summary || enhancedDescription,
            "author": {
                "@type": "Organization",
                "name": "Synervion Research"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Synervion",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.synervion.com/logo-favicon-180x180.png"
                }
            },
            "datePublished": "2024-01-01",
            "url": `https://www.synervion.com/study/${study.id}`,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.synervion.com/study/${study.id}`
            }
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
                    "name": "Research",
                    "item": "https://www.synervion.com/#rnd"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": study.title
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            <Helmet>
                <title>{study.title} | Synervion Research</title>
                <meta name="description" content={enhancedDescription} />
                <link rel="canonical" href={`https://www.synervion.com/study/${study.id}`} />

                {/* Open Graph */}
                <meta property="og:title" content={`${study.title} | Synervion Research`} />
                <meta property="og:description" content={enhancedDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.synervion.com/study/${study.id}`} />

                {/* Schema */}
                {schemas.map((schema, index) => (
                    <script key={index} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))}
            </Helmet>
            <Navigation />
            <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                <Link
                    to="/#rnd"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-orange-600 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Research
                </Link>

                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="border-b border-gray-100 p-6 flex justify-end">
                        <ShareButtons title={study.title} />
                    </div>
                    <StudyDetails study={study} />

                    <div className="bg-slate-50 border-t border-slate-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">From Lab to Daily Life</h3>
                        <p className="text-slate-600 mb-4">
                            Understanding the science is the first step. See how these metabolic mechanisms compare to stimulant-based energy in our practical guide:
                        </p>
                        <Link
                            to="/cordyceps-vs-caffeine-daily-energy"
                            className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center gap-2"
                        >
                            Read: Cordyceps vs. Caffeine - The Energy Comparison →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

