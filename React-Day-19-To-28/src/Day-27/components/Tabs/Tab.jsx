

const Tab = ({ 
  children, 
  isActive, 
  onClick, 
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const baseClasses = {
    default: `
      px-4 py-2 font-medium transition-colors cursor-pointer
      ${isActive 
        ? 'text-highlight border-b-2 border-highlight' 
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    pills: `
      px-4 py-2 rounded-lg font-medium transition-all cursor-pointer
      ${isActive 
        ? 'bg-highlight text-white shadow-lg shadow-highlight/20' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    underline: `
      px-4 py-2 font-medium transition-colors cursor-pointer relative
      ${isActive 
        ? 'text-highlight' 
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-highlight' : ''}
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses[variant]} ${className}`}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

Tab.displayName = 'Tab';

export default Tab;