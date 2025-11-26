import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Quote } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, Legend } from 'recharts';
import imageCellularOptimization from '../../assets/images/image-CellularOptimization.png';

interface Study {
  id: number;
  title: string;
  journal: string;
  year: string;
  summary: string;
  icon: string;
  category: string;
  doi: string;
  keyFindings: string[];
  chartData?: any[];
  chartConfig?: any;
  chartType: 'bar' | 'pathway' | 'dual' | 'line' | 'comparison';
  imageUrl: string;
  relevance: string;
  sources?: { citation: string; url: string }[];
}

interface StudyModalProps {
  study: Study | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudyModal({ study, isOpen, onClose }: StudyModalProps) {
  if (!study) return null;

  const renderChart = () => {
    if (study.chartData) {
      if (study.chartType === 'bar') {
        return (
          <div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={study.chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E58B00" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFD48A" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis
                  hide
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" fill={study.chartConfig?.barColor || "url(#barGradient)"} radius={[6, 6, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              {study.chartConfig?.yAxisLabel && (
                <p className="text-xs text-neutral-500 mt-2">{study.chartConfig.yAxisLabel}</p>
              )}
            </div>
          </div>
        );
      } else if (study.chartType === 'comparison') {
        return (
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={study.chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis
                  hide
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span style={{ color: '#374151', fontSize: '12px', fontWeight: 500 }}>{value}</span>}
                />
                <Bar dataKey="Natural" name="Natural O. sinensis" fill={study.chartConfig?.naturalColor || "#94A3B8"} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Cultivated" name="Cultivated C. militaris" fill={study.chartConfig?.cultivatedColor || "#E58B00"} radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 text-center">
              {study.chartConfig?.yAxisLabel && (
                <p className="text-xs text-neutral-500">{study.chartConfig.yAxisLabel}</p>
              )}
              <div className="mt-3 inline-block bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
                ★ Significantly Higher Bioactive Content
              </div>
            </div>
          </div>
        );
      }
      // Add other dynamic types here if needed, or fall back to switch
    }

    switch (study.chartType) {
      case 'bar':
        // Study #1: VO2max improvement
        const vo2Data = [
          { name: 'Before', value: 44.0, label: '44.0' },
          { name: 'After', value: 48.8, label: '48.8' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={vo2Data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E58B00" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFD48A" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis
                  hide
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ↑ +10.9% VO₂max Improvement
              </div>
              <p className="text-xs text-neutral-500 mt-2">Ventilatory Threshold: +41% ↑</p>
            </div>
          </div>
        );

      case 'pathway':
        // Study #2: Energy metabolism pathway
        return (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img
              src={imageCellularOptimization}
              alt="Cellular Energy Optimization Pathway"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        );

      case 'dual':
        // Study #3: Antioxidant effects
        const antioxidantData = [
          { name: 'SOD', value: 25, color: '#059669' },
          { name: 'GSH-Px', value: 45, color: '#059669' },
          { name: 'ROS', value: -30, color: '#EF4444' }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={antioxidantData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis hide domain={[-40, 50]} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={50}>
                  {antioxidantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                ↑ Antioxidants
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded">
                ↓ Oxidative Stress
              </div>
            </div>
          </div>
        );

      case 'line':
        // Study #4: Endurance time
        const enduranceData = [
          { name: 'Control', value: 6.8 },
          { name: 'Cordyceps', value: 9.5 }
        ];
        return (
          <div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={enduranceData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--synervion-font-body)', fontSize: '12px', fill: '#6B7280' }}
                />
                <YAxis hide domain={[0, 12]} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--synervion-font-body)'
                  }}
                />
                <Bar dataKey="value" fill="#E58B00" radius={[6, 6, 0, 0]} barSize={60} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ↑ +39% Endurance Time
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full p-2 transition-all duration-200 text-white hover:scale-105"
            >
              <X size={20} />
            </button>

            {/* Hero Section */}
            <div className="relative h-64 sm:h-80 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    {study.journal} • {study.year}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-4xl font-heading">
                  {study.title}
                </h2>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] divide-y lg:divide-y-0 lg:divide-x divide-neutral-100">

              {/* Main Content Column */}
              <div className="p-6 sm:p-10">
                {/* The Breakdown */}
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                    The Breakdown
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="mb-10 bg-orange-50 rounded-xl p-6 sm:p-8 border border-orange-100">
                  <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <Quote size={20} className="text-orange-500 fill-orange-500" />
                    Why It Matters
                  </h3>
                  <p className="text-neutral-700 leading-relaxed font-medium">
                    {study.relevance}
                  </p>
                </div>

                {/* Key Insights */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-neutral-800 rounded-full"></span>
                    Key Insights
                  </h3>
                  <ul className="space-y-4">
                    {study.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-4 group">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform duration-300 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">
                          {finding}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar Column (Data & Actions) */}
              <div className="bg-neutral-50/50 p-6 sm:p-10 flex flex-col h-full">
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-center items-center shadow-sm border border-neutral-100">
                  {renderChart()}
                </div>

                <div className="mt-auto">
                  {study.sources ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        References
                      </h4>
                      {study.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full bg-white border border-neutral-200 hover:border-orange-300 hover:bg-orange-50 text-neutral-700 text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 group"
                        >
                          <span className="truncate mr-2">{source.citation}</span>
                          <ExternalLink size={14} className="text-neutral-400 group-hover:text-orange-500 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <>
                      <a
                        href={study.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 group"
                      >
                        Read Full Study
                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <p className="text-center text-xs text-neutral-400 mt-4">
                        Published in {study.journal}, {study.year}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
