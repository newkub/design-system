import React, { HTMLAttributes, forwardRef } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      icon,
      onClose,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'relative rounded-lg border p-4';
    
    const variantClasses = {
      info: 'bg-info-50 text-info-900 border-info-100',
      success: 'bg-success-50 text-success-900 border-success-100',
      warning: 'bg-warning-50 text-warning-900 border-warning-100',
      error: 'bg-error-50 text-error-900 border-error-100',
    };
    
    const variantIcons = {
      info: <Info className="h-5 w-5 text-info-500" />,
      success: <CheckCircle className="h-5 w-5 text-success-500" />,
      warning: <AlertCircle className="h-5 w-5 text-warning-500" />,
      error: <XCircle className="h-5 w-5 text-error-500" />,
    };
    
    const classes = [
      baseClasses,
      variantClasses[variant],
      className,
    ].join(' ');
    
    return (
      <div
        ref={ref}
        role="alert"
        className={classes}
        {...props}
      >
        <div className="flex items-start">
          {(icon || variantIcons[variant]) && (
            <div className="flex-shrink-0 mr-3">
              {icon || variantIcons[variant]}
            </div>
          )}
          
          <div className="flex-1">
            {title && (
              <h5 className="font-medium mb-1">{title}</h5>
            )}
            <div className="text-sm">{children}</div>
          </div>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-muted"
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 12 12M13 1 1 13" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };