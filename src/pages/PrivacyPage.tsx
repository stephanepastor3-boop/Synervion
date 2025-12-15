import { SEO } from '../components/SEO';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
    return (
        <>
            <SEO
                title="Privacy Policy | Synervion"
                description="Privacy Policy for Synervion website."
                canonical="/privacy-policy"
            />

            <Navigation />

            <main className="pt-32 pb-24 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto min-h-screen">
                <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
                    Privacy Policy
                </h1>

                <div className="prose prose-lg max-w-none" style={{ fontFamily: 'var(--synervion-font-body)' }}>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Information Collection</h2>
                        <p className="mb-4 text-gray-700">
                            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Use of Information</h2>
                        <p className="mb-4 text-gray-700">
                            We use the information we collect to operate, maintain, and provide to you the features and functionality of the Service, to communicate with you, and to personalize your experience.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Data Protection</h2>
                        <p className="mb-4 text-gray-700">
                            Synervion is committed to protecting your data. We implement appropriate technical and organizational measures to protect specific personal data against unauthorized or unlawful processing and against accidental loss, destruction, damage, alteration, or disclosure.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Sharing of Information</h2>
                        <p className="mb-4 text-gray-700">
                            We do not share your personal information with third parties without your consent, except in specific circumstances outlined in this policy such as complying with legal obligations or protecting rights and safety.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Cookies and Tracking</h2>
                        <p className="mb-4 text-gray-700">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Contact Us</h2>
                        <p className="mb-4 text-gray-700">
                            If you have any questions about this Privacy Policy, please contact us at info@synervion.com.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
