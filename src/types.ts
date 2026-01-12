export interface Study {
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
    chartConfig?: {
        barColor?: string;
        yAxisLabel?: string;
        naturalColor?: string;
        cultivatedColor?: string;
        [key: string]: string | undefined;
    };
    chartType: 'bar' | 'pathway' | 'dual' | 'line' | 'comparison';
    imageUrl: string;
    relevance: string;
    sources?: { citation: string; url: string }[];
}

export interface ProductMetric {
    label: string;
    value: string;
    unit?: string;
    icon?: string; // Lucide icon name
}

export interface Product {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription?: string;
    price: number;
    image: string;
    imageScale?: number;
    imageOffsetY?: string; // e.g. "10%" or "20px" to push image down
    category: 'performance' | 'immunity' | 'cognition' | 'recovery';
    tags: string[]; // e.g., "VO2 Max", "ATP"

    // Bio-Metric Data
    potency: string; // e.g., "1.2% Cordycepin"
    activeCompound: string; // "Cordycepin" or "Adenosine"

    // Hover State Metrics
    metrics: ProductMetric[];

    // Display Gallery
    gallery?: {
        type: 'ingredient' | 'texture' | 'application' | 'info';
        src: string;
        label: string;
    }[];

    // B2C Clarity Fields
    formatLabel?: string; // e.g., "For Capsules & Tablets"
    applicationExamples?: string[]; // e.g., ["Daily Supplement", "Pre-Workout"]

    // Science Backing
    relatedStudyIds: number[]; // Links to Study.id

    // Purchase/Sample Options
    options: {
        label: string;
        weight: string; // e.g., "50g Sample", "1kg MOQ"
        price: number;
        cta: string; // "Order Sample" or "Request Quote"
        imageIndex?: number;
    }[];
}
