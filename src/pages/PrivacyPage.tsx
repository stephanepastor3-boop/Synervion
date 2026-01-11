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
                            This may include your name, email address, postal address, phone number, and other information dealing with your inquiry.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Use of Information</h2>
                        <p className="mb-4 text-gray-700">
                            We use the information we collect to operate, maintain, and provide to you the features and functionality of the Service, to communicate with you about your account or our products,
                            and to personalize your experience. We may also use this information to detect, investigate, and prevent fraudulent or illegal activities.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Data Retention</h2>
                        <p className="mb-4 text-gray-700">
                            We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
                            We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws),
                            resolve disputes, and enforce our legal agreements and policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Protection</h2>
                        <p className="mb-4 text-gray-700">
                            Synervion is committed to protecting your data. We implement appropriate technical, administrative, and organizational measures to protect specific personal data
                            against unauthorized or unlawful processing and against accidental loss, destruction, damage, alteration, or disclosure.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Your Data Rights</h2>
                        <p className="mb-4 text-gray-700">
                            Depending on your location and applicable laws, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li><strong>Access:</strong> You have the right to request copies of your personal data.</li>
                            <li><strong>Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
                            <li><strong>Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                            <li><strong>Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li><strong>Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li><strong>Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Sharing of Information</h2>
                        <p className="mb-4 text-gray-700">
                            We do not sell your personal information. We may share your information with third parties only in the ways that are described in this Privacy Policy:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service (e.g., payment processors, analytics providers, customer support tools), to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
                            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Cookies and Tracking</h2>
                        <p className="mb-4 text-gray-700">
                            We use Cookies and similar tracking technologies to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                        </p>
                        <p className="mb-4 text-gray-700">You can instruct your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if you do not accept Cookies, you may not be able to use some parts of our Service.</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                            <li><strong>Essential Cookies:</strong> strictly necessary for the proper functioning of the website (e.g., login status, shopping cart).</li>
                            <li><strong>Analytics Cookies:</strong> help us understand how visitors interact with the website by collecting and reporting information anonymously.</li>
                            <li><strong>Marketing Cookies:</strong> used to track visitors across websites to display ads that are relevant and engaging.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Children's Privacy</h2>
                        <p className="mb-4 text-gray-700">
                            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
                            If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
                            If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. International Transfer</h2>
                        <p className="mb-4 text-gray-700">
                            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Contact Us</h2>
                        <p className="mb-4 text-gray-700">
                            If you have any questions about this Privacy Policy, please contact us by email at <a href="mailto:info@synervion.com" className="text-blue-600 hover:underline">info@synervion.com</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
