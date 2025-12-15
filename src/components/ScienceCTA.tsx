import { Beaker, ArrowRight } from 'lucide-react';

export function ScienceCTA() {
    return (
        <div className="my-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="relative z-10 md:flex items-start justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Beaker className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-sm font-bold text-orange-600 tracking-wide uppercase">Science-Led Performance</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Energy, minus the hype.
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6 md:mb-0">
                        We believe in physiology over marketing. Join our newsletter for science-led breakdowns on metabolic consistency, training pharmacology, and sustainable energy.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <a
                        href="#newsletter"
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                        Subscribe for Updates
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
