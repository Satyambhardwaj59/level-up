import { FaChevronDown } from 'react-icons/fa';

const DropdownToggle = ({
  children,
  isOpen,
  onToggle,
  className = '',
  as = 'button',
}) => {
  const Component = as;

  return (
    <Component
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${className}`}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
      <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </Component>
  );
};

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;