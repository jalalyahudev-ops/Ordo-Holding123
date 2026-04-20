import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CustomButtonProps {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export function CustomButton({ 
  children, 
  className, 
  isLoading, 
  variant = 'primary', 
  disabled,
  ...props 
}: CustomButtonProps) {
  const baseStyles = "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all active:scale-95 disabled:active:scale-100 disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20",
    secondary: "bg-muted text-foreground",
    outline: "border-2 border-border text-foreground bg-transparent",
    ghost: "bg-transparent text-primary hover:bg-primary/5",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : children}
    </button>
  );
}
