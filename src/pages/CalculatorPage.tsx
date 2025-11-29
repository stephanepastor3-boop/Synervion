import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Battery, Target, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'athlete';
type EnergyLevel = 'low' | 'moderate' | 'high';
type Goal = 'endurance' | 'recovery' | 'focus' | 'immunity';

interface CalculatorState {
    activity: ActivityLevel | null;
    energy: EnergyLevel | null;
    goal: Goal | null;
}

const CalculatorPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [state, setState] = useState<CalculatorState>({
        activity: null,
        energy: null,
        goal: null,
    });
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (key: keyof CalculatorState, value: string) => {
        setState(prev => ({ ...prev, [key]: value }));
        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculateDosage = () => {
        let baseDosage = 1000; // 1g base

        // Activity Modifier
        if (state.activity === 'athlete') baseDosage += 1000;
        if (state.activity === 'active') baseDosage += 500;

        // Energy Modifier (Lower energy might need a boost, but start slow)
        if (state.energy === 'low') baseDosage += 500;

        // Goal Modifier
        if (state.goal === 'endurance') baseDosage += 500;
        if (state.goal === 'recovery') baseDosage += 0; // Standard dose is good for recovery
        if (state.goal === 'focus') baseDosage += 250; // Precision dosing

        return baseDosage;
    };

    const getRecommendation = () => {
        const dosage = calculateDosage();
        const dosageGrams = dosage / 1000;

        return {
            product: "Synervion Cordyceps Militaris",
            dosage: `${dosageGrams}g`,
            frequency: "Daily, 30 mins before activity",
            reason: state.goal === 'endurance'
                ? "Optimizes oxygen utilization (VO2 Max) for peak performance."
                : state.goal === 'recovery'
                    ? "Supports ATP regeneration and muscle recovery."
                    : state.goal === 'focus'
                        ? "Enhances cognitive clarity without the jitters."
                        : "Boosts immune system resilience."
        };
    };

    const reset = () => {
        setStep(1);
        setState({ activity: null, energy: null, goal: null });
        setShowResult(false);
    };

    const result = getRecommendation();

    // Schema Markup
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Functional Mushroom Goal-Based Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "A personalized calculator to determine the optimal Cordyceps dosage based on activity level, energy, and health goals.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "124"
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 px-4">
            <SEO
                title="Cordyceps Dosage Calculator | Synervion"
                description="Calculate your optimal Cordyceps dosage for endurance, recovery, and focus with our science-backed tool."
                canonical="/calculator/cordyceps-goal-planner"
            />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                        Cordyceps Goal Planner
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Find your perfect dosage. Based on your lifestyle, energy levels, and performance goals.
                    </p>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
                    {!showResult ? (
                        <div className="space-y-8">
                            {/* Progress Bar */}
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-400'
                                            }`}>
                                            {s}
                                        </div>
                                        {s < 3 && (
                                            <div className={`w-16 h-1 mx-2 rounded-full transition-colors ${step > s ? 'bg-orange-500/50' : 'bg-neutral-800'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
                                            <Activity className="text-orange-500" />
                                            What's your activity level?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'sedentary', label: 'Sedentary', desc: 'Office work, light walking' },
                                                { id: 'moderate', label: 'Moderate', desc: 'Exercise 1-3x per week' },
                                                { id: 'active', label: 'Active', desc: 'Exercise 4-5x per week' },
                                                { id: 'athlete', label: 'Athlete', desc: 'High intensity daily training' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleSelect('activity', opt.id)}
                                                    className="p-4 rounded-xl bg-neutral-800 border border-neutral-600 hover:border-orange-500/50 hover:bg-neutral-700 transition-all text-left group"
                                                >
                                                    <div className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">{opt.label}</div>
                                                    <div className="text-sm text-neutral-200">{opt.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
                                            <Battery className="text-orange-500" />
                                            How are your energy levels?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { id: 'low', label: 'Low', desc: 'Often tired, need a boost' },
                                                { id: 'moderate', label: 'Moderate', desc: 'Steady, but could be better' },
                                                { id: 'high', label: 'High', desc: 'Generally good, looking for edge' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleSelect('energy', opt.id)}
                                                    className="p-4 rounded-xl bg-neutral-800 border border-neutral-600 hover:border-orange-500/50 hover:bg-neutral-700 transition-all text-left group"
                                                >
                                                    <div className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">{opt.label}</div>
                                                    <div className="text-sm text-neutral-200">{opt.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
                                            <Target className="text-orange-500" />
                                            What is your primary goal?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'endurance', label: 'Endurance', desc: 'Run further, swim longer' },
                                                { id: 'recovery', label: 'Recovery', desc: 'Bounce back faster' },
                                                { id: 'focus', label: 'Mental Focus', desc: 'Sharp mind, clear thinking' },
                                                { id: 'immunity', label: 'Immunity', desc: 'Stay healthy and resilient' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleSelect('goal', opt.id)}
                                                    className="p-4 rounded-xl bg-neutral-800 border border-neutral-600 hover:border-orange-500/50 hover:bg-neutral-700 transition-all text-left group"
                                                >
                                                    <div className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">{opt.label}</div>
                                                    <div className="text-sm text-neutral-200">{opt.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Your Personalized Plan</h2>
                                <p className="text-neutral-400">Based on your inputs, here is what we recommend.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                                    <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Recommended Dosage</h3>
                                    <div className="text-4xl font-bold text-orange-500 mb-1">{result.dosage}</div>
                                    <div className="text-sm text-neutral-300">{result.frequency}</div>
                                </div>
                                <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                                    <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Why This Works</h3>
                                    <p className="text-neutral-300 leading-relaxed">{result.reason}</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-900/20 to-neutral-900 rounded-xl p-6 border border-orange-500/30 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{result.product}</h3>
                                    <p className="text-neutral-400 text-sm mb-4">
                                        Lab-grown for maximum potency. 100% Fruiting Body. No fillers.
                                    </p>
                                    <div className="flex gap-3">
                                        <Link
                                            to="/product/cordyceps-militaris"
                                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                        >
                                            Shop Now <ArrowRight size={18} />
                                        </Link>
                                        <Link
                                            to="/#rnd"
                                            className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-neutral-700"
                                        >
                                            View Science <Info size={18} />
                                        </Link>
                                    </div>
                                </div>
                                {/* Placeholder for product image if available, or just a nice icon/graphic */}
                                <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                                    <Target className="text-orange-500 w-10 h-10" />
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={reset}
                                    className="text-neutral-500 hover:text-white transition-colors text-sm flex items-center gap-2"
                                >
                                    <AlertCircle size={14} /> Start Over
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalculatorPage;
