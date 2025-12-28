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
    chartData?: Record<string, unknown>[];
    chartConfig?: Record<string, unknown>;
    chartType: 'bar' | 'pathway' | 'dual' | 'line' | 'comparison';
    imageUrl: string;
    relevance: string;
    sources?: { citation: string; url: string }[];
}
