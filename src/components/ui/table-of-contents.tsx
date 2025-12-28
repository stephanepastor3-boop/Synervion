import { useEffect, useState } from 'react';
import { cn } from './utils';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Find headings inside the article content
        const elements = Array.from(document.querySelectorAll('article h2, article h3'));
        const items: TOCItem[] = elements.map((element) => {
            // Ensure element has an ID
            if (!element.id) {
                element.id = element.innerHTML
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
            return {
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.replace('H', '')),
            };
        });
        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));
        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-nav hidden lg:block sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Table of Contents
            </h4>
            <ul className="space-y-3 text-sm border-l-2 border-border pl-4">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={cn(
                            "transition-colors hover:text-primary",
                            heading.level === 3 && "pl-4",
                            activeId === heading.id
                                ? "text-primary font-medium -ml-[18px] border-l-2 border-primary pl-[14px]"
                                : "text-muted-foreground"
                        )}
                    >
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                                setActiveId(heading.id);
                            }}
                            className="block leading-relaxed"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
