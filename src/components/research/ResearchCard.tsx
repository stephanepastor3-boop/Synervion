import { useState } from 'react';
import { ArrowRight, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';

interface ResearchCardProps {
  id: number;
  title: string;
  journal: string;
  year: string;
  summary: string;
  icon: string;
  category: string;
  onClick: () => void;
  imageUrl: string;
}

export function ResearchCard({
  id,
  title,
  journal,
  year,
  summary,
  icon,
  category,
  onClick,
  imageUrl
}: ResearchCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/study/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 cursor-pointer flex flex-col h-full"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="400"
          height="300"
        />
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-900 shadow-sm flex items-center gap-2">
          <span>{icon}</span>
          <span>{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-3">
          <span className="uppercase tracking-wider">{journal}</span>
          <span>•</span>
          <span>{year}</span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {summary}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
          <span className="text-orange-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Read Analysis <ArrowRight size={16} />
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const shareUrl = `${window.location.origin}/study/${id}`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
              }}
              className="text-gray-400 hover:text-[#0077b5] transition-colors duration-200"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const shareUrl = `${window.location.origin}/study/${id}`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
              }}
              className="text-gray-400 hover:text-black transition-colors duration-200"
              aria-label="Share on X"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const shareUrl = `${window.location.origin}/study/${id}`;
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this research: ${title}\n\n${shareUrl}`)}`;
              }}
              className="text-gray-400 hover:text-[#EA4335] transition-colors duration-200"
              aria-label="Share via Email"
            >
              <Mail size={16} />
            </button>
            <button
              onClick={handleCopyLink}
              className={`transition-colors duration-200 ${copied ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              aria-label="Copy Link"
            >
              {copied ? <Check size={16} /> : <LinkIcon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
