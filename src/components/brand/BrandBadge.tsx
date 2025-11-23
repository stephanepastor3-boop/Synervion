import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface BrandBadgeProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export function BrandBadge({
  variant = 'primary',
  size = 'md',
  children,
  className,
}: BrandBadgeProps) {
  const variantStyles = {
    primary: 'bg-[hsl(var(--synervion-primary-500))]/10 border-[hsl(var(--synervion-primary-500))]/20 text-[hsl(var(--synervion-primary-600))]',
    secondary: 'bg-[hsl(var(--synervion-secondary-800))]/10 border-[hsl(var(--synervion-secondary-800))]/20 text-[hsl(var(--synervion-secondary-800))]',
    outline: 'bg-transparent border-[hsl(var(--synervion-border-dark))] text-[hsl(var(--synervion-text-primary))]',
    success: 'bg-[hsl(var(--synervion-success))]/10 border-[hsl(var(--synervion-success))]/20 text-[hsl(var(--synervion-success))]',
    warning: 'bg-[hsl(var(--synervion-warning))]/10 border-[hsl(var(--synervion-warning))]/20 text-[hsl(var(--synervion-warning))]',
    error: 'bg-[hsl(var(--synervion-error))]/10 border-[hsl(var(--synervion-error))]/20 text-[hsl(var(--synervion-error))]',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs rounded-[var(--synervion-radius-sm)]',
    md: 'px-4 py-2 text-sm rounded-[var(--synervion-radius-md)]',
    lg: 'px-5 py-2.5 text-base rounded-[var(--synervion-radius-lg)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center border font-medium transition-all',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{ fontFamily: 'var(--synervion-font-heading)' }}
    >
      {children}
    </span>
  );
}
