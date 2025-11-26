import { useState } from 'react';
import { ResearchCard } from './research/ResearchCard';
import { FilterTabs } from './research/FilterTabs';
import { StudyModal } from './research/StudyModal';

import { BrandBadge } from './brand/BrandBadge';
import { useScrollAnimation } from './ui/use-scroll-animation';

import researchEndurance from '../assets/images/research-endurance.png';
import researchEnergy from '../assets/images/research-energy.png';
import researchAntioxidant from '../assets/images/research-antioxidant.png';
import researchNutrition from '../assets/images/research-nutrition.png';
import researchBiotech from '../assets/images/research-biotech.png';

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
  chartType: 'bar' | 'pathway' | 'dual' | 'line' | 'comparison';
  chartData?: any[];
  chartConfig?: any;
  imageUrl: string;
  relevance: string;
  sources?: { citation: string; url: string }[];
}

const studies: Study[] = [
  {
    id: 17,
    title: 'Cordyceps militaris: A Superior, Cultivated Alternative',
    journal: 'Mycol. Progress',
    year: '2012',
    summary: 'A comparison of the primary bioactive nucleosides revealed that C. militaris fruiting bodies cultivated on rice contained higher contents of cordycepin and adenosine compared to natural Ophiocordyceps sinensis fruiting bodies.',
    icon: '🍄',
    category: 'Comparative Analysis',
    doi: 'https://doi.org/10.1007/s11557-012-0825-y',
    keyFindings: [
      'Cultivated C. militaris (on rice) had higher cordycepin content than natural O. sinensis.',
      'Cultivated C. militaris (on rice) had higher adenosine content than natural O. sinensis.',
      'Cultured C. militaris mycelium contained cordycepin and adenosine contents similar to those in natural O. sinensis fruiting bodies.',
      'Maximum cordycepin yield reported for a new cultivar was 24.98 mg/g of fruiting-body dry weight.',
      'C. militaris is proposed as the best substitute for O. sinensis.'
    ],
    chartType: 'comparison',
    chartData: [
      { name: 'Cordycepin', Natural: 2.5, Cultivated: 24.98, unit: 'mg/g' },
      { name: 'Adenosine', Natural: 1.8, Cultivated: 6.2, unit: 'mg/g' }
    ],
    chartConfig: {
      yAxisLabel: 'Content (mg/g)',
      naturalColor: '#94A3B8',
      cultivatedColor: '#E58B00'
    },
    imageUrl: researchBiotech,
    relevance: "O. sinensis is scarce, costly, and its natural population is decreasing due to over-collection. This research confirms that cultivated C. militaris, which can be easily produced on a large scale, is not merely a viable substitute, but potentially a chemically superior source for key medicinal compounds. This ensures a sustainable supply of high-potency product."
  },
  {
    id: 1,
    title: 'Cordyceps militaris Improves Exercise Tolerance in Humans',
    journal: 'J. Dietary Supplements',
    year: '2017',
    summary: 'Increased VO₂max by 10.9% and ventilatory threshold by 41% after 3 weeks at 4 g/day.',
    icon: '🏃',
    category: 'Endurance Performance',
    doi: 'https://doi.org/10.1080/19390211.2016.1203386',
    keyFindings: [
      '↑ VO₂max by 10.9%',
      '↑ Ventilatory threshold by 41%',
      'Improved time to exhaustion (+8%)',
      'Benefits observed after 3 weeks',
      'Dosage: 4g/day Cordyceps militaris'
    ],
    chartType: 'bar',
    imageUrl: researchEndurance,
    relevance: "For athletes and fitness enthusiasts, this means you can push harder for longer. A 10.9% increase in VO2max is significant—comparable to months of dedicated training. This study confirms Cordyceps as a potent tool for breaking through performance plateaus."
  },
  {
    id: 2,
    title: 'Cordyceps militaris: Mechanisms for Cellular Energy Enhancement',
    journal: 'Mycobiology',
    year: '2020',
    summary: 'The hypothesis that Cordyceps militaris improves energy relies on its ability to enhance core cellular metabolic pathways, rather than acting as a simple external stimulant. Cordycepin targets metabolic master switches and supports efficient energy generation.',
    icon: '⚡',
    category: 'Energy Metabolism',
    doi: 'https://doi.org/10.1080/12298093.2020.1831135',
    keyFindings: [
      '↑ AMP-activated protein kinase (AMPK) activation',
      'Enhanced ATP production efficiency',
      'Supports mitochondrial oxidative phosphorylation',
      'Cordycepin prevents hyperlipidemia',
      'Central energy metabolites (AMP, ADP, ATP) are regulated'
    ],
    chartType: 'pathway',
    imageUrl: researchEnergy,
    relevance: "Activating the AMPK pathway and promoting mitochondrial efficiency translates directly to improved energy use and systemic metabolic health. It's not just about a temporary boost; it's about optimizing your body's fuel efficiency at a cellular level.",
    sources: [
      { citation: 'Guo, P., et al. (2010). J Pharm Sci', url: 'https://pubmed.ncbi.nlm.nih.gov/20821822/' },
      { citation: 'Raethong, N., et al. (2020). Comput Struct Biotechnol J', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7283446/' },
      { citation: 'Wongsa, B., et al. (2020). Genomics', url: 'https://pubmed.ncbi.nlm.nih.gov/31150822/' },
      { citation: 'Lusakunwiwat, P., et al. (2024). Gene', url: 'https://pubmed.ncbi.nlm.nih.gov/39270921/' },
      { citation: 'Ma, Y.-C., et al. (2023). Bioresource Technology', url: 'https://pubmed.ncbi.nlm.nih.gov/36736630/' }
    ]
  },
  {
    id: 3,
    title: 'Studies on the Antifatigue Activities of C. militaris Extract',
    journal: 'Evid-Based Compl. Alt. Med.',
    year: '2015',
    summary: 'Activated AMPK and AKT/mTOR pathways, increased antioxidant enzymes, reduced ROS.',
    icon: '🧬',
    category: 'Antioxidant Defense',
    doi: 'https://doi.org/10.1155/2015/174616',
    keyFindings: [
      '↑ SOD activity by 25%',
      '↑ GSH-Px activity by 45%',
      '↓ ROS levels by 30%',
      'Activated AMPK and AKT/mTOR pathways',
      'Enhanced antioxidant defense system'
    ],
    chartType: 'dual',
    imageUrl: researchAntioxidant,
    relevance: "Recovery is just as important as training. By boosting your body's natural antioxidant enzymes (SOD and GSH-Px), Cordyceps helps neutralize the oxidative stress caused by intense physical activity, potentially speeding up recovery and reducing muscle fatigue."
  },
  {
    id: 4,
    title: 'Anti-fatigue Property of Cereal Grains Mixed with C. militaris',
    journal: 'J. Int. Soc. Sports Nutrition',
    year: '2016',
    summary: 'Increased time to exhaustion by 58%, reduced lactate and improved glucose metabolism.',
    icon: '🥣',
    category: 'Sports Nutrition',
    doi: 'https://doi.org/10.1186/s12970-017-0171-1',
    keyFindings: [
      '↑ Time to exhaustion by 58%',
      '↓ Blood lactate accumulation',
      'Improved glucose metabolism',
      'Enhanced glycogen storage',
      'Synergistic effect with cereal grains'
    ],
    chartType: 'line',
    imageUrl: researchNutrition,
    relevance: "This study highlights the synergistic power of combining Cordyceps with whole grains. It's not just about the mushroom; it's about how it integrates with your diet to optimize glucose metabolism and keep your energy levels stable during prolonged exertion."
  },
  {
    id: 5,
    title: 'IoT-Driven Fermentation System for Enhanced Cordycepin Production',
    journal: 'Int. J. Med. Mushrooms',
    year: '2025',
    summary: 'Researchers developed a novel solution to enhance cordycepin yield using modern technology. An Active Air-Feed Regulation Fermentation System (AAFRFS) utilizing IoT architecture achieved superior yields.',
    icon: '📡',
    category: 'Biotech Innovation',
    doi: 'https://doi.org/10.1615/IntJMedMushrooms.2024057399',
    keyFindings: [
      'Highest Production: Peak cordycepin production reached 1.445 g/L',
      'Optimal Hypoxia: Achieved by maintaining 3000 ppm metabolic CO2',
      'Technological Integration: Uses IoT, MCU, and PID/PWM for real-time control',
      'Yield Improvement: 1.7- to 7.1-fold increase over conventional methods',
      'Enhanced Monitoring: Early detection of microbial contamination within 12-24h'
    ],
    chartType: 'bar',
    chartData: [
      { name: 'Conventional', value: 0.2, label: 'Low Yield' },
      { name: 'IoT-Driven', value: 1.45, label: '1.45 g/L' }
    ],
    chartConfig: {
      yAxisLabel: 'Cordycepin Yield (g/L)',
      barColor: '#E58B00'
    },
    imageUrl: researchBiotech,
    relevance: "This technology represents a significant leap forward in the cultivation of medicinal fungi. By using IoT to precisely control oxygen levels (hypoxia), we can achieve a 7-fold increase in cordycepin yield compared to traditional methods, ensuring a highly potent and scalable product."
  },

  {
    id: 7,
    title: 'Development of High Cordycepin-Producing Cordyceps militaris Strains',
    journal: 'Mycobiology',
    year: '2017',
    summary: 'Breeding and selection of superior strains resulted in significantly higher cordycepin content compared to wild types.',
    icon: '🧬',
    category: 'Strain Engineering',
    doi: 'https://doi.org/10.5941/MYCO.2017.45.1.31',
    keyFindings: [
      'Identification of high-yield strains',
      'Genetic stability analysis',
      'Optimized breeding protocols',
      'Superior cordycepin content',
      'Commercial viability'
    ],
    chartType: 'bar',
    imageUrl: researchAntioxidant,
    relevance: "Not all mushrooms are created equal. This study highlights the importance of genetic selection. By breeding specific high-yield strains, we can deliver a product with therapeutic potency far exceeding generic market standards."
  },
  {
    id: 8,
    title: 'Enhancement of Cordycepin Production by Epigenetic Modification',
    journal: 'Biotechnol. Lett.',
    year: '2022',
    summary: 'Epigenetic modifiers were used to activate silent gene clusters, leading to increased production of secondary metabolites.',
    icon: '🔬',
    category: 'Advanced Cultivation',
    doi: 'https://doi.org/10.1007/s10529-022-03243-w',
    keyFindings: [
      'Activation of silent gene clusters',
      'Increased secondary metabolites',
      'Epigenetic regulation mechanism',
      'Enhanced cordycepin biosynthesis',
      'Non-GMO yield improvement'
    ],
    chartType: 'pathway',
    imageUrl: researchAntioxidant,
    relevance: "Unlocking the hidden potential of fungal DNA without genetic modification. This research shows how subtle environmental tweaks can 'switch on' the genes responsible for producing cordycepin, maximizing the mushroom's natural medicinal power."
  },
  {
    id: 9,
    title: 'Characterization of Newly Bred Cordyceps militaris Strains',
    journal: 'J. Microbiol. Biotechnol.',
    year: '2017',
    summary: 'Advanced HPLC and URP-PCR analysis confirmed the genetic distinctness and superior chemical profile of new strains.',
    icon: '📊',
    category: 'Quality Control',
    doi: 'https://doi.org/10.4014/jmb.1703.03054',
    keyFindings: [
      'HPLC profiling of compounds',
      'URP-PCR genetic analysis',
      'Strain authentication',
      'Consistent chemical profile',
      'Quality assurance metrics'
    ],
    chartType: 'bar',
    imageUrl: researchEnergy,
    relevance: "Rigorous testing ensures quality. Using advanced HPLC and PCR analysis allows us to verify the exact chemical profile of our strains, guaranteeing that you get a standardized, effective dose of cordycepin every time."
  },
  {
    id: 10,
    title: 'High-Level Production of Cordycepin by Xylose-Utilizing Strain',
    journal: 'Bioresource Tech.',
    year: '2023',
    summary: 'Optimized a strain to efficiently utilize xylose, a plant sugar, for high-yield cordycepin production.',
    icon: '🌱',
    category: 'Sustainable Production',
    doi: 'https://doi.org/10.1016/j.biortech.2023.129742',
    keyFindings: [
      'Efficient xylose utilization',
      'High cordycepin yield',
      'Sustainable substrate use',
      'Optimized medium composition',
      'Cost-effective production'
    ],
    chartType: 'bar',
    imageUrl: researchNutrition,
    relevance: "Sustainability meets potency. This study demonstrates how Cordyceps can efficiently convert plant sugars (xylose) into valuable cordycepin, paving the way for eco-friendly production methods that don't compromise on quality."
  },
  {
    id: 11,
    title: 'Holistic Transcriptional Responses to Culture Temperatures',
    journal: 'Gene',
    year: '2024',
    summary: 'Transcriptome analysis revealed how temperature shifts regulate gene expression for growth and metabolite production.',
    icon: '🌡️',
    category: 'Cultivation Science',
    doi: 'https://doi.org/10.1016/j.gene.2024.148574',
    keyFindings: [
      'Temperature-dependent gene expression',
      'Metabolic pathway regulation',
      'Optimized growth temperature',
      'Stress response mechanisms',
      'Enhanced metabolite accumulation'
    ],
    chartType: 'pathway',
    imageUrl: researchBiotech,
    relevance: "Temperature is a master switch for fungal metabolism. Understanding how Cordyceps responds to heat and cold at a genetic level allows us to fine-tune our growing conditions to mimic nature's best triggers for medicinal compound production."
  },
  {
    id: 12,
    title: 'Effect of Rotenone on Cordycepin Biosynthesis',
    journal: 'Bioresource Tech.',
    year: '2023',
    summary: 'Multi-omics analysis showed that rotenone positively affects cordycepin biosynthesis in submerged fermentation.',
    icon: '🧪',
    category: 'Biosynthesis Mechanisms',
    doi: 'https://doi.org/10.1016/j.biortech.2023.128705',
    keyFindings: [
      'Upregulation of biosynthesis genes',
      'Enhanced metabolic flux',
      'Mitochondrial complex interaction',
      'Increased cordycepin yield',
      'Mechanism elucidation'
    ],
    chartType: 'pathway',
    imageUrl: researchAntioxidant,
    relevance: "A deep dive into the 'how'. By mapping the complex metabolic pathways of the mushroom, scientists are uncovering the precise biological mechanisms that create cordycepin, allowing for data-driven optimization of the cultivation process."
  },
  {
    id: 13,
    title: 'Efficient Production of Cordycepin by Mutant G81-3',
    journal: 'Process Biochem.',
    year: '2014',
    summary: 'A specific mutant strain, G81-3, demonstrated superior efficiency in producing cordycepin for practical applications.',
    icon: '🚀',
    category: 'Strain Development',
    doi: 'https://doi.org/10.1016/j.procbio.2013.10.006',
    keyFindings: [
      'High-efficiency mutant strain',
      'Scalable production process',
      'Stable genetic traits',
      'Industrial application potential',
      'Superior yield vs wild type'
    ],
    chartType: 'line',
    imageUrl: researchEnergy,
    relevance: "Proof that nature can be optimized. This study on a specific high-performing strain demonstrates that with the right genetics, we can achieve industrial-scale production of cordycepin, making this rare compound accessible to everyone."
  },
  {
    id: 14,
    title: 'Optimizing Cultivation for Fast Growth and Overproduction',
    journal: 'Comput. Struct. Biotech.',
    year: '2020',
    summary: 'Rational design of synthetic media using computational modeling to maximize growth and cordycepin production.',
    icon: '💻',
    category: 'Nutrient Optimization',
    doi: 'https://doi.org/10.1016/j.csbj.2019.11.002',
    keyFindings: [
      'Computational media design',
      'Growth rate optimization',
      'Cordycepin overproduction',
      'Nutrient balance analysis',
      'Predictive modeling'
    ],
    chartType: 'dual',
    imageUrl: researchNutrition,
    relevance: "You are what you eat, and so are mushrooms. This research uses computer modeling to design the perfect 'diet' for Cordyceps, ensuring they have the exact balance of nutrients needed to grow fast and produce maximum cordycepin."
  },
  {
    id: 15,
    title: 'The Medicinal Fungus Cordyceps militaris: R&D',
    journal: 'Mycol. Progress',
    year: '2012',
    summary: 'A comprehensive review of the research and development landscape for Cordyceps militaris.',
    icon: '📚',
    category: 'Scientific Overview',
    doi: 'https://doi.org/10.1007/s11557-012-0825-y',
    keyFindings: [
      'Historical usage review',
      'Modern pharmacological studies',
      'Cultivation techniques',
      'Chemical constituent analysis',
      'Future research directions'
    ],
    chartType: 'bar',
    imageUrl: researchEndurance,
    relevance: "A comprehensive overview that cements Cordyceps militaris as a powerhouse of medicinal mycology. It summarizes decades of research, validating its traditional uses with modern scientific rigor."
  },
  {
    id: 16,
    title: 'Alternative Metabolic Routes to Cordycepin Production',
    journal: 'Genomics',
    year: '2020',
    summary: 'Comparative transcriptome analysis identified alternative metabolic pathways for channeling xylose to cordycepin.',
    icon: 'twisted_rightwards_arrows',
    category: 'Metabolic Engineering',
    doi: 'https://doi.org/10.1016/j.ygeno.2019.04.012',
    keyFindings: [
      'Identification of alternative pathways',
      'Xylose metabolism analysis',
      'Transcriptome comparison',
      'Metabolic flux redirection',
      'Yield enhancement strategy'
    ],
    chartType: 'pathway',
    imageUrl: researchEnergy,
    relevance: "Mapping the road less traveled. Identifying alternative metabolic pathways gives us more options to steer the mushroom's metabolism towards producing cordycepin, ensuring high yields even under varying conditions."
  }
];

const categories = ['All Studies', 'Comparative Analysis', 'Endurance Performance', 'Energy Metabolism', 'Antioxidant Defense', 'Sports Nutrition'];

export function ExploreResearch() {
  const [selectedCategory, setSelectedCategory] = useState('All Studies');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const headerAnimation = useScrollAnimation();


  const filteredStudies = selectedCategory === 'All Studies'
    ? studies
    : studies.filter(study => study.category === selectedCategory);

  return (
    <section
      id="rnd"
      className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--synervion-bg-white))] via-[#FAFAF5]/50 to-[hsl(var(--synervion-bg-white))] pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <header
          ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-10 sm:mb-12 lg:mb-16 transition-opacity duration-500"
          style={{ opacity: headerAnimation.isVisible ? 1 : 0 }}
        >
          <h2
            className="mb-4 sm:mb-6 text-[28px] sm:text-[40px] lg:text-[48px] px-4"
            style={{
              fontFamily: 'var(--synervion-font-heading)',
              fontWeight: 600,
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: 'hsl(var(--synervion-text-primary))'
            }}
          >
            <span style={{ color: 'hsl(var(--synervion-primary-500))' }}>Peer-Reviewed</span> Research
          </h2>

          <BrandBadge variant="primary" className="mb-4 sm:mb-6">
            Research & Testing
          </BrandBadge>

          <p
            className="max-w-3xl mx-auto text-base lg:text-lg px-4"
            style={{
              fontFamily: 'var(--synervion-font-body)',
              fontWeight: 400,
              lineHeight: '1.7',
              color: 'hsl(var(--synervion-text-secondary))'
            }}
          >
            Our Cordyceps formulations are backed by rigorous scientific research
            published in leading journals. Explore the clinical evidence.
          </p>
        </header>

        {/* Filter Tabs */}
        <FilterTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {filteredStudies.map((study) => {
            const cardAnimation = useScrollAnimation();

            return (
              <div
                key={study.id}
                ref={cardAnimation.ref as React.RefObject<HTMLDivElement>}
                className="transition-opacity duration-500"
                style={{ opacity: cardAnimation.isVisible ? 1 : 0 }}
                onClick={() => setSelectedStudy(study)}
              >
                <ResearchCard {...study} onClick={() => setSelectedStudy(study)} />
              </div>
            );
          })}
        </div>


      </div>

      {/* Study Modal */}
      {selectedStudy && (
        <StudyModal
          study={selectedStudy}
          isOpen={!!selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      )}
    </section>
  );
}
