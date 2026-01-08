import React from 'react';
import { BadgeCheck, SlidersHorizontal } from 'lucide-react';

interface InfoSlideProps {
    title: string;
    imageSrc: string;
    features: string[];
    sizes: { label: string; sub: string }[];
    customization: string[];
    accentColor: string;
}

export const ProductInfoSlide: React.FC<InfoSlideProps> = ({
    title,
    imageSrc,
    features,
    sizes,
    customization,
    accentColor
}) => {
    const colorMap: Record<string, string> = {
        'orange-500': '#F97316',
        'orange-600': '#EA580C',
        'blue-500': '#3B82F6',
    };
    const hexColor = colorMap[accentColor] || '#F97316';

    return (
        <div className="w-[800px] h-[800px] bg-white flex overflow-hidden font-sans border border-neutral-100">

            {/* 
        LEFT: ZOOMED CROP (45%) 
        - Bleed edge to edge
        - Object-cover + Object-left/center to zoom in on "half the product"
      */}
            <div className="w-[45%] h-full relative bg-neutral-50 border-r border-neutral-100">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover object-center scale-110"
                />
            </div>

            {/* 
        RIGHT: READABLE TYPOGRAPHY (55%) 
        - Padding increased
        - Font sizes effectively doubled
        - Minimal dividers
      */}
            <div className="w-[55%] p-12 flex flex-col justify-center h-full space-y-12">

                {/* Section 1: Features (The "Bullet Points") */}
                <div className="space-y-5">
                    {features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <BadgeCheck size={32} className="shrink-0 mt-0.5" style={{ color: hexColor }} strokeWidth={2.5} />
                            <span className="text-2xl font-bold text-slate-800 leading-tight">
                                {feat}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="w-full h-px bg-slate-200"></div>

                {/* Section 2: Customization & Sizes */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-400 mb-2">
                        <SlidersHorizontal size={24} />
                        <span className="text-sm font-bold uppercase tracking-widest">Available Options</span>
                    </div>

                    {/* Sizes as simple text list to save space but keep large font */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {sizes.map((size, i) => (
                            <span key={i} className="text-xl font-medium text-slate-600">
                                {size.label}
                            </span>
                        ))}
                    </div>

                    {/* Customization Bullets */}
                    <div className="space-y-2 pt-2">
                        {customization.map((opt, i) => (
                            <div key={i} className="text-lg text-slate-500 font-medium pl-4 border-l-4" style={{ borderColor: hexColor }}>
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
