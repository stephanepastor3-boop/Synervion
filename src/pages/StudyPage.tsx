import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { studies } from '../components/ExploreResearch';
import { StudyDetails } from '../components/research/StudyDetails';
import { Navigation } from '../components/Navigation';
import { SEO } from '../components/SEO';

export function StudyPage() {
    const { id } = useParams();
    const study = studies.find(s => s.id === Number(id));

    if (!study) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
                <SEO title="Study Not Found | Synervion" canonical="/study" />
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">Study Not Found</h1>
                <Link
                    to="/"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to Research
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <SEO
                title={`${study.title} | Synervion Research`}
                description={study.summary || "Read the full study details."}
                canonical={`/study/${study.id}`}
            />
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
