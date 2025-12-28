import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Sparkles, Coffee, Pill, Activity, Brain, ShieldCheck } from 'lucide-react';
import { BrandButton } from './brand/BrandButton';

interface QuizState {
    goal: string | null;
    format: string | null;
    experience: string | null;
}

export function ProductQuiz() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<QuizState>({
        goal: null,
        format: null,
        experience: null
    });

    const handleOpen = () => {
        setIsOpen(true);
        setStep(0);
        setAnswers({ goal: null, format: null, experience: null });
    };

    const handleClose = () => setIsOpen(false);

    const nextStep = () => setStep(prev => prev + 1);

    const selectOption = (key: keyof QuizState, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        nextStep();
    };

    const getRecommendation = () => {
        if (answers.format === 'capsules') return {
            title: "Private Label Capsules",
            description: "Ready-to-market encapsulated Cordyceps. Perfect for brands looking for a turnkey solution.",
            link: "/#products"
        };
        if (answers.goal === 'athletic') return {
            title: "High-Potency Extract (3% Cordycepin)",
            description: "Our strongest extract for maximum ATP production and VO2 max improvement. The athlete's choice.",
            link: "/#products"
        };
        return {
            title: "Full-Spectrum Biomass",
            description: "A balanced, cost-effective powder containing both mycelium and fruit body. Ideal for coffee blends and daily immunity.",
            link: "/#products"
        };
    };

    const recommendation = getRecommendation();

    return (
        <>
            <button
                onClick={handleOpen}
                className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors mt-4 sm:mt-0"
            >
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Not sure? Find your match</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <div className="flex items-center gap-2 text-orange-600">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-wide uppercase">Product Finder</span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            {step > 0 && step < 4 && (
                                <div className="h-1 bg-slate-100 w-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step / 3) * 100}%` }}
                                        className="h-full bg-orange-500"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-8 min-h-[400px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">

                                    {/* STEP 0: INTRO */}
                                    {step === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="text-center"
                                        >
                                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Discover Your Ideal Cordyceps</h2>
                                            <p className="text-slate-600 mb-8">Answer 3 quick questions to find the perfect format for your goals (or your customers' goals).</p>
                                            <BrandButton size="lg" onClick={nextStep} className="w-full sm:w-auto">
                                                Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
                                            </BrandButton>
                                        </motion.div>
                                    )}

                                    {/* STEP 1: GOAL */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-6">What is the primary goal?</h3>
                                            <div className="space-y-3">
                                                <QuizOption
                                                    icon={Activity}
                                                    label="Athletic Performance"
                                                    desc="Running, cycling, VO2 Max"
                                                    onClick={() => selectOption('goal', 'athletic')}
                                                />
                                                <QuizOption
                                                    icon={Brain}
                                                    label="Focus & Daily Energy"
                                                    desc="Productivity without the jitters"
                                                    onClick={() => selectOption('goal', 'focus')}
                                                />
                                                <QuizOption
                                                    icon={ShieldCheck}
                                                    label="Immune Support"
                                                    desc="General wellness and recovery"
                                                    onClick={() => selectOption('goal', 'immune')}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: FORMAT */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-6">Preferred format?</h3>
                                            <div className="space-y-3">
                                                <QuizOption
                                                    icon={Coffee}
                                                    label="Mix into Drinks"
                                                    desc="Coffee, tea, smoothies"
                                                    onClick={() => selectOption('format', 'powder')}
                                                />
                                                <QuizOption
                                                    icon={Pill}
                                                    label="Capsules"
                                                    desc="Convenient and tasteless"
                                                    onClick={() => selectOption('format', 'capsules')}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: RESULT */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center"
                                        >
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Check className="w-8 h-8 text-green-600" />
                                            </div>
                                            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Best Switch for You</span>
                                            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">{recommendation.title}</h2>
                                            <p className="text-slate-600 mb-8">{recommendation.description}</p>

                                            <BrandButton size="lg" onClick={() => { handleClose(); window.location.href = recommendation.link; }} className="w-full">
                                                View Product Details
                                            </BrandButton>

                                            <button onClick={handleOpen} className="text-sm text-slate-500 hover:text-slate-800 mt-4 underline">
                                                Retake Quiz
                                            </button>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

function QuizOption({ icon: Icon, label, desc, onClick }: { icon: any, label: string, desc: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group text-left"
        >
            <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors shadow-sm">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="font-bold text-slate-900 group-hover:text-orange-700">{label}</div>
                <div className="text-sm text-slate-500">{desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </button>
    );
}
