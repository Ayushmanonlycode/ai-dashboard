import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hoverable = false 
}) => {
  return (
    <div 
      className={`
        bg-[var(--card-bg)] 
        border border-[var(--card-border)] 
        rounded-lg 
        overflow-hidden 
        shadow-sm 
        ${hoverable ? 'transition-all hover:shadow-md hover:translate-y-[-2px]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-4 border-b border-[var(--card-border)] ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-4 border-t border-[var(--card-border)] ${className}`}>{children}</div>;
};

export default Card; 