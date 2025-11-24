import { motion } from 'motion/react';
import { Shield, Zap, Activity, Droplets } from 'lucide-react';

export function LongevityAnimation() {
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
                    className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[hsl(var(--synervion-primary-500))]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[hsl(var(--synervion-secondary-500))]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                {/* 1. Oxidative Stress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-[hsl(var(--synervion-primary-200))] rounded-full"
                        />
                        <div className="bg-[hsl(var(--synervion-primary-50))]/50 p-4 rounded-full backdrop-blur-sm">
                            <Zap className="w-8 h-8 text-[hsl(var(--synervion-primary-500))]" />
                        </div>
                        {/* Free Radicals being neutralized */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                animate={{
                                    opacity: [1, 0],
                                    scale: [1, 0],
                                    x: Math.cos(i * 60 * (Math.PI / 180)) * 40,
                                    y: Math.sin(i * 60 * (Math.PI / 180)) * 40,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                                className="absolute w-2 h-2 bg-gray-400 rounded-full"
                                style={{ top: '50%', left: '50%', marginTop: '-4px', marginLeft: '-4px' }}
                            />
                        ))}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Anti-Aging</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Neutralizes harmful free radicals and reduces oxidative stress
                    </p>
                </motion.div>

                {/* 2. Organ Protection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-[hsl(var(--synervion-primary-500))]/5 rounded-full"
                        />
                        <div className="relative z-10 bg-white p-4 rounded-full shadow-sm border border-[hsl(var(--synervion-primary-100))]">
                            <Activity className="w-8 h-8 text-[hsl(var(--synervion-primary-600))]" />
                        </div>
                        {/* Shield Effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 1, 0.8], scale: 1 }}
                            transition={{ duration: 1.5, delay: 0.6 }}
                            className="absolute -top-2 -right-2 bg-[hsl(var(--synervion-secondary-500))] text-white p-1.5 rounded-full shadow-md z-20"
                        >
                            <Shield size={14} fill="currentColor" />
                        </motion.div>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Organ Support</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Protects vital organs (Liver & Kidney) and enhances function
                    </p>
                </motion.div>

                {/* 3. Cellular Protection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="relative mb-6 w-24 h-24 flex items-center justify-center">
                        {/* Cell Membrane */}
                        <motion.div
                            animate={{
                                borderColor: ['#E5E7EB', '#E58B00', '#E5E7EB'],
                                borderWidth: ['2px', '3px', '2px']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-gray-200"
                        />
                        <div className="bg-[hsl(var(--synervion-primary-50))] p-4 rounded-full">
                            <Droplets className="w-8 h-8 text-[hsl(var(--synervion-primary-500))]" />
                        </div>
                        {/* Cordycepin entering cell */}
                        <motion.div
                            animate={{
                                y: [-30, 0],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 w-2 h-2 bg-[hsl(var(--synervion-primary-600))] rounded-full"
                        />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900">Cellular Health</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Inhibits cell senescence and promotes DNA integrity
                    </p>
                </motion.div>
            </div>

            {/* Connecting Line */}
            <svg className="absolute top-1/2 left-0 w-full h-20 -z-0 hidden md:block" style={{ transform: 'translateY(-50%)' }}>
                <motion.path
                    d="M 100 40 Q 250 10 400 40 T 700 40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--synervion-primary-200))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--synervion-primary-500))" stopOpacity="1" />
                        <stop offset="100%" stopColor="hsl(var(--synervion-primary-200))" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
