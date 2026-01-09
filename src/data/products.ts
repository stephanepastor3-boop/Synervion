import { Product } from '../types';
import productCoreCaps from '../assets/product-core-caps.png';
import applicationCoreCaps from '../assets/application-core-caps.png';
import infoCoreCaps from '../assets/info-core-caps-v3.png'; // New Image
import productRootPowders from '../assets/product-root-powders.png';
import actionFlow from '../assets/action-flow.png';

import actionRootTexture from '../assets/action-root-texture.png';
import applicationRootLifestyle from '../assets/application-root-lifestyle.png';
import infoRootPowders from '../assets/info-root-powders-v3.png';

import applicationPulseLiquids from '../assets/application-pulse-liquids.png';
import productPulseHero from '../assets/product-pulse-hero.png';
import infoPulseLiquids from '../assets/info-pulse-liquids-v3.png'; // New Hero Image

export const products: Product[] = [
    {
        id: 'synv-core',
        title: 'Synervion® CORE Caps',
        subtitle: 'Capsule-Ready Performance System',
        description: 'Foundational, high-potency extract engineered for precise dosing.',
        price: 0,
        image: productCoreCaps,
        gallery: [
            { type: 'application', src: applicationCoreCaps, label: 'Private Label' },
            { type: 'texture', src: infoCoreCaps, label: 'Benefits' },
            { type: 'ingredient', src: productCoreCaps, label: 'Bottle' }
        ],
        category: 'performance',
        tags: ['Supplement Grade', '>1.2% Cordycepin', 'Standardized'],
        potency: '1.5% Active Extract',
        activeCompound: 'Cordycepin',
        formatLabel: 'For Capsules & Tablets',
        applicationExamples: [
            'Daily Supplement Capsules',
            'Pre-Workout Endurance',
            'Focus & Productivity Stacks'
        ],
        metrics: [
            { label: 'Cordycepin', value: '>1.2%', icon: 'Zap' },
            { label: 'Solubility', value: 'Medium', icon: 'FlaskConical' },
            { label: 'Format', value: 'Capsule', icon: 'Pill' }
        ],
        relatedStudyIds: [1, 3, 17],
        options: [
            { label: 'Sample', weight: '60 Caps', price: 90, cta: 'Order Sample', imageIndex: 2 },
            { label: 'Stock', weight: '120 Caps', price: 0, cta: 'Request Quote', imageIndex: 2 },
            { label: 'Production', weight: 'Bulk', price: 0, cta: 'Request Quote', imageIndex: 0 }
        ]
    },
    {
        id: 'synv-pulse',
        title: 'Synervion® PULSE Liquids',
        subtitle: 'Fast-Acting Nano-Extract',
        description: 'Nano-encapsulated for speed, circulation, and instant bioavailability.',
        price: 180,
        image: productPulseHero,
        gallery: [
            { type: 'application', src: productPulseHero, label: 'Private Label' },
            { type: 'info', src: infoPulseLiquids, label: 'Specifications' },
            { type: 'texture', src: actionFlow, label: 'Instant Digestion' },
            { type: 'application', src: applicationPulseLiquids, label: 'Dosing' }
        ],
        category: 'cognition',
        tags: ['Beverage Grade', 'Fully Soluble', 'Nano-Encapsulated'],
        potency: '1.0% Nano-Extract',
        activeCompound: 'Bio-Available Matrix',
        formatLabel: 'For Drinks & Liquids',
        applicationExamples: [
            'Energy Shots (30ml)',
            'Functional Coffee/Tea',
            'Liquid Drops'
        ],
        metrics: [
            { label: 'Solubility', value: '100%', icon: 'Droplets' },
            { label: 'Particle', value: '<50μm', icon: 'Wind' },
            { label: 'Format', value: 'Liquid', icon: 'Wine' }
        ],
        relatedStudyIds: [2, 19],
        options: [
            { label: 'Sample', weight: '30ml', price: 180, cta: 'Order Sample', imageIndex: 0 },
            { label: 'Stock', weight: '60ml', price: 0, cta: 'Request Quote', imageIndex: 0 },
            { label: 'Production', weight: 'Bulk', price: 0, cta: 'Request Quote', imageIndex: 2 }
        ]
    },
    {
        id: 'synv-root',
        title: 'Synervion® ROOT Powders',
        subtitle: 'Whole-Food Nutrition Base',
        description: 'Micronized fruiting body for daily wellness and holistic blends.',
        price: 0,
        image: productRootPowders,
        gallery: [
            { type: 'ingredient', src: productRootPowders, label: 'Bulk Powder' },
            { type: 'info', src: infoRootPowders, label: 'Formats' },
            { type: 'texture', src: actionRootTexture, label: 'Food Matrix' },
            { type: 'application', src: applicationRootLifestyle, label: 'Daily Wellness' }
        ],
        category: 'immunity',
        tags: ['Broad Spectrum', 'Whole Food', 'High Fiber'],
        potency: 'Full Spectrum',
        activeCompound: 'Beta-Glucans',
        formatLabel: 'For Powders & Foods',
        applicationExamples: [
            'Mushroom Powder Jars',
            'Daily Immunity Blends',
            'Protein + Superfoods'
        ],
        metrics: [
            { label: 'Beta-Glucans', value: '>25%', icon: 'Shield' },
            { label: 'Fiber', value: 'High', icon: 'Activity' },
            { label: 'Format', value: 'Powder', icon: 'ShoppingBag' }
        ],
        relatedStudyIds: [3, 18],
        options: [
            { label: 'Sample', weight: '100g', price: 90, cta: 'Order Sample', imageIndex: 0 },
            { label: 'Stock', weight: '300g', price: 0, cta: 'Request Quote', imageIndex: 0 },
            { label: 'Production', weight: 'Bulk', price: 0, cta: 'Request Quote', imageIndex: 2 }
        ]
    }
];
