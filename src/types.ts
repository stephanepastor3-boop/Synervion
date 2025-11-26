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
    chartConfig?: any;
    chartType: 'bar' | 'pathway' | 'dual' | 'line' | 'comparison';
    imageUrl: string;
    relevance: string;
    sources?: { citation: string; url: string }[];
}
