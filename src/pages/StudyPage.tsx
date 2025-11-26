import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { studies } from '../components/ExploreResearch';
import { StudyDetails } from '../components/research/StudyDetails';
import { Navigation } from '../components/Navigation';

export function StudyPage() {
    const { id } = useParams();
    const study = studies.find(s => s.id === Number(id));

    if (!study) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
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
                </div>
            </div>
        </div>
    );
}
