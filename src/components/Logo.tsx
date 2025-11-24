import LogoSvg from '../assets/images/Logo.svg';
import LogoBWSvg from '../assets/images/Logo_BW.svg';

export interface LogoProps {
    /** Logo variant - color or black & white */
    variant?: 'color' | 'bw';
    /** Size of the logo - sm (24px), md (32px), lg (40px), or custom pixel value */
    size?: 'sm' | 'md' | 'lg' | number;
    /** Whether to show the Synervion wordmark next to the logo */
    showWordmark?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Click handler */
    onClick?: () => void;
}

export function Logo({
    variant = 'color',
    size = 'md',
    showWordmark = true,
    className = '',
    onClick,
}: LogoProps) {
    // Convert size to pixels
    const sizeMap = {
        sm: 24,
        md: 32,
        lg: 40,
    };

    const pixelSize = typeof size === 'number' ? size : sizeMap[size];

    // Select the appropriate logo
    const logoSrc = variant === 'color' ? LogoSvg : LogoBWSvg;

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity ${className}`}
            aria-label={showWordmark ? 'Synervion' : 'Synervion logo'}
        >
            <img
                src={logoSrc}
                alt="Synervion logo"
                width={pixelSize}
                height={pixelSize}
                className="flex-shrink-0"
                style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
            />
            {showWordmark && (
                <span
                    style={{
                        fontFamily: 'var(--synervion-font-heading)',
                        fontSize: pixelSize >= 32 ? '20px' : '18px',
                        fontWeight: 600,
                        color: 'hsl(var(--synervion-text-primary))',
                    }}
                >
                    Synervion
                </span>
            )}
        </button>
    );
}
