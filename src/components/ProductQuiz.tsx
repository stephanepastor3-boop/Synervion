import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Sparkles, Coffee, Pill, Activity, Brain, ShieldCheck, LucideIcon } from 'lucide-react';
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
                className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all duration-300 mt-4 sm:mt-0 px-2 py-1 rounded-md hover:bg-primary/5"
            >
                <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                <span className="border-b border-transparent group-hover:border-primary/30">Not sure? Find your match</span>
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
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-wide uppercase font-heading">Product Finder</span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            {step > 0 && step < 4 && (
                                <div className="h-1 bg-secondary w-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step / 3) * 100}%` }}
                                        className="h-full bg-primary"
                                        transition={{ duration: 0.5, ease: "circOut" }}
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
                                            <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">Discover Your Ideal Cordyceps</h2>
                                            <p className="text-muted-foreground mb-8 text-lg">Answer 3 quick questions to find the perfect format for your goals (or your customers' goals).</p>
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
                                            <h3 className="text-xl font-bold text-foreground mb-6 font-heading">What is the primary goal?</h3>
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
                                            <h3 className="text-xl font-bold text-foreground mb-6 font-heading">Preferred format?</h3>
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
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-50">
                                                <Check className="w-8 h-8 text-green-600" />
                                            </div>
                                            <span className="text-primary font-bold uppercase tracking-wider text-sm">Best Switch for You</span>
                                            <h2 className="text-3xl font-bold text-foreground mt-2 mb-4 font-heading">{recommendation.title}</h2>
                                            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{recommendation.description}</p>

                                            <BrandButton size="lg" onClick={() => { handleClose(); window.location.href = recommendation.link; }} className="w-full">
                                                View Product Details
                                            </BrandButton>

                                            <button onClick={handleOpen} className="text-sm text-muted-foreground hover:text-foreground mt-6 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground transition-all">
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

function QuizOption({ icon: Icon, label, desc, onClick }: { icon: LucideIcon, label: string, desc: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all group text-left duration-200"
        >
            <div className="w-12 h-12 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/20 group-hover:bg-white transition-colors shadow-sm">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors font-heading">{label}</div>
                <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">{desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground/30 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </button>
    );
}
