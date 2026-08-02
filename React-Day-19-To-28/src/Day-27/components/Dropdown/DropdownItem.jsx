const DropdownItem = ({
  children,
  onClick,
  className = '',
  disabled = false,
  icon = null,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      role="menuitem"
    >
      {icon && <span className="text-gray-400">{icon}</span>}
      {children}
    </button>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;