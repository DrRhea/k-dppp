import * as React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`relative w-full rounded-lg border border-gray-200 p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

Alert.displayName = 'Alert';

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

AlertDescription.displayName = 'AlertDescription';
