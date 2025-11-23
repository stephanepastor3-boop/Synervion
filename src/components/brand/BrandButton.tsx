import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const brandButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-[hsl(var(--synervion-primary-500))] text-white hover:bg-[hsl(var(--synervion-primary-600))] active:bg-[hsl(var(--synervion-primary-700))] shadow-sm hover:shadow-md',
        secondary: 'bg-[hsl(var(--synervion-secondary-800))] text-white hover:bg-[hsl(var(--synervion-secondary-700))] active:bg-[hsl(var(--synervion-secondary-900))]',
        outline: 'border-2 border-[hsl(var(--synervion-border-dark))] text-[hsl(var(--synervion-text-primary))] hover:bg-[hsl(var(--synervion-bg-gray-50))] active:bg-[hsl(var(--synervion-bg-gray-100))]',
        ghost: 'text-[hsl(var(--synervion-text-primary))] hover:bg-[hsl(var(--synervion-bg-gray-100))] active:bg-[hsl(var(--synervion-bg-gray-200))]',
        link: 'text-[hsl(var(--synervion-primary-500))] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-[var(--synervion-radius-md)]',
        md: 'h-11 px-6 text-base rounded-[var(--synervion-radius-lg)]',
        lg: 'h-14 px-8 text-lg rounded-[var(--synervion-radius-lg)]',
        icon: 'h-11 w-11 rounded-[var(--synervion-radius-lg)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BrandButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandButtonVariants> {}

const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(brandButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

BrandButton.displayName = 'BrandButton';

export { BrandButton, brandButtonVariants };
