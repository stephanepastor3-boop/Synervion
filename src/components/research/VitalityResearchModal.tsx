import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { VitalityAnimation } from './VitalityAnimation';

interface VitalityResearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function VitalityResearchModal({ isOpen, onClose }: VitalityResearchModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.65)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)',
                        overflowY: 'auto'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#F8F8F8',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '1000px',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            position: 'relative',
                            padding: '40px 20px'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#FFF',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 200ms ease',
                                zIndex: 10,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#F3F4F6';
                                e.currentTarget.style.transform = 'rotate(90deg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#FFF';
                                e.currentTarget.style.transform = 'rotate(0deg)';
                            }}
                        >
                            <X size={20} color="#6B7280" />
                        </button>

                        {/* Header */}
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
                            <h2
                                style={{
                                    fontFamily: 'var(--synervion-font-body)',
                                    fontSize: '36px',
                                    fontWeight: 700,
                                    color: '#1B1B1B',
                                    marginBottom: '12px',
                                    lineHeight: '1.2'
                                }}
                            >
                                Vitality & Wellness Support
                            </h2>
                            <div
                                style={{
                                    width: '60px',
                                    height: '4px',
                                    background: '#E58B00',
                                    margin: '0 auto 20px',
                                    borderRadius: '2px'
                                }}
                            />
                            <p
                                style={{
                                    fontFamily: 'var(--synervion-font-body)',
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    color: '#555',
                                    lineHeight: '1.6',
                                    padding: '0 20px'
                                }}
                            >
                                Cordyceps militaris supports cardiovascular health and overall well-being
                                with powerful adaptogens that help your body maintain balance.
                            </p>
                        </div>

                        {/* Animation Section */}
                        <div className="mb-12">
                            <VitalityAnimation />
                        </div>

                        {/* Detailed Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-heading font-semibold text-lg mb-4 text-gray-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">1</span>
                                    Cardiovascular Health
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                        Supports healthy heart function
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                        Promotes healthy blood circulation
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                        Helps maintain cardiovascular wellness
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-heading font-semibold text-lg mb-4 text-gray-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">2</span>
                                    Adaptogenic Balance
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Helps body adapt to stress
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Supports homeostatic balance
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Promotes resilience and recovery
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-heading font-semibold text-lg mb-4 text-gray-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">3</span>
                                    Overall Well-Being
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                        Enhances natural energy levels
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                        Supports daily vitality
                                    </li>
                                    <li className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                        Promotes overall wellness
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Credibility Footer */}
                        <div style={{ textAlign: 'center', marginTop: '40px', padding: '24px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <p style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '13px', color: '#8C8C8C', lineHeight: '1.6' }}>
                                Cordyceps supports cardiovascular health and overall well-being with adaptogenic compounds.
                                Always consult with a healthcare professional.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
