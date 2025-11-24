import { motion } from 'motion/react';
import { Heart, Activity, Zap } from 'lucide-react';

export function VitalityAnimation() {
    return (
        <div className="w-full h-[400px] bg-white rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-8 border border-gray-100 shadow-sm">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-rose-500"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                {/* 1. Cardiovascular Support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Heartbeat Animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                times: [0, 0.1, 0.2, 0.3, 1]
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="bg-rose-50 p-4 rounded-full">
                                <Heart className="w-10 h-10 text-rose-500" fill="currentColor" />
                            </div>
                        </motion.div>
                        {/* Pulse rings */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5],
                                opacity: [0.5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 border-2 border-rose-300 rounded-full"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5],
                                opacity: [0.5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.5
                            }}
                            className="absolute inset-0 border-2 border-rose-300 rounded-full"
                        />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Cardiovascular Health</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Supports heart function and healthy blood circulation
                    </p>
                </motion.div>

                {/* 2. Adaptogenic Balance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Balance visualization */}
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            <div className="bg-emerald-50 p-4 rounded-full">
                                <Activity className="w-10 h-10 text-emerald-600" />
                            </div>
                        </motion.div>
                        {/* Energy flow */}
                        <motion.div
                            animate={{
                                y: [-10, 10],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute w-1 h-6 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
                        />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Adaptogenic Balance</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Helps body adapt to stress and maintain equilibrium
                    </p>
                </motion.div>

                {/* 3. Energy & Vitality */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Energy burst */}
                        <div className="bg-amber-50 p-4 rounded-full relative z-10">
                            <Zap className="w-10 h-10 text-amber-500" fill="currentColor" />
                        </div>
                        {/* Radiating energy */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1],
                                    x: Math.cos(i * 45 * (Math.PI / 180)) * 35,
                                    y: Math.sin(i * 45 * (Math.PI / 180)) * 35,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeOut"
                                }}
                                className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                                style={{ top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-3px' }}
                            />
                        ))}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Overall Vitality</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Enhances energy levels and supports well-being
                    </p>
                </motion.div>
            </div>

            {/* Connecting Flow */}
            <svg className="absolute top-1/2 left-0 w-full h-20 -z-0 hidden md:block" style={{ transform: 'translateY(-50%)' }}>
                <motion.path
                    d="M 100 40 Q 250 10 400 40 T 700 40"
                    fill="none"
                    stroke="url(#vitalityGradient)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <defs>
                    <linearGradient id="vitalityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
