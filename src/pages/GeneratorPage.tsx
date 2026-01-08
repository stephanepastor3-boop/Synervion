
import { ProductInfoSlide } from '../components/ProductInfoSlide';

import cardHeroCore from '../assets/hero-core-v2.png';
import cardHeroPulse from '../assets/hero-pulse-v2.png';
import cardHeroRoot from '../assets/hero-root-v2.png';

export function GeneratorPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const product = searchParams.get('product');

    // Helper to check if we should show a specific card
    const shouldShow = (id: string) => !product || product === id;

    return (
        <div className="min-h-screen bg-neutral-900 p-20 flex flex-col items-center justify-center">

            {/* CORE Card */}
            {shouldShow('core') && (
                <div id="card-core">
                    <ProductInfoSlide
                        title="Synervion® CORE Caps"
                        imageSrc={cardHeroCore}
                        accentColor="orange-500"
                        features={[
                            'High-Potency 500mg Fill',
                            'Standard Size 0 Capsules',
                            'Vegan / Gelatin Options'
                        ]}
                        sizes={[
                            { label: '60 Caps', sub: 'Net Wt. 30g' },
                            { label: '120 Caps', sub: 'Net Wt. 60g' },
                            { label: 'Bulk', sub: 'MOQ 1kg' }
                        ]}
                        customization={[
                            'Custom Capsule Colors (2-Tone)',
                            'Bottle / Blister Pack Options',
                            'Proprietary Formula Blends'
                        ]}
                    />
                </div>
            )}

            {/* PULSE Card */}
            {shouldShow('pulse') && (
                <div id="card-pulse">
                    <ProductInfoSlide
                        title="Synervion® PULSE Liquids"
                        imageSrc={cardHeroPulse}
                        accentColor="orange-500"
                        features={[
                            'Dual-Extraction Process',
                            'Alcohol-Free Nano Emulsion',
                            'Amber Glass Protection'
                        ]}
                        sizes={[
                            { label: '30ml', sub: '1 fl oz' },
                            { label: '60ml', sub: '2 fl oz' },
                            { label: 'Bulk', sub: '1 Gallon+' }
                        ]}
                        customization={[
                            'Custom Flavor Systems',
                            'Concentration (1:1 to 10:1)',
                            'Private Label Dropper Design'
                        ]}
                    />
                </div>
            )}

            {/* ROOT Card */}
            {shouldShow('root') && (
                <div id="card-root">
                    <ProductInfoSlide
                        title="Synervion® ROOT Powders"
                        imageSrc={cardHeroRoot}
                        accentColor="orange-600"
                        features={[
                            '100% Fruiting Body',
                            'Micronized <50 Mesh',
                            'Water Soluble Matrix'
                        ]}
                        sizes={[
                            { label: '100g', sub: 'Retail Jar' },
                            { label: '300g', sub: 'Pro Tub' },
                            { label: 'Bulk', sub: '1kg / 5kg' }
                        ]}
                        customization={[
                            'Custom Functional Blends',
                            'Sachets, Jars or Pouches',
                            'Superfood Mix Integration'
                        ]}
                    />
                </div>
            )}

        </div>
    );
}
