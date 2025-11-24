import { motion } from 'motion/react';
import { Users, Target, TrendingDown } from 'lucide-react';

export function ImmuneAnimation() {
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
                    className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                {/* 1. Anti-Inflammatory Pathways */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Suppression effect */}
                        <div className="bg-blue-50 p-4 rounded-full relative z-10">
                            <TrendingDown className="w-10 h-10 text-blue-600" />
                        </div>
                        {/* Inflammatory particles being suppressed */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, y: -20 }}
                                animate={{
                                    opacity: [1, 0.3],
                                    y: [- 20, 20],
                                    scale: [1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-2 h-2 bg-red-400 rounded-full"
                                style={{
                                    left: `${30 + i * 10}%`,
                                    top: '10%'
                                }}
                            />
                        ))}
                        {/* Blocking barrier */}
                        <motion.div
                            animate={{
                                scaleX: [0.8, 1, 0.8],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-2 w-16 h-1 bg-blue-500 rounded-full"
                        />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Anti-Inflammatory</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Suppresses NF-kB pathway and reduces inflammatory mediators
                    </p>
                </motion.div>

                {/* 2. Immune Cell Activation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Central immune cells */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-purple-50 p-4 rounded-full relative z-10"
                        >
                            <Users className="w-10 h-10 text-purple-600" />
                        </motion.div>
                        {/* Activation signals */}
                        {[0, 120, 240].map((angle, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [0, 1.5],
                                    opacity: [1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeOut"
                                }}
                                className="absolute w-3 h-3 bg-purple-400 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-25px)`
                                }}
                            />
                        ))}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Cell Activation</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Activates macrophages and dendritic cells for immune defense
                    </p>
                </motion.div>

                {/* 3. Cytokine Balance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Balance scale */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className="bg-green-50 p-4 rounded-full">
                                    <Target className="w-10 h-10 text-green-600" />
                                </div>
                            </motion.div>
                            {/* Th1/Th2 indicators */}
                            <motion.div
                                animate={{ y: [-3, 3, -3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -left-2 top-4 text-xs font-semibold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded"
                            >
                                Th1
                            </motion.div>
                            <motion.div
                                animate={{ y: [3, -3, 3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -right-2 top-4 text-xs font-semibold text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded"
                            >
                                Th2
                            </motion.div>
                        </div>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Cytokine Balance</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Modulates Th1/Th2 balance and promotes IL-10 production
                    </p>
                </motion.div>
            </div>

            {/* Connecting Flow */}
            <svg className="absolute top-1/2 left-0 w-full h-20 -z-0 hidden md:block" style={{ transform: 'translateY(-50%)' }}>
                <motion.path
                    d="M 100 40 Q 250 10 400 40 T 700 40"
                    fill="none"
                    stroke="url(#immuneGradient)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <defs>
                    <linearGradient id="immuneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
