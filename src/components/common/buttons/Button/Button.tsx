import { cn } from '~utils/helpers';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'text', children, ...props }) => (
  <button
    type="button"
    {...props}
    className={cn(
      'w-full py-[5px] px-[15px] rounded font-semibold text-sm',
      {
        'bg-gray-300 text-gray-900 hover:bg-gray-200 active:bg-gray-100': variant === 'contained',
        'border-2 border-gray-300 text-gray-300 hover:bg-gray-300/10 active:bg-gray-300/20':
          variant === 'outlined',
        'text-gray-300 hover:bg-gray-300/10 active:bg-gray-300/20': variant === 'text',
      },
      props.className,
    )}
  >
    {children}
  </button>
);
