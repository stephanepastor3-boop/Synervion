import { Link, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const currentUrl = url || window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            toast.success('Link copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    const shareLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-[#0077b5]',
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: 'hover:text-[#25D366]',
        },
        {
            name: 'X (Twitter)',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:text-black',
        },
    ];

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[hsl(var(--synervion-text-secondary))] mr-2">
                Share:
            </span>
            {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full hover:bg-[hsl(var(--synervion-bg-gray-100))] transition-colors ${link.color}`}
                        title={`Share on ${link.name}`}
                    >
                        <Icon size={18} />
                    </a>
                );
            })}
            <button
                onClick={copyToClipboard}
                className="p-2 rounded-full hover:bg-[hsl(var(--synervion-bg-gray-100))] transition-colors hover:text-[hsl(var(--synervion-primary-500))]"
                title="Copy Link"
            >
                <Link size={18} />
            </button>
        </div>
    );
}
