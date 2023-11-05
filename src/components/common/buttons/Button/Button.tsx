import { cn } from '~utils/helpers';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'slate' | 'violet' | 'indigo' | 'red' | 'green' | 'white';
  children: React.ReactNode;
}

const buttonStyle = {
  contained: {
    slate: 'bg-slate-400 text-white hover:bg-slate-500 active:bg-slate-600',
    violet: 'bg-violet-400 text-white hover:bg-violet-500 active:bg-violet-600',
    indigo: 'bg-indigo-400 text-white hover:bg-indigo-500 active:bg-indigo-600',
    red: 'bg-red-400 text-white hover:bg-red-500 active:bg-red-600',
    green: 'bg-green-400 text-white hover:bg-green-500 active:bg-green-600',
    white: 'bg-white text-black hover:bg-white/75 active:bg-white/50',
  },
  outlined: {
    slate:
      'border-2 border-slate-400 text-slate-400 hover:bg-slate-500/25 hover:border-slate-500 hover:text-slate-500 active:bg-slate-600/25',
    violet:
      'border-2 border-violet-400 text-violet-400 hover:bg-violet-500/25 hover:border-violet-500 hover:text-violet-500 active:bg-violet-600/25',
    indigo:
      'border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-500/25 hover:border-indigo-500 hover:text-indigo-500 active:bg-indigo-600/25',
    red: 'border-2 border-red-400 text-red-400 hover:bg-red-500/25 hover:border-red-500 hover:text-red-500 active:bg-red-600/25',
    green:
      'border-2 border-green-400 text-green-400 hover:bg-green-500/25 hover:border-green-500 hover:text-green-500 active:bg-green-600/25',
    white:
      'border-2 border-white text-white hover:bg-white/10 hover:border-white/75 active:bg-white/25',
  },

  text: {
    slate: 'text-slate-400 hover:bg-slate-500/25 active:bg-slate-600/25',
    violet: 'text-violet-400 hover:bg-violet-500/25 active:bg-violet-600/25',
    indigo: 'text-indigo-400 hover:bg-indigo-500/25 active:bg-indigo-600/25',
    red: 'text-red-400 hover:bg-red-500/25 active:bg-red-600/25',
    green: 'text-green-400 hover:bg-green-500/25 active:bg-green-600/25',
    white: 'text-white hover:bg-white/10 active:bg-white/25',
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
      buttonStyle[variant][color],
      props.className,
    )}
  >
    {children}
  </button>
);
