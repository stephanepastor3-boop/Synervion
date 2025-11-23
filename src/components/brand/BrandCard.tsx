import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface BrandCardProps {
  variant?: 'benefit' | 'metric' | 'partnership' | 'default';
  icon?: ReactNode;
  title?: string;
  description?: string;
  metric?: string;
  metricLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function BrandCard({
  variant = 'default',
  icon,
  title,
  description,
  metric,
  metricLabel,
  children,
  className,
}: BrandCardProps) {
  const baseStyles = 'rounded-[var(--synervion-radius-2xl)] bg-white border transition-all duration-300';

  const variantStyles = {
    benefit: 'border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))]/30 hover:shadow-xl hover:-translate-y-1 p-8 group',
    metric: 'border-[hsl(var(--synervion-border-light))] p-6 text-center',
    partnership: 'border-2 border-[hsl(var(--synervion-border-light))] hover:border-[hsl(var(--synervion-primary-500))] hover:shadow-xl hover:-translate-y-1 p-8 group',
    default: 'border-[hsl(var(--synervion-border-light))] p-6',
  };

  if (variant === 'benefit') {
    // Check if icon is an IconPillar component (already has container)
    const isIconPillar = icon && typeof icon === 'object' && 'type' in icon &&
      icon.type && typeof icon.type === 'function' &&
      icon.type.name === 'IconPillar';

    return (
      <div className={cn(baseStyles, variantStyles.benefit, className)}>
        {icon && (
          <div className="mb-6">
            {isIconPillar ? (
              <div className="group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            ) : (
              <div className="w-14 h-14 rounded-[var(--synervion-radius-xl)] bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            )}
          </div>
        )}
        {title && (
          <h4 className="mb-3" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
            {title}
          </h4>
        )}
        {description && (
          <p className="text-sm text-[hsl(var(--synervion-text-secondary))] mb-6 leading-relaxed">
            {description}
          </p>
        )}
        {(metric || metricLabel) && (
          <div className="pt-6 border-t border-[hsl(var(--synervion-border-light))]">
            {metric && (
              <div
                className="text-2xl mb-1 text-[hsl(var(--synervion-primary-500))]"
                style={{ fontFamily: 'var(--synervion-font-heading)' }}
              >
                {metric}
              </div>
            )}
            {metricLabel && (
              <div className="text-xs text-[hsl(var(--synervion-text-secondary))]">
                {metricLabel}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }

  if (variant === 'metric') {
    return (
      <div className={cn(baseStyles, variantStyles.metric, className)}>
        {metric && (
          <div
            className="text-4xl mb-2 text-[hsl(var(--synervion-primary-500))]"
            style={{ fontFamily: 'var(--synervion-font-heading)' }}
          >
            {metric}
          </div>
        )}
        {metricLabel && (
          <div className="text-sm text-[hsl(var(--synervion-text-secondary))]">
            {metricLabel}
          </div>
        )}
        {children}
      </div>
    );
  }

  if (variant === 'partnership') {
    return (
      <div className={cn(baseStyles, variantStyles.partnership, className)}>
        {icon && (
          <div className="mb-6">
            <div className="w-16 h-16 rounded-[var(--synervion-radius-2xl)] bg-[hsl(var(--synervion-primary-500))]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
        )}
        {title && (
          <h3 className="mb-3 text-2xl" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-[hsl(var(--synervion-text-secondary))] mb-6">
            {description}
          </p>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={cn(baseStyles, variantStyles.default, className)}>
      {icon && <div className="mb-4">{icon}</div>}
      {title && (
        <h4 className="mb-2" style={{ fontFamily: 'var(--synervion-font-heading)' }}>
          {title}
        </h4>
      )}
      {description && (
        <p className="text-sm text-[hsl(var(--synervion-text-secondary))]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
