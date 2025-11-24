import { motion } from 'motion/react';
import { Zap, Battery, Heart } from 'lucide-react';

export function EnergyAnimation() {
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
                    className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-amber-500"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                {/* 1. ATP/TCA Cycle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* ATP molecule/energy production */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-amber-300 rounded-full"
                        />
                        <div className="bg-amber-50 p-4 rounded-full relative z-10">
                            <Zap className="w-10 h-10 text-amber-500" fill="currentColor" />
                        </div>
                        {/* Energy particles flowing outward */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [1, 1, 0],
                                    x: Math.cos(angle * (Math.PI / 180)) * 40,
                                    y: Math.sin(angle * (Math.PI / 180)) * 40,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                                className="absolute w-2 h-2 bg-amber-400 rounded-full"
                                style={{ top: '50%', left: '50%', marginTop: '-4px', marginLeft: '-4px' }}
                            />
                        ))}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">ATP Production</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Stimulates TCA cycle and upregulates energy pathways
                    </p>
                </motion.div>

                {/* 2. Anti-Fatigue */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Battery charging */}
                        <motion.div
                            animate={{
                                scaleY: [0.3, 1, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-x-6 bottom-6 top-8 bg-gradient-to-t from-green-400 to-green-200 rounded-sm"
                            style={{ transformOrigin: 'bottom' }}
                        />
                        <div className="bg-green-50 p-3 rounded-lg relative z-10 border-2 border-green-500">
                            <Battery className="w-10 h-10 text-green-600" />
                        </div>
                        {/* Energy level indicator */}
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 right-2 w-2 h-2 bg-green-500 rounded-full"
                        />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Anti-Fatigue</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Polysaccharides combat exhaustion and boost endurance
                    </p>
                </motion.div>

                {/* 3. Cardiovascular Support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Heart with adenosine support */}
                        <motion.div
                            animate={{
                                scale: [1, 1.08, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                times: [0, 0.3, 1]
                            }}
                            className="bg-rose-50 p-4 rounded-full relative z-10"
                        >
                            <Heart className="w-10 h-10 text-rose-500" fill="currentColor" />
                        </motion.div>
                        {/* Circulation flow */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            {[0, 90, 180, 270].map((angle, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.5
                                    }}
                                    className="absolute w-1.5 h-1.5 bg-rose-400 rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-35px)`
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Heart Health</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Adenosine supports cardiovascular function and stamina
                    </p>
                </motion.div>
            </div>

            {/* Connecting Flow */}
            <svg className="absolute top-1/2 left-0 w-full h-20 -z-0 hidden md:block" style={{ transform: 'translateY(-50%)' }}>
                <motion.path
                    d="M 100 40 Q 250 10 400 40 T 700 40"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <defs>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
