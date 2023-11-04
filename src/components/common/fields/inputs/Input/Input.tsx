/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef } from 'react';

import { cn } from '~utils/helpers';

interface InputProps extends React.ComponentProps<'input'> {
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, helperText, ...props }, ref) => (
    <label className="flex flex-col gap-1">
      <input
        type="text"
        {...props}
        ref={ref}
        className={cn(
          'w-full py-2 px-2 rounded font-medium text-sm outline-none border-2 border-gray-950/10',
          {
            'border-red-400/50 bg-red-400/50 placeholder:text-black/50': error,
          },
          props.className,
        )}
      />
      {helperText && (
        <p
          className={cn('pl-2 text-xs font-medium text-gray-500/75 truncate', {
            'text-red-400': error,
          })}
        >
          {helperText}
        </p>
      )}
    </label>
  ),
);
