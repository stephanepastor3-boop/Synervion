import { SEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function TermsPage() {
    return (
        <>
            <SEO
                title="Terms of Service | Synervion"
                description="Terms of Service for Synervion website."
                canonical="/terms"
            />

            <Navigation />

            <main className="pt-32 pb-24 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto min-h-screen">
                <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Terms of Service
                </h1>

                <div className="prose prose-lg max-w-none" style={{ fontFamily: 'var(--synervion-font-body)' }}>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
                        <p className="mb-4 text-gray-700">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Description of Service</h2>
                        <p className="mb-4 text-gray-700">
                            Synervion provides users with access to information about Cordyceps cultivation, research, and products. You are responsible for obtaining access to the site, and that access may involve third-party fees (such as Internet service provider or airtime charges).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Intellectual Property Rights</h2>
                        <p className="mb-4 text-gray-700">
                            All content on this site is the property of Synervion or its content suppliers and protected by international copyright laws. The compilation of all content on this site is the exclusive property of Synervion.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Medical Disclaimer</h2>
                        <p className="mb-4 text-gray-700">
                            The information provided on this website is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional. You should not use the information on this website for diagnosis or treatment of any health problem or for prescription of any medication or other treatment.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Limitation of Liability</h2>
                        <p className="mb-4 text-gray-700">
                            Synervion shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from the use or the inability to use the service or for cost of procurement of substitute goods and services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Modifications to Terms</h2>
                        <p className="mb-4 text-gray-700">
                            Synervion reserves the right to update or modify these Terms of Service at any time without prior notice. Your use of this website following any such change constitutes your agreement to follow and be bound by the Terms of Service as changed.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
