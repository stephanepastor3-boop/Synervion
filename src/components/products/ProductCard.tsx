import { useState } from 'react';
import { motion } from 'motion/react';
import {
    FlaskConical, ArrowRight, Check
} from 'lucide-react';
import { Product, Study } from '../../types';



interface ProductCardProps {
    product: Product;
    relatedStudies?: Study[];
    onQuickAdd: (product: Product, option: any) => void;
}

export function ProductCard({ product, relatedStudies = [], onQuickAdd }: ProductCardProps) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const selectedOption = product.options[selectedOptionIndex];

    return (
        <div
            className="relative w-full perspective-1000 group"
        >
            <motion.div
                className="w-full relative preserve-3d transition-all duration-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- FRONT FACE --- */}
                <div className="relative backface-hidden">
                    <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative group border border-slate-100">

                        {/* --- IMAGE CAROUSEL SECTION --- */}
                        <div className="w-full aspect-square relative overflow-hidden group/image bg-gray-50 shrink-0">
                            {/* Image Slides */}
                            <motion.div
                                className="absolute inset-0 flex"
                                animate={{ x: `-${currentImageIndex * 100}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_e, { offset }) => {
                                    const swipeThreshold = 50;
                                    if (offset.x > swipeThreshold) {
                                        setCurrentImageIndex(prev => Math.max(prev - 1, 0));
                                    } else if (offset.x < -swipeThreshold) {
                                        setCurrentImageIndex(prev => Math.min(prev + 1, (product.gallery?.length || 1) - 1));
                                    }
                                }}
                            >
                                {product.gallery?.map((item, idx) => (
                                    <div key={idx} className="w-full h-full flex-shrink-0 flex items-start justify-center">
                                        <div
                                            className="w-full h-full transition-transform duration-700 flex items-start justify-center transform-gpu"
                                            style={{
                                                transform: `scale(${product.imageScale || 1}) translateY(${product.imageOffsetY || '0'})`
                                            }}
                                        >
                                            <img
                                                src={item.src}
                                                alt={`${product.title} - ${item.label}`}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Carousel Navigation (Dots) */}

                            {/* Carousel Navigation (Dots) */}
                            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                                {product.gallery?.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx
                                            ? 'bg-orange-500 w-4'
                                            : 'bg-slate-300 hover:bg-slate-400'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Science Flip Trigger (added back in a discreet way) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-600 flex items-center justify-center transition-colors backdrop-blur-sm z-20 opacity-0 group-hover/image:opacity-100"
                                title="View Research"
                            >
                                <FlaskConical size={14} />
                            </button>
                        </div>

                        {/* --- CONTENT SECTION --- */}
                        <div className="flex-1 p-6 flex flex-col justify-between bg-white relative z-20">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-600 px-2 py-0.5 rounded-full">
                                                {product.formatLabel || 'Ingredient'}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{product.title}</h3>
                                        <p className="text-sm font-medium text-orange-600 mb-2">{product.subtitle}</p>
                                    </div>
                                    <div className="text-right">
                                        {/* Price & MOQ removed */}
                                    </div>
                                </div>

                                {/* Application Examples Section */}
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Perfect For Creating:</p>
                                    <ul className="space-y-1.5">
                                        {product.applicationExamples?.map((app, idx) => (
                                            <li key={idx} className="text-xs font-medium text-slate-600 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                {app}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Description removed by user request */}
                            </div>

                            {/* Footer / Quick Add */}
                            <div className="mt-6 space-y-4">
                                {/* Size Selector */}
                                <div className="flex p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                                    {product.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOptionIndex(idx);
                                                if (opt.imageIndex !== undefined) {
                                                    setCurrentImageIndex(opt.imageIndex);
                                                }
                                            }}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${selectedOptionIndex === idx
                                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                                                : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                        >
                                            {opt.weight}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); onQuickAdd(product, selectedOption); }}
                                    className="w-full py-4 bg-slate-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-500 transition-colors group/btn shadow-xl shadow-slate-200 hover:shadow-slate-600/20"
                                >
                                    <span>{selectedOption.cta}</span>
                                    {/* Price removed from button */}
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- BACK FACE (SCIENCE) --- */}
                <div
                    className={`absolute inset-0 backface-hidden z-10 ${isFlipped ? '' : 'hidden opacity-0 pointer-events-none'}`}
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="h-full w-full bg-[#475569] text-white rounded-[2rem] overflow-hidden shadow-xl p-8 flex flex-col relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <Check size={18} />
                        </button>

                        <div className="mb-8 mt-2">
                            <div className="flex items-center gap-2 text-orange-400 mb-2">
                                <FlaskConical size={20} />
                                <span className="font-mono text-sm uppercase tracking-wider">Research Data</span>
                            </div>
                            <h3 className="text-2xl font-bold">Proven Efficacy</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {relatedStudies.length > 0 ? (
                                relatedStudies.map(study => (
                                    <div key={study.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer text-left group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xs text-orange-400 font-mono">{study.journal} ({study.year})</div>
                                            <ArrowRight size={12} className="text-white/20 group-hover:text-white transition-colors" />
                                        </div>
                                        <h4 className="font-bold text-sm mb-3 leading-snug">{study.title}</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {study.keyFindings.slice(0, 2).map((tag: string, i: number) => (
                                                <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-slate-500 py-12">
                                    <p>Direct study links populating...</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                className="text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-widest"
                            >
                                Return to Product
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
