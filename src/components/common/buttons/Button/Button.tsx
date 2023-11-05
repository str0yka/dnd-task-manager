import { cn } from '~utils/helpers';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'slate' | 'violet' | 'indigo' | 'red' | 'green';
  children: React.ReactNode;
}

const buttonStyle = {
  slate: {
    contained: 'bg-slate-400 text-white hover:bg-slate-500 active:bg-slate-600',
    outlined:
      'border-2 border-slate-400 text-slate-400 hover:bg-slate-500/25 hover:border-slate-500 hover:text-slate-500 active:bg-slate-600/25',
    text: 'text-slate-400 hover:bg-slate-500/25 active:bg-slate-600/25',
  },
  violet: {
    contained: 'bg-violet-400 text-white hover:bg-violet-500 active:bg-violet-600',
    outlined:
      'border-2 border-violet-400 text-violet-400 hover:bg-violet-500/25 hover:border-violet-500 hover:text-violet-500 active:bg-violet-600/25',
    text: 'text-violet-400 hover:bg-violet-500/25 active:bg-violet-600/25',
  },
  indigo: {
    contained: 'bg-indigo-400 text-white hover:bg-indigo-500 active:bg-indigo-600',
    outlined:
      'border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-500/25 hover:border-indigo-500 hover:text-indigo-500 active:bg-indigo-600/25',
    text: 'text-indigo-400 hover:bg-indigo-500/25 active:bg-indigo-600/25',
  },
  red: {
    contained: 'bg-red-400 text-white hover:bg-red-500 active:bg-red-600',
    outlined:
      'border-2 border-red-400 text-red-400 hover:bg-red-500/25 hover:border-red-500 hover:text-red-500 active:bg-red-600/25',
    text: 'text-red-400 hover:bg-red-500/25 active:bg-red-600/25',
  },
  green: {
    contained: 'bg-green-400 text-white hover:bg-green-500 active:bg-green-600',
    outlined:
      'border-2 border-green-400 text-green-400 hover:bg-green-500/25 hover:border-green-500 hover:text-green-500 active:bg-green-600/25',
    text: 'text-green-400 hover:bg-green-500/25 active:bg-green-600/25',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'text',
  color = 'violet',
  children,
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={cn(
      'w-full py-1 px-2 min-w-[32px] min-h-[32px] rounded font-semibold text-sm whitespace-nowrap',
      buttonStyle[color][variant],
      props.className,
    )}
  >
    {children}
  </button>
);
