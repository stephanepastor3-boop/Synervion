import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Helmet>
                <title>Page Not Found | Synervion</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <Navigation />

            <main className="flex-1 flex items-center justify-center p-6 mt-16">
                <div className="max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl font-bold text-orange-600">404</span>
                    </div>

                    <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                        Page Not Found
                    </h1>

                    <p className="text-slate-600 mb-8 leading-relaxed">
                        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <Home size={18} />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
