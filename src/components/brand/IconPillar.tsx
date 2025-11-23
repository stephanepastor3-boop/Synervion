import energyIconTransparent from '../../assets/images/icon-immune.png';
import immuneIconTransparent from '../../assets/images/icon-vitality.png';
import vitalityIconTransparent from '../../assets/images/icon-longevity.png';
import longevityIconTransparent from '../../assets/images/icon-energy.png';
import longevityFlowerIcon from '../../assets/images/icon-check.png';

type IconPillarVariant = 'energy' | 'immune' | 'vitality' | 'longevity';

interface IconPillarProps {
  variant: IconPillarVariant;
  className?: string;
}

export function IconPillar({ variant, className = '' }: IconPillarProps) {
  const iconSources: Record<IconPillarVariant, string> = {
    energy: energyIconTransparent,
    immune: immuneIconTransparent,
    vitality: longevityIconTransparent,
    longevity: longevityFlowerIcon,
  };

  const iconAltText: Record<IconPillarVariant, string> = {
    energy: 'Energy Enhancement',
    immune: 'Immune Support',
    vitality: 'Vitality & Wellness',
    longevity: 'Longevity Support',
  };

  const iconSizes: Record<IconPillarVariant, string> = {
    energy: '34px',
    immune: '42px',
    vitality: '42px',
    longevity: '40px',
  };

  const currentSize = iconSizes[variant];

  return (
    <div
      className={`w-14 h-14 rounded-[var(--synervion-radius-xl)] bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center ${className}`}
    >
      {iconSources[variant] ? (
        <img
          src={iconSources[variant]!}
          alt={iconAltText[variant]}
          className="IconGraphic"
          style={{
            width: currentSize,
            height: currentSize,
            objectFit: 'contain',
          }}
        />
      ) : (
        <div
          className="IconGraphic"
          style={{
            width: currentSize,
            height: currentSize,
            backgroundColor: '#EE7B2F',
            opacity: 0.3,
            borderRadius: '4px',
          }}
        />
      )}
    </div>
  );
}
